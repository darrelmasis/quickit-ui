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
  "cursor-pointer gap-2 transition-[background-color,border-color,color,transform,filter] duration-200",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
].join(" ");

export const ACTION_CONTROL_ACTIVE_MOTION_CLASSES =
  "active:translate-y-px active:scale-[0.99] active:brightness-[0.97] active:saturate-125";

export const ACTION_CONTROL_SIZE_CLASSES = {
  default: {
    sm: "h-9 min-w-[5.5rem] px-3.5 text-sm",
    md: "h-11 min-w-[6.5rem] px-[1.125rem] text-sm",
    lg: "h-12 min-w-[7.5rem] px-5 text-base",
    xl: "h-14 min-w-[8.5rem] px-6 text-lg",
    "2xl": "h-16 min-w-[9.5rem] px-7 text-lg",
  },
  square: {
    sm: "size-9 text-sm",
    md: "size-11 text-sm",
    lg: "size-12 text-base",
    xl: "size-14 text-lg",
    "2xl": "size-16 text-lg",
  },
  circle: {
    sm: "size-9 text-sm",
    md: "size-11 text-sm",
    lg: "size-12 text-base",
    xl: "size-14 text-lg",
    "2xl": "size-16 text-lg",
  },
  pill: {
    sm: "h-9 min-w-[5.5rem] px-3.5 text-sm",
    md: "h-11 min-w-[6.5rem] px-[1.125rem] text-sm",
    lg: "h-12 min-w-[7.5rem] px-5 text-base",
    xl: "h-14 min-w-[8.5rem] px-6 text-lg",
    "2xl": "h-16 min-w-[9.5rem] px-7 text-lg",
  },
};

