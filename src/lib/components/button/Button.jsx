import { forwardRef, useEffect } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getControlRadius } from "@/lib/utils";

const BUTTON_PRIMITIVES = {
  layout: "relative inline-flex items-center justify-center border font-medium",
  interaction:
    "cursor-pointer transition-[background-color,border-color,color,transform] duration-200",
  spacing: "gap-2",
  focus:
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  disabled:
    "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-60",
};

const BUTTON_BASE_CLASSES = [
  BUTTON_PRIMITIVES.layout,
  BUTTON_PRIMITIVES.interaction,
  BUTTON_PRIMITIVES.spacing,
  BUTTON_PRIMITIVES.focus,
  BUTTON_PRIMITIVES.disabled,
].join(" ");

const BUTTON_STATE_CLASSES = {
  idle: "",
  loading: "text-current",
};

const BUTTON_VISUAL_STATE_CLASSES = {
  active: "brightness-[0.97] saturate-125",
  pressed: "translate-y-px scale-[0.99]",
};

const sizeClasses = {
  default: {
    sm: "h-9 px-3.5 text-sm",
    md: "h-11 px-[1.125rem] text-sm",
    lg: "h-12 px-5 text-base",
    xl: "h-14 px-6 text-lg",
    "2xl": "h-16 px-7 text-lg",
  },
  square: {
    sm: "size-9 text-sm",
    md: "size-11 text-sm",
    lg: "size-12 text-base",
    xl: "size-14 text-lg",
    "2xl": "size-16 text-lg",
  },
};

