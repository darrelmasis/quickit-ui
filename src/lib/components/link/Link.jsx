import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

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
    children,
    className,
    disabled = false,
    underline = "hover",
    variant = "default",
    ...props
  },
  ref,
) {
    const theme = resolveTheme(useQuickitTheme());
    const ui = LINK_THEME_CLASSES[theme];
    const resolvedVariant = ui[variant] ? variant : "default";
    const underlineClasses = {
      always: "underline underline-offset-4",
      hover: "no-underline hover:underline hover:underline-offset-4",
      none: "no-underline",
    };

    return (
      <a
        ref={ref}
        aria-disabled={disabled || undefined}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          ui[resolvedVariant],
          underlineClasses[underline] ?? underlineClasses.hover,
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
