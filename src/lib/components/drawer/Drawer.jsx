import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/lib/assets/icons";
import Button from "@/lib/components/button/Button";
import { useQuickitTheme, resolveQuickitThemeMode } from "@/lib/theme";
import { cn, lockAppScroll, unlockAppScroll } from "@/lib/utils";
import { DrawerContext, useDrawerContext } from "./drawer-context";

const ANIMATION_DURATION = 160;
let drawerIdCounter = 0;
let drawerZIndexCounter = 60;
const drawerStack = [];

const PLACEMENTS = {
  right: {
    panel: "inset-y-0 right-0 h-full",
    size: "w-full max-w-md",
    hidden: "translate-x-full",
  },
  left: {
    panel: "inset-y-0 left-0 h-full",
    size: "w-full max-w-md",
    hidden: "-translate-x-full",
  },
  bottom: {
    panel: "inset-x-0 bottom-0 w-full",
    size: "max-h-[80vh]",
    hidden: "translate-y-full",
  },
  top: {
    panel: "inset-x-0 top-0 w-full",
    size: "max-h-[80vh]",
    hidden: "-translate-y-full",
  },
};

const DRAWER_PRIMITIVES = {
  overlay:
    "fixed inset-0 bg-neutral-950/70 transition-opacity duration-[160ms] ease-out",
  viewport: "fixed inset-0 pointer-events-none",
  panel: [
    "pointer-events-auto absolute flex w-full flex-col overflow-hidden border",
    "bg-white text-neutral-950 shadow-2xl transform-gpu will-change-transform",
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

function resolveTheme(theme) {
  return resolveQuickitThemeMode(theme);
}

function getDrawerTransform(placement, isVisible) {
  if (isVisible) {
    return "translate3d(0, 0, 0)";
  }

  switch (placement) {
    case "left":
      return "translate3d(-100%, 0, 0)";
    case "right":
      return "translate3d(100%, 0, 0)";
    case "top":
      return "translate3d(0, -100%, 0)";
    case "bottom":
      return "translate3d(0, 100%, 0)";
    default:
      return "translate3d(100%, 0, 0)";
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
  defaultOpen = false,
  onBeforeClose,
  onOpenChange,
  open: controlledOpen,
  outsideClick = true,
  placement = "right",
  size,
  zIndex: customZIndex,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [visible, setVisible] = useState(defaultOpen);
  const [rendered, setRendered] = useState(defaultOpen);
  const [instanceZIndex, setInstanceZIndex] = useState(customZIndex ?? 60);
  const [drawerId] = useState(() => {
    drawerIdCounter += 1;
    return drawerIdCounter;
  });
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

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

  useEffect(() => {
    let openFrameId = 0;
    let openMidFrameId = 0;
    let openEndFrameId = 0;
    let closeFrameId = 0;
    let closeTimeoutId = 0;

    if (open) {
      openFrameId = window.requestAnimationFrame(() => {
        setRendered(true);
        setVisible(false);
        openMidFrameId = window.requestAnimationFrame(() => {
          openEndFrameId = window.requestAnimationFrame(() => {
            setVisible(true);
          });
        });
      });

      return () => {
        window.cancelAnimationFrame(openFrameId);
        window.cancelAnimationFrame(openMidFrameId);
        window.cancelAnimationFrame(openEndFrameId);
      };
    }

    closeFrameId = window.requestAnimationFrame(() => {
      setVisible(false);
      closeTimeoutId = window.setTimeout(() => {
        setRendered(false);
      }, ANIMATION_DURATION);
    });

    return () => {
      window.cancelAnimationFrame(closeFrameId);
      if (closeTimeoutId) {
        window.clearTimeout(closeTimeoutId);
      }
    };
  }, [open]);

  useEffect(() => {
    if (!rendered) {
      return undefined;
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
    if (!rendered || !outsideClick) {
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
  }, [close, drawerId, outsideClick, rendered]);

  const value = useMemo(
    () => ({
      close,
      instanceZIndex,
      open,
      outsideClick,
      placement,
      rendered,
      setOpen,
      size,
      visible,
    }),
    [
      close,
      instanceZIndex,
      open,
      outsideClick,
      placement,
      rendered,
      setOpen,
      size,
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
  const { open, setOpen } = useDrawerContext("DrawerTrigger");

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
    instanceZIndex,
    outsideClick,
    placement,
    rendered,
    size,
    visible,
  } = useDrawerContext("DrawerContent");
  const theme = resolveTheme(useQuickitTheme());
  const ui = DRAWER_THEME_CLASSES[theme];
  const resolvedPlacement = PLACEMENTS[placement] ?? PLACEMENTS.right;
  const sizeClass = size ?? resolvedPlacement.size;
  const transform = getDrawerTransform(placement, visible);

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
        onClick={outsideClick ? close : undefined}
      />

      <div className={DRAWER_PRIMITIVES.viewport} style={{ zIndex: instanceZIndex + 1 }}>
        <div
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
              "transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease",
          }}
          role="dialog"
          aria-modal="true"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}

export function DrawerHeader({ children, className }) {
  const { close, outsideClick } = useDrawerContext("DrawerHeader");
  const theme = resolveTheme(useQuickitTheme());
  const ui = DRAWER_THEME_CLASSES[theme];

  return (
    <div className={cn(DRAWER_PRIMITIVES.header, ui.header, className)}>
      <div className="min-w-0 flex-1">{children}</div>
      {outsideClick ? (
        <Button
          type="button"
          variant="ghost"
          shape="square"
          size="sm"
          color="slate"
          aria-label="Cerrar drawer"
          onClick={close}
          className="shrink-0"
        >
          <CloseIcon className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

export function DrawerTitle({ centered = false, children, className }) {
  return (
    <h2
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

export function DrawerBody({ children, className }) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = DRAWER_THEME_CLASSES[theme];

  return (
    <div className={cn(DRAWER_PRIMITIVES.body, ui.muted, className)}>
      {children}
    </div>
  );
}

export function DrawerActions({
  children,
  className,
  placement = "end",
}) {
  const theme = resolveTheme(useQuickitTheme());
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
  size = "md",
  variant = "solid",
  ...props
}) {
  const { close } = useDrawerContext("DrawerAction");

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      className={className}
      onClick={async (event) => {
        await onClick?.(event);

        if (closeOnClick) {
          close();
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.Body = DrawerBody;
Drawer.Actions = DrawerActions;
Drawer.Action = DrawerAction;

export default Drawer;
