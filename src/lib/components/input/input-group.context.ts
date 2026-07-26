import { createContext, useContext } from "react";

export interface InputGroupContextValue {
  attached?: boolean;
  color?: string;
  layout?: string;
  size?: string;
}

export const InputGroupContext = createContext<InputGroupContextValue | null>(null);

export function useInputGroup(): InputGroupContextValue | null {
  return useContext(InputGroupContext);
}
