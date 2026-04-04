import { createContext, useContext } from "react";

export const FormControlContext = createContext(null);

export function useFormControlContext(componentName) {
  const context = useContext(FormControlContext);

  if (!context && componentName) {
    return null;
  }

  return context;
}
