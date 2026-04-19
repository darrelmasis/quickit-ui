import { forwardRef, useCallback, useId, useMemo, useState } from "react";
import Button from "@/lib/components/button/Button";
import Popover from "@/lib/components/popover/Popover";
import Select from "@/lib/components/select/Select";
import {
  getInputClassName,
  INPUT_ACTION_PADDING_CLASSES,
  INPUT_PRIMITIVES,
  useInputFieldState,
} from "@/lib/components/input/input.shared";
import { useInputGroup } from "@/lib/components/input/input-group.context";
import { ChevronDownIcon, ClearIcon } from "@/lib/assets/icons";
import { cn } from "@/lib/utils";

function parseTimeValue(raw) {
  if (raw == null || raw === "") {
    return null;
  }

  if (raw instanceof Date) {
    return {
      hours: raw.getHours(),
      minutes: raw.getMinutes(),
    };
  }

  if (typeof raw === "number" && Number.isFinite(raw)) {
    const next = new Date(raw);
    return {
      hours: next.getHours(),
      minutes: next.getMinutes(),
    };
  }

  if (typeof raw !== "string") {
    return null;
  }

  const value = raw.trim();
  const match = value.match(/^(\d{1,2}):(\d{2})(?:\s*([AaPp][Mm]))?$/);

  if (!match) {
    return null;
  }

  const rawHours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3]?.toUpperCase();

  if (
    !Number.isInteger(rawHours) ||
    !Number.isInteger(minutes) ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  if (period) {
    if (rawHours < 1 || rawHours > 12) {
      return null;
    }

    const normalizedHours =
      period === "AM"
        ? rawHours % 12
        : rawHours % 12 === 0
          ? 12
          : (rawHours % 12) + 12;

    return { hours: normalizedHours, minutes };
  }

  if (rawHours < 0 || rawHours > 23) {
    return null;
  }

  return { hours: rawHours, minutes };
}

function normalizeTimeValue(value) {
  if (!value) {
    return "";
  }

  return `${String(value.hours).padStart(2, "0")}:${String(
    value.minutes,
  ).padStart(2, "0")}`;
}

function formatDisplayTime(value, hourCycle) {
  if (!value) {
    return "";
  }

  if (hourCycle === "24h") {
    return normalizeTimeValue(value);
  }

  const period = value.hours >= 12 ? "PM" : "AM";
  const normalizedHours = value.hours % 12 || 12;

  return `${normalizedHours}:${String(value.minutes).padStart(2, "0")} ${period}`;
}

function timeToMinutes(value) {
  if (!value) {
    return null;
  }

  return value.hours * 60 + value.minutes;
}

function isTimeOutsideRange(value, min, max) {
  const minutes = timeToMinutes(value);

  if (minutes == null) {
    return false;
  }

  const minMinutes = timeToMinutes(min);
  const maxMinutes = timeToMinutes(max);

  return (
    (minMinutes != null && minutes < minMinutes) ||
    (maxMinutes != null && minutes > maxMinutes)
  );
}

function clampTimeValue(value, min, max) {
  if (!value) {
    return null;
  }

  const minutes = timeToMinutes(value);
  const minMinutes = timeToMinutes(min);
  const maxMinutes = timeToMinutes(max);

  if (minMinutes != null && minutes < minMinutes) {
    return min;
  }

  if (maxMinutes != null && minutes > maxMinutes) {
    return max;
  }

  return value;
}

function getDisplayHour(value) {
  const normalized = value.hours % 12;
  return normalized === 0 ? 12 : normalized;
}

function getPeriod(value) {
  return value.hours >= 12 ? "PM" : "AM";
}

function applyDisplayHour(value, nextHour, hourCycle) {
  if (hourCycle === "24h") {
    return { ...value, hours: nextHour };
  }

  const currentPeriod = getPeriod(value);

  if (currentPeriod === "AM") {
    return { ...value, hours: nextHour % 12 };
  }

  return {
    ...value,
    hours: nextHour % 12 === 0 ? 12 : (nextHour % 12) + 12,
  };
}

function applyPeriod(value, nextPeriod) {
  const displayHour = getDisplayHour(value);

  if (nextPeriod === "AM") {
    return {
      ...value,
      hours: displayHour % 12,
    };
  }

  return {
    ...value,
    hours: displayHour % 12 === 0 ? 12 : (displayHour % 12) + 12,
  };
}

