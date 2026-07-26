import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { CloseIcon } from "@/lib/assets/icons";
import Button from "@/lib/components/button/Button";
import { useQuickitControlState } from "@/lib/theme";
import { ALERT_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { QUICKIT_SEMANTIC_COLORS, resolveQuickitToken } from "@/lib/tokens";
import { cn, getControlRadius } from "@/lib/utils";
import { useTXT } from "@/lib/i18n";

const AlertContext = createContext(null);

const ALERT_PRIMITIVES = {
  root: "relative flex w-full items-start gap-3 sm:gap-4 overflow-hidden border p-2.5 sm:p-3 transition-[background-color,border-color,color]",
  icon: "mt-0.5 flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-[var(--qk-radius-xl)] bg-current/10 ring-1 ring-current/10 [&_svg]:size-5",
  content: "flex min-w-0 flex-1 flex-col gap-1 sm:gap-1.5",
  title: "text-sm sm:text-md font-semibold leading-6 tracking-tight",
  description: "text-xs sm:text-sm leading-6 opacity-80",
  actions: "!mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1",
  dismiss: "-me-1 -mt-1",
};

function useAlertContextSlot(slot) {
  const context = useContext(AlertContext);

  useEffect(() => {
    if (!context) {
      return undefined;
    }

    if (slot === "title") {
      return context.registerTitle();
    }

    if (slot === "description") {
      return context.registerDescription();
    }

    return undefined;
  }, [context, slot]);

  return context;
}

const AlertTitle = forwardRef(function AlertTitle(
  { children, className, id, ...props },
  ref,
) {
  const context = useAlertContextSlot("title");

  return (
    <h3
      ref={ref}
      id={id ?? context?.titleId}
      className={cn(ALERT_PRIMITIVES.title, className)}
      {...props}
    >
      {children}
    </h3>
  );
});

const AlertDescription = forwardRef(function AlertDescription(
  { children, className, id, ...props },
  ref,
) {
  const context = useAlertContextSlot("description");

  return (
    <p
      ref={ref}
      id={id ?? context?.descriptionId}
      className={cn(ALERT_PRIMITIVES.description, className)}
      {...props}
    >
      {children}
    </p>
  );
});

const AlertActions = forwardRef(function AlertActions(
  { children, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(ALERT_PRIMITIVES.actions, className)}
      {...props}
    >
      {children}
    </div>
  );
});

const Alert = forwardRef(function Alert(
  {
    actions,
    autoDismiss,
    children,
    className,
    color = "neutral",
    defaultOpen = true,
    description,
    dismissButtonProps,
    dismissible = false,
    dismissLabel,
    icon,
    onDismiss,
    onOpenChange,
    onPointerEnter,
    onPointerLeave,
    onFocusCapture,
    onBlurCapture,
    open: openProp,
    pauseOnHover = true,
    title,
    variant = "soft",
    role: roleProp,
    "aria-live": ariaLiveProp,
    ...props
  },
  ref,
) {
  const TXT = useTXT();
  const { theme } = useQuickitControlState("alert");
  const resolvedDismissLabel = dismissLabel ?? TXT.CLOSE_ALERT;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [paused, setPaused] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const titleId = useId();
  const descriptionId = useId();
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    color,
    "neutral",
  );
  const palette =
    ALERT_THEME_CLASSES[theme]?.[variant] ?? ALERT_THEME_CLASSES[theme].soft;
  const autoDismissMs =
    Number.isFinite(autoDismiss) && autoDismiss > 0
      ? Math.floor(autoDismiss)
      : 0;
  const hasCustomChildren = children != null;
  const resolvedTitle = hasCustomChildren ? null : title;
  const resolvedDescription = hasCustomChildren ? null : description;
  const resolvedActions = hasCustomChildren ? null : actions;
  const hasTitle = Boolean(resolvedTitle) || titleCount > 0;
  const hasDescription = Boolean(resolvedDescription) || descriptionCount > 0;
  const resolvedRole =
    roleProp ??
    (resolvedColor === "danger" || resolvedColor === "warning"
      ? "alert"
      : "status");
  const resolvedAriaLive =
    ariaLiveProp ?? (resolvedRole === "alert" ? "assertive" : "polite");

  const registerTitle = useCallback(() => {
    setTitleCount((count) => count + 1);

    return () => {
      setTitleCount((count) => Math.max(0, count - 1));
    };
  }, []);

  const registerDescription = useCallback(() => {
    setDescriptionCount((count) => count + 1);

    return () => {
      setDescriptionCount((count) => Math.max(0, count - 1));
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      descriptionId,
      registerDescription,
      registerTitle,
      titleId,
    }),
    [descriptionId, registerDescription, registerTitle, titleId],
  );

  const requestClose = useCallback(
    (reason) => {
      if (!isControlled) {
        setUncontrolledOpen(false);
      }

      onOpenChange?.(false);
      onDismiss?.(reason);
    },
    [isControlled, onDismiss, onOpenChange],
  );

  useEffect(() => {
    if (!open || autoDismissMs === 0 || paused) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      requestClose("auto");
    }, autoDismissMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [autoDismissMs, open, paused, requestClose]);

  if (!open) {
    return null;
  }

  return (
    <AlertContext.Provider value={contextValue}>
      <div
        ref={ref}
        role={resolvedRole}
        aria-live={resolvedAriaLive}
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className={cn(
          ALERT_PRIMITIVES.root,
          getControlRadius("lg"),
          palette[resolvedColor] ?? palette.info,
          className,
        )}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);

          if (pauseOnHover && autoDismissMs > 0) {
            setPaused(true);
          }
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);

          if (pauseOnHover && autoDismissMs > 0) {
            setPaused(false);
          }
        }}
        onFocusCapture={(event) => {
          onFocusCapture?.(event);

          if (pauseOnHover && autoDismissMs > 0) {
            setPaused(true);
          }
        }}
        onBlurCapture={(event) => {
          onBlurCapture?.(event);

          if (pauseOnHover && autoDismissMs > 0) {
            const nextTarget = event.relatedTarget;

            if (
              !(nextTarget instanceof Node) ||
              !event.currentTarget.contains(nextTarget)
            ) {
              setPaused(false);
            }
          }
        }}
        {...props}
      >
        {icon ? <div className={ALERT_PRIMITIVES.icon}>{icon}</div> : null}

        <div className={ALERT_PRIMITIVES.content}>
          {hasCustomChildren ? (
            children
          ) : (
            <>
              {resolvedTitle ? <AlertTitle>{resolvedTitle}</AlertTitle> : null}
              {resolvedDescription ? (
                <AlertDescription>{resolvedDescription}</AlertDescription>
              ) : null}
              {resolvedActions ? (
                <AlertActions>{resolvedActions}</AlertActions>
              ) : null}
            </>
          )}
        </div>

        {dismissible ? (
          <Button
            type="button"
            variant="ghost"
            color={resolvedColor}
            shape="square"
            size="xs"
            className={cn(
              ALERT_PRIMITIVES.dismiss,
              dismissButtonProps?.className,
            )}
            aria-label={resolvedDismissLabel}
            onClick={() => requestClose("manual")}
            {...dismissButtonProps}
          >
            <CloseIcon className="size-4" />
          </Button>
        ) : null}
      </div>
    </AlertContext.Provider>
  );
});

Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
Alert.Actions = AlertActions;

export { Alert, AlertActions, AlertDescription, AlertTitle };
export default Alert;
