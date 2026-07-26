import { Children, cloneElement, forwardRef, isValidElement, useCallback, useEffect, useId, useRef, useState } from "react";
import {
  FloatingPortal,
  FloatingArrow,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useQuickitControlState } from "@/lib/theme";
import { cn, useMergeRefs } from "@/lib/utils";
import { trapFocusWithin } from "@/lib/components/_shared/overlay-focus";
import { useFloatingTransition } from "@/lib/components/_shared/floating-list";

const POPOVER_PRIMITIVES = {
  wrapper: "inline-flex",
  panel: [
    "z-[9999] w-max max-w-[20rem] break-words rounded-[var(--qk-radius-xl)] border px-3 py-2",
    "text-sm leading-6 outline-none",
  ].join(" "),
};

const TOOLTIP_BASE_CLASSES =
  "!max-w-[16rem] !rounded-[var(--qk-radius-lg)] !px-2.5 !py-1.5 !text-xs !leading-5";

import { POPOVER_THEME_CLASSES } from "@/lib/theme/theme-classes";

const HOVER_DELAY_PRESETS = {
  fast: { open: 40, close: 120 },
  normal: { open: 80, close: 220 },
  slow: { open: 150, close: 350 },
};

function isTriggerDisabled(element) {
  return Boolean(
    element?.props?.disabled || element?.props?.["aria-disabled"] === true,
  );
}

