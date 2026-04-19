import { cn } from "@/lib/utils";
import { useQuickitControlState } from "@/lib/theme";
import { CheckFillIcon } from "@/lib/assets/icons";

const STEPPER_THEME = {
  light: {
    line: "bg-slate-200",
    lineActive: "bg-slate-700",
    dot: "border-slate-300 bg-white text-slate-600",
    dotCurrent: "border-sky-600 bg-sky-50 text-sky-800 ring-2 ring-sky-500/30",
    dotDone: "border-slate-700 bg-slate-700 text-white",
    title: "text-slate-900",
    desc: "text-slate-500",
  },
  dark: {
    line: "bg-zinc-700",
    lineActive: "bg-zinc-200",
    dot: "border-zinc-600 bg-zinc-950 text-zinc-300",
    dotCurrent: "border-sky-400 bg-sky-950 text-sky-100 ring-2 ring-sky-400/30",
    dotDone: "border-zinc-100 bg-zinc-100 text-zinc-900",
    title: "text-zinc-50",
    desc: "text-zinc-400",
  },
};

/**
 * Pasos numerados con estado actual, completados y opcional navegación por click.
 */
export function Stepper({
  steps = [],
  activeStep = 0,
  className,
  id,
  onStepChange,
  orientation = "horizontal",
}) {
  const { theme } = useQuickitControlState("stepper");
  const ui = STEPPER_THEME[theme] ?? STEPPER_THEME.light;
  const isVertical = orientation === "vertical";

  return (
    <nav
      id={id}
      aria-label="Progreso"
      className={cn("w-full", className)}
    >
      <ol
        className={cn(
          "flex gap-0",
          isVertical ? "flex-col" : "flex-row items-start",
        )}
      >
        {steps.map((step, index) => {
          const title = step?.title ?? `Paso ${index + 1}`;
          const description = step?.description;
          const done = index < activeStep;
          const current = index === activeStep;
          const clickable =
            Boolean(onStepChange) && (step?.clickable !== false);

          return (
            <li
              key={step?.id ?? index}
              className={cn(
                "relative flex flex-1",
                isVertical ? "flex-row gap-3 pb-8 last:pb-0" : "flex-col items-center",
              )}
            >
              {!isVertical && index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute left-[calc(50%+1.25rem)] top-5 h-0.5 w-[calc(100%-2.5rem)] -translate-y-1/2",
                    done ? ui.lineActive : ui.line,
                  )}
                />
              ) : null}
              {isVertical && index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-5 top-10 bottom-0 w-0.5 -translate-x-1/2",
                    done ? ui.lineActive : ui.line,
                  )}
                />
              ) : null}

              <div
                className={cn(
                  "relative z-[1] flex gap-3",
                  isVertical ? "flex-row items-start" : "flex-col items-center text-center",
                )}
              >
                <button
                  type="button"
                  disabled={!clickable}
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    done && ui.dotDone,
                    current && ui.dotCurrent,
                    !done && !current && ui.dot,
                    clickable && "cursor-pointer hover:opacity-90",
                    !clickable && "cursor-default",
                  )}
                  onClick={() => {
                    if (clickable) {
                      onStepChange?.(index);
                    }
                  }}
                >
                  {done ? (
                    <CheckFillIcon className="size-4" />
                  ) : (
                    index + 1
                  )}
                </button>
                <div className={cn("min-w-0", !isVertical && "max-w-[10rem]")}>
                  <div className={cn("text-sm font-medium", ui.title)}>{title}</div>
                  {description ? (
                    <p className={cn("mt-0.5 text-xs", ui.desc)}>{description}</p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Stepper;
