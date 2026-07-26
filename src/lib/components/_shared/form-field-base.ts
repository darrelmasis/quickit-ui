import { getControlRadius } from "@/lib/utils";

export const FORM_FIELD_AUTOFILL_CLASS = "qk-form-field-autofill";

export const FORM_FIELD_BASE_CLASSES = [
  "w-full border outline-none",
  "transition-[background-color,border-color,color,box-shadow] duration-200",
  "placeholder:text-current/45",
  "focus-visible:ring-4 focus-visible:ring-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

export const FORM_FIELD_SIZE_CLASSES: Record<string, string> = {
  sm: "h-9",
  md: "h-11",
  lg: "h-12",
};

export function getFormFieldRadius(shape = "square", size = "md") {
  return shape === "pill" ? "rounded-full" : getControlRadius(size);
}

export function resolveFormFieldShape(shape: string) {
  return shape === "pill" ? "pill" : "square";
}
