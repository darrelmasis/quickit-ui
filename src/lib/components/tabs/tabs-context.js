import { createContext, useContext } from "react";

export const TabsContext = createContext(null);

export function useTabsContext(componentName) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <Tabs>.`);
  }

  return context;
}
