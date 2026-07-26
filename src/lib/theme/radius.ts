import { useContext } from "react";
import { QuickitThemeContext } from "./quickit-theme-context";

const RADIUS_MAP = Object.freeze({
  sharp: "0",
  xs: "0.625rem",
  sm: "0.75rem",
  md: "0.875rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
});

export function normalizeQuickitRadius(value: unknown): string {
  if (value == null) return "0.75rem";
  const key = String(value);
  return (RADIUS_MAP as Record<string, string>)[key] ?? key;
}

export function useQuickitRadius() {
  return normalizeQuickitRadius(
    useContext(QuickitThemeContext).radius,
  );
}
