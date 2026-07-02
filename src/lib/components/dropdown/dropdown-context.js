import { createSafeContext } from "@/lib/utils/create-safe-context";

export const [DropdownContext, useDropdownContext] =
  createSafeContext("Dropdown");
