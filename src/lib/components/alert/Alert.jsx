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
import { QUICKIT_SEMANTIC_COLORS, resolveQuickitToken } from "@/lib/tokens";
import { cn, getControlRadius } from "@/lib/utils";

const AlertContext = createContext(null);

const ALERT_PRIMITIVES = {
  root:
    "relative flex w-full items-start gap-4 overflow-hidden border p-5 transition-[background-color,border-color,color]",
  icon:
    "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-current/10 ring-1 ring-current/10 [&_svg]:size-5",
  content: "min-w-0 flex-1 space-y-1.5",
  title: "text-sm font-semibold leading-6 tracking-tight",
  description: "text-sm leading-6 opacity-80",
  actions: "!mt-4 flex flex-wrap items-center gap-2.5 pt-1",
  dismiss:
    "inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-current opacity-70 transition-[background-color,opacity,transform] hover:bg-current/10 hover:opacity-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-current/15 active:scale-[0.98]",
};

const ALERT_THEME_CLASSES = {
  light: {
    soft: {
      neutral: "border-slate-200 bg-slate-50 text-slate-900",
      slate: "border-slate-200 bg-slate-50 text-slate-900",
      zinc: "border-zinc-200 bg-zinc-50 text-zinc-900",
      primary: "border-sky-200 bg-sky-50 text-sky-900",
      brand: "border-brand-200 bg-brand-50 text-brand-900",
      success: "border-emerald-200 bg-emerald-50 text-emerald-900",
      danger: "border-rose-200 bg-rose-50 text-rose-900",
      warning: "border-amber-200 bg-amber-50 text-amber-900",
      info: "border-cyan-200 bg-cyan-50 text-cyan-900",
      light: "border-neutral-200 bg-white text-neutral-950",
      dark: "border-zinc-300 bg-zinc-100 text-zinc-900",
      black: "border-neutral-300 bg-neutral-100 text-neutral-950",
    },
    outline: {
      neutral: "border-slate-300 bg-transparent text-slate-900",
      slate: "border-slate-300 bg-transparent text-slate-900",
      zinc: "border-zinc-300 bg-transparent text-zinc-900",
      primary: "border-sky-300 bg-transparent text-sky-900",
      brand: "border-brand-300 bg-transparent text-brand-900",
      success: "border-emerald-300 bg-transparent text-emerald-900",
      danger: "border-rose-300 bg-transparent text-rose-900",
      warning: "border-amber-300 bg-transparent text-amber-900",
      info: "border-cyan-300 bg-transparent text-cyan-900",
      light: "border-neutral-200 bg-transparent text-neutral-950",
      dark: "border-zinc-500 bg-transparent text-zinc-900",
      black: "border-black bg-transparent text-neutral-950",
    },
    solid: {
      neutral: "border-slate-900 bg-slate-900 text-white",
      slate: "border-slate-900 bg-slate-900 text-white",
      zinc: "border-zinc-900 bg-zinc-900 text-white",
      primary: "border-sky-600 bg-sky-600 text-white",
      brand: "border-brand-600 bg-brand-600 text-white",
      success: "border-emerald-600 bg-emerald-600 text-white",
      danger: "border-rose-600 bg-rose-600 text-white",
      warning: "border-amber-400 bg-amber-400 text-neutral-950",
      info: "border-cyan-600 bg-cyan-600 text-white",
      light: "border-white bg-white text-neutral-950",
      dark: "border-zinc-900 bg-zinc-900 text-white",
      black: "border-black bg-black text-white",
    },
  },
  dark: {
    soft: {
      neutral: "border-zinc-800 bg-zinc-950 text-zinc-100",
      slate: "border-slate-800 bg-slate-950 text-slate-100",
      zinc: "border-zinc-800 bg-zinc-950 text-zinc-100",
      primary: "border-sky-900 bg-sky-950 text-sky-100",
      brand: "border-brand-900 bg-brand-950 text-brand-100",
      success: "border-emerald-900 bg-emerald-950 text-emerald-100",
      danger: "border-rose-900 bg-rose-950 text-rose-100",
      warning: "border-amber-900 bg-amber-950 text-amber-100",
      info: "border-cyan-900 bg-cyan-950 text-cyan-100",
      light: "border-neutral-700 bg-neutral-900 text-neutral-100",
      dark: "border-zinc-700 bg-zinc-900 text-zinc-100",
      black: "border-black bg-black text-neutral-100",
    },
    outline: {
      neutral: "border-zinc-700 bg-transparent text-zinc-100",
      slate: "border-slate-700 bg-transparent text-slate-100",
      zinc: "border-zinc-700 bg-transparent text-zinc-100",
      primary: "border-sky-600/60 bg-transparent text-sky-200",
      brand: "border-brand-600/60 bg-transparent text-brand-200",
      success: "border-emerald-600/60 bg-transparent text-emerald-200",
      danger: "border-rose-600/60 bg-transparent text-rose-200",
      warning: "border-amber-600/60 bg-transparent text-amber-200",
      info: "border-cyan-600/60 bg-transparent text-cyan-200",
      light: "border-neutral-500 bg-transparent text-neutral-100",
      dark: "border-zinc-600 bg-transparent text-zinc-100",
      black: "border-black bg-transparent text-neutral-100",
    },
    solid: {
      neutral: "border-zinc-100 bg-zinc-100 text-zinc-950",
      slate: "border-slate-100 bg-slate-100 text-slate-950",
      zinc: "border-zinc-100 bg-zinc-100 text-zinc-950",
      primary: "border-sky-300 bg-sky-300 text-neutral-950",
      brand: "border-brand-300 bg-brand-300 text-neutral-950",
      success: "border-emerald-300 bg-emerald-300 text-neutral-950",
      danger: "border-rose-300 bg-rose-300 text-neutral-950",
      warning: "border-amber-300 bg-amber-300 text-neutral-950",
      info: "border-cyan-300 bg-cyan-300 text-neutral-950",
      light: "border-neutral-200 bg-neutral-200 text-neutral-950",
      dark: "border-zinc-700 bg-zinc-700 text-zinc-50",
      black: "border-black bg-black text-white",
    },
  },
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
    color = "info",
    defaultOpen = true,
    description,
    dismissible = false,
    dismissLabel = "Cerrar alerta",
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
  const { theme } = useQuickitControlState("alert");
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
    "info",
  );
  const palette =
    ALERT_THEME_CLASSES[theme]?.[variant] ?? ALERT_THEME_CLASSES[theme].soft;
  const autoDismissMs =
    Number.isFinite(autoDismiss) && autoDismiss > 0 ? Math.floor(autoDismiss) : 0;
  const hasCustomChildren = children != null;
  const resolvedTitle = hasCustomChildren ? null : title;
  const resolvedDescription = hasCustomChildren ? null : description;
  const resolvedActions = hasCustomChildren ? null : actions;
  const hasTitle = Boolean(resolvedTitle) || titleCount > 0;
  const hasDescription = Boolean(resolvedDescription) || descriptionCount > 0;
  const resolvedRole =
    roleProp ?? (resolvedColor === "danger" || resolvedColor === "warning"
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

            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
              setPaused(false);
            }
          }
        }}
        {...props}
      >
        {icon ? (
          <div className={ALERT_PRIMITIVES.icon}>{icon}</div>
        ) : null}

        <div className={ALERT_PRIMITIVES.content}>
          {hasCustomChildren ? (
            children
          ) : (
            <>
              {resolvedTitle ? <AlertTitle>{resolvedTitle}</AlertTitle> : null}
              {resolvedDescription ? (
                <AlertDescription>{resolvedDescription}</AlertDescription>
              ) : null}
              {resolvedActions ? <AlertActions>{resolvedActions}</AlertActions> : null}
            </>
          )}
        </div>

        {dismissible ? (
          <Button
            type="button"
            variant="ghost"
            color="neutral"
            shape="square"
            size="sm"
            className={ALERT_PRIMITIVES.dismiss}
            aria-label={dismissLabel}
            onClick={() => requestClose("manual")}
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
