import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/lib/assets/icons";
import Button from "@/lib/components/button/Button";
import {
  getFocusableElements,
  trapFocusWithin,
} from "@/lib/components/_shared/overlay-focus";
import { useQuickitControlState } from "@/lib/theme";
import { cn, lockAppScroll, unlockAppScroll } from "@/lib/utils";
import { QUICKIT_EASE_DEFAULT } from "@/lib/tokens";
import { DrawerContext, useDrawerContext } from "./drawer-context";

const ANIMATION_DURATION = 160;
const OVERLAY_DURATION = 180;
let drawerZIndexCounter = 60;
const drawerStack = [];

const PLACEMENTS = {
  right: {
    panel: "inset-y-0 right-0 h-full",
    size: "w-full max-w-md",
  },
  left: {
    panel: "inset-y-0 left-0 h-full",
    size: "w-full max-w-md",
  },
  bottom: {
    panel: "inset-x-0 bottom-0 w-full",
    size: "max-h-[80vh]",
  },
  top: {
    panel: "inset-x-0 top-0 w-full",
    size: "max-h-[80vh]",
  },
};

const DRAWER_PRIMITIVES = {
  overlay:
    `fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity duration-[180ms] ease-[${QUICKIT_EASE_DEFAULT}]`,
  viewport: "fixed inset-0 pointer-events-none",
  panel: [
    "pointer-events-auto absolute flex w-full flex-col overflow-hidden border",
    "bg-white text-neutral-950 transform-gpu will-change-transform",
  ].join(" "),
  header:
    "flex items-start justify-between gap-4 border-b px-5 py-4 flex-shrink-0",
  body: "flex-1 overflow-y-auto px-5 py-4",
  actions:
    "flex w-full gap-3 border-t px-5 py-4 flex-shrink-0",
};

const DRAWER_THEME_CLASSES = {
  light: {
    panel: "border-slate-200 bg-white text-slate-950",
    muted: "text-slate-600",
    header: "border-slate-200",
    actions: "border-slate-200 bg-slate-50/70",
  },
  dark: {
    panel: "border-zinc-800 bg-zinc-950 text-stone-50",
    muted: "text-stone-300",
    header: "border-zinc-800",
    actions: "border-zinc-800 bg-zinc-900/70",
  },
};

function getDrawerTransform(placement, isVisible) {
  if (isVisible) {
    return "translate3d(0, 0, 0)";
  }

  switch (placement) {
    case "left":
      return "translate3d(calc(-100% - 1.25rem), 0, 0)";
    case "right":
      return "translate3d(calc(100% + 1.25rem), 0, 0)";
    case "top":
      return "translate3d(0, calc(-100% - 1rem), 0)";
    case "bottom":
      return "translate3d(0, calc(100% + 1rem), 0)";
    default:
      return "translate3d(calc(100% + 1.25rem), 0, 0)";
  }
}

function addDrawerToStack(id) {
  if (!drawerStack.includes(id)) {
    drawerStack.push(id);
  }
}

function removeDrawerFromStack(id) {
  const index = drawerStack.indexOf(id);

  if (index !== -1) {
    drawerStack.splice(index, 1);
  }
}

function isTopmostDrawer(id) {
  return drawerStack.at(-1) === id;
}

function isTriggerDisabled(element) {
  return Boolean(
    element?.props?.disabled || element?.props?.["aria-disabled"] === true,
  );
}

