import { resolveQuickitThemeMode } from "@/lib/theme/quickit-theme-context";
import { getControlRadius } from "@/lib/utils";
import {
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_BUTTON_VARIANTS,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  resolveQuickitToken,
} from "@/lib/tokens";

export const ACTION_CONTROL_BASE_CLASSES = [
  "relative inline-flex items-center justify-center border font-medium",
  "cursor-pointer transition-[background-color,border-color,color,transform,filter] duration-200",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-60",
].join(" ");

export const ACTION_CONTROL_ACTIVE_MOTION_CLASSES =
  "active:translate-y-px active:scale-[0.99] active:brightness-[0.97] active:saturate-125";

export const ACTION_CONTROL_SIZE_CLASSES = {
  default: {
    xs: "h-6 min-w-[4.5rem] px-2.5 text-sm",
    sm: "h-9 min-w-[5.5rem] px-3.5 text-sm",
    md: "h-11 min-w-[6.5rem] px-[1.125rem] text-sm",
    lg: "h-12 min-w-[7.5rem] px-5 text-base",
    xl: "h-14 min-w-[8.5rem] px-6 text-lg",
    "2xl": "h-16 min-w-[9.5rem] px-7 text-lg",
  },
  square: {
    xs: "size-7 text-sm",
    sm: "size-9 text-sm",
    md: "size-11 text-sm",
    lg: "size-12 text-base",
    xl: "size-14 text-lg",
    "2xl": "size-16 text-lg",
  },
  circle: {
    xs: "size-7 text-sm",
    sm: "size-9 text-sm",
    md: "size-11 text-sm",
    lg: "size-12 text-base",
    xl: "size-14 text-lg",
    "2xl": "size-16 text-lg",
  },
  pill: {
    xs: "h-6 min-w-[4.5rem] px-2.5 text-sm",
    sm: "h-9 min-w-[5.5rem] px-3.5 text-sm",
    md: "h-11 min-w-[6.5rem] px-[1.125rem] text-sm",
    lg: "h-12 min-w-[7.5rem] px-5 text-base",
    xl: "h-14 min-w-[8.5rem] px-6 text-lg",
    "2xl": "h-16 min-w-[9.5rem] px-7 text-lg",
  },
};