// Esta matriz concentra la personalidad visual de Button y Link cuando
// appearance="button", para que color/variant/theme no diverjan entre ellos.
export const ACTION_CONTROL_THEME_CLASSES = {
  light: {
    solid: {
      neutral:
        "border-neutral-800 bg-neutral-800 text-white hover:border-neutral-900 hover:bg-neutral-900 focus-visible:outline-neutral-700",
      slate:
        "border-slate-800 bg-slate-800 text-white hover:border-slate-900 hover:bg-slate-900 focus-visible:outline-slate-700",
      zinc:
        "border-zinc-800 bg-zinc-800 text-white hover:border-zinc-900 hover:bg-zinc-900 focus-visible:outline-zinc-700",
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
      info:
        "border-cyan-600 bg-cyan-600 text-white hover:border-cyan-700 hover:bg-cyan-700 focus-visible:outline-cyan-600",
      light:
        "border-neutral-200 bg-neutral-100 text-neutral-950 hover:border-neutral-300 hover:bg-neutral-200 focus-visible:outline-neutral-400",
      dark:
        "border-zinc-900 bg-zinc-900 text-white hover:border-black hover:bg-black focus-visible:outline-zinc-900",
      black:
        "border-neutral-950 bg-neutral-950 text-white hover:border-black hover:bg-black focus-visible:outline-neutral-950",
    },
    outline: {
      neutral:
        "border-neutral-400 bg-neutral-100 text-neutral-900 hover:border-neutral-500 hover:bg-neutral-200 focus-visible:outline-neutral-500",
      slate:
        "border-slate-400 bg-slate-100 text-slate-900 hover:border-slate-500 hover:bg-slate-200 focus-visible:outline-slate-500",
      zinc:
        "border-zinc-400 bg-zinc-100 text-zinc-900 hover:border-zinc-500 hover:bg-zinc-200 focus-visible:outline-zinc-500",
      primary:
        "border-sky-400 bg-sky-100 text-sky-900 hover:border-sky-500 hover:bg-sky-200 focus-visible:outline-sky-600",
      brand:
        "border-brand-400 bg-brand-100 text-brand-900 hover:border-brand-500 hover:bg-brand-200 focus-visible:outline-brand-600",
      success:
        "border-emerald-400 bg-emerald-100 text-emerald-900 hover:border-emerald-500 hover:bg-emerald-200 focus-visible:outline-emerald-600",
      danger:
        "border-rose-400 bg-rose-100 text-rose-900 hover:border-rose-500 hover:bg-rose-200 focus-visible:outline-rose-600",
      warning:
        "border-amber-400 bg-amber-100 text-amber-900 hover:border-amber-500 hover:bg-amber-200 focus-visible:outline-amber-500",
      info:
        "border-cyan-400 bg-cyan-100 text-cyan-900 hover:border-cyan-500 hover:bg-cyan-200 focus-visible:outline-cyan-600",
      light:
        "border-neutral-300 bg-neutral-100 text-neutral-900 hover:border-neutral-400 hover:bg-neutral-200 focus-visible:outline-neutral-400",
      dark:
        "border-zinc-700 bg-zinc-300 text-zinc-950 hover:border-zinc-800 hover:bg-zinc-400 focus-visible:outline-zinc-800",
      black:
        "border-neutral-600 bg-neutral-200 text-neutral-950 hover:border-neutral-700 hover:bg-neutral-300 focus-visible:outline-neutral-700",
    },
    ghost: {
      neutral:
        "border-transparent bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-neutral-500",
      slate:
        "border-transparent bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-slate-500",
      zinc:
        "border-transparent bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-zinc-500",
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
      info:
        "border-transparent bg-transparent text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 focus-visible:outline-cyan-600",
      light:
        "border-transparent bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-neutral-400",
      dark:
        "border-transparent bg-transparent text-zinc-950 hover:bg-zinc-200 hover:text-black focus-visible:outline-zinc-800",
      black:
        "border-transparent bg-transparent text-neutral-950 hover:bg-neutral-200 hover:text-black focus-visible:outline-neutral-700",
    },
  },
  dark: {
    solid: {
      neutral:
        "border-neutral-200 bg-neutral-200 text-neutral-950 hover:border-white hover:bg-white focus-visible:outline-neutral-200",
      slate:
        "border-slate-200 bg-slate-200 text-slate-950 hover:border-white hover:bg-white focus-visible:outline-slate-200",
      zinc:
        "border-zinc-200 bg-zinc-200 text-zinc-950 hover:border-zinc-100 hover:bg-zinc-100 focus-visible:outline-zinc-200",
      primary:
        "border-sky-300 bg-sky-300 text-neutral-950 hover:border-sky-200 hover:bg-sky-200 focus-visible:outline-sky-300",
      brand:
        "border-brand-300 bg-brand-300 text-neutral-950 hover:border-brand-200 hover:bg-brand-200 focus-visible:outline-brand-300",
      success:
        "border-emerald-300 bg-emerald-300 text-neutral-950 hover:border-emerald-200 hover:bg-emerald-200 focus-visible:outline-emerald-300",
      danger:
        "border-rose-300 bg-rose-300 text-neutral-950 hover:border-rose-200 hover:bg-rose-200 focus-visible:outline-rose-300",
      warning:
        "border-amber-300 bg-amber-300 text-neutral-950 hover:border-amber-200 hover:bg-amber-200 focus-visible:outline-amber-300",
      info:
        "border-cyan-300 bg-cyan-300 text-neutral-950 hover:border-cyan-200 hover:bg-cyan-200 focus-visible:outline-cyan-300",
      light:
        "border-neutral-200 bg-neutral-200 text-neutral-950 hover:border-white hover:bg-white focus-visible:outline-neutral-200",
      dark:
        "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-600 hover:bg-black focus-visible:outline-zinc-400",
      black:
        "border-neutral-700 bg-neutral-950 text-neutral-100 hover:border-neutral-600 hover:bg-black focus-visible:outline-neutral-300",
    },
    outline: {
      neutral:
        "border-neutral-500 bg-neutral-900 text-neutral-100 hover:border-neutral-400 hover:bg-neutral-800 focus-visible:outline-neutral-400",
      slate:
        "border-slate-600 bg-slate-900 text-slate-100 hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-slate-500",
      zinc:
        "border-zinc-600 bg-zinc-900 text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 focus-visible:outline-zinc-500",
      primary:
        "border-sky-500/45 bg-sky-500/12 text-sky-200 hover:border-sky-400/60 hover:bg-sky-500/18 focus-visible:outline-sky-300",
      brand:
        "border-brand-500/45 bg-brand-500/12 text-brand-200 hover:border-brand-400/60 hover:bg-brand-500/18 focus-visible:outline-brand-300",
      success:
        "border-emerald-500/45 bg-emerald-500/12 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-500/18 focus-visible:outline-emerald-300",
      danger:
        "border-rose-500/45 bg-rose-500/12 text-rose-200 hover:border-rose-400/60 hover:bg-rose-500/18 focus-visible:outline-rose-300",
      warning:
        "border-amber-500/45 bg-amber-500/12 text-amber-200 hover:border-amber-400/60 hover:bg-amber-500/18 focus-visible:outline-amber-300",
      info:
        "border-cyan-500/45 bg-cyan-500/12 text-cyan-200 hover:border-cyan-400/60 hover:bg-cyan-500/18 focus-visible:outline-cyan-300",
      light:
        "border-neutral-400/70 bg-neutral-100/10 text-neutral-100 hover:border-neutral-300/80 hover:bg-neutral-100/16 focus-visible:outline-neutral-300",
      dark:
        "border-zinc-500 bg-zinc-950 text-zinc-100 hover:border-zinc-400 hover:bg-zinc-900 focus-visible:outline-zinc-400",
      black:
        "border-neutral-600 bg-black text-white hover:border-neutral-500 hover:bg-neutral-950 focus-visible:outline-neutral-200",
    },
    ghost: {
      neutral:
        "border-transparent bg-transparent text-neutral-300 hover:bg-neutral-900 hover:text-white focus-visible:outline-neutral-400",
      slate:
        "border-transparent bg-transparent text-slate-300 hover:bg-slate-800 hover:text-slate-50 focus-visible:outline-slate-500",
      zinc:
        "border-transparent bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 focus-visible:outline-zinc-500",
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
      info:
        "border-transparent bg-transparent text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 focus-visible:outline-cyan-300",
      light:
        "border-transparent bg-transparent text-neutral-200 hover:bg-neutral-800 hover:text-white focus-visible:outline-neutral-300",
      dark:
        "border-transparent bg-transparent text-zinc-100 hover:bg-zinc-950 hover:text-white focus-visible:outline-zinc-400",
      black:
        "border-transparent bg-transparent text-neutral-100 hover:bg-neutral-950 hover:text-white focus-visible:outline-neutral-300",
    },
  },
};

