import { forwardRef } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { cn } from "@/lib/utils";

import { EMPTY_STATE_THEME_CLASSES } from "@/lib/theme/theme-classes";

const EMPTY_STATE_PRIMITIVES = {
  root: "flex w-full flex-col rounded-2xl border border-dashed p-6 sm:p-8",
  align: {
    center: "items-center justify-center text-center",
    start: "items-start justify-center text-left",
  },
  icon: "mb-4 flex size-12 items-center justify-center rounded-full bg-current/10 text-current",
  title: "text-lg font-semibold",
  description: "mt-1 text-sm",
  actions:
    "mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center",
};

const EmptyState = forwardRef(function EmptyState(
  {
    align = "center",
    children,
    className,
    description,
    icon,
    title,
    ...props
  },
  ref,
) {
  const { theme } = useQuickitControlState("empty-state");
  const ui = EMPTY_STATE_THEME_CLASSES[theme];
  const resolvedAlign =
    EMPTY_STATE_PRIMITIVES.align[align] ?? EMPTY_STATE_PRIMITIVES.align.center;

  return (
    <div
      ref={ref}
      className={cn(
        EMPTY_STATE_PRIMITIVES.root,
        resolvedAlign,
        ui.base,
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className={EMPTY_STATE_PRIMITIVES.icon}>
          {icon}
        </div>
      ) : null}
      {title ? (
        <h3 className={cn(EMPTY_STATE_PRIMITIVES.title, ui.title)}>{title}</h3>
      ) : null}
      {description ? (
        <p className={cn(EMPTY_STATE_PRIMITIVES.description, ui.description)}>
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
});

export const EmptyStateTitle = forwardRef(function EmptyStateTitle(
  { children, className, ...props },
  ref,
) {
  const { theme } = useQuickitControlState("empty-state");
  const ui = EMPTY_STATE_THEME_CLASSES[theme];

  return (
    <h3
      ref={ref}
      className={cn(EMPTY_STATE_PRIMITIVES.title, ui.title, className)}
      {...props}
    >
      {children}
    </h3>
  );
});

export const EmptyStateIcon = forwardRef(function EmptyStateIcon(
  { children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="empty-state-icon"
      className={cn(EMPTY_STATE_PRIMITIVES.icon, className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const EmptyStateDescription = forwardRef(function EmptyStateDescription(
  { children, className, ...props },
  ref,
) {
  const { theme } = useQuickitControlState("empty-state");
  const ui = EMPTY_STATE_THEME_CLASSES[theme];

  return (
    <p
      ref={ref}
      className={cn(EMPTY_STATE_PRIMITIVES.description, ui.description, className)}
      {...props}
    >
      {children}
    </p>
  );
});

export const EmptyStateActions = forwardRef(function EmptyStateActions(
  { children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(EMPTY_STATE_PRIMITIVES.actions, className)}
      {...props}
    >
      {children}
    </div>
  );
});

EmptyState.Title = EmptyStateTitle;
EmptyState.Icon = EmptyStateIcon;
EmptyState.Description = EmptyStateDescription;
EmptyState.Actions = EmptyStateActions;

export { EmptyState };
export default EmptyState;
