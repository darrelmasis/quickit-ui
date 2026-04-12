import { forwardRef } from "react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { QUICKIT_SEMANTIC_COLORS, resolveQuickitToken } from "@/lib/tokens";

const RANGE_TRACK = {
  light: "bg-neutral-200",
  dark: "bg-neutral-800",
};

const RANGE_ACCENT = {
  light: {
    neutral: "accent-neutral-900",
    slate: "accent-slate-900",
    zinc: "accent-zinc-900",
    primary: "accent-sky-600",
    brand: "accent-brand-600",
    success: "accent-emerald-600",
    danger: "accent-rose-600",
    warning: "accent-amber-500",
    info: "accent-cyan-600",
    light: "accent-neutral-300",
    dark: "accent-zinc-900",
    black: "accent-black",
  },
  dark: {
    neutral: "accent-neutral-100",
    slate: "accent-slate-100",
    zinc: "accent-zinc-100",
    primary: "accent-sky-300",
    brand: "accent-brand-300",
    success: "accent-emerald-300",
    danger: "accent-rose-300",
    warning: "accent-amber-300",
    info: "accent-cyan-300",
    light: "accent-neutral-200",
    dark: "accent-zinc-700",
    black: "accent-neutral-900",
  },
};

const RANGE_SIZES = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Range = forwardRef(function Range(props, ref) {
  const { className, color = "primary", size = "md", variant: _variant, ...inputProps } =
    props;
  const theme = resolveTheme(useQuickitTheme());
  const focusRingEnabled = useQuickitFocusRing("input");
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    color,
    "primary",
  );
  const resolvedSize = RANGE_SIZES[size] ?? RANGE_SIZES.md;

  return (
    <input
      ref={ref}
      type="range"
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          "w-full appearance-none rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        ),
        resolvedSize,
        RANGE_TRACK[theme],
        RANGE_ACCENT[theme][resolvedColor] ?? RANGE_ACCENT[theme].primary,
        className,
      )}
      {...inputProps}
    />
  );
});

export default Range;
