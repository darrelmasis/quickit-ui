import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { PROGRESS_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { cn } from "@/lib/utils";
import { QUICKIT_SEMANTIC_COLORS, resolveQuickitToken } from "@/lib/tokens";

const PROGRESS_SIZES = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
};

const Progress = forwardRef(function Progress(
  {
    className,
    color = "neutral",
    max = 100,
    min = 0,
    size = "md",
    value = 0,
    valueText,
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
      aria-valuetext={valueText}
      className={cn(
        "relative w-full overflow-hidden rounded-full",
        resolvedSize,
        PROGRESS_THEME_CLASSES.track[theme],
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-200",
          PROGRESS_THEME_CLASSES.fill[theme][resolvedColor] ??
            PROGRESS_THEME_CLASSES.fill[theme].primary,
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});

export default Progress;
