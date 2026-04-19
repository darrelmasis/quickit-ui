import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { QUICKIT_SEMANTIC_COLORS, resolveQuickitToken } from "@/lib/tokens";

const PROGRESS_TRACK = {
  light: "bg-neutral-200",
  dark: "bg-neutral-800",
};

const PROGRESS_COLORS = {
  light: {
    neutral: "bg-neutral-900",
    slate: "bg-slate-900",
    zinc: "bg-zinc-900",
    primary: "bg-sky-600",
    brand: "bg-brand-600",
    success: "bg-emerald-600",
    danger: "bg-rose-600",
    warning: "bg-amber-500",
    info: "bg-cyan-600",
    light: "bg-neutral-300",
    dark: "bg-zinc-900",
    black: "bg-black",
  },
  dark: {
    neutral: "bg-neutral-500",
    slate: "bg-slate-500",
    zinc: "bg-zinc-500",
    primary: "bg-sky-300",
    brand: "bg-brand-300",
    success: "bg-emerald-300",
    danger: "bg-rose-300",
    warning: "bg-amber-300",
    info: "bg-cyan-300",
    light: "bg-neutral-200",
    dark: "bg-zinc-700",
    black: "bg-neutral-900",
  },
};

const PROGRESS_SIZES = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
};

const Progress = forwardRef(function Progress(
  {
    className,
    color = "primary",
    max = 100,
    min = 0,
    size = "md",
    value = 0,
    ...props
  },
  ref,
) {
  const { theme } = useQuickitControlState("progress");
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    color,
    "primary",
  );
  const resolvedSize = PROGRESS_SIZES[size] ?? PROGRESS_SIZES.md;
  const clampedValue = Number.isFinite(value)
    ? Math.min(Math.max(value, min), max)
    : min;
  const percentage =
    max > min ? ((clampedValue - min) / (max - min)) * 100 : 0;

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      className={cn(
        "relative w-full overflow-hidden rounded-full",
        resolvedSize,
        PROGRESS_TRACK[theme],
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-200",
          PROGRESS_COLORS[theme][resolvedColor] ??
            PROGRESS_COLORS[theme].primary,
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});

export default Progress;
