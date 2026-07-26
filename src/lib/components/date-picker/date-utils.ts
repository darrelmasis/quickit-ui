export function startOfDay(d: Date) {
  const next = new Date(d);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function isSameYear(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear();
}

export function clampDate(d: Date, min: Date | null, max: Date | null) {
  if (min && d < min) {
    return new Date(min);
  }
  if (max && d > max) {
    return new Date(max);
  }
  return d;
}

export function dayTime(d: Date) {
  return startOfDay(d).getTime();
}

export function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export function startOfYear(d: Date) {
  return new Date(d.getFullYear(), 0, 1);
}

export function endOfYear(d: Date) {
  return new Date(d.getFullYear(), 11, 31);
}

export function monthOutsideRange(d: Date, min: Date | null, max: Date | null) {
  const start = startOfMonth(d);
  const end = endOfMonth(d);
  return (min && end < min) || (max && start > max) || false;
}

export function yearOutsideRange(d: Date, min: Date | null, max: Date | null) {
  const start = startOfYear(d);
  const end = endOfYear(d);
  return (min && end < min) || (max && start > max) || false;
}

export function isStrictlyBetween(date: Date, a: Date, b: Date) {
  const t = dayTime(date);
  const lo = Math.min(dayTime(a), dayTime(b));
  const hi = Math.max(dayTime(a), dayTime(b));
  return t > lo && t < hi;
}

export function parseSingleValue(raw: string | number | Date | null | undefined) {
  if (raw == null || raw === "") {
    return null;
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return startOfDay(parsed);
}

export function parseRangeValue(raw: { from?: string | number | Date | null; to?: string | number | Date | null } | null | undefined) {
  if (raw == null) {
    return { from: null, to: null };
  }
  const from = raw.from != null ? parseSingleValue(raw.from) : null;
  const to = raw.to != null ? parseSingleValue(raw.to) : null;
  return { from, to };
}

export function serializeDateValue(value: Date | null | undefined) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return "";
  }
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
