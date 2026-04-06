import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn, getControlRadius } from "@/lib/utils";
import {
  QUICKIT_ACCENT_COLORS,
  QUICKIT_COMPACT_CONTROL_SIZES,
  resolveQuickitToken,
} from "@/lib/tokens";

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
      neutral: "border-slate-900 bg-slate-900 text-white",
      slate: "border-slate-800 bg-slate-800 text-white",
      zinc: "border-zinc-800 bg-zinc-800 text-white",
      primary: "border-sky-700 bg-sky-700 text-white",
      brand: "border-brand-700 bg-brand-700 text-white",
      success: "border-emerald-600 bg-emerald-600 text-white",
      danger: "border-rose-600 bg-rose-600 text-white",
      warning: "border-amber-400 bg-amber-400 text-neutral-950",
      info: "border-cyan-600 bg-cyan-600 text-white",
    },
    soft: {
      neutral: "border-slate-200 bg-slate-100 text-slate-700",
      slate: "border-slate-200 bg-slate-100 text-slate-700",
      zinc: "border-zinc-200 bg-zinc-100 text-zinc-700",
      primary: "border-sky-200 bg-sky-50 text-sky-700",
      brand: "border-brand-200 bg-brand-50 text-brand-700",
      success: "border-emerald-200 bg-emerald-50 text-emerald-700",
      danger: "border-rose-200 bg-rose-50 text-rose-700",
      warning: "border-amber-200 bg-amber-50 text-amber-700",
      info: "border-cyan-200 bg-cyan-50 text-cyan-700",
    },
    outline: {
      neutral: "border-slate-300 bg-transparent text-slate-700",
      slate: "border-slate-300 bg-transparent text-slate-700",
      zinc: "border-zinc-300 bg-transparent text-zinc-700",
      primary: "border-sky-300 bg-transparent text-sky-700",
      brand: "border-brand-300 bg-transparent text-brand-700",
      success: "border-emerald-300 bg-transparent text-emerald-700",
      danger: "border-rose-300 bg-transparent text-rose-700",
      warning: "border-amber-300 bg-transparent text-amber-700",
      info: "border-cyan-300 bg-transparent text-cyan-700",
    },
  },
  dark: {
    solid: {
      neutral: "border-zinc-100 bg-zinc-100 text-zinc-950",
      slate: "border-slate-200 bg-slate-200 text-slate-950",
      zinc: "border-zinc-200 bg-zinc-200 text-zinc-950",
      primary: "border-sky-300 bg-sky-300 text-neutral-950",
      brand: "border-brand-300 bg-brand-300 text-slate-950",
      success: "border-emerald-300 bg-emerald-300 text-slate-950",
      danger: "border-rose-300 bg-rose-300 text-neutral-950",
      warning: "border-amber-300 bg-amber-300 text-neutral-950",
      info: "border-cyan-300 bg-cyan-300 text-neutral-950",
    },
    soft: {
      neutral: "border-zinc-700 bg-zinc-950 text-zinc-200",
      slate: "border-slate-700 bg-slate-900 text-slate-200",
      zinc: "border-zinc-700 bg-zinc-900 text-zinc-200",
      primary: "border-sky-800 bg-sky-950 text-sky-200",
      brand: "border-brand-800 bg-brand-950 text-brand-200",
      success: "border-emerald-800 bg-emerald-950 text-emerald-200",
      danger: "border-rose-800 bg-rose-950 text-rose-200",
      warning: "border-amber-800 bg-amber-950 text-amber-200",
      info: "border-cyan-800 bg-cyan-950 text-cyan-200",
    },
    outline: {
      neutral: "border-zinc-700 bg-transparent text-zinc-200",
      slate: "border-slate-700 bg-transparent text-slate-200",
      zinc: "border-zinc-700 bg-transparent text-zinc-200",
      primary: "border-sky-500/50 bg-transparent text-sky-300",
      brand: "border-brand-500/50 bg-transparent text-brand-300",
      success: "border-emerald-500/50 bg-transparent text-emerald-300",
      danger: "border-rose-500/50 bg-transparent text-rose-300",
      warning: "border-amber-500/50 bg-transparent text-amber-300",
      info: "border-cyan-500/50 bg-transparent text-cyan-300",
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
  const resolvedColor = resolveQuickitToken(
    QUICKIT_ACCENT_COLORS,
    color,
    "neutral",
  );
  const resolvedSize = resolveQuickitToken(
    QUICKIT_COMPACT_CONTROL_SIZES,
    size,
    "sm",
  );

  return (
    <span
      ref={ref}
      className={cn(
        BADGE_PRIMITIVES.base,
        getControlRadius(resolvedSize),
        BADGE_SIZE_CLASSES[resolvedSize] ?? BADGE_SIZE_CLASSES.sm,
        palette[resolvedColor] ?? palette.neutral,
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