export const ACTION_CONTROL_THEME_CLASSES = {
  light: {
    solid: {
      neutral:
        "border-neutral-800 bg-neutral-800 text-white hover:border-neutral-900 hover:bg-neutral-900 focus-visible:outline-neutral-700",
      slate:
        "border-slate-700 bg-slate-700 text-white hover:border-slate-800 hover:bg-slate-800 focus-visible:outline-slate-600",
      zinc: "border-zinc-700 bg-zinc-700 text-white hover:border-zinc-800 hover:bg-zinc-800 focus-visible:outline-zinc-600",
      primary:
        "border-sky-600 bg-sky-600 text-white hover:border-sky-700 hover:bg-sky-700 focus-visible:outline-sky-600",
      brand:
        "border-brand-600 bg-brand-600 text-white hover:border-brand-700 hover:bg-brand-700 focus-visible:outline-brand-600",
      success:
        "border-emerald-600 bg-emerald-600 text-white hover:border-emerald-700 hover:bg-emerald-700 focus-visible:outline-emerald-600",
      danger:
        "border-rose-600 bg-rose-600 text-white hover:border-rose-700 hover:bg-rose-700 focus-visible:outline-rose-600",
      warning:
        "border-amber-400 bg-amber-400 text-neutral-950 hover:border-amber-500 hover:bg-amber-500 focus-visible:outline-amber-500",
      info: "border-cyan-600 bg-cyan-600 text-white hover:border-cyan-700 hover:bg-cyan-700 focus-visible:outline-cyan-600",
      light:
        "border-neutral-200 bg-neutral-100 text-neutral-950 hover:border-neutral-300 hover:bg-neutral-200 focus-visible:outline-neutral-400",
      dark: "border-zinc-900 bg-zinc-900 text-white hover:border-black hover:bg-black focus-visible:outline-zinc-800",
      black:
        "border-black bg-black text-white hover:border-black hover:bg-black focus-visible:outline-black",
    },
    outline: {
      neutral:
        "border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 hover:border-neutral-400 focus-visible:outline-neutral-500",
      slate:
        "border-slate-300 bg-transparent text-slate-800 hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-slate-500",
      zinc: "border-zinc-300 bg-transparent text-zinc-800 hover:bg-zinc-50 hover:border-zinc-400 focus-visible:outline-zinc-500",
      primary:
        "border-sky-300 bg-transparent text-sky-700 hover:bg-sky-50 hover:border-sky-400 focus-visible:outline-sky-600",
      brand:
        "border-brand-300 bg-transparent text-brand-700 hover:bg-brand-50 hover:border-brand-400 focus-visible:outline-brand-600",
      success:
        "border-emerald-300 bg-transparent text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 focus-visible:outline-emerald-600",
      danger:
        "border-rose-300 bg-transparent text-rose-700 hover:bg-rose-50 hover:border-rose-400 focus-visible:outline-rose-600",
      warning:
        "border-amber-400 bg-transparent text-amber-800 hover:bg-amber-50 hover:border-amber-500 focus-visible:outline-amber-500",
      info: "border-cyan-300 bg-transparent text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 focus-visible:outline-cyan-600",
      light:
        "border-neutral-200 bg-transparent text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 focus-visible:outline-neutral-400",
      dark: "border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 hover:border-zinc-900 focus-visible:outline-zinc-800",
      black:
        "border-black bg-transparent text-black hover:bg-zinc-100 hover:border-black focus-visible:outline-black",
    },
    ghost: {
      neutral:
        "border-transparent bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-neutral-500",
      slate:
        "border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-slate-500",
      zinc: "border-transparent bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-zinc-500",
      primary:
        "border-transparent bg-transparent text-sky-700 hover:bg-sky-50 hover:text-sky-800 focus-visible:outline-sky-700",
      brand:
        "border-transparent bg-transparent text-brand-700 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-brand-700",
      success:
        "border-transparent bg-transparent text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-emerald-600",
      danger:
        "border-transparent bg-transparent text-rose-700 hover:bg-rose-50 hover:text-rose-800 focus-visible:outline-rose-600",
      warning:
        "border-transparent bg-transparent text-amber-700 hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-amber-500",
      info: "border-transparent bg-transparent text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 focus-visible:outline-cyan-600",
      light:
        "border-transparent bg-transparent text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-neutral-400",
      dark: "border-transparent bg-transparent text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-zinc-800",
      black:
        "border-transparent bg-transparent text-neutral-900 hover:bg-zinc-100 hover:text-black focus-visible:outline-black",
    },
  },
  dark: {
    solid: {
      neutral:
        "border-neutral-700 bg-neutral-700 text-white hover:border-neutral-600 hover:bg-neutral-600 focus-visible:outline-neutral-500",
      slate:
        "border-slate-600 bg-slate-600 text-white hover:border-slate-500 hover:bg-slate-500 focus-visible:outline-slate-400",
      zinc: "border-zinc-600 bg-zinc-600 text-white hover:border-zinc-500 hover:bg-zinc-500 focus-visible:outline-zinc-400",
      primary:
        "border-sky-500 bg-sky-500 text-neutral-950 hover:border-sky-400 hover:bg-sky-400 focus-visible:outline-sky-300",
      brand:
        "border-brand-500 bg-brand-500 text-neutral-950 hover:border-brand-400 hover:bg-brand-400 focus-visible:outline-brand-300",
      success:
        "border-emerald-500 bg-emerald-500 text-neutral-950 hover:border-emerald-400 hover:bg-emerald-400 focus-visible:outline-emerald-300",
      danger:
        "border-rose-500 bg-rose-500 text-neutral-950 hover:border-rose-400 hover:bg-rose-400 focus-visible:outline-rose-300",
      warning:
        "border-amber-400 bg-amber-400 text-neutral-950 hover:border-amber-300 hover:bg-amber-300 focus-visible:outline-amber-400",
      info: "border-cyan-500 bg-cyan-500 text-neutral-950 hover:border-cyan-400 hover:bg-cyan-400 focus-visible:outline-cyan-300",
      light:
        "border-neutral-200 bg-neutral-100 text-neutral-950 hover:border-white hover:bg-white focus-visible:outline-neutral-200",
      dark: "border-zinc-800 bg-zinc-800 text-white hover:border-zinc-700 hover:bg-zinc-700 focus-visible:outline-zinc-500",
      black:
        "border-black bg-black text-white hover:border-neutral-800 hover:bg-neutral-900 focus-visible:outline-neutral-700",
    },
    outline: {
      neutral:
        "border-neutral-600 bg-transparent text-neutral-200 hover:bg-neutral-800 hover:border-neutral-500 focus-visible:outline-neutral-400",
      slate:
        "border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800 hover:border-slate-500 focus-visible:outline-slate-500",
      zinc: "border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 focus-visible:outline-zinc-500",
      primary:
        "border-sky-500/40 bg-transparent text-sky-300 hover:bg-sky-500/10 hover:border-sky-400 focus-visible:outline-sky-300",
      brand:
        "border-brand-500/40 bg-transparent text-brand-300 hover:bg-brand-500/10 hover:border-brand-400 focus-visible:outline-brand-300",
      success:
        "border-emerald-500/40 bg-transparent text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400 focus-visible:outline-emerald-300",
      danger:
        "border-rose-500/40 bg-transparent text-rose-300 hover:bg-rose-500/10 hover:border-rose-400 focus-visible:outline-rose-300",
      warning:
        "border-amber-500/40 bg-transparent text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 focus-visible:outline-amber-300",
      info: "border-cyan-500/40 bg-transparent text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 focus-visible:outline-cyan-300",
      light:
        "border-neutral-400/50 bg-transparent text-neutral-200 hover:bg-neutral-800 hover:border-neutral-300 focus-visible:outline-neutral-300",
      dark: "border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-900 hover:border-zinc-600 focus-visible:outline-zinc-400",
      black:
        "border-neutral-700 bg-transparent text-white hover:bg-neutral-900 hover:border-neutral-600 focus-visible:outline-neutral-200",
    },
    ghost: {
      neutral:
        "border-transparent bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white focus-visible:outline-neutral-400",
      slate:
        "border-transparent bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-50 focus-visible:outline-slate-500",
      zinc: "border-transparent bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 focus-visible:outline-zinc-500",
      primary:
        "border-transparent bg-transparent text-sky-300 hover:bg-sky-500/10 hover:text-sky-200 focus-visible:outline-sky-300",
      brand:
        "border-transparent bg-transparent text-brand-300 hover:bg-brand-500/10 hover:text-brand-200 focus-visible:outline-brand-300",
      success:
        "border-transparent bg-transparent text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 focus-visible:outline-emerald-300",
      danger:
        "border-transparent bg-transparent text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 focus-visible:outline-rose-300",
      warning:
        "border-transparent bg-transparent text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 focus-visible:outline-amber-300",
      info: "border-transparent bg-transparent text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 focus-visible:outline-cyan-300",
      light:
        "border-transparent bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white focus-visible:outline-neutral-300",
      dark: "border-transparent bg-transparent text-zinc-300 hover:bg-zinc-900 hover:text-white focus-visible:outline-zinc-400",
      black:
        "border-transparent bg-transparent text-white hover:bg-neutral-900 hover:text-white focus-visible:outline-neutral-200",
    },
  },
};

