import { Children, cloneElement, isValidElement, useCallback, useEffect, useState } from "react";
import {
  FloatingArrow,
  FloatingPortal,
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
  useTransitionStyles,
} from "@floating-ui/react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const POPOVER_PRIMITIVES = {
  wrapper: "inline-flex",
  panel: [
    "z-50 w-max max-w-[20rem] break-words rounded-[1rem] border px-3 py-2",
    "text-sm leading-6 outline-none",
  ].join(" "),
};

const POPOVER_THEME_CLASSES = {
  light: "border-slate-200 bg-white text-slate-700",
  dark: "border-zinc-800 bg-zinc-950 text-stone-200",
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

function getPlacementOrigin(placement) {
  switch (placement) {
    case "top-start":
      return "bottom left";
    case "top-end":
      return "bottom right";
    case "top":
      return "bottom center";
    case "bottom-start":
      return "top left";
    case "bottom-end":
      return "top right";
    case "bottom":
      return "top center";
    case "left-start":
      return "top right";
    case "left-end":
      return "bottom right";
    case "left":
      return "right center";
    case "right-start":
      return "top left";
    case "right-end":
      return "bottom left";
    case "right":
      return "left center";
    default:
      return "top center";
  }
}

function getClosedTransform(side) {
  switch (side) {
    case "top":
      return "translateY(4px) scale(0.98)";
    case "bottom":
      return "translateY(-4px) scale(0.98)";
    case "left":
      return "translateX(4px) scale(0.98)";
    case "right":
      return "translateX(-4px) scale(0.98)";
    default:
      return "scale(0.98)";
  }
}

function isTriggerDisabled(element) {
  return Boolean(
    element?.props?.disabled || element?.props?.["aria-disabled"] === true,
  );
}

export default function Popover({
  arrowHeight = 8,
  arrowFill,
  arrowStrokeWidth = 1,
  arrowStroke,
  arrowTipRadius = 2,
  arrowWidth = 16,
  autoCloseMs = 0,
  children,
  className = "",
  content,
  offset: offsetValue = 8,
  placement = "top",
  showArrow = true,
  trigger = "hover",
  usePortal = true,
  zIndex = 2000,
}) {
  const [open, setOpen] = useState(false);
  const [arrowElement, setArrowElement] = useState(null);
  const theme = resolveTheme(useQuickitTheme());
  const isHoverTrigger = trigger === "hover";

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    strategy: "fixed",
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      ...(showArrow ? [arrow({ element: arrowElement })] : []),
    ],
  });

  const hover = useHover(context, {
    enabled: isHoverTrigger,
    move: false,
    delay: { open: 80, close: 220 },
    handleClose: safePolygon(),
  });
  const click = useClick(context, {
    enabled: !isHoverTrigger,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: isHoverTrigger ? "tooltip" : "dialog",
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
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 120, close: 90 },
    initial: ({ side }) => ({
      opacity: 0,
      transform: getClosedTransform(side),
    }),
    open: {
      opacity: 1,
      transform: "translate(0px, 0px) scale(1)",
    },
    close: ({ side }) => ({
      opacity: 0,
      transform: getClosedTransform(side),
    }),
    common: {
      transformOrigin: getPlacementOrigin(placement),
    },
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
  }, [autoCloseMs, open]);

  const triggerElement = !isValidElement(children) ? (
    <span
      ref={referenceRef}
      className={POPOVER_PRIMITIVES.wrapper}
      {...getReferenceProps({ "data-state": open ? "open" : "closed" })}
    >
      {children}
    </span>
  ) : (
    <span
      ref={referenceRef}
      className={POPOVER_PRIMITIVES.wrapper}
      {...(isTriggerDisabled(children)
        ? { "data-state": open ? "open" : "closed" }
        : getReferenceProps({ "data-state": open ? "open" : "closed" }))}
    >
      {cloneElement(children, {
        className: cn(children.props.className),
      })}
    </span>
  );

  if (!isMounted) {
    return triggerElement;
  }

  const resolvedArrowFill =
    arrowFill ?? (theme === "dark" ? "#09090b" : "#ffffff");
  const resolvedArrowStroke =
    arrowStroke ?? (theme === "dark" ? "#27272a" : "#e2e8f0");
  const floatingNode = (
    <div
      ref={floatingRef}
      className={cn(
        POPOVER_PRIMITIVES.panel,
        POPOVER_THEME_CLASSES[theme],
        className,
      )}
      style={{
        ...floatingStyles,
        ...transitionStyles,
        zIndex,
      }}
      {...getFloatingProps({
        "data-state": open ? "open" : "closed",
      })}
    >
      {content}
      {showArrow ? (
        <FloatingArrow
          ref={setArrowElement}
          context={context}
          width={arrowWidth}
          height={arrowHeight}
          tipRadius={arrowTipRadius}
          fill={resolvedArrowFill}
          stroke={resolvedArrowStroke}
          strokeWidth={arrowStrokeWidth}
          className="pointer-events-none"
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
}
