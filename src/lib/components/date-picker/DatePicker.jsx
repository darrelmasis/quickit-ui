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
import { TXT } from "@/lib/texts";

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const MONTH_LABELS = Array.from({ length: 12 }, (_, monthIndex) =>
  new Date(2024, monthIndex, 1)
    .toLocaleDateString(undefined, { month: "short" })
    .replace(".", ""),
);

/** Relleno de celdas entre extremos (rango confirmado / preview al hover), por color semántico. */
const CALENDAR_RANGE_CELL_CLASSES = {
  neutral: {
    committed:
      "bg-neutral-400/15 text-neutral-800 hover:bg-neutral-400/25 dark:bg-neutral-500/20 dark:text-neutral-100 dark:hover:bg-neutral-500/30",
    hover:
      "bg-neutral-400/25 text-neutral-800 ring-1 ring-inset ring-neutral-400/35 hover:bg-neutral-400/35 dark:bg-neutral-500/35 dark:text-neutral-50 dark:ring-neutral-400/40 dark:hover:bg-neutral-500/45",
  },
  primary: {
    committed:
      "bg-sky-500/15 text-neutral-800 hover:bg-sky-500/25 dark:bg-sky-500/20 dark:text-neutral-100 dark:hover:bg-sky-500/30",
    hover:
      "bg-sky-500/25 text-neutral-800 ring-1 ring-inset ring-sky-500/35 hover:bg-sky-500/35 dark:bg-sky-500/35 dark:text-neutral-50 dark:ring-sky-400/40 dark:hover:bg-sky-500/45",
  },
  success: {
    committed:
      "bg-emerald-500/15 text-neutral-800 hover:bg-emerald-500/25 dark:bg-emerald-500/20 dark:text-neutral-100 dark:hover:bg-emerald-500/30",
    hover:
      "bg-emerald-500/25 text-neutral-800 ring-1 ring-inset ring-emerald-500/35 hover:bg-emerald-500/35 dark:bg-emerald-500/35 dark:text-neutral-50 dark:ring-emerald-400/40 dark:hover:bg-emerald-500/45",
  },
  danger: {
    committed:
      "bg-rose-500/15 text-neutral-800 hover:bg-rose-500/25 dark:bg-rose-500/20 dark:text-neutral-100 dark:hover:bg-rose-500/30",
    hover:
      "bg-rose-500/25 text-neutral-800 ring-1 ring-inset ring-rose-500/35 hover:bg-rose-500/35 dark:bg-rose-500/35 dark:text-neutral-50 dark:ring-rose-400/40 dark:hover:bg-rose-500/45",
  },
  warning: {
    committed:
      "bg-amber-500/15 text-neutral-800 hover:bg-amber-500/25 dark:bg-amber-500/20 dark:text-neutral-100 dark:hover:bg-amber-500/30",
    hover:
      "bg-amber-500/25 text-neutral-800 ring-1 ring-inset ring-amber-500/35 hover:bg-amber-500/35 dark:bg-amber-500/35 dark:text-neutral-50 dark:ring-amber-400/40 dark:hover:bg-amber-500/45",
  },
  info: {
    committed:
      "bg-cyan-500/15 text-neutral-800 hover:bg-cyan-500/25 dark:bg-cyan-500/20 dark:text-neutral-100 dark:hover:bg-cyan-500/30",
    hover:
      "bg-cyan-500/25 text-neutral-800 ring-1 ring-inset ring-cyan-500/35 hover:bg-cyan-500/35 dark:bg-cyan-500/35 dark:text-neutral-50 dark:ring-cyan-400/40 dark:hover:bg-cyan-500/45",
  },
  light: {
    committed:
      "bg-neutral-400/15 text-neutral-900 hover:bg-neutral-400/25 dark:bg-neutral-500/20 dark:text-neutral-100 dark:hover:bg-neutral-500/30",
    hover:
      "bg-neutral-400/25 text-neutral-900 ring-1 ring-inset ring-neutral-400/35 hover:bg-neutral-400/35 dark:bg-neutral-500/35 dark:text-neutral-50 dark:ring-neutral-400/40 dark:hover:bg-neutral-500/45",
  },
  dark: {
    committed:
      "bg-neutral-600/15 text-neutral-800 hover:bg-neutral-600/25 dark:bg-neutral-600/25 dark:text-neutral-100 dark:hover:bg-neutral-600/35",
    hover:
      "bg-neutral-600/25 text-neutral-800 ring-1 ring-inset ring-neutral-500/35 hover:bg-neutral-600/35 dark:bg-neutral-600/40 dark:text-neutral-50 dark:ring-neutral-400/40 dark:hover:bg-neutral-600/45",
  },
};

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
    placeholder ?? (isRange ? "Fecha inicio – Fecha fin" : "Seleccionar fecha");

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
    while (cells.length % 7 !== 0) {
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

  const monthGrid = useMemo(
    () =>
      MONTH_LABELS.map((label, monthIndex) => {
        const date = new Date(visibleMonth.getFullYear(), monthIndex, 1);
        return {
          key: `month-${monthIndex}`,
          label,
          date,
          disabled: monthOutsideRange(date, min, max),
          selected: isSameMonth(date, visibleMonth),
        };
      }),
    [max, min, visibleMonth],
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
      ? visibleMonth.toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        })
      : calendarView === "month"
        ? String(visibleMonth.getFullYear())
        : `${yearPageStart} - ${yearPageStart + 11}`;
  const previousLabel =
    calendarView === "day"
      ? "Mes anterior"
      : calendarView === "month"
        ? "Año anterior"
        : "Bloque anterior de años";
  const nextLabel =
    calendarView === "day"
      ? "Mes siguiente"
      : calendarView === "month"
        ? "Año siguiente"
        : "Bloque siguiente de años";
  const canStepUpView = calendarView !== "year";

  const calendarContent = (
    <div
      id={popupId}
      role="dialog"
      aria-label={isRange ? "Selector de rango de fechas" : "Selector de fecha"}
      className={cn(
        "w-[min(100vw-2rem,18rem)] p-2",
        "text-neutral-900 dark:text-neutral-100",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <Button
          type="button"
          variant="ghost"
          color="neutral"
          size="sm"
          shape="square"
          aria-label={previousLabel}
          className="shrink-0 text-base leading-none"
          onClick={() => {
            setVisibleMonth(
              calendarView === "day"
                ? new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth() - 1,
                    1,
                  )
                : calendarView === "month"
                  ? new Date(
                      visibleMonth.getFullYear() - 1,
                      visibleMonth.getMonth(),
                      1,
                    )
                  : new Date(yearPageStart - 12, visibleMonth.getMonth(), 1),
            );
          }}
        >
          <ChevronRightIcon className="size-3.5 rotate-180 fill-current" />
        </Button>
        {canStepUpView ? (
          <Button
            type="button"
            variant="ghost"
            color="neutral"
            size="sm"
            className="min-w-0 px-2 text-center text-sm font-semibold text-neutral-800 dark:text-neutral-100"
            onClick={() =>
              setCalendarView((currentView) =>
                currentView === "day" ? "month" : "year",
              )
            }
          >
            {headerLabel}
          </Button>
        ) : (
          <div className="min-w-0 text-center text-sm font-semibold text-neutral-800 dark:text-neutral-100">
            {headerLabel}
          </div>
        )}
        <Button
          type="button"
          variant="ghost"
          color="neutral"
          size="sm"
          shape="square"
          aria-label={nextLabel}
          className="shrink-0 text-base leading-none"
          onClick={() => {
            setVisibleMonth(
              calendarView === "day"
                ? new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth() + 1,
                    1,
                  )
                : calendarView === "month"
                  ? new Date(
                      visibleMonth.getFullYear() + 1,
                      visibleMonth.getMonth(),
                      1,
                    )
                  : new Date(yearPageStart + 12, visibleMonth.getMonth(), 1),
            );
          }}
        >
          <ChevronRightIcon className="size-3.5 fill-current" />
        </Button>
      </div>
      {calendarView === "day" ? (
        <>
          <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
            {WEEKDAYS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div
            className="mt-1 grid grid-cols-7 gap-1"
            onPointerLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setRangeHoverDate(null);
              }
            }}
          >
            {grid.map((cell) => {
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
                    aria-label={date.toLocaleDateString(undefined, {
                      dateStyle: "full",
                    })}
                    disabled={out || resolvedDisabled}
                    onClick={() => commitSingle(date)}
                    className={cn(
                      "min-h-9 min-w-9 p-0 text-sm font-normal tabular-nums",
                      outsideMonth &&
                        !isSelected &&
                        !out &&
                        "text-neutral-400 dark:text-neutral-500",
                      !isSelected &&
                        !outsideMonth &&
                        !out &&
                        "text-neutral-800 dark:text-neutral-100",
                      out && "cursor-not-allowed opacity-30",
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

              const isCommittedEndpoint =
                hasCommitted && (isSameDay(date, rf) || isSameDay(date, rt));
              const isPreviewEndpoint =
                selectingEnd &&
                hover &&
                (isSameDay(date, rf) || isSameDay(date, hover));
              const isOnlyStartEndpoint =
                selectingEnd && !hover && isSameDay(date, rf);

              const rangeEndpointSolid =
                isCommittedEndpoint || isPreviewEndpoint || isOnlyStartEndpoint;

              const inCommittedSpan =
                hasCommitted && isStrictlyBetween(date, rf, rt);
              const inHoverSpan =
                selectingEnd && hover && isStrictlyBetween(date, rf, hover);

              return (
                <Button
                  key={cell.key}
                  type="button"
                  variant={rangeEndpointSolid ? "solid" : "ghost"}
                  color={rangeEndpointSolid ? calendarAccent : "neutral"}
                  size="sm"
                  shape="square"
                  aria-label={date.toLocaleDateString(undefined, {
                    dateStyle: "full",
                  })}
                  disabled={out || resolvedDisabled}
                  onClick={() => commitRange(date)}
                  onPointerEnter={() => {
                    if (selectingEnd && !out && !resolvedDisabled) {
                      setRangeHoverDate(startOfDay(date));
                    }
                  }}
                  className={cn(
                    "min-h-9 min-w-9 p-0 text-sm font-normal tabular-nums transition-colors duration-150",
                    !rangeEndpointSolid &&
                      inCommittedSpan &&
                      rangeSurface.committed,
                    !rangeEndpointSolid &&
                      inHoverSpan &&
                      !inCommittedSpan &&
                      rangeSurface.hover,
                    !rangeEndpointSolid &&
                      !inCommittedSpan &&
                      !inHoverSpan &&
                      outsideMonth &&
                      !out &&
                      "text-neutral-400 dark:text-neutral-500",
                    !rangeEndpointSolid &&
                      !inCommittedSpan &&
                      !inHoverSpan &&
                      !outsideMonth &&
                      !out &&
                      "text-neutral-800 dark:text-neutral-100",
                    out && "cursor-not-allowed opacity-30",
                  )}
                >
                  {cell.day}
                </Button>
              );
            })}
          </div>
        </>
      ) : calendarView === "month" ? (
        <div className="mt-1 grid grid-cols-3 gap-1">
          {monthGrid.map((cell) => (
            <Button
              key={cell.key}
              type="button"
              variant={cell.selected ? "solid" : "ghost"}
              color={cell.selected ? calendarAccent : "neutral"}
              size="sm"
              disabled={cell.disabled || resolvedDisabled}
              className={cn(
                "min-h-10 justify-center px-2 text-sm font-medium",
                !cell.selected &&
                  !cell.disabled &&
                  "text-neutral-800 dark:text-neutral-100",
                cell.disabled && "cursor-not-allowed opacity-30",
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
        <div className="mt-1 grid grid-cols-3 gap-1">
          {yearGrid.map((cell) => (
            <Button
              key={cell.key}
              type="button"
              variant={cell.selected ? "solid" : "ghost"}
              color={cell.selected ? calendarAccent : "neutral"}
              size="sm"
              disabled={cell.disabled || resolvedDisabled}
              className={cn(
                "min-h-10 justify-center px-2 text-sm font-medium",
                !cell.selected &&
                  !cell.disabled &&
                  "text-neutral-800 dark:text-neutral-100",
                cell.disabled && "cursor-not-allowed opacity-30",
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