export const ACTION_CONTROL_ACTIVE_THEME_CLASSES = {
  light: {
    solid: {
      neutral: "border-neutral-900 bg-neutral-900 text-white",
      slate: "border-slate-800 bg-slate-800 text-white",
      zinc: "border-zinc-800 bg-zinc-800 text-white",
      primary: "border-sky-800 bg-sky-800 text-white",
      brand: "border-brand-800 bg-brand-800 text-white",
      success: "border-emerald-800 bg-emerald-800 text-white",
      danger: "border-rose-800 bg-rose-800 text-white",
      warning: "border-amber-600 bg-amber-600 text-neutral-950",
      info: "border-cyan-800 bg-cyan-800 text-white",
      light: "border-neutral-400 bg-neutral-300 text-neutral-950",
      dark: "border-black bg-black text-white",
      black: "border-black bg-black text-white",
    },
    outline: {
      neutral: "border-neutral-600 bg-neutral-300 text-neutral-950",
      slate: "border-slate-400 bg-slate-100 text-slate-950",
      zinc: "border-zinc-400 bg-zinc-100 text-zinc-950",
      primary: "border-sky-400 bg-sky-100 text-sky-900",
      brand: "border-brand-400 bg-brand-100 text-brand-900",
      success: "border-emerald-400 bg-emerald-100 text-emerald-950",
      danger: "border-rose-400 bg-rose-100 text-rose-950",
      warning: "border-amber-500 bg-amber-200 text-amber-950",
      info: "border-cyan-400 bg-cyan-100 text-cyan-950",
      light: "border-neutral-400 bg-neutral-200 text-neutral-950",
      dark: "border-black bg-zinc-200 text-black",
      black: "border-black bg-zinc-200 text-black",
    },
    ghost: {
      neutral: "bg-neutral-200 text-neutral-950",
      slate: "bg-slate-100 text-slate-950",
      zinc: "bg-zinc-100 text-zinc-950",
      primary: "bg-sky-100 text-sky-900",
      brand: "bg-brand-100 text-brand-900",
      success: "bg-emerald-100 text-emerald-950",
      danger: "bg-rose-100 text-rose-950",
      warning: "bg-amber-100 text-amber-950",
      info: "bg-cyan-100 text-cyan-950",
      light: "bg-neutral-200 text-neutral-950",
      dark: "bg-zinc-200 text-black",
      black: "bg-zinc-200 text-black",
    },
  },
  dark: {
    solid: {
      neutral: "border-neutral-900 bg-neutral-900 text-white",
      slate: "border-slate-500 bg-slate-500 text-white",
      zinc: "border-zinc-500 bg-zinc-500 text-white",
      primary: "border-sky-300 bg-sky-300 text-neutral-950",
      brand: "border-brand-300 bg-brand-300 text-neutral-950",
      success: "border-emerald-300 bg-emerald-300 text-neutral-950",
      danger: "border-rose-300 bg-rose-300 text-neutral-950",
      warning: "border-amber-200 bg-amber-200 text-neutral-950",
      info: "border-cyan-300 bg-cyan-300 text-neutral-950",
      light: "border-white bg-white text-neutral-950",
      dark: "border-zinc-600 bg-black text-white",
      black: "border-neutral-700 bg-black text-white",
    },
    outline: {
      neutral: "border-neutral-400 bg-neutral-800 text-white",
      slate: "border-slate-400 bg-slate-800 text-white",
      zinc: "border-zinc-400 bg-zinc-800 text-white",
      primary: "border-sky-400/60 bg-sky-500/20 text-sky-50",
      brand: "border-brand-400/60 bg-brand-500/20 text-brand-50",
      success: "border-emerald-400/60 bg-emerald-500/20 text-emerald-50",
      danger: "border-rose-400/60 bg-rose-500/20 text-rose-50",
      warning: "border-amber-400/60 bg-amber-500/20 text-amber-50",
      info: "border-cyan-400/60 bg-cyan-500/20 text-cyan-50",
      light: "border-neutral-300/60 bg-neutral-100/20 text-white",
      dark: "border-zinc-500 bg-black text-white",
      black: "border-neutral-500 bg-black text-white",
    },
    ghost: {
      neutral: "bg-neutral-700 text-white",
      slate: "bg-slate-700 text-white",
      zinc: "bg-zinc-700 text-white",
      primary: "bg-sky-500/20 text-sky-50",
      brand: "bg-brand-500/20 text-brand-50",
      success: "bg-emerald-500/20 text-emerald-50",
      danger: "bg-rose-500/20 text-rose-50",
      warning: "bg-amber-500/20 text-amber-50",
      info: "bg-cyan-500/20 text-cyan-50",
      light: "bg-neutral-700 text-white",
      dark: "bg-zinc-800 text-white",
      black: "bg-neutral-900 text-white",
    },
  },
};