function getCurrentRoundedTime(step) {
  const now = new Date();
  const hours = now.getHours();
  const minuteBlock = Math.round(now.getMinutes() / step) * step;

  if (minuteBlock >= 60) {
    return {
      hours: (hours + 1) % 24,
      minutes: 0,
    };
  }

  return {
    hours,
    minutes: minuteBlock,
  };
}

function resolveMinuteStep(value) {
  if (!Number.isFinite(value)) {
    return 5;
  }

  const next = Math.floor(value);
  return Math.min(60, Math.max(1, next));
}

function getMinuteOptions(step, selectedMinutes) {
  const values = [];

  for (let minute = 0; minute < 60; minute += step) {
    values.push(minute);
  }

  if (
    Number.isInteger(selectedMinutes) &&
    selectedMinutes >= 0 &&
    selectedMinutes <= 59 &&
    !values.includes(selectedMinutes)
  ) {
    values.push(selectedMinutes);
    values.sort((a, b) => a - b);
  }

  return values;
}

function getInitialDraftValue(selected, step, min, max) {
  if (selected) {
    return clampTimeValue(selected, min, max) ?? selected;
  }

  return clampTimeValue(getCurrentRoundedTime(step), min, max) ?? {
    hours: 9,
    minutes: 0,
  };
}

function getSafeDraftValue(current, selectedValue, step, min, max) {
  return (
    current ?? getInitialDraftValue(selectedValue, step, min, max)
  );
}

/**
 * Selector de hora con popover compacto.
 * Devuelve el valor normalizado como `HH:mm`.
 */
