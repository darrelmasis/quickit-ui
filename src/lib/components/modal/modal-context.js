import { createContext, useContext } from "react";

export const ModalContext = createContext(null);

export function useModalContext(componentName) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <Modal>.`);
  }

  return context;
}
