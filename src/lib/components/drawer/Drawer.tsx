import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent, ReactNode } from "react";
import {
  Children,
  cloneElement,
  forwardRef,
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
import { createOverlayStack, isTriggerDisabled } from "@/lib/components/_shared/overlay-stack";
import { useQuickitControlState } from "@/lib/theme";
import { cn, lockAppScroll, unlockAppScroll, useMergeRefs } from "@/lib/utils";
import { QUICKIT_EASE_DEFAULT } from "@/lib/tokens";
import { useTXT } from "@/lib/i18n";
import { DrawerContext, useDrawerContext } from "./drawer-context";

const ANIMATION_DURATION = 160;
const OVERLAY_DURATION = 180;
const drawerOverlay = createOverlayStack("drawer", 60);

const PLACEMENTS = {
  right: {
    panel: "inset-y-0 right-0 h-full",
    size: "w-full max-w-full sm:max-w-md",
  },
  left: {
    panel: "inset-y-0 left-0 h-full",
    size: "w-full max-w-full sm:max-w-md",
  },
  bottom: {
    panel: "inset-x-0 bottom-0 w-full",
    size: "max-h-[90vh] sm:max-h-[80vh]",
  },
  top: {
    panel: "inset-x-0 top-0 w-full",
    size: "max-h-[90vh] sm:max-h-[80vh]",
  },
} as const;

const DRAWER_PRIMITIVES = {
  overlay:
    `fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity duration-[180ms] ease-[${QUICKIT_EASE_DEFAULT}]`,
  viewport: "fixed inset-0 pointer-events-none",
  panel: [
    "qk-overlay-surface pointer-events-auto absolute flex w-full flex-col overflow-hidden border",
    "bg-white text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50 transform-gpu will-change-transform",
  ].join(" "),
  header:
    "flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-5 sm:py-4 flex-shrink-0",
  body: "flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4",
  actions:
    "flex w-full gap-2 sm:gap-3 border-t px-4 py-3 sm:px-5 sm:py-4 flex-shrink-0",
};

import { DRAWER_THEME_CLASSES } from "@/lib/theme/theme-classes";

function getDrawerTransform(placement: string, isVisible: boolean): string {
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
}: {
  children: ReactNode;
  closeOnEscape?: boolean;
  defaultOpen?: boolean;
  onBeforeClose?: () => Promise<boolean | void> | boolean | void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  outsideClick?: boolean;
  placement?: "left" | "right" | "top" | "bottom";
  showCloseButton?: boolean;
  size?: string;
  zIndex?: number;
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [visible, setVisible] = useState(defaultOpen);
  const [rendered, setRendered] = useState(defaultOpen);
  const [instanceZIndex, setInstanceZIndex] = useState(customZIndex ?? 60);
  const [registeredTitleIds, setRegisteredTitleIds] = useState<string[]>([]);
  const [registeredDescriptionIds, setRegisteredDescriptionIds] = useState<string[]>([]);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const drawerId = useId();
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const titleId = `qk-drawer-title-${drawerId}`;
  const descriptionId = `qk-drawer-description-${drawerId}`;

  const setOpen = useCallback(
    (nextValue: boolean) => {
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

  const registerTitle = useCallback((id: string) => {
    setRegisteredTitleIds((currentIds) => (
      currentIds.includes(id) ? currentIds : [...currentIds, id]
    ));

    return () => {
      setRegisteredTitleIds((currentIds) =>
        currentIds.filter((currentId) => currentId !== id),
      );
    };
  }, []);

  const registerDescription = useCallback((id: string) => {
    setRegisteredDescriptionIds((currentIds) => (
      currentIds.includes(id) ? currentIds : [...currentIds, id]
    ));

    return () => {
      setRegisteredDescriptionIds((currentIds) =>
        currentIds.filter((currentId) => currentId !== id),
      );
    };
  }, []);

  const setTriggerElement = useCallback((element: HTMLElement | null) => {
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

    drawerOverlay.addToStack(drawerId);
    lockAppScroll();
    const nextZIndex = drawerOverlay.incrementZIndex(customZIndex);
    const frameId = window.requestAnimationFrame(() => {
      setInstanceZIndex(nextZIndex);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      drawerOverlay.removeFromStack(drawerId);
      unlockAppScroll();
      drawerOverlay.decrementZIndex(customZIndex);
    };
  }, [customZIndex, drawerId, rendered]);

  useEffect(() => {
    if (!rendered || !closeOnEscape) {
      return undefined;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape" || !drawerOverlay.isTopmost(drawerId)) {
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
      blockingOverlay: false,
      close,
      closeOnEscape,
      descriptionId,
      effectiveDescriptionId: registeredDescriptionIds[0] ?? null,
      effectiveTitleId: registeredTitleIds[0] ?? null,
      hasDescription: registeredDescriptionIds.length > 0,
      hasTitle: registeredTitleIds.length > 0,
      instanceZIndex,
      isTopmost: () => drawerOverlay.isTopmost(drawerId),
      maxWidth: size ?? "",
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

const DrawerTrigger = forwardRef<HTMLElement, {
  as?: "button" | "a" | React.ElementType;
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  [key: string]: unknown;
}>(function DrawerTrigger({
  as = "button",
  asChild = false,
  children,
  className,
  disabled = false,
  ...props
}, ref) {
  const { open, setOpen, setTriggerElement } = useDrawerContext("DrawerTrigger");

  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      throw new Error(
        "DrawerTrigger con asChild requiere un único elemento React válido.",
      );
    }

    const childProps = {
      className: cn((child.props as Record<string, unknown>).className as string | undefined, className),
      ...props,
    };

    if (isTriggerDisabled(child as { props?: Record<string, unknown> })) {
      return cloneElement(child as React.ReactElement<Record<string, unknown>>, childProps);
    }

    return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
      ...childProps,
      onClick: (event: MouseEvent) => {
        const childOnClick = (child.props as Record<string, unknown>).onClick as
          | ((e: MouseEvent) => void)
          | undefined;
        childOnClick?.(event);

        if (!event.defaultPrevented) {
          setTriggerElement(event.currentTarget as HTMLElement);
          setOpen(!open);
        }
      },
    });
  }

  const Component = as as React.ComponentType<Record<string, unknown>>;

  return (
    <Component
      ref={ref}
      type={as === "button" ? "button" : undefined}
      {...props}
      className={cn("cursor-pointer", className)}
      disabled={disabled}
      onClick={(event: MouseEvent) => {
        const propsOnClick = (props as Record<string, unknown>).onClick as
          | ((e: MouseEvent) => void)
          | undefined;
        propsOnClick?.(event);

        if (!disabled && !event.defaultPrevented) {
          setTriggerElement(event.currentTarget as HTMLElement);
          setOpen(!open);
        }
      }}
    >
      {children}
    </Component>
  );
});
export { DrawerTrigger };

const DrawerContent = forwardRef<HTMLElement, { children: ReactNode; className?: string }>(function DrawerContent({ children, className }, ref) {
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
  const ui = DRAWER_THEME_CLASSES[theme as keyof typeof DRAWER_THEME_CLASSES];
  const resolvedPlacement = PLACEMENTS[placement as keyof typeof PLACEMENTS] ?? PLACEMENTS.right;
  const sizeClass = size ?? resolvedPlacement.size;
  const transform = getDrawerTransform(placement, visible);
  const panelRef = useRef<HTMLElement | null>(null);
  const drawerMergedRef = useMergeRefs(panelRef, ref);
  const TXT = useTXT();

  useEffect(() => {
    if (typeof window === "undefined" || !rendered) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const preferredTarget =
        (panelRef.current?.querySelector("[data-overlay-autofocus='true']") as HTMLElement | null) ??
        (getFocusableElements(panelRef.current).find(
          (element) => element.getAttribute("data-overlay-close") !== "true",
        ) as HTMLElement | undefined) ??
        panelRef.current;

      (preferredTarget as HTMLElement | null)?.focus?.();
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
          ref={drawerMergedRef as React.Ref<HTMLDivElement>}
          className={cn(
            DRAWER_PRIMITIVES.panel,
            ui.panel,
            resolvedPlacement.panel,
            sizeClass,
            className,
          )}
          style={{
            transform,
            opacity: visible ? 1 : 0,
            transition:
              `transform 240ms ${QUICKIT_EASE_DEFAULT}, opacity 180ms ${QUICKIT_EASE_DEFAULT}`,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId || undefined}
          aria-label={!titleId ? TXT.DRAWER_FALLBACK_LABEL : undefined}
          aria-describedby={descriptionId || undefined}
          tabIndex={-1}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event: ReactKeyboardEvent) => {
            if (event.key === "Tab" && isTopmost()) {
              trapFocusWithin(panelRef.current, event.nativeEvent);
            }
          }}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
});
export { DrawerContent };

export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  const { close, showCloseButton } = useDrawerContext("DrawerHeader");

  const { theme } = useQuickitControlState("drawer");
  const ui = DRAWER_THEME_CLASSES[theme as keyof typeof DRAWER_THEME_CLASSES];
  const TXT = useTXT();

  return (
    <div className={cn(DRAWER_PRIMITIVES.header, ui.header, className)}>
      <div className="min-w-0 flex-1">{children}</div>
      {showCloseButton ? (
        <Button
          type="button"
          variant="soft"
          shape="square"
          size="sm sm:md"
          color="neutral"
          aria-label={TXT.CLOSE_DRAWER}
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

export function DrawerTitle({ centered = false, children, className, id }: { centered?: boolean; children: ReactNode; className?: string; id?: string }) {
  const { registerTitle, titleId } = useDrawerContext("DrawerTitle");
  const resolvedId = id ?? titleId;

  useLayoutEffect(() => {
    return registerTitle(resolvedId);
  }, [registerTitle, resolvedId]);

  return (
    <h2
      id={resolvedId}
      className={cn(
        "text-base sm:text-lg font-semibold tracking-[-0.02em]",
        centered && "text-center",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function DrawerBody({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const { descriptionId, registerDescription } = useDrawerContext("DrawerBody");
  const { theme } = useQuickitControlState("drawer");
  const ui = DRAWER_THEME_CLASSES[theme as keyof typeof DRAWER_THEME_CLASSES];
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
}: { children: ReactNode; className?: string; placement?: "start" | "center" | "end" }) {
  const { theme } = useQuickitControlState("drawer");
  const ui = DRAWER_THEME_CLASSES[theme as keyof typeof DRAWER_THEME_CLASSES];

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

const DrawerAction = forwardRef<HTMLElement, {
  children: ReactNode;
  className?: string;
  closeOnClick?: boolean;
  color?: string;
  onClick?: (event: MouseEvent) => void | Promise<void>;
  renderButton?: (props: Record<string, unknown>, children: ReactNode) => ReactNode;
  size?: string;
  variant?: string;
  [key: string]: unknown;
}>(function DrawerAction({
  children,
  className,
  closeOnClick = true,
  color = "neutral",
  onClick,
  renderButton,
  size = "md",
  variant = "soft",
  ...props
}, ref) {
  const { close } = useDrawerContext("DrawerAction");
  const resolvedOnClick = onClick as ((event: MouseEvent) => void | Promise<void>) | undefined;
  const resolvedVariant = variant as string;
  const resolvedColor = color as string;
  const resolvedSize = size as string;
  const resolvedClassName = className as string | undefined;
  const buttonProps = {
    variant: resolvedVariant,
    color: resolvedColor,
    size: resolvedSize,
    className: resolvedClassName,
    onClick: async (event: MouseEvent) => {
      await resolvedOnClick?.(event);

      if (closeOnClick && !event.defaultPrevented) {
        close();
      }
    },
    ...props,
  };

  if (renderButton) {
    return (renderButton as (props: Record<string, unknown>, children: ReactNode) => ReactNode)(buttonProps as Record<string, unknown>, children as ReactNode);
  }

  return <Button ref={ref} {...buttonProps}>{children}</Button>;
});
export { DrawerAction };

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.Body = DrawerBody;
Drawer.Actions = DrawerActions;
Drawer.Action = DrawerAction;

export default Drawer;
