import { createContext, useContext } from "react";

export const DrawerContext = createContext(null);

export function useDrawerContext(componentName) {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <Drawer>.`);
  }

  return context;
}
