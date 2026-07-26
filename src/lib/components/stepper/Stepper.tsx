import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { useQuickitControlState } from "@/lib/theme";
import { CheckFillIcon } from "@/lib/assets/icons";
import { useTXT } from "@/lib/i18n";
import { STEPPER_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { QUICKIT_SEMANTIC_COLORS, resolveQuickitToken } from "@/lib/tokens";

/**
 * Pasos numerados con estado actual, completados y opcional navegación por click.
 */
const Stepper = forwardRef(function Stepper({
  steps = [],
  activeStep = 0,
  className,
  color = "neutral",
  id,
  onStepChange,
  orientation = "horizontal",
}, ref) {
  const TXT = useTXT();
  const { theme } = useQuickitControlState("stepper");
  const resolvedColor = resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
  const ui = STEPPER_THEME_CLASSES[theme]?.[resolvedColor] ?? STEPPER_THEME_CLASSES.light.neutral;
  const isVertical = orientation === "vertical";
  const uid = useId();

  return (
    <nav
      id={id}
      aria-label={TXT.STEPPER_LABEL}
      className={cn("w-full", className)}
    >
      <ol
        ref={ref}
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
          const descId = description ? `${uid}-step-desc-${index}` : undefined;
          const clickable =
            Boolean(onStepChange) && (step?.clickable !== false);

          return (
            <li
              key={step?.id ?? index}
              className={cn(
                "relative flex flex-1",
                isVertical ? "flex-row gap-2 sm:gap-3 pb-6 sm:pb-8 last:pb-0" : "flex-col items-center",
              )}
            >
              {!isVertical && index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute left-[calc(50%+1.25rem)] top-5 h-0.5 w-[calc(100%-2.5rem)] -translate-y-1/2",
                    done ? ui.lineCurrent : ui.line,
                  )}
                />
              ) : null}
              {isVertical && index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-5 top-10 bottom-0 w-0.5 -translate-x-1/2",
                    done ? ui.lineCurrent : ui.line,
                  )}
                />
              ) : null}

              <div
                className={cn(
                  "relative z-[1] flex gap-2 sm:gap-3",
                  isVertical ? "flex-row items-start" : "flex-col items-center text-center",
                )}
              >
                <button
                  type="button"
                  disabled={!clickable}
                  aria-current={current ? "step" : undefined}
                  aria-describedby={descId}
                  className={cn(
                    "flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-semibold transition-colors",
                    done && ui.dotCurrent,
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
                <div className={cn("min-w-0", !isVertical && "max-w-[8rem] sm:max-w-[10rem]")}>
                  <div className={cn("text-xs sm:text-sm font-medium", current ? ui.titleCurrent : ui.title)}>{title}</div>
                  {description ? (
                    <p id={descId} className={cn("mt-0.5 text-[0.7rem] sm:text-xs", current ? ui.descriptionCurrent : ui.description)}>{description}</p>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

export { Stepper };
export default Stepper;
