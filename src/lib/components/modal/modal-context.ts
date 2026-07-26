import { createSafeContext } from "@/lib/utils/create-safe-context";

export interface ModalContextValue {
  blockingOverlay: boolean;
  close: () => void;
  closeOnEscape: boolean;
  descriptionId: string;
  effectiveDescriptionId: string | null;
  effectiveTitleId: string | null;
  hasDescription: boolean;
  hasTitle: boolean;
  instanceZIndex: number;
  isTopmost: () => boolean;
  maxWidth: string;
  open: boolean;
  outsideClick: boolean;
  registerDescription: (id: string) => () => void;
  registerTitle: (id: string) => () => void;
  rendered: boolean;
  setOpen: (next: boolean) => void;
  setTriggerElement: (el: HTMLElement | null) => void;
  showCloseButton: boolean;
  titleId: string;
  visible: boolean;
}

export const [ModalContext, useModalContext] = createSafeContext<ModalContextValue>("Modal");
