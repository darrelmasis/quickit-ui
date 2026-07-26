import { createSafeContext } from "@/lib/utils/create-safe-context";

export interface AccordionContextValue {
  baseId: string;
  openValues: string[];
  toggleItem: (value: string) => void;
}

export interface AccordionItemContextValue {
  contentId: string;
  isOpen: boolean;
  triggerId: string;
  value: string;
}

export const [AccordionContext, useAccordionContext] =
  createSafeContext<AccordionContextValue>("Accordion");
export const [AccordionItemContext, useAccordionItemContext] =
  createSafeContext<AccordionItemContextValue>("AccordionItem");
