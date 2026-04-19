import { createContext, useContext } from "react";

export const DropdownContext = createContext(null);

export function useDropdownContext(component) {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(`${component} debe usarse dentro de Dropdown`);
  }
  return context;
}
