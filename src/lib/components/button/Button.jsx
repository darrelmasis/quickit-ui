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
  resolveActionActiveStateClasses,
  resolveActionColor,
  resolveActionRippleStyles,
  resolveActionShape,
  resolveActionSize,
  resolveActionTheme,
  resolveActionVariant,
} from "@/lib/components/_shared/action-control";
import {
  resolveRippleStyleFromElement,
  useRippleEffect,
} from "@/lib/components/_shared/use-ripple-effect";

const BUTTON_PRIMITIVES = {
  spacing: "gap-2",
  disabled:
    "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-60",
};

const BUTTON_STATE_CLASSES = {
  idle: "",
  loading: "text-current",
};

const BUTTON_VISUAL_STATE_CLASSES = {
  active: "brightness-[0.93] saturate-150 contrast-[1.06]",
  pressed: "translate-y-px scale-[0.99]",
};

function LoadingSpinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 animate-spin motion-reduce:animate-none"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        className="opacity-25"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        className="opacity-100"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const Button = forwardRef(function Button(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    active = false,
    activeMotion,
    children,
    className,
    disabled = false,
    fullWidth = false,
    loading = false,
    loadingText,
    onKeyDown,
    onPointerDown,
    pressEffect,
    pressed = false,
    ripple,
    spinner = true,
    color = "primary",
    shape = "default",
    variant = "solid",
    size = "md",
    style,
    title,
    type = "button",
    ...props
  },
  ref,
) {
  // Button junta tres políticas distintas: tema, focus ring y press effect.
  // Por eso casi toda la resolución visual ocurre antes del return.
  const resolvedTheme = resolveActionTheme(useQuickitTheme());
  const isDisabled = disabled || loading;
  const isActive = active || pressed;
  const resolvedVariant = resolveActionVariant(resolvedTheme, variant);
  const stateClass = loading
    ? BUTTON_STATE_CLASSES.loading
    : BUTTON_STATE_CLASSES.idle;
  const resolvedColor = resolveActionColor(resolvedTheme, resolvedVariant, color);
  const resolvedShape = resolveActionShape(shape);
  const resolvedSize = resolveActionSize(size);
  const focusRingEnabled = useQuickitFocusRing("button");
  const providerPressEffect = useQuickitPressEffect();
  const rippleEnabled = useQuickitRipple("button");
  const resolvedPressEffect =
    pressEffect === "ripple" || pressEffect === "transform"
      ? pressEffect
      : providerPressEffect;
  // Los icon buttons compactos se sienten más estables sin translate/scale.
  const motionAllowedByShape =
    resolvedShape !== "square" && resolvedShape !== "circle";
  const resolvedActiveMotion =
    activeMotion ??
    (resolvedPressEffect === "transform" ? motionAllowedByShape : false);
  const resolvedRipple =
    ripple ??
    (resolvedPressEffect === "ripple" ? rippleEnabled : false);
  const isSmall = size === "sm";
  const showLoadingText =
    !isSmall && resolvedShape !== "square" && resolvedShape !== "circle";
  const baseContent = children ?? loadingText;
  const loadingContent = loadingText ?? children;
  const resolvedSizeClasses =
    ACTION_CONTROL_SIZE_CLASSES[resolvedShape][resolvedSize] ??
    ACTION_CONTROL_SIZE_CLASSES[resolvedShape].md ??
    ACTION_CONTROL_SIZE_CLASSES.default.md;
  const resolvedRadiusClass = getActionControlRadius(
    resolvedShape,
    resolvedSize,
  );
  const rippleUi = resolveActionRippleStyles(
    resolvedTheme,
    resolvedVariant,
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
  const { handleKeyDown: handleRippleKeyDown, handlePointerDown: handleRipplePointerDown, rippleLayer } =
    useRippleEffect({
      duration: rippleDuration,
      enabled: resolvedRipple && !isDisabled,
      opacity: rippleOpacity,
    });

  useEffect(() => {
    if (import.meta.env.PROD) {
      return;
    }

    if (resolvedShape !== "square" && resolvedShape !== "circle") {
      return;
    }

    if (ariaLabel || ariaLabelledBy || title) {
      return;
    }

    // Los icon buttons sin texto necesitan un nombre accesible explícito.
    console.warn(
      'Quickit UI Button: buttons with shape="square" or shape="circle" should include aria-label, aria-labelledby, or title.',
    );
  }, [ariaLabel, ariaLabelledBy, resolvedShape, title]);

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-pressed={pressed || undefined}
      title={title}
      data-active={isActive || undefined}
      data-pressed={pressed || undefined}
      style={{
        "--qi-ripple-color": rippleUi.color,
        "--qi-ripple-opacity": rippleOpacity,
        ...style,
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);

        if (!event.defaultPrevented) {
          // Recalculamos el color en tiempo real para que el ripple contraste
          // con la superficie final, incluso si el botón cambia por hover/active.
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
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          ACTION_CONTROL_BASE_CLASSES,
        ),
        resolvedRipple && "qi-ripple-host isolate overflow-hidden",
        resolvedActiveMotion && ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
        BUTTON_PRIMITIVES.spacing,
        BUTTON_PRIMITIVES.disabled,
        fullWidth && "w-full",
        isActive && BUTTON_VISUAL_STATE_CLASSES.active,
        pressed && BUTTON_VISUAL_STATE_CLASSES.pressed,
        resolvedRadiusClass,
        resolvedSizeClasses,
        stateClass,
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          ACTION_CONTROL_THEME_CLASSES[resolvedTheme][resolvedVariant]?.[
            resolvedColor
          ] ?? ACTION_CONTROL_THEME_CLASSES[resolvedTheme].solid.primary,
        ),
        resolveActionActivePseudoClasses(
          resolvedTheme,
          resolvedVariant,
          resolvedColor,
        ),
        isActive &&
          resolveActionActiveStateClasses(
            resolvedTheme,
            resolvedVariant,
            resolvedColor,
          ),
        className,
      )}
      {...props}
    >
      {resolvedRipple ? rippleLayer : null}

      <span
        aria-hidden={loading || undefined}
        className={cn(
          "relative z-[1] inline-flex items-center gap-2",
          loading && "invisible",
        )}
      >
        {baseContent}
      </span>

      {loading ? (
        <span className="absolute inset-0 z-10 inline-flex items-center justify-center gap-2">
          {spinner ? <LoadingSpinner /> : null}
          {showLoadingText ? <span>{loadingContent}</span> : null}
        </span>
      ) : null}
    </button>
  );
});

export default Button;
