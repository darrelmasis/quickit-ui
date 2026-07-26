import { createSafeContext } from "@/lib/utils/create-safe-context";

export interface DropdownContextValue {
  close: () => void;
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

export const [DropdownContext, useDropdownContext] =
  createSafeContext<DropdownContextValue>("Dropdown");
