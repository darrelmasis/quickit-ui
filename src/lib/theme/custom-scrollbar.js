import { useContext } from "react";
import { QuickitThemeContext } from "./quickit-theme-context";

export function normalizeQuickitCustomScrollbar(value) {
  return value === true || value === false ? value : true;
}

export function useQuickitCustomScrollbar() {
  return normalizeQuickitCustomScrollbar(
    useContext(QuickitThemeContext).customScrollbar,
  );
}
