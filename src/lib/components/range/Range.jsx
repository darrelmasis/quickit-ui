import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import Tooltip from "@/lib/components/tooltip/Tooltip";

const RANGE_PRIMITIVES = {
  root: "relative flex w-full touch-none select-none items-center",
  track: "relative h-2 w-full grow overflow-hidden rounded-full border",
  range: "absolute",
  thumb: [
    "block size-5 rounded-full border bg-white ring-offset-white",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
};

import { RANGE_THEME_CLASSES } from "@/lib/theme/theme-classes";

function clampRangeValue(rawValue, min, max) {
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) {
    return min;
  }
  return Math.min(max, Math.max(min, parsed));
}

function snapToStep(rawValue, min, max, step) {
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const clamped = clampRangeValue(rawValue, min, max);
  const snapped =
    Math.round((clamped - min) / safeStep) * safeStep + min;
  return clampRangeValue(snapped, min, max);
}

function normalizeRangeTuple(rawValue, min, max) {
  if (Array.isArray(rawValue)) {
    const start = clampRangeValue(rawValue[0] ?? min, min, max);
    const end = clampRangeValue(rawValue[1] ?? max, min, max);
    return start <= end ? [start, end] : [end, start];
  }
  const fallback = clampRangeValue(rawValue ?? min, min, max);
  return [fallback, fallback];
}

