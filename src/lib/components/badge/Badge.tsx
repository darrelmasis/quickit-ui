import { forwardRef } from "react";
import { useQuickitTheme, resolveQuickitThemeMode } from "@/lib/theme";
import { BADGE_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { cn, getControlRadius } from "@/lib/utils";
import {
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_COMPACT_CONTROL_SIZES,
  resolveQuickitToken,
} from "@/lib/tokens";

const BADGE_PRIMITIVES = {
  base: "inline-flex self-center items-center border font-medium",
};

const BADGE_SIZE_CLASSES = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

function resolveTheme(theme) {
  return resolveQuickitThemeMode(theme);
}

const Badge = forwardRef(function Badge(
  {
    children,
    className,
    color = "neutral",
    size = "sm",
    variant = "soft",
    ...props
  },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const palette =
    BADGE_THEME_CLASSES[theme][variant] ?? BADGE_THEME_CLASSES[theme].soft;
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
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
