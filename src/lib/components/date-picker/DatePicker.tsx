import { forwardRef, useCallback, useId, useMemo, useState } from "react";
import Button from "@/lib/components/button/Button";
import Popover from "@/lib/components/popover/Popover";
import {
  getInputClassName,
  INPUT_ACTION_PADDING_CLASSES,
  INPUT_PRIMITIVES,
  useInputFieldState,
} from "@/lib/components/input/input.shared";
import { useInputGroup } from "@/lib/components/input/input-group.context";
import { ChevronDownIcon, ChevronRightIcon } from "@/lib/assets/icons";
import { resolveFormFieldColor } from "@/lib/components/_shared/form-field";
import { CALENDAR_RANGE_CELL_CLASSES } from "@/lib/theme/theme-classes";
import { cn } from "@/lib/utils";
import {
  clampDate,
  dayTime,
  isSameDay,
  isSameMonth,
  isSameYear,
  isStrictlyBetween,
  monthOutsideRange,
  parseRangeValue,
  parseSingleValue,
  serializeDateValue,
  startOfDay,
  startOfMonth,
  yearOutsideRange,
} from "./date-utils";
import { useTXT } from "@/lib/i18n";

function getCalendarRangeSurfaceClasses(semanticColor) {
  const key = resolveFormFieldColor(semanticColor);
  const row =
    CALENDAR_RANGE_CELL_CLASSES[key] ?? CALENDAR_RANGE_CELL_CLASSES.primary;
  return { committed: row.committed, hover: row.hover };
}

/**
 * Selector de fecha con calendario en popover (sin dependencias externas).
 * El campo tiene apariencia de input de formulario (como text/password).
 * `selectionMode="between"` permite elegir fecha inicio y fin en dos pasos.
 */
