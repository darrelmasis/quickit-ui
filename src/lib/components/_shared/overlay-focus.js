const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export function getFocusableElements(container) {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      element.getAttribute("aria-hidden") !== "true" &&
      !element.hasAttribute("hidden") &&
      element.getAttribute("aria-disabled") !== "true",
  );
}

export function focusFirstElement(container, fallbackElement) {
  const target = getFocusableElements(container)[0] ?? fallbackElement ?? null;

  target?.focus?.();
  return target ?? null;
}

export function trapFocusWithin(container, event) {
  const focusableElements = getFocusableElements(container);

  if (!focusableElements.length) {
    event.preventDefault();
    container?.focus?.();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements.at(-1);
  const activeElement = document.activeElement;

  if (!container?.contains(activeElement)) {
    event.preventDefault();
    (event.shiftKey ? last : first)?.focus?.();
    return;
  }

  if (event.shiftKey && activeElement === first) {
    event.preventDefault();
    last?.focus?.();
    return;
  }

  if (!event.shiftKey && activeElement === last) {
    event.preventDefault();
    first?.focus?.();
  }
}