const colorClasses = {
  light: {
    solid: {
      neutral:
        "border-slate-700 bg-slate-700 text-white hover:border-slate-800 hover:bg-slate-800 focus-visible:outline-slate-700",
      primary:
        "border-blue-700 bg-blue-700 text-white hover:border-blue-800 hover:bg-blue-800 focus-visible:outline-blue-700",
      success:
        "border-emerald-600 bg-emerald-600 text-white hover:border-emerald-700 hover:bg-emerald-700 focus-visible:outline-emerald-600",
      danger:
        "border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 focus-visible:outline-red-600",
      warning:
        "border-amber-400 bg-amber-400 text-slate-950 hover:border-amber-500 hover:bg-amber-500 focus-visible:outline-amber-500",
      info:
        "border-sky-600 bg-sky-600 text-white hover:border-sky-700 hover:bg-sky-700 focus-visible:outline-sky-600",
      light:
        "border-slate-200 bg-slate-100 text-slate-950 hover:border-slate-300 hover:bg-slate-200 focus-visible:outline-slate-400",
      dark:
        "border-slate-950 bg-slate-950 text-white hover:border-slate-800 hover:bg-slate-800 focus-visible:outline-slate-950",
    },
    outline: {
      neutral:
        "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-slate-500",
      primary:
        "border-blue-300 bg-blue-50 text-blue-700 hover:border-blue-400 hover:bg-blue-100 focus-visible:outline-blue-700",
      success:
        "border-emerald-300 bg-emerald-50 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100 focus-visible:outline-emerald-600",
      danger:
        "border-red-300 bg-red-50 text-red-700 hover:border-red-400 hover:bg-red-100 focus-visible:outline-red-600",
      warning:
        "border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400 hover:bg-amber-100 focus-visible:outline-amber-500",
      info:
        "border-sky-300 bg-sky-50 text-sky-700 hover:border-sky-400 hover:bg-sky-100 focus-visible:outline-sky-600",
      light:
        "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-slate-400",
      dark:
        "border-slate-400 bg-slate-100 text-slate-950 hover:border-slate-500 hover:bg-slate-200 focus-visible:outline-slate-700",
    },
    ghost: {
      neutral:
        "border-transparent bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-slate-500",
      primary:
        "border-transparent bg-transparent text-blue-700 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-blue-700",
      success:
        "border-transparent bg-transparent text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-emerald-600",
      danger:
        "border-transparent bg-transparent text-red-700 hover:bg-red-50 hover:text-red-800 focus-visible:outline-red-600",
      warning:
        "border-transparent bg-transparent text-amber-700 hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-amber-500",
      info:
        "border-transparent bg-transparent text-sky-700 hover:bg-sky-50 hover:text-sky-800 focus-visible:outline-sky-600",
      light:
        "border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-slate-400",
      dark:
        "border-transparent bg-transparent text-slate-950 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-slate-700",
    },
  },
  dark: {
    solid: {
      neutral:
        "border-zinc-200 bg-zinc-200 text-zinc-950 hover:border-stone-50 hover:bg-stone-50 focus-visible:outline-stone-200",
      primary:
        "border-blue-400 bg-blue-400 text-slate-950 hover:border-blue-300 hover:bg-blue-300 focus-visible:outline-blue-300",
      success:
        "border-emerald-400 bg-emerald-400 text-slate-950 hover:border-emerald-300 hover:bg-emerald-300 focus-visible:outline-emerald-300",
      danger:
        "border-red-400 bg-red-400 text-slate-950 hover:border-red-300 hover:bg-red-300 focus-visible:outline-red-300",
      warning:
        "border-amber-400 bg-amber-400 text-slate-950 hover:border-amber-300 hover:bg-amber-300 focus-visible:outline-amber-300",
      info:
        "border-sky-400 bg-sky-400 text-slate-950 hover:border-sky-300 hover:bg-sky-300 focus-visible:outline-sky-300",
      light:
        "border-slate-200 bg-slate-200 text-slate-950 hover:border-white hover:bg-white focus-visible:outline-slate-200",
      dark:
        "border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800 focus-visible:outline-slate-300",
    },
    outline: {
      neutral:
        "border-zinc-700 bg-zinc-900 text-stone-200 hover:border-zinc-600 hover:bg-zinc-800 focus-visible:outline-zinc-500",
      primary:
        "border-blue-500/40 bg-blue-500/10 text-blue-300 hover:border-blue-400/60 hover:bg-blue-500/15 focus-visible:outline-blue-300",
      success:
        "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400/60 hover:bg-emerald-500/15 focus-visible:outline-emerald-300",
      danger:
        "border-red-500/40 bg-red-500/10 text-red-300 hover:border-red-400/60 hover:bg-red-500/15 focus-visible:outline-red-300",
      warning:
        "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:border-amber-400/60 hover:bg-amber-500/15 focus-visible:outline-amber-300",
      info:
        "border-sky-500/40 bg-sky-500/10 text-sky-300 hover:border-sky-400/60 hover:bg-sky-500/15 focus-visible:outline-sky-300",
      light:
        "border-slate-600 bg-slate-200/10 text-slate-100 hover:border-slate-500 hover:bg-slate-200/15 focus-visible:outline-slate-300",
      dark:
        "border-slate-300/70 bg-slate-800/35 text-slate-50 hover:border-slate-200 hover:bg-slate-700/45 focus-visible:outline-slate-200",
    },
    ghost: {
      neutral:
        "border-transparent bg-transparent text-stone-300 hover:bg-zinc-800 hover:text-stone-50 focus-visible:outline-zinc-500",
      primary:
        "border-transparent bg-transparent text-blue-300 hover:bg-blue-500/10 hover:text-blue-200 focus-visible:outline-blue-300",
      success:
        "border-transparent bg-transparent text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 focus-visible:outline-emerald-300",
      danger:
        "border-transparent bg-transparent text-red-300 hover:bg-red-500/10 hover:text-red-200 focus-visible:outline-red-300",
      warning:
        "border-transparent bg-transparent text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 focus-visible:outline-amber-300",
      info:
        "border-transparent bg-transparent text-sky-300 hover:bg-sky-500/10 hover:text-sky-200 focus-visible:outline-sky-300",
      light:
        "border-transparent bg-transparent text-slate-200 hover:bg-slate-800 hover:text-white focus-visible:outline-slate-300",
      dark:
        "border-transparent bg-transparent text-slate-100 hover:bg-slate-800 hover:text-white focus-visible:outline-slate-300",
    },
  },
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
  const theme = useQuickitTheme();
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  const isDisabled = disabled || loading;
  const isActive = active || pressed;
  const stateClass = loading
    ? BUTTON_STATE_CLASSES.loading
    : BUTTON_STATE_CLASSES.idle;
  const resolvedColor = colorClasses[resolvedTheme][variant]?.[color]
    ? color
    : "primary";
  const resolvedShape = shape === "square" ? "square" : "default";
  const isSmall = size === "sm";
  const showLoadingText = !isSmall && resolvedShape !== "square";
  const baseContent = children ?? loadingText;
  const loadingContent = loadingText ?? children;

  useEffect(() => {
    if (import.meta.env.PROD) {
      return;
    }

    if (resolvedShape !== "square") {
      return;
    }

    if (ariaLabel || ariaLabelledBy || title) {
      return;
    }

    console.warn(
      'Quickit UI Button: buttons with shape="square" should include aria-label, aria-labelledby, or title.',
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
        BUTTON_BASE_CLASSES,
        fullWidth && "w-full",
        isActive && BUTTON_VISUAL_STATE_CLASSES.active,
        pressed && BUTTON_VISUAL_STATE_CLASSES.pressed,
        getControlRadius(size),
        sizeClasses[resolvedShape][size] ?? sizeClasses.default.md,
        stateClass,
        colorClasses[resolvedTheme][variant]?.[resolvedColor] ??
          colorClasses[resolvedTheme].solid.primary,
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
