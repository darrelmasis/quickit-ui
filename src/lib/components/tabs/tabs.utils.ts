import { useEffect, useLayoutEffect, type KeyboardEvent } from "react";

export const TAB_TRIGGER_SELECTOR = '[role="tab"][data-quickit-tab-trigger="true"]';
export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const TABS_ROOT_CLASSES = {
  base: "w-full",
  vertical: "flex flex-col gap-4 sm:flex-row sm:items-start",
};

export const TABS_LIST_CLASSES = {
  base: "relative flex gap-1 border",
  horizontal:
    "flex w-full flex-row flex-nowrap items-center overflow-x-auto whitespace-nowrap scrollbar-hidden scroll-snap-type-x-mandatory touch-action-pan-x",
  vertical: "inline-flex max-w-full flex-col items-stretch",
};

export const TABS_TRIGGER_CLASSES = {
  base: [
    "relative z-[1] inline-flex min-w-0 max-w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap",
    "border border-transparent font-medium outline-none transition-[color] duration-150",
    "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
  vertical: "w-full justify-start text-left",
};

export const TABS_SIZE_CLASSES = {
  xs: {
    list: "rounded-[var(--qk-radius-lg)] p-1",
    trigger: "h-6 min-w-[3rem] sm:min-w-0 rounded-[var(--qk-radius)] px-2.5 text-xs",
  },
  sm: {
    list: "rounded-[var(--qk-radius)] p-1",
    trigger: "h-9 min-w-[4rem] sm:min-w-0 rounded-[var(--qk-radius-xs)] px-3 text-sm",
  },
  md: {
    list: "rounded-[var(--qk-radius-xl)] p-1",
    trigger: "h-11 min-w-[5rem] sm:min-w-0 rounded-[var(--qk-radius)] px-3.5 text-sm",
  },
  lg: {
    list: "rounded-[var(--qk-radius-xl)] p-1.5",
    trigger: "h-12 min-w-[6rem] sm:min-w-0 rounded-[var(--qk-radius-xl)] px-4 text-base",
  },
  xl: {
    list: "rounded-[var(--qk-radius-2xl)] p-1.5",
    trigger: "h-14 min-w-[7rem] sm:min-w-0 rounded-[var(--qk-radius-xl)] px-6 text-lg",
  },
  "2xl": {
    list: "rounded-[var(--qk-radius-2xl)] p-2",
    trigger: "h-16 min-w-[8rem] sm:min-w-0 rounded-[var(--qk-radius-2xl)] px-7 text-lg",
  },
};

export const TABS_INDICATOR_CLASSES = {
  base: [
    "pointer-events-none absolute left-0 top-0 z-0 border opacity-0",
    "transition-[transform,width,height,opacity] duration-200 will-change-transform",
  ].join(" "),
  xs: "rounded-[var(--qk-radius)]",
  sm: "rounded-[var(--qk-radius-xs)]",
  md: "rounded-[var(--qk-radius)]",
  lg: "rounded-[var(--qk-radius-xl)]",
  xl: "rounded-[var(--qk-radius-xl)]",
  "2xl": "rounded-[var(--qk-radius-2xl)]",
};

export const TABS_CONTENT_CLASSES = {
  base: "outline-none",
  horizontal: "mt-2 sm:mt-4",
  vertical: "min-w-0 flex-1 sm:mt-0",
};

export function resolveOrientation(orientation: string): "horizontal" | "vertical" {
  return orientation === "vertical" ? "vertical" : "horizontal";
}

export function resolveActivationMode(activationMode: string): "automatic" | "manual" {
  return activationMode === "manual" ? "manual" : "automatic";
}

export function getValueIdPart(value: string): string {
  const stringValue = String(value ?? "");
  return encodeURIComponent(stringValue) || "empty";
}

export function getTabIds(baseId: string, value: string): { contentId: string; triggerId: string } {
  const idPart = getValueIdPart(value);

  return {
    contentId: `${baseId}-content-${idPart}`,
    triggerId: `${baseId}-trigger-${idPart}`,
  };
}

export function getTabValue(tab: Element): string | null {
  return tab.getAttribute("data-value");
}

export function isDisabledTab(tab: Element): boolean {
  return (tab as HTMLButtonElement).disabled || tab.getAttribute("aria-disabled") === "true";
}

export function getEnabledTabs(tablist: Element): Element[] {
  return Array.from(tablist.querySelectorAll(TAB_TRIGGER_SELECTOR)).filter(
    (tab) => !isDisabledTab(tab),
  );
}

export function getNextTabIndex(
  event: KeyboardEvent,
  orientation: string,
  currentIndex: number,
  tabCount: number,
): number | null {
  const isHorizontal = orientation === "horizontal";

  if (
    (isHorizontal && event.key === "ArrowRight") ||
    (!isHorizontal && event.key === "ArrowDown")
  ) {
    return (currentIndex + 1) % tabCount;
  }

  if (
    (isHorizontal && event.key === "ArrowLeft") ||
    (!isHorizontal && event.key === "ArrowUp")
  ) {
    return (currentIndex - 1 + tabCount) % tabCount;
  }

  if (event.key === "Home") {
    return 0;
  }

  if (event.key === "End") {
    return tabCount - 1;
  }

  return null;
}

export function isActivationKey(event: KeyboardEvent): boolean {
  return event.key === "Enter" || event.key === " " || event.key === "Spacebar";
}

export function scrollTabIntoView(tab: Element | null | undefined): void {
  if (typeof tab?.scrollIntoView !== "function") {
    return;
  }

  tab.scrollIntoView({
    behavior: "auto",
    block: "nearest",
    inline: "nearest",
  });
}

export function setIndicatorHidden(indicator: HTMLElement): void {
  indicator.style.opacity = "0";
  indicator.style.width = "0px";
  indicator.style.height = "0px";
}

export function positionIndicator(tablist: HTMLElement | null, indicator: HTMLElement | null): void {
  if (!tablist || !indicator) {
    return;
  }

  const activeTab = tablist.querySelector(
    `${TAB_TRIGGER_SELECTOR}[data-state="active"]`,
  );

  if (!activeTab) {
    setIndicatorHidden(indicator);
    return;
  }

  const listRect = tablist.getBoundingClientRect();
  const tabRect = activeTab.getBoundingClientRect();
  const x = tabRect.left - listRect.left + tablist.scrollLeft - tablist.clientLeft;
  const y = tabRect.top - listRect.top + tablist.scrollTop - tablist.clientTop;

  indicator.style.opacity = "1";
  indicator.style.width = `${tabRect.width}px`;
  indicator.style.height = `${tabRect.height}px`;
  indicator.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

export function callHandler(event: React.SyntheticEvent, handler?: (event: React.SyntheticEvent) => void): boolean {
  handler?.(event);
  return event.defaultPrevented;
}
