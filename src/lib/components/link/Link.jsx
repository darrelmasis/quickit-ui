import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { LINK_TEXT_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import {
  resolveActionColor,
  resolveActionShape,
  resolveActionSize,
  resolveActionVariant,
  getActionControlRadius,
  ACTION_CONTROL_BASE_CLASSES,
  ACTION_CONTROL_SIZE_CLASSES,
  ACTION_CONTROL_THEME_CLASSES,
  ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
  resolveActionActivePseudoClasses,
  resolveActionActiveStateClasses,
  resolveActionRippleStyles,
} from "@/lib/components/_shared/action-control";
import {
  useRippleEffect,
  useRippleHandlers,
} from "@/lib/components/_shared/use-ripple-effect";

const LINK_BASE =
  "qi-link inline-flex items-center gap-1.5 font-medium transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const LINK_TEXT_VARIANT_CLASSES = {
  default: "",
  muted: "opacity-85",
  subtle: "opacity-70",
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

const LinkTextAppearance = forwardRef(function LinkTextAppearance(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    children,
    className,
    color = "neutral",
    disabled = false,
    rel,
    size = "md",
    target,
    title,
    underline = "hover",
    variant = "soft",
    ...props
  },
  ref,
) {
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("link", {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    children,
    title,
    ...props,
  });

  const ui = LINK_TEXT_THEME_CLASSES[theme];
  const resolvedColor = ui.color[color] ? color : "primary";
  const resolvedDecorationKey =
    LINK_UNDERLINE_TO_DECORATION[underline] ?? LINK_UNDERLINE_TO_DECORATION.hover;
  const resolvedDecoration = ui.decoration[resolvedDecorationKey]
    ? resolvedDecorationKey
    : "hover";
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
        resolveQuickitFocusRingClasses(focusRingEnabled, LINK_BASE),
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
});

const LinkButtonAppearance = forwardRef(function LinkButtonAppearance(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    active = false,
    activeMotion,
    children,
    className,
    color = "neutral",
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
    variant = "soft",
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
    pressEffect,
    ripple,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    children,
    shape,
    title,
    ...props,
  });

  const resolvedVariant = resolveActionVariant(theme, variant);
  const resolvedButtonColor = resolveActionColor(theme, resolvedVariant, color);
  const resolvedShape = resolveActionShape(shape);
  const resolvedSize = resolveActionSize(size);
  const resolvedRadiusClass = getActionControlRadius(resolvedShape, resolvedSize);
  const resolvedSizeClasses =
    ACTION_CONTROL_SIZE_CLASSES[resolvedShape][resolvedSize] ??
    ACTION_CONTROL_SIZE_CLASSES[resolvedShape].md ??
    ACTION_CONTROL_SIZE_CLASSES.default.md;
  const motionAllowedByShape = true;
  const resolvedActiveMotion =
    activeMotion ??
    (resolvedPressEffect === "transform" ? motionAllowedByShape : false);
  const rippleUi = resolveActionRippleStyles(theme, resolvedVariant, resolvedButtonColor);
  const rippleEffect = useRippleEffect({
    duration: 780,
    enabled: resolvedRipple && !disabled,
    opacity: rippleUi.opacity,
  });
  const rippleHandlers = useRippleHandlers(
    rippleUi,
    { handlePointerDown: rippleEffect.handlePointerDown, handleKeyDown: rippleEffect.handleKeyDown },
    { onPointerDown, onKeyDown },
  );
  const isDisabled = disabled;

  return (
    <a
      ref={ref}
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      target={target}
      rel={resolveExternalLinkRel(target, rel)}
      title={title}
      data-qi-ripple-hue={resolvedButtonColor}
      className={cn(
        resolveQuickitFocusRingClasses(focusRingEnabled, ACTION_CONTROL_BASE_CLASSES),
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
        isDisabled && "pointer-events-none opacity-50",
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
        if (isDisabled) {
          event.preventDefault();
        }
      }}
      {...(isDisabled ? { "aria-disabled": true, tabIndex: -1 } : {})}
    >
      {resolvedRipple ? rippleEffect.rippleLayer : null}
      <span className="relative z-[1] inline-flex items-center gap-2 justify-center min-w-0 truncate">
        {children}
      </span>
    </a>
  );
});

const Link = forwardRef(function Link({ appearance = "text", ...props }, ref) {
  if (appearance === "button") {
    return <LinkButtonAppearance ref={ref} {...props} />;
  }

  return <LinkTextAppearance ref={ref} {...props} />;
});

export { Link };
export default Link;