const Range = forwardRef(function Range(
  {
    allowWheel = true,
    className,
    color = "neutral",
    disabled = false,
    id,
    invalid = false,
    max = 100,
    min = 0,
    onValueChange,
    orientation = "horizontal",
    required = false,
    range = false,
    showValueTooltip = true,
    step = 1,
    tooltipOffset = 12,
    tooltipCrossOffset = 0,
    tooltipHideDelay = 900,
    tooltipPlacement,
    tooltipFormatter,
    getAriaValueText,
    startLabel = "Valor mínimo",
    endLabel = "Valor máximo",
    startName,
    endName,
    value,
    defaultValue,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    name,
    onBlur: onBlurProp,
    onChange: onChangeProp,
    onFocus: onFocusProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    onPointerDown: onPointerDownProp,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("range");
  const ui = RANGE_THEME_CLASSES[theme];
  const field = useFormControl();
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedId = id ?? field?.controlId ?? generatedId;
  const labelledBy = [ariaLabelledBy, field?.labelId].filter(Boolean).join(" ") || undefined;
  const describedBy = [
    ariaDescribedBy,
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ].filter(Boolean).join(" ") || undefined;
  const startThumbLabelId = `${resolvedId}-start-label`;
  const endThumbLabelId = `${resolvedId}-end-label`;
  const resolvedStartName = startName ?? name;
  const resolvedEndName = endName ?? (name ? `${name}End` : undefined);
  const isVertical = orientation === "vertical";
  const numericStep = Number(step);
  const wheelStep = Number.isFinite(numericStep) && numericStep > 0 ? numericStep : 1;
  const rootRef = useRef(null);
  const isDual =
    range ||
    Array.isArray(value) ||
    Array.isArray(defaultValue);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(() =>
    isDual
      ? normalizeRangeTuple(defaultValue ?? [min, max], min, max)
      : clampRangeValue(defaultValue ?? min, min, max),
  );
  const [activeThumb, setActiveThumb] = useState("start");
  const [hoveredThumb, setHoveredThumb] = useState(null);
  const [focusedThumb, setFocusedThumb] = useState(null);
  const [draggingThumb, setDraggingThumb] = useState(null);
  const [interactionTooltipVisible, setInteractionTooltipVisible] = useState(false);
  const [interactionThumb, setInteractionThumb] = useState("start");
  const activeThumbRef = useRef("start");
  const hoveredThumbRef = useRef(null);
  const tooltipVisibilityTimeoutRef = useRef(null);

  const [startValue, endValue] = useMemo(() => {
    if (isDual) {
      const tuple = isControlled
        ? normalizeRangeTuple(value, min, max)
        : normalizeRangeTuple(internalValue, min, max);
      return tuple;
    }

    const single = isControlled
      ? clampRangeValue(value, min, max)
      : clampRangeValue(internalValue, min, max);
    return [single, single];
  }, [internalValue, isControlled, isDual, max, min, value]);

  const startPercent = useMemo(() => {
    if (max <= min) {
      return 0;
    }
    return ((startValue - min) / (max - min)) * 100;
  }, [max, min, startValue]);

  const endPercent = useMemo(() => {
    if (max <= min) {
      return 0;
    }
    return ((endValue - min) / (max - min)) * 100;
  }, [endValue, max, min]);

  const fillLeft = isDual ? startPercent : 0;
  const fillWidth = isDual ? Math.max(0, endPercent - startPercent) : startPercent;
  const resolvedTooltipPlacement = tooltipPlacement ?? (isVertical ? "right" : "top");
  const tooltipFloatingOffset = useMemo(() => {
    const mainAxis = Number.isFinite(Number(tooltipOffset))
      ? Number(tooltipOffset)
      : 12;
    const crossAxis = Number.isFinite(Number(tooltipCrossOffset))
      ? Number(tooltipCrossOffset)
      : 0;
    return { mainAxis, crossAxis };
  }, [tooltipCrossOffset, tooltipOffset]);
  const tooltipThumb =
    draggingThumb ??
    hoveredThumb ??
    focusedThumb ??
    interactionThumb ??
    activeThumb;
  const shouldShowTooltip =
    showValueTooltip &&
    (
      hoveredThumb !== null ||
      focusedThumb !== null ||
      draggingThumb !== null ||
      interactionTooltipVisible
    );

  const formatTooltipValue = (nextValue, thumb) => {
    if (typeof tooltipFormatter === "function") {
      return tooltipFormatter(nextValue, thumb);
    }
    return String(nextValue);
  };

  const formatAriaValueText = (nextValue, thumb) => {
    if (typeof getAriaValueText === "function") {
      return String(getAriaValueText(nextValue, thumb));
    }
    if (typeof tooltipFormatter === "function") {
      const formatted = tooltipFormatter(nextValue, thumb);
      if (typeof formatted === "string" || typeof formatted === "number") {
        return String(formatted);
      }
    }
    return String(nextValue);
  };

  const clearTooltipHideTimeout = useCallback(() => {
    if (tooltipVisibilityTimeoutRef.current) {
      window.clearTimeout(tooltipVisibilityTimeoutRef.current);
      tooltipVisibilityTimeoutRef.current = null;
    }
  }, []);

  const showTooltipForThumb = useCallback((thumb) => {
    if (thumb === "start" || thumb === "end") {
      setInteractionThumb(thumb);
      setActiveThumb(thumb);
      activeThumbRef.current = thumb;
    }
    setInteractionTooltipVisible(true);
    clearTooltipHideTimeout();
  }, [clearTooltipHideTimeout]);

  const scheduleTooltipHide = useCallback(() => {
    clearTooltipHideTimeout();
    const parsedDelay = Number(tooltipHideDelay);
    const safeDelay = Number.isFinite(parsedDelay) && parsedDelay >= 0
      ? parsedDelay
      : 900;
    tooltipVisibilityTimeoutRef.current = window.setTimeout(() => {
      setInteractionTooltipVisible(false);
    }, safeDelay);
  }, [clearTooltipHideTimeout, tooltipHideDelay]);

  useEffect(() => {
    return () => {
      clearTooltipHideTimeout();
    };
  }, [clearTooltipHideTimeout]);

  const inputOrientationStyle = isVertical
    ? {
        writingMode: "vertical-lr",
        direction: "rtl",
      }
    : undefined;

  const emitValue = useCallback((nextValue, thumb) => {
    showTooltipForThumb(thumb);
    scheduleTooltipHide();
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }, [isControlled, onValueChange, scheduleTooltipHide, showTooltipForThumb]);

  const commitFromPointer = (pointerEvent, forcedThumb) => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const rect = root.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const ratio = isVertical
      ? 1 - (pointerEvent.clientY - rect.top) / rect.height
      : (pointerEvent.clientX - rect.left) / rect.width;
    const rawValue = min + Math.min(1, Math.max(0, ratio)) * (max - min);
    const nextPointerValue = snapToStep(rawValue, min, max, wheelStep);

    if (isDual) {
      const closestThumb =
        forcedThumb ??
        hoveredThumbRef.current ??
        (Math.abs(nextPointerValue - startValue) <=
        Math.abs(nextPointerValue - endValue)
          ? "start"
          : "end");
      setActiveThumb(closestThumb);
      activeThumbRef.current = closestThumb;

      if (closestThumb === "start") {
        const nextStart = Math.min(nextPointerValue, endValue);
        emitValue([nextStart, endValue], "start");
      } else {
        const nextEnd = Math.max(nextPointerValue, startValue);
        emitValue([startValue, nextEnd], "end");
      }
      return;
    }

    emitValue(nextPointerValue, "start");
  };

  const handleWheel = useCallback((event) => {
    if (!allowWheel || resolvedDisabled || max <= min) {
      return;
    }

    // Evita que la rueda haga scroll en la página solo cuando la interacción está activa.
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    const delta = direction * wheelStep;

    if (isDual) {
      const targetThumb = hoveredThumbRef.current ?? activeThumbRef.current;
      const adjustStart = targetThumb === "start";
      const nextStart = adjustStart
        ? clampRangeValue(startValue + delta, min, Math.min(max, endValue))
        : startValue;
      const nextEnd = adjustStart
        ? endValue
        : clampRangeValue(endValue + delta, Math.max(min, startValue), max);
      const nextTuple = [nextStart, nextEnd];

      emitValue(nextTuple, targetThumb);
      return;
    }

    const nextValue = clampRangeValue(startValue + delta, min, max);
    emitValue(nextValue, "start");
  }, [
    allowWheel,
    resolvedDisabled,
    isDual,
    activeThumbRef,
    hoveredThumbRef,
    wheelStep,
    startValue,
    endValue,
    min,
    max,
    emitValue,
  ]);

  const handlePointerDown = (event) => {
    if (resolvedDisabled || max <= min) {
      return;
    }

    event.preventDefault();
    commitFromPointer(event.nativeEvent);
    showTooltipForThumb(activeThumbRef.current);
    setDraggingThumb(activeThumbRef.current);

    const onMove = (moveEvent) => {
      commitFromPointer(moveEvent, activeThumbRef.current);
      showTooltipForThumb(activeThumbRef.current);
    };
    const onUp = () => {
      setDraggingThumb(null);
      scheduleTooltipHide();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const handleNativeWheel = (event) => {
      handleWheel(event);
    };

    root.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      root.removeEventListener("wheel", handleNativeWheel);
    };
  }, [handleWheel]);

  return (
    <div
      ref={rootRef}
      className={cn(
        RANGE_PRIMITIVES.root,
        isVertical ? "h-52 w-10 justify-center" : "h-10 w-full",
        resolvedDisabled && "opacity-60",
        className,
      )}
      onPointerDown={(event) => {
        handlePointerDown(event);
        onPointerDownProp?.(event);
      }}
    >
      {isDual ? (
        <>
          <span id={startThumbLabelId} className="sr-only">
            {startLabel}
          </span>
          <span id={endThumbLabelId} className="sr-only">
            {endLabel}
          </span>
        </>
      ) : null}
      <div
        className={cn(
          RANGE_PRIMITIVES.track,
          isVertical ? "h-full w-2 grow-0 shrink-0" : "h-2 w-full",
          ui.track,
        )}
      >
        <div
          className={cn(
            RANGE_PRIMITIVES.range,
            resolvedInvalid ? ui.invalid : ui.colors[color] ?? ui.colors.neutral,
          )}
          style={
            isVertical
              ? {
                  top: `${100 - (fillLeft + fillWidth)}%`,
                  height: `${fillWidth}%`,
                  left: 0,
                  right: 0,
                  width: "100%",
                }
              : {
                  left: `${fillLeft}%`,
                  top: 0,
                  bottom: 0,
                  width: `${fillWidth}%`,
                }
          }
        />
      </div>
      {isDual ? (
        <>
          {resolvedStartName ? (
            <input
              type="hidden"
              name={resolvedStartName}
              value={startValue}
              disabled={resolvedDisabled}
            />
          ) : null}
          {resolvedEndName ? (
            <input
              type="hidden"
              name={resolvedEndName}
              value={endValue}
              disabled={resolvedDisabled}
            />
          ) : null}
          <input
            ref={ref}
            {...props}
            type="range"
            id={resolvedId}
            min={min}
            max={max}
            step={step}
            value={startValue}
            name={undefined}
            aria-describedby={describedBy}
            aria-label={undefined}
            aria-labelledby={labelledBy ? `${labelledBy} ${startThumbLabelId}` : startThumbLabelId}
            aria-valuetext={formatAriaValueText(startValue, "start")}
            required={resolvedRequired}
            disabled={resolvedDisabled}
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-not-allowed",
              activeThumb === "start" ? "z-30" : "z-20",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5",
              "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-5",
            )}
            style={inputOrientationStyle}
            onPointerDown={(event) => {
              setActiveThumb("start");
              activeThumbRef.current = "start";
              showTooltipForThumb("start");
              setDraggingThumb("start");
              onPointerDownProp?.(event);
            }}
            onMouseEnter={(event) => {
              setHoveredThumb("start");
              hoveredThumbRef.current = "start";
              showTooltipForThumb("start");
              onMouseEnterProp?.(event);
            }}
            onMouseLeave={(event) => {
              setHoveredThumb((current) =>
                current === "start" ? null : current,
              );
              if (hoveredThumbRef.current === "start") {
                hoveredThumbRef.current = null;
              }
              scheduleTooltipHide();
              onMouseLeaveProp?.(event);
            }}
            onFocus={(event) => {
              setActiveThumb("start");
              activeThumbRef.current = "start";
              setFocusedThumb("start");
              showTooltipForThumb("start");
              onFocusProp?.(event);
            }}
            onBlur={(event) => {
              setFocusedThumb((current) =>
                current === "start" ? null : current,
              );
              scheduleTooltipHide();
              onBlurProp?.(event);
            }}
            onChange={(event) => {
              const nextStart = Math.min(
                parseFloat(event.target.value),
                endValue,
              );
              const nextTuple = [nextStart, endValue];
              showTooltipForThumb("start");
              scheduleTooltipHide();

              if (!isControlled) {
                setInternalValue(nextTuple);
              }
              onChangeProp?.(event);
              onValueChange?.(nextTuple);
            }}
          />
          <input
            {...props}
            type="range"
            id={`${resolvedId}-end`}
            min={min}
            max={max}
            step={step}
            value={endValue}
            name={undefined}
            aria-describedby={describedBy}
            aria-label={undefined}
            aria-labelledby={labelledBy ? `${labelledBy} ${endThumbLabelId}` : endThumbLabelId}
            aria-valuetext={formatAriaValueText(endValue, "end")}
            required={resolvedRequired}
            disabled={resolvedDisabled}
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-not-allowed",
              activeThumb === "end" ? "z-30" : "z-20",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5",
              "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-5",
            )}
            style={inputOrientationStyle}
            onPointerDown={(event) => {
              setActiveThumb("end");
              activeThumbRef.current = "end";
              showTooltipForThumb("end");
              setDraggingThumb("end");
              onPointerDownProp?.(event);
            }}
            onMouseEnter={(event) => {
              setHoveredThumb("end");
              hoveredThumbRef.current = "end";
              showTooltipForThumb("end");
              onMouseEnterProp?.(event);
            }}
            onMouseLeave={(event) => {
              setHoveredThumb((current) =>
                current === "end" ? null : current,
              );
              if (hoveredThumbRef.current === "end") {
                hoveredThumbRef.current = null;
              }
              scheduleTooltipHide();
              onMouseLeaveProp?.(event);
            }}
            onFocus={(event) => {
              setActiveThumb("end");
              activeThumbRef.current = "end";
              setFocusedThumb("end");
              showTooltipForThumb("end");
              onFocusProp?.(event);
            }}
            onBlur={(event) => {
              setFocusedThumb((current) =>
                current === "end" ? null : current,
              );
              scheduleTooltipHide();
              onBlurProp?.(event);
            }}
            onChange={(event) => {
              const nextEnd = Math.max(
                parseFloat(event.target.value),
                startValue,
              );
              const nextTuple = [startValue, nextEnd];
              showTooltipForThumb("end");
              scheduleTooltipHide();

              if (!isControlled) {
                setInternalValue(nextTuple);
              }
              onChangeProp?.(event);
              onValueChange?.(nextTuple);
            }}
          />
          {shouldShowTooltip && tooltipThumb === "start" ? (
            <Tooltip
              asChild
              content={formatTooltipValue(startValue, "start")}
              trigger="manual"
              open
              placement={resolvedTooltipPlacement}
              offset={tooltipFloatingOffset}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute z-10",
                  isVertical
                    ? "left-1/2 -translate-x-1/2"
                    : "top-1/2 -translate-y-1/2",
                )}
                style={
                  isVertical
                    ? { bottom: `calc(${startPercent}% - 10px)` }
                    : { left: `calc(${startPercent}% - 10px)` }
                }
              >
                <div
                  className={cn(
                    resolveQuickitFocusRingClasses(
                      focusRingEnabled,
                      RANGE_PRIMITIVES.thumb,
                    ),
                    ui.thumb,
                    hoveredThumb === "start" && "",
                  )}
                />
              </span>
            </Tooltip>
          ) : (
            <div
              aria-hidden="true"
              className={cn(
                resolveQuickitFocusRingClasses(
                  focusRingEnabled,
                  RANGE_PRIMITIVES.thumb,
                ),
                ui.thumb,
                hoveredThumb === "start" && "",
                "absolute z-10",
                isVertical
                  ? "left-1/2 -translate-x-1/2"
                  : "top-1/2 -translate-y-1/2",
              )}
              style={
                isVertical
                  ? { bottom: `calc(${startPercent}% - 10px)` }
                  : { left: `calc(${startPercent}% - 10px)` }
              }
            />
          )}
          {shouldShowTooltip && tooltipThumb === "end" ? (
            <Tooltip
              asChild
              content={formatTooltipValue(endValue, "end")}
              trigger="manual"
              open
              placement={resolvedTooltipPlacement}
              offset={tooltipFloatingOffset}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute z-10",
                  isVertical
                    ? "left-1/2 -translate-x-1/2"
                    : "top-1/2 -translate-y-1/2",
                )}
                style={
                  isVertical
                    ? { bottom: `calc(${endPercent}% - 10px)` }
                    : { left: `calc(${endPercent}% - 10px)` }
                }
              >
                <div
                  className={cn(
                    resolveQuickitFocusRingClasses(
                      focusRingEnabled,
                      RANGE_PRIMITIVES.thumb,
                    ),
                    ui.thumb,
                    hoveredThumb === "end" && "",
                  )}
                />
              </span>
            </Tooltip>
          ) : (
            <div
              aria-hidden="true"
              className={cn(
                resolveQuickitFocusRingClasses(
                  focusRingEnabled,
                  RANGE_PRIMITIVES.thumb,
                ),
                ui.thumb,
                hoveredThumb === "end" && "",
                "absolute z-10",
                isVertical
                  ? "left-1/2 -translate-x-1/2"
                  : "top-1/2 -translate-y-1/2",
              )}
              style={
                isVertical
                  ? { bottom: `calc(${endPercent}% - 10px)` }
                  : { left: `calc(${endPercent}% - 10px)` }
              }
            />
          )}
        </>
      ) : (
        <>
          <input
            ref={ref}
            {...props}
            type="range"
            id={resolvedId}
            min={min}
            max={max}
            step={step}
            value={startValue}
            name={name}
            aria-describedby={describedBy}
            aria-label={ariaLabel}
            aria-labelledby={labelledBy}
            aria-valuetext={formatAriaValueText(startValue, "start")}
            required={resolvedRequired}
            disabled={resolvedDisabled}
            className={cn(
              "pointer-events-none absolute inset-0 z-20 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-not-allowed",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5",
              "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-5",
            )}
            style={inputOrientationStyle}
            onChange={(event) => {
              const newValue = parseFloat(event.target.value);
              showTooltipForThumb("start");
              scheduleTooltipHide();
              if (!isControlled) {
                setInternalValue(newValue);
              }
              onChangeProp?.(event);
              onValueChange?.(newValue);
            }}
            onFocus={(event) => {
              setFocusedThumb("start");
              showTooltipForThumb("start");
              onFocusProp?.(event);
            }}
            onBlur={(event) => {
              setFocusedThumb(null);
              scheduleTooltipHide();
              onBlurProp?.(event);
            }}
          />
          {shouldShowTooltip ? (
            <Tooltip
              asChild
              content={formatTooltipValue(startValue, "start")}
              trigger="manual"
              open
              placement={resolvedTooltipPlacement}
              offset={tooltipFloatingOffset}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute z-10",
                  isVertical
                    ? "left-1/2 -translate-x-1/2"
                    : "top-1/2 -translate-y-1/2",
                )}
                style={
                  isVertical
                    ? { bottom: `calc(${startPercent}% - 10px)` }
                    : { left: `calc(${startPercent}% - 10px)` }
                }
              >
                <div
                  className={cn(
                    resolveQuickitFocusRingClasses(
                      focusRingEnabled,
                      RANGE_PRIMITIVES.thumb,
                    ),
                    ui.thumb,
                  )}
                />
              </span>
            </Tooltip>
          ) : (
            <div
              aria-hidden="true"
              className={cn(
                resolveQuickitFocusRingClasses(
                  focusRingEnabled,
                  RANGE_PRIMITIVES.thumb,
                ),
                ui.thumb,
                "absolute z-10",
                isVertical
                  ? "left-1/2 -translate-x-1/2"
                  : "top-1/2 -translate-y-1/2",
              )}
              style={
                isVertical
                  ? { bottom: `calc(${startPercent}% - 10px)` }
                  : { left: `calc(${startPercent}% - 10px)` }
              }
            />
          )}
        </>
      )}
    </div>
  );
});

export { Range };
export default Range;
