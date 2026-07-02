import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import {
  ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
  ACTION_CONTROL_BASE_CLASSES,
  ACTION_CONTROL_SIZE_CLASSES,
  ACTION_CONTROL_THEME_CLASSES,
  getActionControlRadius,
  resolveActionActivePseudoClasses,
  resolveActionActiveStateClasses,
  resolveActionColor,
  resolveActionRippleStyles,
  resolveActionShape,
  resolveActionSize,
  resolveActionVariant,
} from "@/lib/components/_shared/action-control";
import {
  useRippleEffect,
  useRippleHandlers,
} from "@/lib/components/_shared/use-ripple-effect";

const LINK_PRIMITIVES = {
  base: [
    "qi-link inline-flex items-center gap-1.5 font-medium transition-all duration-200 outline-none",
    "focus-visible:ring-4 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
};

const LINK_TEXT_VARIANT_CLASSES = {
  default: "",
  muted: "opacity-85",
  subtle: "opacity-70",
};

const LINK_THEME_CLASSES = {
  light: {
    color: {
      neutral: "text-slate-600 hover:text-slate-900 focus-visible:ring-slate-400/40",
      slate: "text-slate-600 hover:text-slate-900 focus-visible:ring-slate-400/40",
      zinc: "text-zinc-600 hover:text-zinc-900 focus-visible:ring-zinc-400/40",
      primary: "text-sky-600 hover:text-sky-700 focus-visible:ring-sky-400/40",
      brand: "text-brand-600 hover:text-brand-700 focus-visible:ring-brand-400/40",
      success: "text-emerald-600 hover:text-emerald-700 focus-visible:ring-emerald-400/40",
      danger: "text-rose-600 hover:text-rose-700 focus-visible:ring-rose-400/40",
      warning: "text-amber-600 hover:text-amber-700 focus-visible:ring-amber-400/40",
      info: "text-cyan-600 hover:text-cyan-700 focus-visible:ring-cyan-400/40",
      light: "text-slate-400 hover:text-slate-200 focus-visible:ring-slate-300/40",
      dark: "text-zinc-800 hover:text-zinc-950 focus-visible:ring-zinc-500/40",
      black: "text-black hover:text-neutral-800 focus-visible:ring-neutral-400/40",
    },
    decoration: {
      underline: "underline hover:no-underline underline-offset-4",
      none: "no-underline",
      hover: "no-underline hover:underline underline-offset-4",
    },
  },
  dark: {
    color: {
      neutral: "text-stone-300 hover:text-stone-50 focus-visible:ring-stone-500/40",
      slate: "text-slate-300 hover:text-slate-50 focus-visible:ring-slate-500/40",
      zinc: "text-zinc-300 hover:text-zinc-50 focus-visible:ring-zinc-500/40",
      primary: "text-sky-400 hover:text-sky-300 focus-visible:ring-sky-500/40",
      brand: "text-brand-400 hover:text-brand-300 focus-visible:ring-brand-500/40",
      success: "text-emerald-400 hover:text-emerald-300 focus-visible:ring-emerald-500/40",
      danger: "text-rose-400 hover:text-rose-300 focus-visible:ring-rose-500/40",
      warning: "text-amber-400 hover:text-amber-300 focus-visible:ring-amber-500/40",
      info: "text-cyan-400 hover:text-cyan-300 focus-visible:ring-cyan-500/40",
      light: "text-slate-200 hover:text-white focus-visible:ring-slate-100/40",
      dark: "text-zinc-400 hover:text-zinc-200 focus-visible:ring-zinc-600/40",
      black: "text-white hover:text-stone-200 focus-visible:ring-white/40",
    },
    decoration: {
      underline: "underline hover:no-underline underline-offset-4",
      none: "no-underline",
      hover: "no-underline hover:underline underline-offset-4",
    },
  },
};

const LINK_UNDERLINE_TO_DECORATION = {
  always: "underline",
  hover: "hover",
  none: "none",
};

const LINK_SIZE_CLASSES = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

function resolveExternalLinkRel(target, rel) {
  if (target !== "_blank") {
    return rel;
  }

  const parts = new Set(
    String(rel ?? "")
      .split(/\s+/u)
      .filter(Boolean),
  );

  parts.add("noopener");
  parts.add("noreferrer");

  return Array.from(parts).join(" ");
}

const Link = forwardRef(function Link(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    active = false,
    activeMotion,
    appearance = "text",
    children,
    className,
    color = "primary",
    disabled = false,
    fullWidth = false,
    onClick,
    onKeyDown,
    onPointerDown,
    pressEffect,
    rel,
    ripple,
    shape = "default",
    size = "md",
    style,
    target,
    title,
    underline = "hover",
    variant = "default",
    ...props
  },
  ref,
) {
  const {
    theme,
    focusRing: focusRingEnabled,
    ripple: resolvedRipple,
    pressEffect: resolvedPressEffect,
  } = useQuickitControlState("link", {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    children,
    pressEffect,
    ripple,
    shape,
    title,
    ...props,
  });
  const ui = LINK_THEME_CLASSES[theme];
  const resolvedColor = ui.color[color] ? color : "primary";
  const resolvedDecorationKey =
    LINK_UNDERLINE_TO_DECORATION[underline] ?? LINK_UNDERLINE_TO_DECORATION.hover;
  const resolvedDecoration = ui.decoration[resolvedDecorationKey]
    ? resolvedDecorationKey
    : "hover";
  const resolvedShape = resolveActionShape(shape);
  const resolvedSize = resolveActionSize(size);
  const resolvedVariant = resolveActionVariant(theme, variant);
  const resolvedButtonColor = resolveActionColor(theme, resolvedVariant, color);
  const resolvedRadiusClass = getActionControlRadius(resolvedShape, resolvedSize);
  const resolvedSizeClasses =
    ACTION_CONTROL_SIZE_CLASSES[resolvedShape][resolvedSize] ??
    ACTION_CONTROL_SIZE_CLASSES[resolvedShape].md ??
    ACTION_CONTROL_SIZE_CLASSES.default.md;
  const motionAllowedByShape =
    resolvedShape !== "square" && resolvedShape !== "circle";
  const resolvedActiveMotion =
    activeMotion ??
    (resolvedPressEffect === "transform" ? motionAllowedByShape : false);
  const rippleUi = resolveActionRippleStyles(
    theme,
    resolvedVariant,
    resolvedButtonColor,
  );
  const rippleEffect = useRippleEffect({
    duration: 780,
    enabled: appearance === "button" && resolvedRipple && !disabled,
    opacity: rippleUi.opacity,
  });
  const rippleHandlers = useRippleHandlers(
    rippleUi,
    { handlePointerDown: rippleEffect.handlePointerDown, handleKeyDown: rippleEffect.handleKeyDown },
    { onPointerDown, onKeyDown },
  );

  if (appearance !== "button") {
    const resolvedTextVariant = LINK_TEXT_VARIANT_CLASSES[variant]
      ? variant
      : "default";

    return (
      <a
        ref={ref}
        {...props}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        target={target}
        rel={resolveExternalLinkRel(target, rel)}
        title={title}
        className={cn(
          resolveQuickitFocusRingClasses(focusRingEnabled, LINK_PRIMITIVES.base),
          LINK_SIZE_CLASSES[size] ?? LINK_SIZE_CLASSES.md,
          LINK_TEXT_VARIANT_CLASSES[resolvedTextVariant],
          resolveQuickitFocusRingClasses(focusRingEnabled, ui.color[resolvedColor]),
          ui.decoration[resolvedDecoration],
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...(disabled ? { "aria-disabled": true, tabIndex: -1 } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      ref={ref}
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      target={target}
      title={title}
      rel={resolveExternalLinkRel(target, rel)}
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          ACTION_CONTROL_BASE_CLASSES,
        ),
        resolvedRipple && "qi-ripple-host isolate overflow-hidden",
        resolvedActiveMotion && ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
        fullWidth && "w-full",
        resolvedRadiusClass,
        resolvedSizeClasses,
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          ACTION_CONTROL_THEME_CLASSES[theme][resolvedVariant]?.[
            resolvedButtonColor
          ] ?? ACTION_CONTROL_THEME_CLASSES[theme].solid.primary,
        ),
        resolveActionActivePseudoClasses(theme, resolvedVariant, resolvedButtonColor),
        active &&
          resolveActionActiveStateClasses(theme, resolvedVariant, resolvedButtonColor),
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      style={{
        "--qi-ripple-color": rippleUi.color,
        "--qi-ripple-opacity": rippleUi.opacity,
        ...style,
      }}
      onPointerDown={rippleHandlers.onPointerDown}
      onKeyDown={rippleHandlers.onKeyDown}
      onClick={(event) => {
        onClick?.(event);

        if (disabled) {
          event.preventDefault();
        }
      }}
      {...(disabled ? { "aria-disabled": true, tabIndex: -1 } : {})}
    >
      {resolvedRipple ? rippleEffect.rippleLayer : null}
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
});

export { Link };
export default Link;