// El estado active reutiliza la misma semántica cromática, pero con un paso más
// de contraste para que el press sea visible incluso cuando activeMotion está apagado.
export const ACTION_CONTROL_ACTIVE_THEME_CLASSES = {
  light: {
    solid: {
      neutral: "border-neutral-950 bg-neutral-950 text-white",
      slate: "border-black bg-black text-white",
      zinc: "border-black bg-black text-white",
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
      slate: "border-slate-600 bg-slate-300 text-slate-950",
      zinc: "border-zinc-600 bg-zinc-300 text-zinc-950",
      primary: "border-sky-600 bg-sky-300 text-sky-950",
      brand: "border-brand-600 bg-brand-300 text-brand-950",
      success: "border-emerald-600 bg-emerald-300 text-emerald-950",
      danger: "border-rose-600 bg-rose-300 text-rose-950",
      warning: "border-amber-600 bg-amber-300 text-amber-950",
      info: "border-cyan-600 bg-cyan-300 text-cyan-950",
      light: "border-neutral-600 bg-neutral-300 text-neutral-950",
      dark: "border-zinc-800 bg-zinc-500 text-black",
      black: "border-neutral-800 bg-neutral-400 text-neutral-950",
    },
    ghost: {
      neutral: "bg-neutral-300 text-neutral-950",
      slate: "bg-slate-300 text-slate-950",
      zinc: "bg-zinc-300 text-zinc-950",
      primary: "bg-sky-200 text-sky-950",
      brand: "bg-brand-200 text-brand-950",
      success: "bg-emerald-200 text-emerald-950",
      danger: "bg-rose-200 text-rose-950",
      warning: "bg-amber-200 text-amber-950",
      info: "bg-cyan-200 text-cyan-950",
      light: "bg-neutral-300 text-neutral-950",
      dark: "bg-zinc-400 text-black",
      black: "bg-neutral-300 text-neutral-950",
    },
  },
  dark: {
    solid: {
      neutral: "border-neutral-50 bg-neutral-50 text-neutral-950",
      slate: "border-white bg-white text-black",
      zinc: "border-white bg-white text-black",
      primary: "border-sky-100 bg-sky-100 text-neutral-950",
      brand: "border-brand-100 bg-brand-100 text-neutral-950",
      success: "border-emerald-100 bg-emerald-100 text-neutral-950",
      danger: "border-rose-100 bg-rose-100 text-neutral-950",
      warning: "border-amber-100 bg-amber-100 text-neutral-950",
      info: "border-cyan-100 bg-cyan-100 text-neutral-950",
      light: "border-white bg-white text-neutral-950",
      dark: "border-zinc-600 bg-black text-white",
      black: "border-neutral-500 bg-black text-white",
    },
    outline: {
      neutral: "border-neutral-400 bg-neutral-700 text-white",
      slate: "border-slate-400 bg-slate-700 text-white",
      zinc: "border-zinc-400 bg-zinc-700 text-white",
      primary: "border-sky-400/70 bg-sky-500/24 text-sky-50",
      brand: "border-brand-400/70 bg-brand-500/24 text-brand-50",
      success: "border-emerald-400/70 bg-emerald-500/24 text-emerald-50",
      danger: "border-rose-400/70 bg-rose-500/24 text-rose-50",
      warning: "border-amber-400/70 bg-amber-500/24 text-amber-50",
      info: "border-cyan-400/70 bg-cyan-500/24 text-cyan-50",
      light: "border-neutral-300/80 bg-neutral-100/22 text-white",
      dark: "border-zinc-400 bg-zinc-900 text-white",
      black: "border-neutral-400 bg-neutral-900 text-white",
    },
    ghost: {
      neutral: "bg-neutral-700 text-white",
      slate: "bg-slate-600 text-white",
      zinc: "bg-zinc-600 text-white",
      primary: "bg-sky-500/30 text-sky-50",
      brand: "bg-brand-500/30 text-brand-50",
      success: "bg-emerald-500/30 text-emerald-50",
      danger: "bg-rose-500/30 text-rose-50",
      warning: "bg-amber-500/30 text-amber-50",
      info: "bg-cyan-500/30 text-cyan-50",
      light: "bg-neutral-600 text-white",
      dark: "bg-zinc-900 text-white",
      black: "bg-neutral-800 text-white",
    },
  },
};

