import { createSafeContext } from "@/lib/utils/create-safe-context";

export const [DrawerContext, useDrawerContext] = createSafeContext("Drawer");
