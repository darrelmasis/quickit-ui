import { useContext } from "react";
import { QuickitThemeContext } from "./quickit-theme-context";

export const QUICKIT_PRESS_EFFECTS = Object.freeze([
  "transform",
  "ripple",
]);

export function normalizeQuickitPressEffect(pressEffect) {
  return QUICKIT_PRESS_EFFECTS.includes(pressEffect)
    ? pressEffect
    : "transform";
}

export function useQuickitPressEffect() {
  return normalizeQuickitPressEffect(
    useContext(QuickitThemeContext).pressEffect,
  );
}
