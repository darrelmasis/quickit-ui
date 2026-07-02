import { createSafeContext } from "@/lib/utils/create-safe-context";

export const [AccordionContext, useAccordionContext] =
  createSafeContext("Accordion");
export const [AccordionItemContext, useAccordionItemContext] =
  createSafeContext("AccordionItem");
