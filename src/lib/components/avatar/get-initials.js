function normalizeInitialsSource(name) {
  if (typeof name === "string" || typeof name === "number") {
    return String(name).trim();
  }

  return "";
}

export function getInitials(name, { fallback = "?", max = 2 } = {}) {
  const normalizedName = normalizeInitialsSource(name);
  const safeMax = Math.max(1, Number.parseInt(max, 10) || 2);

  if (!normalizedName) {
    return fallback;
  }

  const parts = normalizedName
    .split(/[\s._-]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.length) {
    return fallback;
  }

  if (parts.length === 1) {
    return parts[0].slice(0, safeMax).toUpperCase();
  }

  if (safeMax === 1) {
    return parts[0][0].toUpperCase();
  }

  if (safeMax === 2) {
    return `${parts[0][0]}${parts.at(-1)[0]}`.toUpperCase();
  }

  return `${parts
    .slice(0, safeMax - 1)
    .map((part) => part[0])
    .join("")}${parts.at(-1)[0]}`.toUpperCase();
}
