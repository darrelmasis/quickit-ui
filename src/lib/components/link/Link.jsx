import { forwardRef, useEffect } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
  ACTION_CONTROL_BASE_CLASSES,
  ACTION_CONTROL_SIZE_CLASSES,
  ACTION_CONTROL_THEME_CLASSES,
  getActionControlRadius,
  resolveActionColor,
  resolveActionShape,
  resolveActionSize,
  resolveActionVariant,
} from "@/lib/components/_shared/action-control";

const LINK_THEME_CLASSES = {
  light: {
    default: "text-blue-700 hover:text-blue-800 focus-visible:outline-blue-300",
    muted: "text-slate-600 hover:text-slate-950 focus-visible:outline-slate-300",
    subtle: "text-slate-500 hover:text-slate-950 focus-visible:outline-slate-300",
  },
  dark: {
    default: "text-blue-300 hover:text-blue-200 focus-visible:outline-blue-300",
    muted: "text-stone-300 hover:text-stone-50 focus-visible:outline-zinc-700",
    subtle: "text-stone-400 hover:text-stone-50 focus-visible:outline-zinc-700",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const Link = forwardRef(function Link(
  {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    activeMotion = true,
    appearance = "text",
    children,
    className,
    color = "primary",
    disabled = false,
    fullWidth = false,
    onClick,
    shape = "default",
    size = "md",
    tabIndex,
    title,
    underline = "hover",
    variant = "default",
    ...props
  },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = LINK_THEME_CLASSES[theme];
  const isButtonAppearance = appearance === "button";
  const resolvedTextVariant = ui[variant] ? variant : "default";
  const resolvedButtonVariant = resolveActionVariant(theme, variant);
  const resolvedColor = resolveActionColor(theme, resolvedButtonVariant, color);
  const resolvedShape = resolveActionShape(shape);
  const resolvedSize = resolveActionSize(size);
  const underlineClasses = {
    always: "underline underline-offset-4",
    hover: "no-underline hover:underline hover:underline-offset-4",
    none: "no-underline",
  };

  useEffect(() => {
    if (import.meta.env.PROD) {
      return;
    }

    if (!isButtonAppearance || resolvedShape !== "square") {
      return;
    }

    if (ariaLabel || ariaLabelledBy || title) {
      return;
    }

    console.warn(
      'Quickit UI Link: links with appearance="button" and shape="square" should include aria-label, aria-labelledby, or title.',
    );
  }, [ariaLabel, ariaLabelledBy, isButtonAppearance, resolvedShape, title]);

  return (
    <a
      ref={ref}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onClick={
        disabled
          ? (event) => {
              event.preventDefault();
            }
          : onClick
      }
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        isButtonAppearance
          ? ACTION_CONTROL_BASE_CLASSES
          : "inline-flex items-center gap-1 text-sm font-medium outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        isButtonAppearance
          ? [
              getActionControlRadius(resolvedShape, resolvedSize),
              activeMotion && ACTION_CONTROL_ACTIVE_MOTION_CLASSES,
              ACTION_CONTROL_SIZE_CLASSES[resolvedShape][resolvedSize] ??
                ACTION_CONTROL_SIZE_CLASSES[resolvedShape].md,
              ACTION_CONTROL_THEME_CLASSES[theme][resolvedButtonVariant]?.[resolvedColor] ??
                ACTION_CONTROL_THEME_CLASSES[theme].solid.primary,
              fullWidth && "w-full",
            ]
          : [
              ui[resolvedTextVariant],
              underlineClasses[underline] ?? underlineClasses.hover,
            ],
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
});

export { Link };
export default Link;
