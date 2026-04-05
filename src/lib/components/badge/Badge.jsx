import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getControlRadius } from "@/lib/utils";

const BADGE_PRIMITIVES = {
  base: "inline-flex items-center border font-medium",
};

const BADGE_SIZE_CLASSES = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

const BADGE_THEME_CLASSES = {
  light: {
    solid: {
      primary: "border-blue-700 bg-blue-700 text-white",
      brand: "border-brand-700 bg-brand-700 text-white",
      success: "border-emerald-600 bg-emerald-600 text-white",
      danger: "border-red-600 bg-red-600 text-white",
      warning: "border-amber-400 bg-amber-400 text-slate-950",
      info: "border-sky-600 bg-sky-600 text-white",
      neutral: "border-neutral-950 bg-neutral-950 text-white",
    },
    soft: {
      primary: "border-blue-200 bg-blue-50 text-blue-700",
      brand: "border-brand-200 bg-brand-50 text-brand-700",
      success: "border-emerald-200 bg-emerald-50 text-emerald-700",
      danger: "border-red-200 bg-red-50 text-red-700",
      warning: "border-amber-200 bg-amber-50 text-amber-700",
      info: "border-sky-200 bg-sky-50 text-sky-700",
      neutral: "border-neutral-200 bg-neutral-100 text-neutral-700",
    },
    outline: {
      primary: "border-blue-300 bg-transparent text-blue-700",
      brand: "border-brand-300 bg-transparent text-brand-700",
      success: "border-emerald-300 bg-transparent text-emerald-700",
      danger: "border-red-300 bg-transparent text-red-700",
      warning: "border-amber-300 bg-transparent text-amber-700",
      info: "border-sky-300 bg-transparent text-sky-700",
      neutral: "border-neutral-300 bg-transparent text-neutral-700",
    },
  },
  dark: {
    solid: {
      primary: "border-blue-300 bg-blue-300 text-slate-950",
      brand: "border-brand-300 bg-brand-300 text-slate-950",
      success: "border-emerald-300 bg-emerald-300 text-slate-950",
      danger: "border-red-300 bg-red-300 text-slate-950",
      warning: "border-amber-300 bg-amber-300 text-slate-950",
      info: "border-sky-300 bg-sky-300 text-slate-950",
      neutral: "border-neutral-100 bg-neutral-100 text-neutral-950",
    },
    soft: {
      primary: "border-blue-800 bg-blue-950 text-blue-200",
      brand: "border-brand-800 bg-brand-950 text-brand-200",
      success: "border-emerald-800 bg-emerald-950 text-emerald-200",
      danger: "border-red-800 bg-red-950 text-red-200",
      warning: "border-amber-800 bg-amber-950 text-amber-200",
      info: "border-sky-800 bg-sky-950 text-sky-200",
      neutral: "border-neutral-700 bg-neutral-900 text-neutral-200",
    },
    outline: {
      primary: "border-blue-500/50 bg-transparent text-blue-300",
      brand: "border-brand-500/50 bg-transparent text-brand-300",
      success: "border-emerald-500/50 bg-transparent text-emerald-300",
      danger: "border-red-500/50 bg-transparent text-red-300",
      warning: "border-amber-500/50 bg-transparent text-amber-300",
      info: "border-sky-500/50 bg-transparent text-sky-300",
      neutral: "border-neutral-700 bg-transparent text-neutral-200",
    },
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Badge = forwardRef(function Badge(
  { children, className, color = "neutral", size = "sm", variant = "soft", ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const palette = BADGE_THEME_CLASSES[theme][variant] ?? BADGE_THEME_CLASSES[theme].soft;
  const resolvedColor = palette[color] ? color : "neutral";

  return (
    <span
      ref={ref}
      className={cn(
        BADGE_PRIMITIVES.base,
        getControlRadius(size),
        BADGE_SIZE_CLASSES[size] ?? BADGE_SIZE_CLASSES.sm,
        palette[resolvedColor],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});

export { Badge };
export default Badge;
