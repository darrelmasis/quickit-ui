import { getFormFieldRadius, resolveFormFieldShape } from "@/lib/components/_shared/form-field-base";

export function resolveInputShape(shape: string) {
  return resolveFormFieldShape(shape);
}

export function getInputRadius(shape = "square", size = "md") {
  return getFormFieldRadius(shape, size);
}

export function normalizeInputValue(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export function assignInputRef(ref: React.Ref<unknown>, node: HTMLElement | null) {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(node);
    return;
  }

  (ref as React.MutableRefObject<HTMLElement | null>).current = node;
}

export function composeInputRefs(...refs: React.Ref<unknown>[]) {
  return (node: HTMLElement | null) => {
    refs.forEach((ref) => assignInputRef(ref, node));
  };
}

export function dispatchNativeInputValue(input: HTMLInputElement, nextValue: string) {
  if (!input) {
    return;
  }

  const descriptor = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  );

  descriptor?.set?.call(input, nextValue);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