export function Drawer({
  children,
  closeOnEscape = true,
  defaultOpen = false,
  onBeforeClose,
  onOpenChange,
  open: controlledOpen,
  outsideClick = true,
  placement = "right",
  showCloseButton = true,
  size,
  zIndex: customZIndex,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [visible, setVisible] = useState(defaultOpen);
  const [rendered, setRendered] = useState(defaultOpen);
  const [instanceZIndex, setInstanceZIndex] = useState(customZIndex ?? 60);
  const [registeredTitleIds, setRegisteredTitleIds] = useState([]);
  const [registeredDescriptionIds, setRegisteredDescriptionIds] = useState([]);
  const previousFocusedElementRef = useRef(null);
  const triggerElementRef = useRef(null);
  const drawerId = useId();
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const titleId = `qi-drawer-title-${drawerId}`;
  const descriptionId = `qi-drawer-description-${drawerId}`;

  const setOpen = useCallback(
    (nextValue) => {
      if (!isControlled) {
        setInternalOpen(nextValue);
      }

      if (nextValue !== open) {
        onOpenChange?.(nextValue);
      }
    },
    [isControlled, onOpenChange, open],
  );

  const close = useCallback(async () => {
    const result = await onBeforeClose?.();

    if (result === false) {
      return;
    }

    setOpen(false);
  }, [onBeforeClose, setOpen]);

  const registerTitle = useCallback((id) => {
    setRegisteredTitleIds((currentIds) => (
      currentIds.includes(id) ? currentIds : [...currentIds, id]
    ));

    return () => {
      setRegisteredTitleIds((currentIds) =>
        currentIds.filter((currentId) => currentId !== id),
      );
    };
  }, []);

  const registerDescription = useCallback((id) => {
    setRegisteredDescriptionIds((currentIds) => (
      currentIds.includes(id) ? currentIds : [...currentIds, id]
    ));

    return () => {
      setRegisteredDescriptionIds((currentIds) =>
        currentIds.filter((currentId) => currentId !== id),
      );
    };
  }, []);

  const setTriggerElement = useCallback((element) => {
    triggerElementRef.current = element;
  }, []);

  useEffect(() => {
    if (open && typeof document !== "undefined") {
      previousFocusedElementRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    }
  }, [open]);

  useEffect(() => {
    let enterFrameId = 0;
    let settleFrameId = 0;
    let exitFrameId = 0;
    let closeTimeoutId = 0;

    if (open) {
      enterFrameId = window.requestAnimationFrame(() => {
        setRendered(true);
        setVisible(false);
        settleFrameId = window.requestAnimationFrame(() => {
          setVisible(true);
        });
      });

      return () => {
        window.cancelAnimationFrame(enterFrameId);
        window.cancelAnimationFrame(settleFrameId);
      };
    }

    exitFrameId = window.requestAnimationFrame(() => {
      setVisible(false);
      closeTimeoutId = window.setTimeout(() => {
        setRendered(false);
      }, Math.max(ANIMATION_DURATION, OVERLAY_DURATION));
    });

    return () => {
      window.cancelAnimationFrame(exitFrameId);
      if (closeTimeoutId) {
        window.clearTimeout(closeTimeoutId);
      }
    };
  }, [open]);

  useEffect(() => {
    if (!rendered) {
      const previousFocusedElement =
        triggerElementRef.current ?? previousFocusedElementRef.current;

      if (!previousFocusedElement || typeof window === "undefined") {
        return undefined;
      }

      const frameId = window.requestAnimationFrame(() => {
        previousFocusedElement.focus?.();
        previousFocusedElementRef.current = null;
        triggerElementRef.current = null;
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    addDrawerToStack(drawerId);
    lockAppScroll();
    const nextZIndex = customZIndex
      ? customZIndex
      : (() => {
          drawerZIndexCounter += 10;
          return drawerZIndexCounter;
        })();
    const frameId = window.requestAnimationFrame(() => {
      setInstanceZIndex(nextZIndex);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      removeDrawerFromStack(drawerId);
      unlockAppScroll();

      if (!customZIndex && drawerZIndexCounter > 60) {
        drawerZIndexCounter -= 10;
      }
    };
  }, [customZIndex, drawerId, rendered]);

  useEffect(() => {
    if (!rendered || !closeOnEscape) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Escape" || !isTopmostDrawer(drawerId)) {
        return;
      }

      close();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, closeOnEscape, drawerId, rendered]);

  const value = useMemo(
    () => ({
      close,
      closeOnEscape,
      descriptionId,
      effectiveDescriptionId: registeredDescriptionIds[0] ?? null,
      effectiveTitleId: registeredTitleIds[0] ?? null,
      hasDescription: registeredDescriptionIds.length > 0,
      hasTitle: registeredTitleIds.length > 0,
      instanceZIndex,
      isTopmost: () => isTopmostDrawer(drawerId),
      open,
      outsideClick,
      placement,
      registerDescription,
      registerTitle,
      rendered,
      setOpen,
      setTriggerElement,
      showCloseButton,
      size,
      titleId,
      visible,
    }),
    [
      close,
      closeOnEscape,
      descriptionId,
      drawerId,
      instanceZIndex,
      open,
      outsideClick,
      placement,
      registeredDescriptionIds,
      registeredTitleIds,
      registerDescription,
      registerTitle,
      rendered,
      setOpen,
      setTriggerElement,
      showCloseButton,
      size,
      titleId,
      visible,
    ],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function DrawerTrigger({
  as = "button",
  asChild = false,
  children,
  className,
  disabled = false,
  ...props
}) {
  const { open, setOpen, setTriggerElement } = useDrawerContext("DrawerTrigger");

  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      throw new Error(
        "DrawerTrigger con asChild requiere un único elemento React válido.",
      );
    }

    const childProps = {
      ref: child.props.ref,
      className: cn(child.props.className, className),
      ...props,
    };

    if (isTriggerDisabled(child)) {
      return cloneElement(child, childProps);
    }

    return cloneElement(child, {
      ...childProps,
      onClick: (event) => {
        child.props.onClick?.(event);

        if (!event.defaultPrevented) {
          setTriggerElement(event.currentTarget);
          setOpen(!open);
        }
      },
    });
  }

  const Component = as;

  return (
    <Component
      {...props}
      className={cn("cursor-pointer", className)}
      disabled={disabled}
      onClick={(event) => {
        props.onClick?.(event);

        if (!disabled && !event.defaultPrevented) {
          setTriggerElement(event.currentTarget);
          setOpen(!open);
        }
      }}
    >
      {children}
    </Component>
  );
}

export function DrawerContent({ children, className }) {
  const {
    close,
    effectiveDescriptionId: descriptionId,
    instanceZIndex,
    isTopmost,
    outsideClick,
    placement,
    rendered,
    size,
    effectiveTitleId: titleId,
    visible,
  } = useDrawerContext("DrawerContent");
  const { theme } = useQuickitControlState("drawer");
  const ui = DRAWER_THEME_CLASSES[theme];
  const resolvedPlacement = PLACEMENTS[placement] ?? PLACEMENTS.right;
  const sizeClass = size ?? resolvedPlacement.size;
  const transform = getDrawerTransform(placement, visible);
  const panelRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !rendered) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const preferredTarget =
        panelRef.current?.querySelector("[data-overlay-autofocus='true']") ??
        getFocusableElements(panelRef.current).find(
          (element) => element.getAttribute("data-overlay-close") !== "true",
        ) ??
        panelRef.current;

      preferredTarget?.focus?.();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [rendered]);

  if (typeof window === "undefined" || !rendered) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={cn(
          DRAWER_PRIMITIVES.overlay,
          visible ? "opacity-100" : "opacity-0",
        )}
        style={{ zIndex: instanceZIndex }}
        onClick={outsideClick && isTopmost() ? close : undefined}
      />

      <div
        className={DRAWER_PRIMITIVES.viewport}
        style={{ zIndex: instanceZIndex + 1 }}
      >
        <div
          ref={panelRef}
          className={cn(
            DRAWER_PRIMITIVES.panel,
            ui.panel,
            resolvedPlacement.panel,
            sizeClass,
            className,
          )}
          style={{
            transform,
            opacity: visible ? 1 : 0.72,
            transition:
              `transform 240ms ${QUICKIT_EASE_DEFAULT}, opacity 180ms ${QUICKIT_EASE_DEFAULT}`,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId || undefined}
          aria-describedby={descriptionId || undefined}
          tabIndex={-1}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === "Tab" && isTopmost()) {
              trapFocusWithin(panelRef.current, event);
            }
          }}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}

