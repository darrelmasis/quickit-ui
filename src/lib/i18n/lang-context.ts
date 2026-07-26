import { createSafeContext } from "@/lib/utils/create-safe-context";

export type QuickitLang = "es" | "en";

export const [QuickitLangContext, useQuickitLang] = createSafeContext<QuickitLang>("QuickitProvider");
