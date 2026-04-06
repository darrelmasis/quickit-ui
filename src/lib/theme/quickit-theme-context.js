import { createContext } from "react";

export const QuickitThemeContext = createContext({
  focusRing: {
    disabledComponents: [],
    enabled: true,
  },
  theme: "light",
});