export function DrawerHeader({ children, className }) {
  const { close, showCloseButton } = useDrawerContext("DrawerHeader");
  const { theme } = useQuickitControlState("drawer");
  const ui = DRAWER_THEME_CLASSES[theme];

  return (
    <div className={cn(DRAWER_PRIMITIVES.header, ui.header, className)}>
      <div className="min-w-0 flex-1">{children}</div>
      {showCloseButton ? (
        <Button
          type="button"
          variant="ghost"
          shape="square"
          size="sm"
          color="slate"
          aria-label="Cerrar drawer"
          onClick={close}
          className="shrink-0"
          data-overlay-close="true"
        >
          <CloseIcon className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

export function DrawerTitle({ centered = false, children, className, id }) {
  const { registerTitle, titleId } = useDrawerContext("DrawerTitle");
  const resolvedId = id ?? titleId;

  useLayoutEffect(() => {
    return registerTitle(resolvedId);
  }, [registerTitle, resolvedId]);

  return (
    <h2
      id={resolvedId}
      className={cn(
        "text-lg font-semibold tracking-[-0.02em]",
        centered && "text-center",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function DrawerBody({ children, className, id }) {
  const { descriptionId, registerDescription } = useDrawerContext("DrawerBody");
  const { theme } = useQuickitControlState("drawer");
  const ui = DRAWER_THEME_CLASSES[theme];
  const resolvedId = id ?? descriptionId;

  useLayoutEffect(() => {
    return registerDescription(resolvedId);
  }, [registerDescription, resolvedId]);

  return (
    <div id={resolvedId} className={cn(DRAWER_PRIMITIVES.body, ui.muted, className)}>
      {children}
    </div>
  );
}

export function DrawerActions({
  children,
  className,
  placement = "end",
}) {
  const { theme } = useQuickitControlState("drawer");
  const ui = DRAWER_THEME_CLASSES[theme];

  return (
    <div
      className={cn(
        DRAWER_PRIMITIVES.actions,
        ui.actions,
        placement === "start" && "justify-start",
        placement === "center" && "justify-center",
        placement === "end" && "justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DrawerAction({
  children,
  className,
  closeOnClick = true,
  color = "primary",
  onClick,
  renderButton,
  size = "md",
  variant = "solid",
  ...props
}) {
  const { close } = useDrawerContext("DrawerAction");
  const buttonProps = {
    variant,
    color,
    size,
    className,
    onClick: async (event) => {
      await onClick?.(event);

      if (closeOnClick && !event.defaultPrevented) {
        close();
      }
    },
    ...props,
  };

  if (renderButton) {
    return renderButton(buttonProps, children);
  }

  return <Button {...buttonProps}>{children}</Button>;
}

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.Body = DrawerBody;
Drawer.Actions = DrawerActions;
Drawer.Action = DrawerAction;

export default Drawer;