export const TimePicker = forwardRef(function TimePicker(
  {
    className,
    clearButton = true,
    clearButtonLabel = "Limpiar hora",
    color: colorProp,
    defaultValue,
    disabled = false,
    hourCycle = "12h",
    id,
    invalid = false,
    maxTime,
    minTime,
    minuteStep = 5,
    name,
    onChange,
    placeholder = "Seleccionar hora",
    required = false,
    size: sizeProp,
    value: controlledValue,
    "aria-describedby": ariaDescribedByProp,
    ...rest
  },
  ref,
) {
  const group = useInputGroup();
  const generatedId = useId();
  const size = sizeProp ?? group?.size ?? "md";
  const color = colorProp ?? group?.color ?? "neutral";
  const isAttached = Boolean(group?.attached);
  const resolvedMinuteStep = resolveMinuteStep(minuteStep);
  const min = useMemo(() => parseTimeValue(minTime), [minTime]);
  const max = useMemo(() => parseTimeValue(maxTime), [maxTime]);
  const [open, setOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    parseTimeValue(defaultValue),
  );
  const [draftValue, setDraftValue] = useState(() =>
    getInitialDraftValue(parseTimeValue(defaultValue), resolvedMinuteStep, min, max),
  );

  const {
    colorUi,
    describedBy,
    focusRingEnabled,
    resolvedDisabled,
    resolvedId,
    resolvedInvalid,
    resolvedRequired,
    theme,
    ui,
  } = useInputFieldState({
    ariaDescribedBy: ariaDescribedByProp,
    color,
    disabled,
    id,
    invalid,
    required,
  });

  const inputId = resolvedId ?? generatedId;
  const selectedValue =
    controlledValue !== undefined
      ? parseTimeValue(controlledValue)
      : uncontrolledValue;
  const normalizedValue = normalizeTimeValue(selectedValue);
  const displayValue = formatDisplayTime(selectedValue, hourCycle);
  const hasValue = Boolean(selectedValue);

  const syncDraftWithSelected = useCallback(() => {
    setDraftValue(
      getInitialDraftValue(selectedValue, resolvedMinuteStep, min, max),
    );
  }, [max, min, resolvedMinuteStep, selectedValue]);

  const handleOpenChange = useCallback(
    (nextOpen) => {
      if (nextOpen) {
        syncDraftWithSelected();
      }

      setOpen(nextOpen);
    },
    [syncDraftWithSelected],
  );

  const commitValue = useCallback(
    (nextValue) => {
      const clamped = clampTimeValue(nextValue, min, max);

      if (controlledValue === undefined) {
        setUncontrolledValue(clamped);
      }

      onChange?.(clamped ? normalizeTimeValue(clamped) : null);
      setOpen(false);
    },
    [controlledValue, max, min, onChange],
  );

  const clearValue = useCallback(() => {
    if (controlledValue === undefined) {
      setUncontrolledValue(null);
    }

    setDraftValue(getInitialDraftValue(null, resolvedMinuteStep, min, max));
    onChange?.(null);
    setOpen(false);
  }, [controlledValue, max, min, onChange, resolvedMinuteStep]);

  const displayHourOptions = useMemo(
    () =>
      hourCycle === "24h"
        ? Array.from({ length: 24 }, (_, index) => index)
        : Array.from({ length: 12 }, (_, index) => index + 1),
    [hourCycle],
  );

  const minuteOptions = useMemo(
    () => getMinuteOptions(resolvedMinuteStep, draftValue?.minutes),
    [draftValue?.minutes, resolvedMinuteStep],
  );

  const selectedDisplayHour = draftValue
    ? hourCycle === "24h"
      ? draftValue.hours
      : getDisplayHour(draftValue)
    : null;
  const selectedPeriod = draftValue ? getPeriod(draftValue) : "AM";
  const draftDisabled = isTimeOutsideRange(draftValue, min, max);
  const applyButtonColor = color === "neutral" ? "primary" : color;
  const paddingEndClassName =
    clearButton && hasValue
      ? INPUT_ACTION_PADDING_CLASSES.elementWithAction[size]
      : INPUT_ACTION_PADDING_CLASSES.element[size];
  const selectTriggerClassName =
    [
      "h-10 rounded-xl border-slate-200/90 bg-white px-2.5 text-base font-medium text-slate-900 shadow-none",
      "justify-center gap-2 hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-stone-100 dark:hover:border-zinc-700",
      "[&_.min-w-0]:text-center [&_.min-w-0]:font-medium [&_.min-w-0]:tabular-nums",
    ].join(" ");
  const selectContentClassName =
    "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

  const content = (
    <div
      className={cn(
        "w-[min(100vw-2rem,18rem)] p-1 text-slate-900 dark:text-stone-100",
        "text-slate-900 dark:text-stone-100",
      )}
    >
      <div className="flex items-center justify-center gap-2 rounded-xl px-1 py-1">
        <div className="w-[4.35rem] shrink-0">
          <Select
            size="sm"
            color="neutral"
            usePortal={false}
            contentClassName={selectContentClassName}
            value={String(selectedDisplayHour ?? displayHourOptions[0])}
            onValueChange={(value) =>
              setDraftValue((current) =>
                applyDisplayHour(
                  getSafeDraftValue(
                    current,
                    selectedValue,
                    resolvedMinuteStep,
                    min,
                    max,
                  ),
                  Number(value),
                  hourCycle,
                ),
              )
            }
            className={selectTriggerClassName}
          >
            {displayHourOptions.map((option) => {
              const disabledOption = isTimeOutsideRange(
                applyDisplayHour(
                  getSafeDraftValue(
                    draftValue,
                    selectedValue,
                    resolvedMinuteStep,
                    min,
                    max,
                  ),
                  option,
                  hourCycle,
                ),
                min,
                max,
              );

              return (
                <option
                  key={`hour-${option}`}
                  value={String(option)}
                  disabled={disabledOption}
                >
                  {String(option).padStart(2, "0")}
                </option>
              );
            })}
          </Select>
        </div>

        <span className="shrink-0 text-[1.05rem] font-semibold text-slate-400 dark:text-zinc-500">
          :
        </span>

        <div className="w-[4.35rem] shrink-0">
          <Select
            size="sm"
            color="neutral"
            usePortal={false}
            contentClassName={selectContentClassName}
            value={String(draftValue?.minutes ?? minuteOptions[0])}
            onValueChange={(value) =>
              setDraftValue((current) => ({
                ...getSafeDraftValue(
                  current,
                  selectedValue,
                  resolvedMinuteStep,
                  min,
                  max,
                ),
                minutes: Number(value),
              }))
            }
            className={selectTriggerClassName}
          >
            {minuteOptions.map((option) => {
              const disabledOption = isTimeOutsideRange(
                {
                  ...getSafeDraftValue(
                    draftValue,
                    selectedValue,
                    resolvedMinuteStep,
                    min,
                    max,
                  ),
                  minutes: option,
                },
                min,
                max,
              );

              return (
                <option
                  key={`minute-${option}`}
                  value={String(option)}
                  disabled={disabledOption}
                >
                  {String(option).padStart(2, "0")}
                </option>
              );
            })}
          </Select>
        </div>

        {hourCycle === "12h" ? (
          <div className="ml-1 inline-flex items-center gap-0.5 rounded-full px-1 py-1">
            {["AM", "PM"].map((option) => {
              const disabledOption = isTimeOutsideRange(
                applyPeriod(
                  getSafeDraftValue(
                    draftValue,
                    selectedValue,
                    resolvedMinuteStep,
                    min,
                    max,
                  ),
                  option,
                ),
                min,
                max,
              );
              const active = selectedPeriod === option;

              return (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  color={active ? applyButtonColor : "neutral"}
                  variant="ghost"
                  disabled={disabledOption}
                  className={cn(
                    "h-8 min-w-[2.55rem] rounded-full px-2 text-sm shadow-none",
                    active
                      ? "text-sky-600 dark:text-sky-300"
                      : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                  )}
                  onClick={() =>
                    setDraftValue((current) =>
                      applyPeriod(
                        getSafeDraftValue(
                          current,
                          selectedValue,
                          resolvedMinuteStep,
                          min,
                          max,
                        ),
                        option,
                      ),
                    )
                  }
                >
                  {option}
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-200/80 px-2 pt-3 dark:border-zinc-800">
        <Button
          type="button"
          variant="ghost"
          color="neutral"
          size="sm"
          className="px-2 text-[0.95rem]"
          onClick={() => {
            syncDraftWithSelected();
            setOpen(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          color={applyButtonColor}
          size="sm"
          className="min-w-[6.1rem] rounded-full px-5"
          disabled={draftDisabled || resolvedDisabled}
          onClick={() => commitValue(draftValue)}
        >
          Aplicar
        </Button>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        INPUT_PRIMITIVES.shell,
        "w-full",
        isAttached && "h-full",
        group?.layout === "inline" && "flex-1",
      )}
    >
      {name ? (
        <input
          type="hidden"
          name={name}
          value={normalizedValue}
          disabled={resolvedDisabled}
        />
      ) : null}

      <Popover
        asChild
        trigger="click"
        placement="bottom-start"
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
      >
        <input
          ref={ref}
          id={inputId}
          type="text"
          readOnly
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-invalid={resolvedInvalid || undefined}
          aria-required={resolvedRequired || undefined}
          aria-describedby={describedBy}
          placeholder={placeholder}
          value={displayValue}
          disabled={resolvedDisabled}
          {...rest}
          onKeyDown={(event) => {
            rest.onKeyDown?.(event);

            if (event.defaultPrevented || resolvedDisabled) {
              return;
            }

            if (
              event.key === "Enter" ||
              event.key === " " ||
              event.key === "ArrowDown"
            ) {
              event.preventDefault();
              handleOpenChange(true);
              return;
            }

            if (event.key === "Escape" && open) {
              event.preventDefault();
              handleOpenChange(false);
            }
          }}
          className={getInputClassName({
            attached: isAttached,
            className: cn("w-full cursor-pointer", className),
            colorUi,
            focusRingEnabled: isAttached ? false : focusRingEnabled,
            resolvedDisabled,
            resolvedInvalid,
            size,
            ui,
            paddingEndClassName,
          })}
        />
      </Popover>

      <div className={INPUT_PRIMITIVES.rightCluster}>
        {clearButton && hasValue ? (
          <Button
            type="button"
            variant="ghost"
            color="neutral"
            shape="circle"
            size="sm"
            aria-label={clearButtonLabel}
            title={clearButtonLabel}
            disabled={resolvedDisabled}
            className={cn(
              "pointer-events-auto",
              theme === "dark"
                ? "text-zinc-400 hover:text-zinc-100"
                : "text-slate-500 hover:text-slate-900",
            )}
            onClick={(event) => {
              event.preventDefault();
              clearValue();
            }}
          >
            <ClearIcon className="size-3.5 fill-current" />
          </Button>
        ) : null}

        <Button
          type="button"
          variant="ghost"
          color="neutral"
          shape="square"
          size="sm"
          aria-label={open ? "Cerrar selector de hora" : "Abrir selector de hora"}
          title={open ? "Cerrar selector de hora" : "Abrir selector de hora"}
          disabled={resolvedDisabled}
          className={cn(
            "pointer-events-auto",
            theme === "dark"
              ? "text-zinc-400 hover:text-zinc-100"
              : "text-slate-500 hover:text-slate-900",
          )}
          onClick={(event) => {
            event.preventDefault();
            if (!resolvedDisabled) {
              handleOpenChange(!open);
            }
          }}
        >
          <ChevronDownIcon
            className={cn("size-4 fill-current", open && "rotate-180")}
          />
        </Button>
      </div>
    </div>
  );
});

export default TimePicker;
