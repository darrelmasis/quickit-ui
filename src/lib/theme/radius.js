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

export function normalizeQuickitRadius(value) {
  if (value == null) return "0.75rem";
  return RADIUS_MAP[value] ?? String(value);
}

export function useQuickitRadius() {
  return normalizeQuickitRadius(
    useContext(QuickitThemeContext).radius,
  );
}
