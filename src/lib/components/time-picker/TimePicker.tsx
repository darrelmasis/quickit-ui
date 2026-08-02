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
import {
  applyDisplayHour,
  applyPeriod,
  clampTimeValue,
  formatDisplayTime,
  getDisplayHour,
  getInitialDraftValue,
  getMinuteOptions,
  getPeriod,
  getSafeDraftValue,
  isTimeOutsideRange,
  normalizeTimeValue,
  parseTimeValue,
  resolveMinuteStep,
} from "./time-utils";
import { useTXT } from "@/lib/i18n";

/**
 * Selector de hora con popover compacto.
 * Devuelve el valor normalizado como `HH:mm`.
 */
export const TimePicker = forwardRef(function TimePicker(
  {
    className,
    clearButton = true,
    clearButtonLabel,
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
    placeholder,
    required = false,
    size: sizeProp,
    value: controlledValue,
    dialogLabel,
    cancelLabel,
    applyLabel,
    "aria-describedby": ariaDescribedByProp,
    "aria-labelledby": ariaLabelledByProp,
    ...rest
  },
  ref,
) {

  const TXT = useTXT();
  const resolvedClearButtonLabel = clearButtonLabel ?? TXT.CLEAR_TIME;
  const resolvedPlaceholder = placeholder ?? TXT.SELECT_TIME;
  const resolvedDialogLabel = dialogLabel ?? TXT.TIME_DIALOG_LABEL;
  const resolvedCancelLabel = cancelLabel ?? TXT.CANCEL;
  const resolvedApplyLabel = applyLabel ?? TXT.APPLY;
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
    labelledBy,
    resolvedDisabled,
    resolvedId,
    resolvedInvalid,
    resolvedRequired,
    theme,
    ui,
  } = useInputFieldState({
    ariaDescribedBy: ariaDescribedByProp,
    ariaLabelledBy: ariaLabelledByProp,
    color,
    disabled,
    id,
    invalid,
    required,
  });

  const inputId = resolvedId ?? generatedId;
  const popupId = `${inputId}-timepicker`;
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
      "h-10 rounded-lg border-neutral-200/90 bg-neutral-50 px-2.5 text-base font-semibold text-neutral-900 shadow-none",
      "justify-center gap-2 hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:border-neutral-600 dark:hover:bg-neutral-700",
      "[&_.min-w-0]:text-center [&_.min-w-0]:font-semibold [&_.min-w-0]:tabular-nums",
    ].join(" ");
  const selectContentClassName =
    "scrollbar-hidden";

  const content = (
    <div
      id={popupId}
      role="dialog"
      aria-label={resolvedDialogLabel}
      className="w-[min(100vw-2rem,19rem)] text-neutral-900 dark:text-neutral-100"
    >
      <div className="flex items-center justify-center gap-2 rounded-lg px-1 py-1">
        <div className="w-[3.5rem] sm:w-[4.35rem] shrink-0">
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

        <span className="shrink-0 text-base sm:text-lg font-bold text-neutral-300 dark:text-neutral-600">
          :
        </span>

        <div className="w-[3.5rem] sm:w-[4.35rem] shrink-0">
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
          <div className="ml-1 inline-flex items-center gap-1 rounded-lg bg-neutral-100 p-0.5 dark:bg-neutral-800">
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
                  variant={active ? "solid" : "ghost"}
                  disabled={disabledOption}
                  className={cn(
                    "h-6 sm:h-7 min-w-[2.3rem] sm:min-w-[2.6rem] rounded-md px-1.5 sm:px-2 text-xs font-semibold tracking-wide shadow-none",
                    !active && "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
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
                  {option === "AM" ? TXT.AM : TXT.PM}
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-2 sm:mt-3 flex items-center justify-between gap-1.5 sm:gap-2 border-t border-neutral-100 px-1 pt-2 sm:pt-3 dark:border-neutral-800">
        <Button
          type="button"
          variant="ghost"
          color="neutral"
          size="sm"
          className="px-2 sm:px-3 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          onClick={() => {
            syncDraftWithSelected();
            setOpen(false);
          }}
        >
          {resolvedCancelLabel}
        </Button>
        <Button
          type="button"
          color={applyButtonColor}
          size="sm"
          className="min-w-[5rem] sm:min-w-[6rem] rounded-lg px-3 sm:px-5 text-sm font-semibold shadow-sm"
          disabled={draftDisabled || resolvedDisabled}
          onClick={() => commitValue(draftValue)}
        >
          {resolvedApplyLabel}
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
        showArrow={false}
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
      >
        <input
          ref={ref}
          {...rest}
          id={inputId}
          type="text"
          readOnly
          autoComplete="off"
          role="combobox"
          aria-controls={open ? popupId : undefined}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-invalid={resolvedInvalid || undefined}
          aria-required={resolvedRequired || undefined}
          aria-describedby={describedBy}
          aria-labelledby={labelledBy}
          placeholder={resolvedPlaceholder}
          value={displayValue}
          disabled={resolvedDisabled}
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
            variant="soft"
            color="neutral"
            shape="circle"
            size="sm"
            aria-label={resolvedClearButtonLabel}
            title={resolvedClearButtonLabel}
            disabled={resolvedDisabled}
            className={cn(
              "pointer-events-auto",
              theme === "dark"
                ? "text-neutral-400 hover:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-900",
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
          variant="soft"
          color="neutral"
          shape="square"
          size="sm"
          aria-label={open ? TXT.CLOSE_TIME_PICKER : TXT.OPEN_TIME_PICKER}
          title={open ? TXT.CLOSE_TIME_PICKER : TXT.OPEN_TIME_PICKER}
          aria-controls={open ? popupId : undefined}
          aria-haspopup="dialog"
          disabled={resolvedDisabled}
          className={cn(
            "pointer-events-auto",
            theme === "dark"
              ? "text-neutral-400 hover:text-neutral-100"
              : "text-neutral-500 hover:text-neutral-900",
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
