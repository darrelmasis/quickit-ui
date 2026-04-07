import { forwardRef, useEffect } from "react";
import {
  useQuickitFocusRing,
  useQuickitPressEffect,
  useQuickitRipple,
  useQuickitTheme,
} from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import {
  ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
  ACTION_CONTROL_BASE_CLASSES,
  ACTION_CONTROL_SIZE_CLASSES,
  ACTION_CONTROL_THEME_CLASSES,
  getActionControlRadius,
  resolveActionActivePseudoClasses,
  resolveActionColor,
  resolveActionRippleStyles,
  resolveActionShape,
  resolveActionSize,
  resolveActionVariant,
} from "@/lib/components/_shared/action-control";
import {
  resolveRippleStyleFromElement,
  useRippleEffect,
} from "@/lib/components/_shared/use-ripple-effect";

const LINK_THEME_CLASSES = {
  light: {
    default:
      "text-blue-700 hover:text-blue-800 focus-visible:bg-blue-50/80 focus-visible:outline-blue-300 focus-visible:ring-blue-200/70",
    muted:
      "text-slate-600 hover:text-slate-950 focus-visible:bg-slate-100 focus-visible:outline-slate-300 focus-visible:ring-slate-300/80",
    subtle:
      "text-slate-500 hover:text-slate-950 focus-visible:bg-slate-100/90 focus-visible:outline-slate-300 focus-visible:ring-slate-300/80",
  },
  dark: {
    default:
      "text-blue-300 hover:text-blue-200 focus-visible:bg-blue-400/10 focus-visible:outline-blue-300 focus-visible:ring-blue-400/30",
    muted:
      "text-stone-300 hover:text-stone-50 focus-visible:bg-zinc-900 focus-visible:outline-zinc-700 focus-visible:ring-zinc-500/35",
    subtle:
      "text-stone-400 hover:text-stone-50 focus-visible:bg-zinc-900 focus-visible:outline-zinc-700 focus-visible:ring-zinc-500/35",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Link = forwardRef(function Link(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
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
    ripple,
    shape = "default",
    size = "md",
    style,
    tabIndex,
    title,
    underline = "hover",
    variant = "default",
    ...props
  },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = LINK_THEME_CLASSES[theme];
  const isButtonAppearance = appearance === "button";
  const resolvedTextVariant = ui[variant] ? variant : "default";
  const resolvedButtonVariant = resolveActionVariant(theme, variant);
  const resolvedColor = resolveActionColor(theme, resolvedButtonVariant, color);
  const resolvedShape = resolveActionShape(shape);
  const resolvedSize = resolveActionSize(size);
  const focusRingEnabled = useQuickitFocusRing("link");
  const providerPressEffect = useQuickitPressEffect();
  const rippleEnabled = useQuickitRipple("link");
  const resolvedPressEffect =
    pressEffect === "ripple" || pressEffect === "transform"
      ? pressEffect
      : providerPressEffect;
  const motionAllowedByShape =
    resolvedShape !== "square" && resolvedShape !== "circle";
  const resolvedActiveMotion =
    activeMotion ??
    (resolvedPressEffect === "transform" ? motionAllowedByShape : false);
  const resolvedRipple =
    ripple ??
    (resolvedPressEffect === "ripple" ? rippleEnabled : false);
  const underlineClasses = {
    always: "underline underline-offset-4",
    hover: "no-underline hover:underline hover:underline-offset-4",
    none: "no-underline",
  };
  const rippleUi = resolveActionRippleStyles(
    theme,
    resolvedButtonVariant,
    resolvedColor,
  );
  const rippleOpacity = rippleUi.opacity;
  const rippleDuration =
    {
      sm: 700,
      md: 780,
      lg: 860,
      xl: 940,
      "2xl": 1020,
    }[resolvedSize] ?? 780;
  const {
    handleKeyDown: handleRippleKeyDown,
    handlePointerDown: handleRipplePointerDown,
    rippleLayer,
  } = useRippleEffect({
    duration: rippleDuration,
    enabled: isButtonAppearance && resolvedRipple && !disabled,
    opacity: rippleOpacity,
  });

  useEffect(() => {
    if (import.meta.env.PROD) {
      return;
    }

    if (
      !isButtonAppearance ||
      (resolvedShape !== "square" && resolvedShape !== "circle")
    ) {
      return;
    }

    if (ariaLabel || ariaLabelledBy || title) {
      return;
    }

    console.warn(
      'Quickit UI Link: links with appearance="button" and shape="square" or shape="circle" should include aria-label, aria-labelledby, or title.',
    );
  }, [ariaLabel, ariaLabelledBy, isButtonAppearance, resolvedShape, title]);

  return (
    <a
      ref={ref}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      style={
        isButtonAppearance
          ? {
              "--qi-ripple-color": rippleUi.color,
              "--qi-ripple-opacity": rippleOpacity,
              ...style,
            }
          : style
      }
      onClick={
        disabled
          ? (event) => {
              event.preventDefault();
            }
          : onClick
      }
      onPointerDown={(event) => {
        onPointerDown?.(event);

        if (!event.defaultPrevented) {
          const runtimeRipple = resolveRippleStyleFromElement(
            event.currentTarget,
            rippleUi,
          );
          event.currentTarget.style.setProperty(
            "--qi-ripple-color",
            runtimeRipple.color,
          );
          event.currentTarget.style.setProperty(
            "--qi-ripple-opacity",
            `${runtimeRipple.opacity}`,
          );
          handleRipplePointerDown(event);
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (!event.defaultPrevented) {
          const runtimeRipple = resolveRippleStyleFromElement(
            event.currentTarget,
            rippleUi,
          );
          event.currentTarget.style.setProperty(
            "--qi-ripple-color",
            runtimeRipple.color,
          );
          event.currentTarget.style.setProperty(
            "--qi-ripple-opacity",
            `${runtimeRipple.opacity}`,
          );
          handleRippleKeyDown(event);
        }
      }}
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        isButtonAppearance
          ? resolveQuickitFocusRingClasses(
              focusRingEnabled,
              ACTION_CONTROL_BASE_CLASSES,
            )
          : resolveQuickitFocusRingClasses(
              focusRingEnabled,
              "inline-flex items-center gap-1 rounded-[0.45rem] px-1.5 py-0.5 text-sm font-medium outline-none transition-[color,background-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-4 focus-visible:ring-offset-0",
            ),
        isButtonAppearance
          ? [
              resolvedRipple && "qi-ripple-host isolate overflow-hidden",
              getActionControlRadius(resolvedShape, resolvedSize),
              resolvedActiveMotion && ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
              ACTION_CONTROL_SIZE_CLASSES[resolvedShape][resolvedSize] ??
                ACTION_CONTROL_SIZE_CLASSES[resolvedShape].md,
              resolveQuickitFocusRingClasses(
                focusRingEnabled,
                ACTION_CONTROL_THEME_CLASSES[theme][resolvedButtonVariant]?.[
                  resolvedColor
                ] ?? ACTION_CONTROL_THEME_CLASSES[theme].solid.primary,
              ),
              resolveActionActivePseudoClasses(
                theme,
                resolvedButtonVariant,
                resolvedColor,
              ),
              fullWidth && "w-full",
            ]
          : [
              resolveQuickitFocusRingClasses(
                focusRingEnabled,
                ui[resolvedTextVariant],
              ),
              underlineClasses[underline] ?? underlineClasses.hover,
            ],
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      {...props}
    >
      {isButtonAppearance && resolvedRipple ? rippleLayer : null}
      {isButtonAppearance ? (
        <span className="relative z-[1] inline-flex items-center gap-2">
          {children}
        </span>
      ) : (
        children
      )}
    </a>
  );
});

export { Link };
export default Link;
