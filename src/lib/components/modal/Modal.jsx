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
import { ModalContext, useModalContext } from "./modal-context";

const ANIMATION_DURATION = 140;
let modalIdCounter = 0;
let modalZIndexCounter = 50;
const modalStack = [];

function addModalToStack(id) {
  if (!modalStack.includes(id)) {
    modalStack.push(id);
  }
}

function removeModalFromStack(id) {
  const index = modalStack.indexOf(id);

  if (index !== -1) {
    modalStack.splice(index, 1);
  }
}

function isTopmostModal(id) {
  return modalStack.at(-1) === id;
}

function isTriggerDisabled(element) {
  return Boolean(
    element?.props?.disabled || element?.props?.["aria-disabled"] === true,
  );
}

const MODAL_PRIMITIVES = {
  overlay:
    "fixed inset-0 bg-neutral-950/70 transition-opacity duration-[140ms]",
  viewport:
    "fixed inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none",
  dialog: [
    "pointer-events-auto flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden",
    "rounded-[1.25rem] border transition-[opacity,transform] duration-[140ms] ease-out",
  ].join(" "),
  header:
    "flex items-start justify-between gap-4 border-b px-5 py-4 flex-shrink-0",
  body: "flex-1 overflow-y-auto px-5 py-4",
  actions:
    "flex w-full gap-3 border-t px-5 py-4 flex-shrink-0",
};

const MODAL_THEME_CLASSES = {
  light: {
    dialog: "border-slate-200 bg-white text-slate-950",
    muted: "text-slate-600",
    header: "border-slate-200",
    actions: "border-slate-200 bg-slate-50/70",
  },
  dark: {
    dialog: "border-zinc-800 bg-zinc-950 text-stone-50",
    muted: "text-stone-300",
    header: "border-zinc-800",
    actions: "border-zinc-800 bg-zinc-900/70",
  },
};

function resolveTheme(theme) {
  return resolveQuickitThemeMode(theme);
}

export function Modal({
  children,
  defaultOpen = false,
  maxWidth = "max-w-md",
  onBeforeClose,
  onOpenChange,
  open: controlledOpen,
  outsideClick = true,
  zIndex: customZIndex,
}) {
  // visible controla el ciclo de salida; open solo representa la intención de abrir/cerrar.
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [visible, setVisible] = useState(defaultOpen);
  const [instanceZIndex, setInstanceZIndex] = useState(customZIndex ?? 50);
  const [modalId] = useState(() => {
    modalIdCounter += 1;
    return modalIdCounter;
  });
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const rendered = open || visible;

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
    if (open) {
      const frameId = window.requestAnimationFrame(() => {
        setVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const timeoutId = window.setTimeout(() => {
      setVisible(false);
    }, ANIMATION_DURATION);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [open]);

  useEffect(() => {
    if (!rendered) {
      return undefined;
    }

    // Cada modal toma su propio z-index para que los overlays anidados respeten
    // el orden de apertura sin exigir al consumidor que lo administre.
    addModalToStack(modalId);
    lockAppScroll();
    const nextZIndex = customZIndex
      ? customZIndex
      : (() => {
          modalZIndexCounter += 10;
          return modalZIndexCounter;
        })();
    const frameId = window.requestAnimationFrame(() => {
      setInstanceZIndex(nextZIndex);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      removeModalFromStack(modalId);
      unlockAppScroll();

      if (!customZIndex && modalZIndexCounter > 50) {
        modalZIndexCounter -= 10;
      }
    };
  }, [customZIndex, modalId, rendered]);

  useEffect(() => {
    if (!rendered || !outsideClick) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Escape" || !isTopmostModal(modalId)) {
        return;
      }

      // Solo el modal superior responde a Escape.
      close();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, modalId, outsideClick, rendered]);

  const value = useMemo(
    () => ({
      close,
      instanceZIndex,
      maxWidth,
      open,
      outsideClick,
      rendered,
      setOpen,
      visible,
    }),
    [close, instanceZIndex, maxWidth, open, outsideClick, rendered, setOpen, visible],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function ModalTrigger({
  as = "button",
  asChild = false,
  children,
  className,
  disabled = false,
  ...props
}) {
  const { open, setOpen } = useModalContext("ModalTrigger");

  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      throw new Error(
        "ModalTrigger con asChild requiere un único elemento React válido.",
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

export function ModalContent({ children, className }) {
  const {
    close,
    instanceZIndex,
    maxWidth,
    outsideClick,
    rendered,
    visible,
  } = useModalContext("ModalContent");
  const theme = resolveTheme(useQuickitTheme());
  const ui = MODAL_THEME_CLASSES[theme];

  if (typeof window === "undefined" || !rendered) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={cn(
          MODAL_PRIMITIVES.overlay,
          visible ? "opacity-100" : "opacity-0",
        )}
        style={{ zIndex: instanceZIndex }}
        onClick={outsideClick ? close : undefined}
      />

      <div className={MODAL_PRIMITIVES.viewport} style={{ zIndex: instanceZIndex + 1 }}>
        <div
          className={cn(
            MODAL_PRIMITIVES.dialog,
            ui.dialog,
            maxWidth,
            "translate-y-0 scale-100 opacity-100",
            !visible && "translate-y-2 scale-[0.995] opacity-0",
            className,
          )}
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

export function ModalHeader({ children, className }) {
  const { close, outsideClick } = useModalContext("ModalHeader");
  const theme = resolveTheme(useQuickitTheme());
  const ui = MODAL_THEME_CLASSES[theme];

  return (
    <div className={cn(MODAL_PRIMITIVES.header, ui.header, className)}>
      <div className="min-w-0 flex-1">{children}</div>
      {outsideClick ? (
        <Button
          type="button"
          variant="ghost"
          shape="square"
          size="md"
          color="slate"
          aria-label="Cerrar modal"
          onClick={close}
          className="shrink-0"
        >
          <CloseIcon className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

export function ModalTitle({ centered = true, children, className }) {
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

export function ModalBody({ children, className }) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = MODAL_THEME_CLASSES[theme];

  return (
    <div className={cn(MODAL_PRIMITIVES.body, ui.muted, className)}>{children}</div>
  );
}

export function ModalActions({
  children,
  className,
  placement = "center",
}) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = MODAL_THEME_CLASSES[theme];

  return (
    <div
      className={cn(
        MODAL_PRIMITIVES.actions,
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

export function ModalAction({
  children,
  className,
  closeOnClick = true,
  color = "primary",
  onClick,
  size = "md",
  variant = "solid",
  ...props
}) {
  const { close } = useModalContext("ModalAction");

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

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Actions = ModalActions;
Modal.Action = ModalAction;

export default Modal;
