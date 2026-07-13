import { resolveQuickitThemeMode } from "@/lib/theme/quickit-theme-context";
import { getControlRadius } from "@/lib/utils";
import {
  QUICKIT_BUTTON_SHAPES,
  QUICKIT_BUTTON_VARIANTS,
  QUICKIT_CONTROL_SIZES,
  QUICKIT_SEMANTIC_COLORS,
  resolveQuickitToken,
} from "@/lib/tokens";
import {
  ACTION_CONTROL_THEME_CLASSES,
  ACTION_CONTROL_ACTIVE_THEME_CLASSES,
} from "@/lib/theme/theme-classes";

export {
  ACTION_CONTROL_THEME_CLASSES,
  ACTION_CONTROL_ACTIVE_THEME_CLASSES,
};

export const ACTION_CONTROL_BASE_CLASSES = [
  "relative inline-flex shrink-0 items-center justify-center border font-medium",
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
  fallback = "neutral",
) {
  const resolvedTheme = resolveActionTheme(theme);
  const resolvedVariant = resolveActionVariant(resolvedTheme, variant);
  const resolvedFallback = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    fallback,
    "neutral",
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
  fallback = "neutral",
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
  fallback = "neutral",
  prefix = "active",
) {
  return prefixStateClasses(
    prefix,
    resolveActionActiveStateClasses(theme, variant, color, fallback),
  );
}

const RIPPLE_HUE_MAP = {
  neutral: { light: "rgb(255 255 255)", dark: "rgb(15 23 42)" },
  primary: { light: "var(--color-blue-100)", dark: "var(--color-blue-900)" },
  secondary: { light: "var(--color-purple-100)", dark: "var(--color-purple-900)" },
  success: { light: "var(--color-green-100)", dark: "var(--color-green-900)" },
  danger: { light: "var(--color-red-100)", dark: "var(--color-red-900)" },
  warning: { light: "var(--color-amber-100)", dark: "var(--color-amber-900)" },
  info: { light: "var(--color-cyan-100)", dark: "var(--color-cyan-900)" },
  light: { light: "rgb(255 255 255)", dark: "rgb(15 23 42)" },
  dark: { light: "rgb(255 255 255)", dark: "rgb(15 23 42)" },
};

export function resolveActionRippleStyles(theme, variant, color) {
  const resolvedTheme = resolveActionTheme(theme);
  const resolvedVariant = resolveActionVariant(resolvedTheme, variant);
  const resolvedColor = resolveActionColor(
    resolvedTheme,
    resolvedVariant,
    color,
  );

  const isLightMode = resolvedTheme === "light";
  const shades = RIPPLE_HUE_MAP[resolvedColor] || RIPPLE_HUE_MAP.neutral;

  if (resolvedVariant === "solid") {
    if (isLightMode) {
      // `light` sólido en light mode tiene bg white/neutral-50 → buena opacidad
      if (resolvedColor === "light") {
        return { color: shades.dark, opacity: 0.28 };
      }
      // warning tiene fondo claro (amber-500) → ripple oscuro
      if (resolvedColor === "warning") {
        return { color: shades.dark, opacity: 0.18 };
      }
      // Fondos sólidos oscuros → ripple claro del mismo tono
      return { color: shades.light, opacity: 0.28 };
    }

    // Modo oscuro
    if (resolvedColor === "light") {
      return { color: shades.dark, opacity: 0.32 };
    }
    return { color: shades.light, opacity: 0.24 };
  }

  // Outline: fondos transparentes → ripple oscuro en light, claro en dark
  if (resolvedVariant === "outline") {
    if (resolvedColor === "light") {
      return !isLightMode
        ? { color: shades.light, opacity: 0.28 }
        : { color: shades.dark, opacity: 0.28 };
    }
    return !isLightMode
      ? { color: shades.light, opacity: 0.18 }
      : { color: shades.dark, opacity: 0.16 };
  }

  // Los colores neutros (light/neutral/dark) en soft/ghost tienen fondos claros
  // (white/neutral-100/neutral-200 en light mode) donde el ripple oscuro al 12%
  // es imperceptible. Se necesita mayor opacidad para que sea visible,
  // especialmente porque el hover oscurece el fondo (hover:bg-neutral-300/500).
  if (resolvedColor === "light" || resolvedColor === "neutral" || resolvedColor === "dark") {
    return !isLightMode
      ? { color: shades.light, opacity: 0.28 }
      : { color: shades.dark, opacity: 0.28 };
  }

  // soft / ghost
  return !isLightMode
    ? { color: shades.light, opacity: 0.14 }
    : { color: shades.dark, opacity: 0.12 };
}

export function getActionControlRadius(shape, size) {
  return shape === "pill" || shape === "circle"
    ? "rounded-full"
    : getControlRadius(size);
}