export const DatePicker = forwardRef(function DatePicker(
  {
    className,
    /** Acento del calendario (días seleccionados y rango); por defecto coincide con `color` del campo. */
    calendarColor: calendarColorProp,
    color: colorProp,
    dateStyle = "long",
    defaultValue,
    disabled = false,
    id,
    invalid = false,
    maxDate,
    minDate,
    name,
    onChange,
    placeholder,
    required = false,
    selectionMode = "single",
    size: sizeProp,
    value: controlledValue,
    "aria-describedby": ariaDescribedByProp,
    "aria-labelledby": ariaLabelledByProp,
    ...rest
  },
  ref,
) {
  const TXT = useTXT();
  const group = useInputGroup();
  const genId = useId();
  const size = sizeProp ?? group?.size ?? "md";
  const color = colorProp ?? group?.color ?? "neutral";
  const calendarAccent = calendarColorProp ?? color;
  const rangeSurface = useMemo(
    () => getCalendarRangeSurfaceClasses(calendarAccent),
    [calendarAccent],
  );
  const isAttached = Boolean(group?.attached);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarView, setCalendarView] = useState("day");
  /** Día bajo el puntero al elegir el fin del rango (previsualización). */
  const [rangeHoverDate, setRangeHoverDate] = useState(null);
  const isRange = selectionMode === "between";

  const resolvedPlaceholder =
    placeholder ?? (isRange ? TXT.DATE_RANGE_PLACEHOLDER : TXT.SELECT_DATE);

  const {
    colorUi,
    describedBy,
    focusRingEnabled,
    labelledBy,
    resolvedDisabled,
    resolvedId,
    resolvedInvalid,
    resolvedRequired,
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

  const inputId = resolvedId ?? genId;
  const popupId = `${inputId}-calendar`;

  const min = minDate ? startOfDay(new Date(minDate)) : null;
  const max = maxDate ? startOfDay(new Date(maxDate)) : null;

  const [uncontrolledSingle, setUncontrolledSingle] = useState(() =>
    !isRange && defaultValue !== undefined
      ? parseSingleValue(defaultValue)
      : null,
  );

  const [uncontrolledRange, setUncontrolledRange] = useState(() =>
    isRange ? parseRangeValue(defaultValue) : { from: null, to: null },
  );

  const selectedSingle =
    !isRange && controlledValue !== undefined
      ? parseSingleValue(controlledValue)
      : uncontrolledSingle;

  const selectedRange = useMemo(() => {
    if (!isRange) {
      return { from: null, to: null };
    }
    if (controlledValue !== undefined) {
      return parseRangeValue(controlledValue);
    }
    return uncontrolledRange;
  }, [controlledValue, isRange, uncontrolledRange]);

  const selected = selectedSingle;
  const baseVisibleDate = useMemo(
    () =>
      isRange
        ? (selectedRange.from ?? selectedRange.to ?? new Date())
        : (selected ?? new Date()),
    [isRange, selected, selectedRange.from, selectedRange.to],
  );

  const [visibleMonth, setVisibleMonth] = useState(() => {
    return new Date(
      baseVisibleDate.getFullYear(),
      baseVisibleDate.getMonth(),
      1,
    );
  });

  const handleCalendarOpenChange = useCallback(
    (nextOpen) => {
      if (!nextOpen) {
        setRangeHoverDate(null);
        setCalendarView("day");
      } else {
        setVisibleMonth(startOfMonth(baseVisibleDate));
      }

      setCalendarOpen(nextOpen);
    },
    [baseVisibleDate],
  );

  const displayValue = useMemo(() => {
    const fmt = (d) => d.toLocaleDateString(undefined, { dateStyle });
    if (isRange) {
      const { from, to } = selectedRange;
      if (!from && !to) {
        return "";
      }
      if (from && !to) {
        return `${fmt(from)} – …`;
      }
      if (from && to) {
        return `${fmt(from)} – ${fmt(to)}`;
      }
      return "";
    }
    if (!selected) {
      return "";
    }
    return fmt(selected);
  }, [dateStyle, isRange, selected, selectedRange]);
  const normalizedValue = useMemo(() => {
    if (isRange) {
      const from = serializeDateValue(selectedRange.from);
      const to = serializeDateValue(selectedRange.to);

      if (!from && !to) {
        return "";
      }

      return `${from}..${to}`;
    }

    return serializeDateValue(selected);
  }, [isRange, selected, selectedRange]);

  const grid = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const first = new Date(year, month, 1);
    const startWeekday = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const cells = [];
    for (let i = 0; i < startWeekday; i += 1) {
      const day = daysInPreviousMonth - startWeekday + i + 1;
      const date = new Date(year, month - 1, day);
      cells.push({ key: `pad-${i}`, day, date, outsideMonth: true });
    }
    for (let d = 1; d <= daysInMonth; d += 1) {
      const date = new Date(year, month, d);
      cells.push({ key: `day-${d}`, day: d, date, outsideMonth: false });
    }
    let trailingDay = 1;
    while (cells.length < 42) {
      const date = new Date(year, month + 1, trailingDay);
      cells.push({
        key: `trail-${cells.length}`,
        day: trailingDay,
        date,
        outsideMonth: true,
      });
      trailingDay += 1;
    }
    return cells;
  }, [visibleMonth]);

  const yearPageStart = useMemo(() => {
    const year = visibleMonth.getFullYear();
    return year - (year % 12);
  }, [visibleMonth]);

  const monthLabels = TXT.MONTHS_SHORT;
  const monthGrid = useMemo(
    () =>
      monthLabels.map((label, monthIndex) => {
        const date = new Date(visibleMonth.getFullYear(), monthIndex, 1);
        return {
          key: `month-${monthIndex}`,
          label,
          date,
          disabled: monthOutsideRange(date, min, max),
          selected: isSameMonth(date, visibleMonth),
        };
      }),
    [max, min, visibleMonth, monthLabels],
  );

  const yearGrid = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const year = yearPageStart + index;
        const date = new Date(year, visibleMonth.getMonth(), 1);
        return {
          key: `year-${year}`,
          label: String(year),
          date,
          disabled: yearOutsideRange(date, min, max),
          selected: isSameYear(date, visibleMonth),
        };
      }),
    [max, min, visibleMonth, yearPageStart],
  );

  const commitSingle = useCallback(
    (next) => {
      const clamped = clampDate(startOfDay(next), min, max);
      setVisibleMonth(startOfMonth(clamped));
      if (controlledValue === undefined) {
        setUncontrolledSingle(clamped);
      }
      onChange?.(clamped);
      setCalendarOpen(false);
    },
    [controlledValue, max, min, onChange],
  );

  const commitRange = useCallback(
    (clicked) => {
      const day = clampDate(startOfDay(clicked), min, max);
      setVisibleMonth(startOfMonth(day));
      const { from, to } = selectedRange;

      if (!from || (from && to)) {
        setRangeHoverDate(null);
        const next = { from: day, to: null };
        if (controlledValue === undefined) {
          setUncontrolledRange(next);
        }
        onChange?.({ from: day, to: null });
        return;
      }

      let a = from;
      let b = day;
      if (dayTime(b) < dayTime(a)) {
        [a, b] = [b, a];
      }
      const next = { from: a, to: b };
      if (controlledValue === undefined) {
        setUncontrolledRange(next);
      }
      onChange?.({ from: a, to: b });
      setRangeHoverDate(null);
      setCalendarOpen(false);
    },
    [controlledValue, max, min, onChange, selectedRange],
  );

  const paddingEndClassName = INPUT_ACTION_PADDING_CLASSES.element[size];
  const headerLabel =
    calendarView === "day"
      ? `${TXT.MONTHS_LONG[visibleMonth.getMonth()]} ${visibleMonth.getFullYear()}`
      : calendarView === "month"
        ? String(visibleMonth.getFullYear())
        : `${yearPageStart} - ${yearPageStart + 11}`;
  const previousLabel =
    calendarView === "day"
      ? TXT.PREV_MONTH
      : calendarView === "month"
        ? TXT.PREV_YEAR
        : TXT.PREV_YEARS;
  const nextLabel =
    calendarView === "day"
      ? TXT.NEXT_MONTH
      : calendarView === "month"
        ? TXT.NEXT_YEAR
        : TXT.NEXT_YEARS;
  const canStepUpView = calendarView !== "year";

  const calendarContent = (
    <div
      id={popupId}
      role="dialog"
      aria-label={isRange ? TXT.RANGE_DIALOG_LABEL : TXT.DATE_DIALOG_LABEL}
      className="overflow-hidden text-neutral-900 dark:text-neutral-100"
    >
      <div className="mb-2 flex items-center justify-between gap-1 px-0.5">
        <Button
          type="button"
          variant="soft"
          color="neutral"
          size="sm"
          shape="square"
          aria-label={previousLabel}
          className="shrink-0 text-base leading-none"
          onClick={() => {
            setVisibleMonth(
              calendarView === "day"
                ? new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
                : calendarView === "month"
                  ? new Date(visibleMonth.getFullYear() - 1, visibleMonth.getMonth(), 1)
                  : new Date(yearPageStart - 12, visibleMonth.getMonth(), 1),
            );
          }}
        >
          <ChevronRightIcon className="size-3.5 rotate-180 fill-current" />
        </Button>
        {canStepUpView ? (
          <Button
            type="button"
            variant="soft"
            color="neutral"
            size="sm"
            className="min-w-0 rounded-lg px-2.5 text-center text-sm font-semibold text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
            onClick={() =>
              setCalendarView((v) => (v === "day" ? "month" : "year"))
            }
          >
            {headerLabel}
          </Button>
        ) : (
          <div className="min-w-0 px-2 text-center text-sm font-semibold text-neutral-800 dark:text-neutral-100">
            {headerLabel}
          </div>
        )}
        <Button
          type="button"
          variant="soft"
          color="neutral"
          size="sm"
          shape="square"
          aria-label={nextLabel}
          className="shrink-0 text-base leading-none"
          onClick={() => {
            setVisibleMonth(
              calendarView === "day"
                ? new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
                : calendarView === "month"
                  ? new Date(visibleMonth.getFullYear() + 1, visibleMonth.getMonth(), 1)
                  : new Date(yearPageStart + 12, visibleMonth.getMonth(), 1),
            );
          }}
        >
          <ChevronRightIcon className="size-3.5 fill-current" />
        </Button>
      </div>
      {calendarView === "day" ? (
        <>
          <div className="mb-1 grid grid-cols-7 text-center text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {TXT.WEEKDAYS_SHORT.map((d) => (
              <div key={d} className="py-1 sm:py-1.5">{d}</div>
            ))}
          </div>
          <div
            className="grid grid-cols-7 gap-0.5 sm:gap-1"
            onPointerLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setRangeHoverDate(null);
            }}
          >
            {grid.map((cell, cellIndex) => {
              const { date, outsideMonth } = cell;
              const out = (min && date < min) || (max && date > max) || false;

              if (!isRange) {
                const isSelected = selected && isSameDay(date, selected);
                return (
                  <Button
                    key={cell.key}
                    type="button"
                    variant={isSelected ? "solid" : "ghost"}
                    color={isSelected ? calendarAccent : "neutral"}
                    size="sm"
                    shape="square"
                    aria-label={`${date.getDate()} ${TXT.MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`}
                    disabled={out || resolvedDisabled}
                    onClick={() => commitSingle(date)}
                    className={cn(
                      "min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 rounded-lg p-0 text-xs sm:text-sm font-normal tabular-nums",
                      outsideMonth && !isSelected && !out && "text-neutral-300 dark:text-neutral-600",
                      !isSelected && !outsideMonth && !out && "text-neutral-800 dark:text-neutral-100",
                      isSelected && "font-semibold",
                      out && "cursor-not-allowed opacity-20",
                    )}
                  >
                    {cell.day}
                  </Button>
                );
              }

              const { from: rf, to: rt } = selectedRange;
              const hasCommitted = Boolean(rf && rt);
              const selectingEnd = Boolean(rf && !rt);
              const hover = rangeHoverDate;
              const isCommittedEndpoint = hasCommitted && (isSameDay(date, rf) || isSameDay(date, rt));
              const isPreviewEndpoint = selectingEnd && hover && (isSameDay(date, rf) || isSameDay(date, hover));
              const isOnlyStartEndpoint = selectingEnd && !hover && isSameDay(date, rf);
              const rangeEndpointSolid = isCommittedEndpoint || isPreviewEndpoint || isOnlyStartEndpoint;
              const inCommittedSpan = hasCommitted && isStrictlyBetween(date, rf, rt);
              const inHoverSpan = selectingEnd && hover && isStrictlyBetween(date, rf, hover);

              const rangeStart = (hasCommitted && isSameDay(date, rf)) || (selectingEnd && isSameDay(date, rf));
              const rangeEnd = (hasCommitted && isSameDay(date, rt)) || (selectingEnd && hover && isSameDay(date, hover));
              const inRange = inCommittedSpan || inHoverSpan;
              const col = cellIndex % 7;
              const isRowStart = col === 0;
              const isRowEnd = col === 6;

              let roundClass = "rounded-lg";
              if (rangeStart && rangeEnd) {
                roundClass = "rounded-lg";
              } else if (rangeStart) {
                roundClass = "rounded-l-lg rounded-r-none";
              } else if (rangeEnd) {
                roundClass = "rounded-l-none rounded-r-lg";
              } else if (inRange) {
                roundClass = isRowStart ? "rounded-l-lg rounded-r-none" : isRowEnd ? "rounded-l-none rounded-r-lg" : "rounded-none";
              }

              return (
                <Button
                  key={cell.key}
                  type="button"
                  variant={rangeEndpointSolid ? "solid" : "ghost"}
                  color={rangeEndpointSolid ? calendarAccent : "neutral"}
                  size="sm"
                  shape="square"
                  aria-label={`${date.getDate()} ${TXT.MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`}
                  disabled={out || resolvedDisabled}
                  onClick={() => commitRange(date)}
                  onPointerEnter={() => {
                    if (selectingEnd && !out && !resolvedDisabled) setRangeHoverDate(startOfDay(date));
                  }}
                  className={cn(
                    "min-h-8 min-w-8 sm:min-h-9 sm:min-w-9 p-0 text-xs sm:text-sm font-normal tabular-nums transition-colors duration-150",
                    roundClass,
                    !rangeEndpointSolid && inCommittedSpan && rangeSurface.committed,
                    !rangeEndpointSolid && inHoverSpan && !inCommittedSpan && rangeSurface.hover,
                    !rangeEndpointSolid && !inCommittedSpan && !inHoverSpan && outsideMonth && !out && "text-neutral-300 dark:text-neutral-600",
                    !rangeEndpointSolid && !inCommittedSpan && !inHoverSpan && !outsideMonth && !out && "text-neutral-800 dark:text-neutral-100",
                    out && "cursor-not-allowed opacity-20",
                  )}
                >
                  {cell.day}
                </Button>
              );
            })}
          </div>
        </>
      ) : calendarView === "month" ? (
        <div className="mt-1 grid grid-cols-3 gap-1 sm:gap-1.5">
          {monthGrid.map((cell) => (
            <Button
              key={cell.key}
              type="button"
              variant={cell.selected ? "solid" : "ghost"}
              color={cell.selected ? calendarAccent : "neutral"}
              size="sm"
              disabled={cell.disabled || resolvedDisabled}
              className={cn(
                "h-8 sm:h-9 justify-center rounded-lg px-2 text-xs sm:text-sm font-medium",
                !cell.selected && !cell.disabled && "text-neutral-700 dark:text-neutral-300",
                cell.disabled && "cursor-not-allowed opacity-20",
              )}
              onClick={() => {
                setVisibleMonth(startOfMonth(cell.date));
                setCalendarView("day");
              }}
            >
              {cell.label}
            </Button>
          ))}
        </div>
      ) : (
        <div className="mt-1 grid grid-cols-3 gap-1 sm:gap-1.5">
          {yearGrid.map((cell) => (
            <Button
              key={cell.key}
              type="button"
              variant={cell.selected ? "solid" : "ghost"}
              color={cell.selected ? calendarAccent : "neutral"}
              size="sm"
              disabled={cell.disabled || resolvedDisabled}
              className={cn(
                "h-8 sm:h-9 justify-center rounded-lg px-2 text-xs sm:text-sm font-medium",
                !cell.selected && !cell.disabled && "text-neutral-700 dark:text-neutral-300",
                cell.disabled && "cursor-not-allowed opacity-20",
              )}
              onClick={() => {
                setVisibleMonth(startOfMonth(cell.date));
                setCalendarView("month");
              }}
            >
              {cell.label}
            </Button>
          ))}
        </div>
      )}
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
        open={calendarOpen}
        onOpenChange={handleCalendarOpenChange}
        content={calendarContent}
      >
        <input
          ref={ref}
          {...rest}
          id={inputId}
          type="text"
          readOnly
          autoComplete="off"
          role="combobox"
          aria-controls={calendarOpen ? popupId : undefined}
          aria-expanded={calendarOpen}
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
              handleCalendarOpenChange(true);
              return;
            }

            if (event.key === "Escape" && calendarOpen) {
              event.preventDefault();
              handleCalendarOpenChange(false);
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
      <button
        type="button"
        aria-label={calendarOpen ? TXT.CLOSE_CALENDAR : TXT.OPEN_CALENDAR}
        aria-controls={calendarOpen ? popupId : undefined}
        aria-haspopup="dialog"
        aria-expanded={calendarOpen}
        disabled={resolvedDisabled}
        className={cn(
          "absolute right-2 top-1/2 z-[1] -translate-y-1/2 rounded-md p-0.5 text-neutral-500 dark:text-neutral-400",
          "pointer-events-auto hover:text-neutral-700 dark:hover:text-neutral-200",
        )}
        onClick={(e) => {
          e.preventDefault();
          if (!resolvedDisabled) {
            handleCalendarOpenChange(!calendarOpen);
          }
        }}
      >
        <ChevronDownIcon
          className={cn("size-4 fill-current", calendarOpen && "rotate-180")}
        />
      </button>
    </div>
  );
});

export default DatePicker;
