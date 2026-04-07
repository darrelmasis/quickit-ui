import { createContext } from "react";

export const QuickitThemeContext = createContext({
  focusRing: {
    disabledComponents: [],
    enabled: true,
  },
  ripple: {
    disabledComponents: [],
    enabled: true,
  },
  pressEffect: "transform",
  theme: "light",
});
