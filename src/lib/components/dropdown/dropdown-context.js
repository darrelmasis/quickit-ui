import { createContext, useContext } from "react";

export const DropdownContext = createContext(null);

export function useDropdownContext(componentName) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <Dropdown>.`);
  }

  return context;
}
