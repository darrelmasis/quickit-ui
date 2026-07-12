import { Children, forwardRef, isValidElement } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { SpinnerIcon } from "@/lib/assets/icons";
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

function extractTextContent(children) {
  let text = "";
  function walk(node) {
    if (typeof node === "string" || typeof node === "number") {
      text += String(node);
    } else if (Array.isArray(node)) {
      node.forEach(walk);
    } else if (isValidElement(node) && node.props?.children) {
      walk(node.props.children);
    }
  }
  walk(children);
  return text || undefined;
}

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

const ALIGN_CLASSES = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const Button = forwardRef(function Button(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    active = false,
    activeMotion,
    align = "center",
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
    color = "neutral",
    shape = "default",
    variant = "soft",
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
  const {
    theme: resolvedTheme,
    focusRing: focusRingEnabled,
    ripple: resolvedRipple,
    pressEffect: resolvedPressEffect,
  } = useQuickitControlState("button", {
    pressEffect,
    ripple,
    focusRing: props.focusRing,
    shape,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    title,
    children,
    ...props,
  });

  const isDisabled = disabled || loading;
  const isActive = active || pressed;
  const resolvedVariant = resolveActionVariant(resolvedTheme, variant);
  const stateClass = loading
    ? BUTTON_STATE_CLASSES.loading
    : BUTTON_STATE_CLASSES.idle;
  const resolvedColor = resolveActionColor(
    resolvedTheme,
    resolvedVariant,
    color,
  );
  const resolvedShape = resolveActionShape(shape);
  const resolvedSize = resolveActionSize(size);

  // Los icon buttons compactos se sienten más estables sin translate/scale.
  const motionAllowedByShape =
    resolvedShape !== "square" && resolvedShape !== "circle";
  const resolvedActiveMotion =
    activeMotion ??
    (resolvedPressEffect === "transform" ? motionAllowedByShape : false);
  const isSmall = size === "sm";
  const showLoadingText =
    !isSmall && resolvedShape !== "square" && resolvedShape !== "circle";
  const baseContent = children ?? loadingText;
  const loadingContent = loadingText ?? extractTextContent(children);
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
  const rippleEffect = useRippleEffect({
    duration: rippleDuration,
    enabled: resolvedRipple && !isDisabled,
    opacity: rippleOpacity,
  });
  const rippleHandlers = useRippleHandlers(
    rippleUi,
    { handlePointerDown: rippleEffect.handlePointerDown, handleKeyDown: rippleEffect.handleKeyDown },
    { onPointerDown, onKeyDown },
  );

  return (
    <button
      ref={ref}
      {...props}
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
      onPointerDown={rippleHandlers.onPointerDown}
      onKeyDown={rippleHandlers.onKeyDown}
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          ACTION_CONTROL_BASE_CLASSES,
        ),
        resolvedRipple && "qi-ripple-host isolate overflow-hidden",
        resolvedActiveMotion && ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
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
    >
      {resolvedRipple ? rippleEffect.rippleLayer : null}

      {loading ? (
        <span className={`relative z-[1] inline-flex items-center ${ALIGN_CLASSES[align]} gap-2 shrink-0 truncate`}>
          {spinner ? (
            <SpinnerIcon className="size-4 shrink-0 animate-spin motion-reduce:animate-none" />
          ) : null}
          {showLoadingText ? <span className="truncate">{loadingContent}</span> : null}
        </span>
      ) : (
        <span
          className={`relative z-[1] inline-flex items-center gap-2 flex-grow-1 ${ALIGN_CLASSES[align]} min-w-0 truncate`}
        >
          {baseContent}
        </span>
      )}
    </button>
  );
});

export default Button;
