const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element: Element) =>
      element.getAttribute("aria-hidden") !== "true" &&
      !element.hasAttribute("hidden") &&
      element.getAttribute("aria-disabled") !== "true",
  );
}

export function focusFirstElement(container: HTMLElement | null, fallbackElement: HTMLElement | null) {
  const target = getFocusableElements(container)[0] ?? fallbackElement ?? null;

  target?.focus?.();
  return target ?? null;
}

export function trapFocusWithin(container: HTMLElement | null, event: KeyboardEvent) {
  const focusableElements = getFocusableElements(container);

  if (!focusableElements.length) {
    event.preventDefault();
    container?.focus?.();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements.at(-1);
  const activeElement = document.activeElement;

  if (!container?.contains(activeElement as Node)) {
    event.preventDefault();
    (((event as KeyboardEvent).shiftKey ? last : first) as HTMLElement)?.focus?.();
    return;
  }

  if ((event as KeyboardEvent).shiftKey && activeElement === first) {
    event.preventDefault();
    (last as HTMLElement)?.focus?.();
    return;
  }

  if (!(event as KeyboardEvent).shiftKey && activeElement === last) {
    event.preventDefault();
    (first as HTMLElement)?.focus?.();
  }
}
