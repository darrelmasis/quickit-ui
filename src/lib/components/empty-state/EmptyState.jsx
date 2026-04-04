import { forwardRef } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const EMPTY_STATE_THEME_CLASSES = {
  light: {
    root: "border-slate-200 bg-slate-50 text-slate-950",
    description: "text-slate-600",
  },
  dark: {
    root: "border-zinc-800 bg-zinc-950 text-stone-50",
    description: "text-stone-300",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

const EmptyState = forwardRef(function EmptyState(
  { align = "center", children, className, ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = EMPTY_STATE_THEME_CLASSES[theme];

  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-[1.5rem] border border-dashed px-6 py-10",
        align === "center" ? "text-center" : "text-left",
        ui.root,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const EmptyStateTitle = forwardRef(function EmptyStateTitle(
  { children, className, ...props },
  ref,
) {
  return (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold tracking-[-0.02em]", className)}
      {...props}
    >
      {children}
    </h3>
  );
});

const EmptyStateDescription = forwardRef(function EmptyStateDescription(
  { children, className, ...props },
  ref,
) {
  const theme = resolveTheme(useQuickitTheme());
  const ui = EMPTY_STATE_THEME_CLASSES[theme];

  return (
    <p
      ref={ref}
      className={cn("mt-2 text-sm leading-6", ui.description, className)}
      {...props}
    >
      {children}
    </p>
  );
});

const EmptyStateActions = forwardRef(function EmptyStateActions(
  { children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("mt-5 flex flex-wrap items-center justify-center gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
});

export { EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateTitle };
export default EmptyState;
