export { QuickitLangContext, useQuickitLang } from "./lang-context";
export type { QuickitLang } from "./lang-context";
export { TXT_ES } from "./texts-es";
export { TXT_EN } from "./texts-en";

import { useQuickitLang } from "./lang-context";
import type { TXTType } from "./texts-es";
import { TXT_ES } from "./texts-es";
import { TXT_EN } from "./texts-en";

export function useTXT(): TXTType {
  const lang = useQuickitLang();
  return lang === "en" ? TXT_EN : TXT_ES;
}
