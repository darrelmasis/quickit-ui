import { createContext, useContext } from "react";

export interface FormControlContextValue {
  controlId?: string;
  descriptionId?: string;
  disabled?: boolean;
  invalid?: boolean;
  labelId?: string;
  messageId?: string;
  required?: boolean;
}

export const FormControlContext = createContext<FormControlContextValue | null>(null);

export function useFormControl(): FormControlContextValue | null {
  return useContext(FormControlContext);
}
