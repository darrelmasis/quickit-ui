import { createContext, useContext } from "react";

export const InputGroupContext = createContext(null);

export function useInputGroup() {
  return useContext(InputGroupContext);
}
