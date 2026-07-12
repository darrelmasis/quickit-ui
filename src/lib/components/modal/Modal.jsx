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
import { useQuickitControlState } from "@/lib/theme";
import { cn, lockAppScroll, unlockAppScroll, useMergeRefs } from "@/lib/utils";
import { QUICKIT_EASE_DEFAULT } from "@/lib/tokens";
import { TXT } from "@/lib/texts";
import { ModalContext, useModalContext } from "./modal-context";

const ANIMATION_DURATION = 220;
const OVERLAY_DURATION = 180;
let modalZIndexCounter = 50;
const modalStack = [];

function getModalTransform(isVisible) {
  if (isVisible) {
    return "translate3d(0, 0, 0) scale(1)";
  }

  return "translate3d(0, 0.875rem, 0) scale(0.985)";
}

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
    `fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity duration-[180ms] ease-[${QUICKIT_EASE_DEFAULT}]`,
  viewport:
    "fixed inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none",
  dialog: [
    "pointer-events-auto flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden",
    "rounded-[1.25rem] border transform-gpu will-change-transform",
  ].join(" "),
  header:
    "flex items-start justify-between gap-4 border-b px-5 py-4 flex-shrink-0",
  body: "flex-1 overflow-y-auto px-5 py-4",
  actions:
    "flex w-full gap-3 border-t px-5 py-4 flex-shrink-0",
};

import { MODAL_THEME_CLASSES } from "@/lib/theme/theme-classes";

