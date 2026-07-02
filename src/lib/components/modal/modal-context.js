import { createSafeContext } from "@/lib/utils/create-safe-context";

export const [ModalContext, useModalContext] = createSafeContext("Modal");