export function resolveActionTheme(theme) {
  return resolveQuickitThemeMode(theme);
}

function prefixStateClasses(prefix, classes) {
  return classes
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => `${prefix}:${className}`)
    .join(" ");
}

export function resolveActionShape(shape) {
  return resolveQuickitToken(QUICKIT_BUTTON_SHAPES, shape, "default");
}

export function resolveActionSize(size) {
  return resolveQuickitToken(QUICKIT_CONTROL_SIZES, size, "md");
}

export function resolveActionVariant(theme, variant) {
  const resolvedTheme = resolveActionTheme(theme);
  const resolvedVariant = resolveQuickitToken(
    QUICKIT_BUTTON_VARIANTS,
    variant,
    "solid",
  );

  return ACTION_CONTROL_THEME_CLASSES[resolvedTheme][resolvedVariant]
    ? resolvedVariant
    : "solid";
}

export function resolveActionColor(
  theme,
  variant,
  color,
  fallback = "primary",
) {
  const resolvedTheme = resolveActionTheme(theme);
  const resolvedVariant = resolveActionVariant(resolvedTheme, variant);
  const resolvedFallback = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    fallback,
    "primary",
  );
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    color,
    resolvedFallback,
  );

  return ACTION_CONTROL_THEME_CLASSES[resolvedTheme][resolvedVariant][
    resolvedColor
  ]
    ? resolvedColor
    : resolvedFallback;
}