const Popover = forwardRef(function Popover({
  asChild = false,
  arrowHeight = 8,
  arrowFill,
  arrowStrokeWidth = 0.75,
  arrowStroke,
  arrowTipRadius = 2,
  arrowWidth = 16,
  autoCloseMs = 0,
  children,
  className = "",
  color = "default",
  content,
  disableFlip = false,
  offset: offsetValue = 8,
  hoverDelayPreset = "normal",
  interactive = false,
  open: controlledOpen,
  onOpenChange,
  placement = "top",
  showArrow = true,
  trigger = "hover",
  usePortal = true,
  variant = "popover",
  zIndex = 2000,
}, forwardedRef) {
  const isTooltip = variant === "tooltip";
  const effectiveTrigger = isTooltip ? "hover" : trigger;
  const effectiveInteractive = isTooltip ? false : interactive;
  const effectiveShowArrow = isTooltip ? true : showArrow;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpenControlled = controlledOpen !== undefined;
  const open = isOpenControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = useCallback((nextOpen) => {
    if (!isOpenControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  }, [isOpenControlled, onOpenChange]);
  const panelRef = useRef(null);
  const [arrowElement, setArrowElement] = useState(null);
  const panelId = useId();
  const tooltipTriggerProps = isTooltip ? { "aria-describedby": panelId } : {};
  const { theme: effectiveTheme } = useQuickitControlState("popover");
  const resolvedColor = POPOVER_THEME_CLASSES[effectiveTheme][color] ? color : "default";
  const palette = POPOVER_THEME_CLASSES[effectiveTheme][resolvedColor];
  const isHoverTrigger = effectiveTrigger === "hover";
  const hoverDelay =
    HOVER_DELAY_PRESETS[hoverDelayPreset] ?? HOVER_DELAY_PRESETS.normal;

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    strategy: "fixed",
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      ...(disableFlip ? [] : [flip({ padding: 8 })]),
      shift({ padding: 8 }),
      ...(effectiveShowArrow ? [arrow({ element: arrowElement })] : []),
    ],
  });

  const hover = useHover(context, {
    enabled: isHoverTrigger,
    move: false,
    delay: hoverDelay,
    handleClose: safePolygon(),
  });
  const click = useClick(context, {
    enabled: !isHoverTrigger && effectiveTrigger !== "manual",
  });
  const focus = useFocus(context, {
    enabled: effectiveTrigger !== "manual",
  });
  const dismiss = useDismiss(context, {
    enabled: effectiveTrigger !== "manual",
  });
  const role = useRole(context, {
    role: isHoverTrigger && !effectiveInteractive ? "tooltip" : effectiveInteractive ? "dialog" : undefined,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    focus,
    dismiss,
    role,
  ]);
  const referenceRef = useCallback(
    (node) => {
      refs.setReference(node);
    },
    [refs],
  );
  const floatingRef = useCallback(
    (node) => {
      refs.setFloating(node);
    },
    [refs],
  );
  const { isMounted, styles: transitionStyles } = useFloatingTransition(context, {
    duration: { open: 120, close: 90 },
    placement,
  });

  useEffect(() => {
    if (!open || !(autoCloseMs > 0)) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setOpen(false);
    }, autoCloseMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [autoCloseMs, open, setOpen]);

  useEffect(() => {
    if (!open || !effectiveInteractive) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const focusTarget =
        panelRef.current?.querySelector("[data-overlay-autofocus='true']") ??
        panelRef.current;

      focusTarget?.focus?.();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [effectiveInteractive, open]);

  const triggerRef = useMergeRefs(referenceRef, forwardedRef);
  const mergedChildRef = useMergeRefs(
    isValidElement(children) ? children.ref : null,
    triggerRef,
  );

  const triggerElement = !isValidElement(children) ? (
    <span
      ref={triggerRef}
      className={POPOVER_PRIMITIVES.wrapper}
      {...getReferenceProps({ "data-state": open ? "open" : "closed", ...tooltipTriggerProps })}
    >
      {children}
    </span>
  ) : asChild ? (
    cloneElement(children, {
      ...(isTriggerDisabled(children)
        ? { "data-state": open ? "open" : "closed" }
        : getReferenceProps({
          ...children.props,
          "data-state": open ? "open" : "closed",
          ...tooltipTriggerProps,
        })),
      ref: mergedChildRef,
      className: cn(children.props.className, className),
    })
  ) : (
    <span
      ref={triggerRef}
      className={POPOVER_PRIMITIVES.wrapper}
      {...(isTriggerDisabled(children)
        ? { "data-state": open ? "open" : "closed" }
        : getReferenceProps({ "data-state": open ? "open" : "closed", ...tooltipTriggerProps }))}
    >
      {cloneElement(children, {
        className: cn(children.props.className, className),
      })}
    </span>
  );

  if (!isMounted) {
    return triggerElement;
  }

  const resolvedArrowFill =
    arrowFill ?? palette.arrowFill;
  const resolvedArrowStroke =
    arrowStroke ?? palette.arrowStroke;
  const floatingNode = (
    <div
      ref={(node) => {
        floatingRef(node);
        panelRef.current = node;
      }}
      className={cn(
        POPOVER_PRIMITIVES.panel,
        palette.panel,
        isTooltip && TOOLTIP_BASE_CLASSES,
        className,
      )}
      style={{
        ...floatingStyles,
        ...transitionStyles,
        zIndex,
        "--qk-arrow-fill": resolvedArrowFill,
        "--qk-arrow-stroke": resolvedArrowStroke,
      } as React.CSSProperties}
      {...getFloatingProps({
        "data-state": open ? "open" : "closed",
        id: panelId,
        ...(effectiveInteractive
          ? {
              onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === "Tab") {
                  trapFocusWithin(
                    event.currentTarget as HTMLElement,
                    event as unknown as KeyboardEvent,
                  );
                }
              },
            }
          : {}),
      } as Record<string, unknown>)}
      tabIndex={interactive ? -1 : undefined}
    >
      {content}
      {effectiveShowArrow ? (
        <FloatingArrow
          ref={setArrowElement}
          context={context}
          width={arrowWidth}
          height={arrowHeight}
          tipRadius={arrowTipRadius}
          strokeWidth={arrowStrokeWidth}
          className="qk-floating-arrow pointer-events-none"
        />
      ) : null}
    </div>
  );

  return (
    <>
      {triggerElement}
      {usePortal ? <FloatingPortal>{floatingNode}</FloatingPortal> : floatingNode}
    </>
  );
});

export default Popover;
