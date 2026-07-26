import { cn } from "@/lib/utils";

export const SIDEBAR_LINK_CLASSES =
  "relative flex h-8 w-full items-center rounded-md px-3 text-[0.8125rem] transition-colors no-underline";
export const SIDEBAR_LINK_ACTIVE =
  "bg-neutral-200 font-medium text-neutral-900 dark:bg-neutral-700 dark:text-neutral-50";
export const SIDEBAR_LINK_INACTIVE =
  "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100";
export const SIDEBAR_GROUP_CLASSES =
  "px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500";

export function sidebarLinkCn(isActive) {
  return cn(SIDEBAR_LINK_CLASSES, isActive ? SIDEBAR_LINK_ACTIVE : SIDEBAR_LINK_INACTIVE);
}
