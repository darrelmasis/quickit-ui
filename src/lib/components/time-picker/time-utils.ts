export interface TimeValue { hours: number; minutes: number }

export function parseTimeValue(raw: string | number | Date | null | undefined): TimeValue | null {
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

export function normalizeTimeValue(value: TimeValue | null | undefined) {
  if (!value) {
    return "";
  }

  return `${String(value.hours).padStart(2, "0")}:${String(
    value.minutes,
  ).padStart(2, "0")}`;
}

export function formatDisplayTime(value: TimeValue | null | undefined, hourCycle: string) {
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

export function timeToMinutes(value: TimeValue | null | undefined): number | null {
  if (!value) {
    return null;
  }
  return value.hours * 60 + value.minutes;
}

export function isTimeOutsideRange(value: TimeValue, min: TimeValue | null | undefined, max: TimeValue | null | undefined) {
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

export function clampTimeValue(value: TimeValue | null | undefined, min: TimeValue | null | undefined, max: TimeValue | null | undefined): TimeValue | null {
  if (!value) {
    return null;
  }
  const minutes = timeToMinutes(value);
  const minMinutes = timeToMinutes(min);
  const maxMinutes = timeToMinutes(max);
  if (minutes == null) {
    return null;
  }
  if (minMinutes != null && minutes < minMinutes) {
    return min ?? null;
  }
  if (maxMinutes != null && minutes > maxMinutes) {
    return max ?? null;
  }
  return value;
}

export function getDisplayHour(value: TimeValue) {
  const normalized = value.hours % 12;
  return normalized === 0 ? 12 : normalized;
}

export function getPeriod(value: TimeValue) {
  return value.hours >= 12 ? "PM" : "AM";
}

export function applyDisplayHour(value: TimeValue, nextHour: number, hourCycle: string) {
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

export function applyPeriod(value: TimeValue, nextPeriod: string) {
  const displayHour = getDisplayHour(value);
  if (nextPeriod === "AM") {
    return { ...value, hours: displayHour % 12 };
  }
  return {
    ...value,
    hours: displayHour % 12 === 0 ? 12 : (displayHour % 12) + 12,
  };
}

export function getCurrentRoundedTime(step: number): TimeValue {
  const now = new Date();
  const hours = now.getHours();
  const minuteBlock = Math.round(now.getMinutes() / step) * step;
  if (minuteBlock >= 60) {
    return { hours: (hours + 1) % 24, minutes: 0 };
  }
  return { hours, minutes: minuteBlock };
}

export function resolveMinuteStep(value: number | null | undefined) {
  if (!Number.isFinite(value)) {
    return 5;
  }
  const next = Math.floor(value as number);
  return Math.min(60, Math.max(1, next));
}

export function getMinuteOptions(step: number, selectedMinutes: number) {
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

export function getInitialDraftValue(selected: TimeValue | null | undefined, step: number, min: TimeValue | null | undefined, max: TimeValue | null | undefined) {
  if (selected) {
    return clampTimeValue(selected, min, max) ?? selected;
  }
  return clampTimeValue(getCurrentRoundedTime(step), min, max) ?? {
    hours: 9,
    minutes: 0,
  };
}

export function getSafeDraftValue(current: TimeValue | null | undefined, selectedValue: TimeValue | null | undefined, step: number, min: TimeValue | null | undefined, max: TimeValue | null | undefined) {
  return current ?? getInitialDraftValue(selectedValue, step, min, max);
}
