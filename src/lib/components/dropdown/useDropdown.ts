import { useDropdownContext } from "./dropdown-context";

export function useDropdown() {
  return useDropdownContext("useDropdown");
}
