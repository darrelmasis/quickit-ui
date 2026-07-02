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

export function resolveFormFieldTheme(theme) {
  return resolveQuickitThemeMode(theme);
}

export function resolveFormFieldColor(color) {
  return resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
}

export function getFormFieldAutofillStyle({
  color = "neutral",
  invalid = false,
  style,
  theme = "light",
}) {
  const resolvedTheme = resolveFormFieldTheme(theme);
  const resolvedColor = resolveFormFieldColor(color);
  const autofillTokens = invalid
    ? FORM_FIELD_AUTOFILL_TOKENS[resolvedTheme].invalid
    : FORM_FIELD_AUTOFILL_TOKENS[resolvedTheme][resolvedColor];

  // Chrome y Safari pintan autofill fuera del sistema visual del componente.
  // Estas variables nos dejan recolorearlo según tema y variante sin duplicar
  // reglas CSS por componente.
  return {
    ...style,
    "--qi-field-autofill-bg": autofillTokens.background,
    "--qi-field-autofill-border": autofillTokens.border,
    "--qi-field-autofill-text": autofillTokens.text,
    "--qi-field-autofill-caret": autofillTokens.text,
  };
}
