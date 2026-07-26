import type { CSSProperties } from "react";
import { resolveQuickitThemeMode } from "@/lib/theme/quickit-theme-context";
import {
  QUICKIT_SEMANTIC_COLORS,
  resolveQuickitToken,
} from "@/lib/tokens";
import {
  FORM_FIELD_THEME_CLASSES,
  FORM_FIELD_AUTOFILL_TOKENS,
} from "@/lib/theme/theme-classes";

export {
  FORM_FIELD_THEME_CLASSES,
};

export function resolveFormFieldTheme(theme: string) {
  return resolveQuickitThemeMode(theme);
}

export function resolveFormFieldColor(color: string) {
  return resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
}

export function getFormFieldAutofillStyle({
  color = "neutral",
  invalid = false,
  style,
  theme = "light",
}: {
  color?: string;
  invalid?: boolean;
  style?: CSSProperties;
  theme?: string;
}) {
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const autofillTokens = invalid
    ? (FORM_FIELD_AUTOFILL_TOKENS as Record<string, Record<string, { background: string; border: string; text: string }>>)[resolvedTheme].invalid
    : (FORM_FIELD_AUTOFILL_TOKENS as Record<string, Record<string, { background: string; border: string; text: string }>>)[resolvedTheme][resolvedColor];

  // Chrome y Safari pintan autofill fuera del sistema visual del componente.
  // Estas variables nos dejan recolorearlo según tema y variante sin duplicar
  // reglas CSS por componente.
  return {
    ...style,
    "--qk-field-autofill-bg": autofillTokens.background,
    "--qk-field-autofill-border": autofillTokens.border,
    "--qk-field-autofill-text": autofillTokens.text,
    "--qk-field-autofill-caret": autofillTokens.text,
  };
}
