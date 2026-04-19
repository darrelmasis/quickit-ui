import { createContext, useContext } from "react";

export const FormControlContext = createContext(null);

export function useFormControl() {
  return useContext(FormControlContext);
}