export function resolveActionActiveStateClasses(
  theme,
  variant,
  color,
  fallback = "primary",
) {
  const resolvedTheme = resolveActionTheme(theme);
  const resolvedVariant = resolveActionVariant(resolvedTheme, variant);
  const resolvedColor = resolveActionColor(
    resolvedTheme,
    resolvedVariant,
    color,
    fallback,
  );

  return (
    ACTION_CONTROL_ACTIVE_THEME_CLASSES[resolvedTheme][resolvedVariant]?.[
      resolvedColor
    ] ?? ACTION_CONTROL_ACTIVE_THEME_CLASSES[resolvedTheme].solid.primary
  );
}

export function resolveActionActivePseudoClasses(
  theme,
  variant,
  color,
  fallback = "primary",
  prefix = "active",
) {
  return prefixStateClasses(
    prefix,
    resolveActionActiveStateClasses(theme, variant, color, fallback),
  );
}

export function resolveActionRippleStyles(theme, variant, color) {
  const resolvedTheme = resolveActionTheme(theme);
  const resolvedVariant = resolveActionVariant(resolvedTheme, variant);
  const resolvedColor = resolveActionColor(
    resolvedTheme,
    resolvedVariant,
    color,
  );

  const isLightMode = resolvedTheme === "light";

  if (resolvedVariant === "solid") {
    // En modo claro, los colores que no son blancos/amarillos necesitan ripple blanco.
    if (isLightMode) {
      if (["warning", "light"].includes(resolvedColor)) {
        return { color: "rgb(15 23 42)", opacity: 0.18 };
      }
      return { color: "rgb(255 255 255)", opacity: 0.28 };
    }

    // En modo oscuro, casi todos los sólidos son oscuros ahora, excepto 'light'.
    if (resolvedColor === "light") {
      return { color: "rgb(15 23 42)", opacity: 0.22 };
    }
    return { color: "rgb(255 255 255)", opacity: 0.24 };
  }

  // Outline y Ghost suelen preferir un ripple que acompañe al texto.
  if (resolvedVariant === "outline") {
    return !isLightMode
      ? { color: "rgb(255 255 255)", opacity: 0.18 }
      : { color: "rgb(15 23 42)", opacity: 0.16 };
  }

  return !isLightMode
    ? { color: "rgb(255 255 255)", opacity: 0.14 }
    : { color: "rgb(15 23 42)", opacity: 0.12 };
}

export function getActionControlRadius(shape, size) {
  return shape === "pill" || shape === "circle"
    ? "rounded-full"
    : getControlRadius(size);
}
