import { createSafeContext } from "@/lib/utils/create-safe-context";

export interface TabsContextValue {
  activationMode: string;
  baseId: string;
  color: string;
  orientation: string;
  setValue: (value: string) => void;
  size: string;
  value: string | undefined;
}

export const [TabsContext, useTabsContext] = createSafeContext<TabsContextValue>("Tabs");
