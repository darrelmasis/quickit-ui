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
  light: {
    default: {
      panel: "border-slate-200 bg-white text-slate-700",
      arrowFill: "#ffffff",
      arrowStroke: "#e2e8f0",
    },
    neutral: {
      panel: "border-neutral-200 bg-neutral-50 text-neutral-800",
      arrowFill: "#fafafa",
      arrowStroke: "#e5e5e5",
    },
    primary: {
      panel: "border-blue-200 bg-blue-50 text-blue-900",
      arrowFill: "#eff6ff",
      arrowStroke: "#bfdbfe",
    },
    brand: {
      panel: "border-brand-200 bg-brand-50 text-brand-900",
      arrowFill: "var(--color-brand-50)",
      arrowStroke: "var(--color-brand-200)",
    },
    success: {
      panel: "border-emerald-200 bg-emerald-50 text-emerald-900",
      arrowFill: "#ecfdf5",
      arrowStroke: "#a7f3d0",
    },
    danger: {
      panel: "border-red-200 bg-red-50 text-red-900",
      arrowFill: "#fef2f2",
      arrowStroke: "#fecaca",
    },
    warning: {
      panel: "border-amber-200 bg-amber-50 text-amber-900",
      arrowFill: "#fffbeb",
      arrowStroke: "#fde68a",
    },
    info: {
      panel: "border-sky-200 bg-sky-50 text-sky-900",
      arrowFill: "#f0f9ff",
      arrowStroke: "#bae6fd",
    },
    light: {
      panel: "border-slate-200 bg-white text-slate-700",
      arrowFill: "#ffffff",
      arrowStroke: "#e2e8f0",
    },
    dark: {
      panel: "border-slate-950 bg-slate-950 text-white",
      arrowFill: "#020617",
      arrowStroke: "#020617",
    },
  },
  dark: {
    default: {
      panel: "border-zinc-800 bg-zinc-950 text-stone-200",
      arrowFill: "#09090b",
      arrowStroke: "#27272a",
    },
    neutral: {
      panel: "border-neutral-700 bg-neutral-900 text-neutral-100",
      arrowFill: "#171717",
      arrowStroke: "#404040",
    },
    primary: {
      panel: "border-blue-500/40 bg-blue-500/10 text-blue-100",
      arrowFill: "#172554",
      arrowStroke: "#3b82f6",
    },
    brand: {
      panel: "border-brand-500/40 bg-brand-500/10 text-brand-100",
      arrowFill: "var(--color-brand-950)",
      arrowStroke: "var(--color-brand-500)",
    },
    success: {
      panel: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
      arrowFill: "#022c22",
      arrowStroke: "#34d399",
    },
    danger: {
      panel: "border-red-500/40 bg-red-500/10 text-red-100",
      arrowFill: "#450a0a",
      arrowStroke: "#f87171",
    },
    warning: {
      panel: "border-amber-500/40 bg-amber-500/10 text-amber-100",
      arrowFill: "#451a03",
      arrowStroke: "#fbbf24",
    },
    info: {
      panel: "border-sky-500/40 bg-sky-500/10 text-sky-100",
      arrowFill: "#082f49",
      arrowStroke: "#38bdf8",
    },
    light: {
      panel: "border-slate-300 bg-slate-50 text-slate-900",
      arrowFill: "#f8fafc",
      arrowStroke: "#cbd5e1",
    },
    dark: {
      panel: "border-slate-700 bg-slate-900 text-white",
      arrowFill: "#0f172a",
      arrowStroke: "#334155",
    },
  },
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
  color = "default",
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
  const resolvedColor = POPOVER_THEME_CLASSES[theme][color] ? color : "default";
  const palette = POPOVER_THEME_CLASSES[theme][resolvedColor];
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
    arrowFill ?? palette.arrowFill;
  const resolvedArrowStroke =
    arrowStroke ?? palette.arrowStroke;
  const floatingNode = (
    <div
      ref={floatingRef}
      className={cn(
        POPOVER_PRIMITIVES.panel,
        palette.panel,
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