export function Modal({
  children,
  closeOnEscape = true,
  defaultOpen = false,
  /** Si es `false`, el backdrop no captura clics (overlay no bloqueante). */
  blockingOverlay = true,
  maxWidth = "max-w-md",
  onBeforeClose,
  onOpenChange,
  open: controlledOpen,
  outsideClick = true,
  showCloseButton = true,
  zIndex: customZIndex,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [visible, setVisible] = useState(defaultOpen);
  const [rendered, setRendered] = useState(defaultOpen);
  const [instanceZIndex, setInstanceZIndex] = useState(customZIndex ?? 50);
  const [registeredTitleIds, setRegisteredTitleIds] = useState([]);
  const [registeredDescriptionIds, setRegisteredDescriptionIds] = useState([]);
  const previousFocusedElementRef = useRef(null);
  const triggerElementRef = useRef(null);
  const modalIdId = useId();
  const modalId = modalIdId;
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const titleId = `qi-modal-title-${modalId}`;
  const descriptionId = `qi-modal-description-${modalId}`;

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
    let exitTimeoutId = 0;

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
      exitTimeoutId = window.setTimeout(() => {
        setRendered(false);
      }, Math.max(ANIMATION_DURATION, OVERLAY_DURATION));
    });

    return () => {
      window.cancelAnimationFrame(exitFrameId);
      window.clearTimeout(exitTimeoutId);
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
    if (!rendered || !closeOnEscape) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Escape" || !isTopmostModal(modalId)) {
        return;
      }

      close();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, closeOnEscape, modalId, rendered]);

  const value = useMemo(
    () => ({
      blockingOverlay,
      close,
      closeOnEscape,
      descriptionId,
      effectiveDescriptionId: registeredDescriptionIds[0] ?? null,
      effectiveTitleId: registeredTitleIds[0] ?? null,
      hasDescription: registeredDescriptionIds.length > 0,
      hasTitle: registeredTitleIds.length > 0,
      instanceZIndex,
      isTopmost: () => isTopmostModal(modalId),
      maxWidth,
      open,
      outsideClick,
      registerDescription,
      registerTitle,
      rendered,
      setOpen,
      setTriggerElement,
      showCloseButton,
      titleId,
      visible,
    }),
    [
      blockingOverlay,
      close,
      closeOnEscape,
      descriptionId,
      instanceZIndex,
      maxWidth,
      modalId,
      open,
      outsideClick,
      registeredDescriptionIds,
      registeredTitleIds,
      registerDescription,
      registerTitle,
      rendered,
      setOpen,
      setTriggerElement,
      showCloseButton,
      titleId,
      visible,
    ],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

const ModalTrigger = forwardRef(function ModalTrigger({
  as = "button",
  asChild = false,
  children,
  className,
  disabled = false,
  ...props
}, ref) {
  const { open, setOpen, setTriggerElement } = useModalContext("ModalTrigger");

  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      throw new Error(
        "ModalTrigger con asChild requiere un único elemento React válido.",
      );
    }

    const childProps = {
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
      ref={ref}
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
});
export { ModalTrigger };

const ModalContent = forwardRef(function ModalContent({ children, className }, ref) {
  const {
    blockingOverlay,
    close,
    effectiveDescriptionId: descriptionId,
    instanceZIndex,
    isTopmost,
    maxWidth,
    outsideClick,
    rendered,
    effectiveTitleId: titleId,
    visible,
  } = useModalContext("ModalContent");
  const { theme } = useQuickitControlState("modal");
  const ui = MODAL_THEME_CLASSES[theme];
  const dialogRef = useRef(null);
  const modalMergedRef = useMergeRefs(dialogRef, ref);
  const dialogTransform = getModalTransform(visible);

  useEffect(() => {
    if (typeof window === "undefined" || !rendered) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const preferredTarget =
        dialogRef.current?.querySelector("[data-overlay-autofocus='true']") ??
        getFocusableElements(dialogRef.current).find(
          (element) => element.getAttribute("data-overlay-close") !== "true",
        ) ??
        dialogRef.current;

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
          MODAL_PRIMITIVES.overlay,
          visible ? "opacity-100" : "opacity-0",
          !blockingOverlay && "pointer-events-none",
        )}
        style={{ zIndex: instanceZIndex }}
        onClick={
          blockingOverlay && outsideClick && isTopmost() ? close : undefined
        }
      />

      <div
        className={MODAL_PRIMITIVES.viewport}
        style={{ zIndex: instanceZIndex + 1 }}
      >
        <div
          ref={modalMergedRef}
          className={cn(
            MODAL_PRIMITIVES.dialog,
            ui.dialog,
            maxWidth,
            className,
          )}
          style={{
            transform: dialogTransform,
            opacity: visible ? 1 : 0,
            transformOrigin: "center center",
            transition:
              `transform 220ms ${QUICKIT_EASE_DEFAULT}, opacity 180ms ${QUICKIT_EASE_DEFAULT}`,
          }}
          role="dialog"
          aria-modal={blockingOverlay ? "true" : undefined}
          aria-labelledby={titleId || undefined}
          aria-label={!titleId ? "Modal" : undefined}
          aria-describedby={descriptionId || undefined}
          tabIndex={-1}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === "Tab" && isTopmost()) {
              trapFocusWithin(dialogRef.current, event);
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
export { ModalContent };

export function ModalHeader({ children, className }) {
  const { close, showCloseButton } = useModalContext("ModalHeader");
  const { theme } = useQuickitControlState("modal");
  const ui = MODAL_THEME_CLASSES[theme];

  return (
    <div className={cn(MODAL_PRIMITIVES.header, ui.header, className)}>
      <div className="min-w-0 flex-1">{children}</div>
      {showCloseButton ? (
        <Button
          type="button"
          variant="ghost"
          shape="square"
          size="md"
          color="neutral"
          aria-label={TXT.CLOSE_MODAL}
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

export function ModalTitle({ centered = true, children, className, id }) {
  const { registerTitle, titleId } = useModalContext("ModalTitle");
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

export function ModalBody({ children, className, id }) {
  const { descriptionId, registerDescription } = useModalContext("ModalBody");
  const { theme } = useQuickitControlState("modal");
  const ui = MODAL_THEME_CLASSES[theme];
  const resolvedId = id ?? descriptionId;

  useLayoutEffect(() => {
    return registerDescription(resolvedId);
  }, [registerDescription, resolvedId]);

  return (
    <div id={resolvedId} className={cn(MODAL_PRIMITIVES.body, ui.muted, className)}>
      {children}
    </div>
  );
}

export function ModalActions({
  children,
  className,
  placement = "center",
}) {
  const { theme } = useQuickitControlState("modal");
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

const ModalAction = forwardRef(function ModalAction({
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
  const { close } = useModalContext("ModalAction");
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

  return <Button ref={ref} {...buttonProps}>{children}</Button>;
});
export { ModalAction };

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Actions = ModalActions;
Modal.Action = ModalAction;

export default Modal;
