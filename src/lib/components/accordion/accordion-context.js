import { createContext, useContext } from "react";

export const AccordionContext = createContext(null);
export const AccordionItemContext = createContext(null);

export function useAccordionContext(componentName) {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <Accordion>.`);
  }

  return context;
}

export function useAccordionItemContext(componentName) {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(`${componentName} debe usarse dentro de <AccordionItem>.`);
  }

  return context;
}
