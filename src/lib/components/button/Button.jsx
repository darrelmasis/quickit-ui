import { forwardRef, useEffect } from "react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import {
  ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
  ACTION_CONTROL_BASE_CLASSES,
  ACTION_CONTROL_SIZE_CLASSES,
  ACTION_CONTROL_THEME_CLASSES,
  getActionControlRadius,
  resolveActionColor,
  resolveActionShape,
  resolveActionSize,
  resolveActionTheme,
  resolveActionVariant,
} from "@/lib/components/_shared/action-control";

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
  active: "brightness-[0.97] saturate-125",
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
    pressed = false,
    spinner = true,
    color = "primary",
    shape = "default",
    variant = "solid",
    size = "md",
    title,
    type = "button",
    ...props
  },
  ref,
) {
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
  const resolvedActiveMotion =
    activeMotion ??
    (resolvedShape !== "square" && resolvedShape !== "circle");
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
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          ACTION_CONTROL_BASE_CLASSES,
        ),
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
        className,
      )}
      {...props}
    >
      <span
        aria-hidden={loading || undefined}
        className={cn("inline-flex items-center gap-2", loading && "invisible")}
      >
        {baseContent}
      </span>

      {loading ? (
        <span className="absolute inset-0 inline-flex items-center justify-center gap-2">
          {spinner ? <LoadingSpinner /> : null}
          {showLoadingText ? <span>{loadingContent}</span> : null}
        </span>
      ) : null}
    </button>
  );
});

export default Button;