export function resolveActionTheme(theme) {
  return theme === "dark" ? "dark" : "light";
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

export function resolveActionColor(theme, variant, color, fallback = "primary") {
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

  return ACTION_CONTROL_THEME_CLASSES[resolvedTheme][resolvedVariant][resolvedColor]
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

  if (resolvedVariant === "solid") {
    if (resolvedTheme === "light") {
      if (["warning", "light"].includes(resolvedColor)) {
        return {
          color: "rgb(15 23 42)",
          opacity: 0.18,
        };
      }

      return {
        color: "rgb(255 255 255)",
        opacity: 0.28,
      };
    }

    if (["dark", "black"].includes(resolvedColor)) {
      return {
        color: "rgb(255 255 255)",
        opacity: 0.24,
      };
    }

    return {
      color: "rgb(15 23 42)",
      opacity: 0.22,
    };
  }

  if (resolvedVariant === "outline") {
    return resolvedTheme === "dark"
      ? {
          color: "rgb(255 255 255)",
          opacity: 0.18,
        }
      : {
          color: "rgb(15 23 42)",
          opacity: 0.16,
        };
  }

  return resolvedTheme === "dark"
    ? {
        color: "rgb(255 255 255)",
        opacity: 0.14,
      }
    : {
        color: "rgb(15 23 42)",
        opacity: 0.12,
      };
}

export function getActionControlRadius(shape, size) {
  return shape === "pill" || shape === "circle"
    ? "rounded-full"
    : getControlRadius(size);
}
