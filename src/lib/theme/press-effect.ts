import { useContext } from "react";
import { QuickitThemeContext } from "./quickit-theme-context";

export const QUICKIT_PRESS_EFFECTS = Object.freeze([
  "none",
  "transform",
  "ripple",
]);

export function normalizeQuickitPressEffect(pressEffect: unknown): string {
  return (QUICKIT_PRESS_EFFECTS as readonly string[]).includes(pressEffect as string)
    ? (pressEffect as string)
    : "transform";
}

export function useQuickitPressEffect() {
  return normalizeQuickitPressEffect(
    useContext(QuickitThemeContext).pressEffect,
  );
}
