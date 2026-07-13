import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { TABS_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { cn, useMergeRefs } from "@/lib/utils";
import {
  QUICKIT_EASE_DEFAULT,
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_TAB_SIZES,
  resolveQuickitToken,
} from "@/lib/tokens";
import { TabsContext, useTabsContext } from "./tabs-context";

const TAB_TRIGGER_SELECTOR = '[role="tab"][data-quickit-tab-trigger="true"]';
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const TABS_ROOT_CLASSES = {
  base: "w-full",
  vertical: "flex flex-col gap-4 sm:flex-row sm:items-start",
};

const TABS_LIST_CLASSES = {
  base: "relative flex gap-1 border",
  horizontal:
    "inline-flex max-w-full flex-row flex-nowrap items-center overflow-hidden",
  vertical: "inline-flex max-w-full flex-col items-stretch",
};

const TABS_TRIGGER_CLASSES = {
  base: [
    "relative z-[1] inline-flex min-w-0 max-w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap",
    "border border-transparent font-medium outline-none transition-[color] duration-150",
    "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
  vertical: "w-full justify-start text-left",
};

const TABS_SIZE_CLASSES = {
  xs: {
    list: "rounded-[var(--qi-radius-lg)] p-1",
    trigger: "h-6 w-[4.75rem] rounded-[var(--qi-radius)] px-2.5 text-xs",
  },
  sm: {
    list: "rounded-[var(--qi-radius)] p-1",
    trigger: "h-9 w-[5.5rem] rounded-[var(--qi-radius-xs)] px-3 text-sm",
  },
  md: {
    list: "rounded-[var(--qi-radius-xl)] p-1",
    trigger: "h-11 w-[6.5rem] rounded-[var(--qi-radius)] px-3.5 text-sm",
  },
  lg: {
    list: "rounded-[var(--qi-radius-xl)] p-1.5",
    trigger: "h-12 w-[7.5rem] rounded-[var(--qi-radius-xl)] px-4 text-base",
  },
  xl: {
    list: "rounded-[var(--qi-radius-2xl)] p-1.5",
    trigger: "h-14 w-[8.5rem] rounded-[var(--qi-radius-xl)] px-6 text-lg",
  },
  "2xl": {
    list: "rounded-[var(--qi-radius-2xl)] p-2",
    trigger: "h-16 w-[9.5rem] rounded-[var(--qi-radius-2xl)] px-7 text-lg",
  },
};

const TABS_INDICATOR_CLASSES = {
  base: [
    "pointer-events-none absolute left-0 top-0 z-0 border opacity-0",
    "transition-[transform,width,height,opacity] duration-200 will-change-transform",
  ].join(" "),
  xs: "rounded-[var(--qi-radius)]",
  sm: "rounded-[var(--qi-radius-xs)]",
  md: "rounded-[var(--qi-radius)]",
  lg: "rounded-[var(--qi-radius-xl)]",
  xl: "rounded-[var(--qi-radius-xl)]",
  "2xl": "rounded-[var(--qi-radius-2xl)]",
};

const TABS_CONTENT_CLASSES = {
  base: "outline-none",
  horizontal: "mt-4",
  vertical: "min-w-0 flex-1 sm:mt-0",
};

function resolveOrientation(orientation) {
  return orientation === "vertical" ? "vertical" : "horizontal";
}

function resolveActivationMode(activationMode) {
  return activationMode === "manual" ? "manual" : "automatic";
}

function getValueIdPart(value) {
  const stringValue = String(value ?? "");
  return encodeURIComponent(stringValue) || "empty";
}

function getTabIds(baseId, value) {
  const idPart = getValueIdPart(value);

  return {
    contentId: `${baseId}-content-${idPart}`,
    triggerId: `${baseId}-trigger-${idPart}`,
  };
}

function getTabValue(tab) {
  return tab.getAttribute("data-value");
}

function isDisabledTab(tab) {
  return tab.disabled || tab.getAttribute("aria-disabled") === "true";
}

function getEnabledTabs(tablist) {
  return Array.from(tablist.querySelectorAll(TAB_TRIGGER_SELECTOR)).filter(
    (tab) => !isDisabledTab(tab),
  );
}

function getNextTabIndex(event, orientation, currentIndex, tabCount) {
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

function isActivationKey(event) {
  return event.key === "Enter" || event.key === " " || event.key === "Spacebar";
}

function scrollTabIntoView(tab) {
  if (typeof tab?.scrollIntoView !== "function") {
    return;
  }

  tab.scrollIntoView({
    behavior: "auto",
    block: "nearest",
    inline: "nearest",
  });
}

function setIndicatorHidden(indicator) {
  indicator.style.opacity = "0";
  indicator.style.width = "0px";
  indicator.style.height = "0px";
}

function positionIndicator(tablist, indicator) {
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

function callHandler(event, handler) {
  handler?.(event);
  return event.defaultPrevented;
}

const Tabs = forwardRef(function Tabs({
  activationMode = "automatic",
  children,
  className,
  color = "neutral",
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  size = "md",
  value: controlledValue,
  ...props
}, ref) {
  const generatedId = useId();
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = isControlled ? controlledValue : uncontrolledValue;
  const resolvedActivationMode = resolveActivationMode(activationMode);
  const resolvedOrientation = resolveOrientation(orientation);
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    color,
    "neutral",
  );
  const resolvedSize = resolveQuickitToken(QUICKIT_TAB_SIZES, size, "md");

  const setValue = useCallback(
    (nextValue) => {
      if (nextValue == null || nextValue === selectedValue) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange, selectedValue],
  );

  const contextValue = useMemo(
    () => ({
      activationMode: resolvedActivationMode,
      baseId: generatedId,
      color: resolvedColor,
      orientation: resolvedOrientation,
      setValue,
      size: resolvedSize,
      value: selectedValue,
    }),
    [
      generatedId,
      resolvedActivationMode,
      resolvedColor,
      resolvedOrientation,
      resolvedSize,
      selectedValue,
      setValue,
    ],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        {...props}
        ref={ref}
        data-orientation={resolvedOrientation}
        data-size={resolvedSize}
        className={cn(
          TABS_ROOT_CLASSES.base,
          resolvedOrientation === "vertical" && TABS_ROOT_CLASSES.vertical,
          className,
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef(function TabsList({
  children,
  className,
  ...props
}, ref) {
  const { color, orientation, size, value } = useTabsContext("TabsList");
  const { theme } = useQuickitControlState("tabs");
  const ui = TABS_THEME_CLASSES[theme];
  const listRef = useRef(null);
  const indicatorRef = useRef(null);
  const mergedRef = useMergeRefs(listRef, ref);

  const updateIndicator = useCallback(() => {
    positionIndicator(listRef.current, indicatorRef.current);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current;
    const activeTab = list?.querySelector(
      `${TAB_TRIGGER_SELECTOR}[data-state="active"]`,
    );

    scrollTabIntoView(activeTab);
    updateIndicator();
  }, [size, updateIndicator, value]);

  useEffect(() => {
    const list = listRef.current;

    if (!list) {
      return undefined;
    }

    const update = () => updateIndicator();
    const observedTabs = () => Array.from(list.querySelectorAll(TAB_TRIGGER_SELECTOR));
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    const mutationObserver =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(() => {
            observedTabs().forEach((tab) => resizeObserver?.observe(tab));
            update();
          });

    update();
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    resizeObserver?.observe(list);
    observedTabs().forEach((tab) => resizeObserver?.observe(tab));
    mutationObserver?.observe(list, {
      childList: true,
      subtree: true,
    });

    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div
      {...props}
      ref={mergedRef}
      role="tablist"
      aria-orientation={orientation}
      data-orientation={orientation}
      data-size={size}
      className={cn(
        TABS_LIST_CLASSES.base,
        TABS_LIST_CLASSES[orientation],
        TABS_SIZE_CLASSES[size].list,
        ui.list,
        className,
      )}
    >
      <div
        ref={indicatorRef}
        aria-hidden="true"
        className={cn(
          TABS_INDICATOR_CLASSES.base,
          TABS_INDICATOR_CLASSES[size],
          ui.bubbleActive[color],
        )}
        style={{
          height: "0px",
          transitionTimingFunction: QUICKIT_EASE_DEFAULT,
          width: "0px",
        }}
      />
      {children}
    </div>
  );
});

export const TabsTrigger = forwardRef(function TabsTrigger({
  children,
  className,
  disabled = false,
  onClick,
  onKeyDown,
  type = "button",
  value,
  ...props
}, ref) {
  const {
    activationMode,
    baseId,
    color,
    orientation,
    setValue,
    size,
    value: selectedValue,
  } = useTabsContext("TabsTrigger");
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("tabs");
  const ui = TABS_THEME_CLASSES[theme];
  const tabValue = String(value ?? "");
  const { contentId, triggerId } = getTabIds(baseId, value);
  const isSelected = selectedValue === value;

  const handleClick = (event) => {
    if (callHandler(event, onClick) || disabled) {
      return;
    }

    setValue(value);
  };

  const handleKeyDown = (event) => {
    if (callHandler(event, onKeyDown) || disabled) {
      return;
    }

    if (activationMode === "manual" && isActivationKey(event)) {
      event.preventDefault();
      setValue(value);
      return;
    }

    const tablist = event.currentTarget.closest('[role="tablist"]');

    if (!tablist) {
      return;
    }

    const enabledTabs = getEnabledTabs(tablist);
    const currentIndex = enabledTabs.indexOf(event.currentTarget);

    if (currentIndex === -1 || enabledTabs.length === 0) {
      return;
    }

    const nextIndex = getNextTabIndex(
      event,
      orientation,
      currentIndex,
      enabledTabs.length,
    );

    if (nextIndex == null) {
      return;
    }

    event.preventDefault();

    const nextTab = enabledTabs[nextIndex];
    const nextValue = getTabValue(nextTab);

    nextTab?.focus();

    if (activationMode === "automatic") {
      setValue(nextValue);
    }
  };

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      role="tab"
      id={triggerId}
      aria-controls={contentId}
      aria-disabled={disabled || undefined}
      aria-selected={isSelected}
      data-quickit-tab-trigger="true"
      data-orientation={orientation}
      data-size={size}
      data-state={isSelected ? "active" : "inactive"}
      data-value={tabValue}
      disabled={disabled}
      tabIndex={isSelected && !disabled ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          TABS_TRIGGER_CLASSES.base,
        ),
        TABS_SIZE_CLASSES[size].trigger,
        orientation === "vertical" && TABS_TRIGGER_CLASSES.vertical,
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          isSelected ? ui.triggerActive[color] : ui.triggerIdle,
        ),
        className,
      )}
    >
      {children}
    </button>
  );
});

export const TabsContent = forwardRef(function TabsContent({
  children,
  className,
  forceMount = false,
  tabIndex = 0,
  value,
  ...props
}, ref) {
  const { baseId, orientation, value: selectedValue } =
    useTabsContext("TabsContent");
  const { theme } = useQuickitControlState("tabs");
  const ui = TABS_THEME_CLASSES[theme];
  const { contentId, triggerId } = getTabIds(baseId, value);
  const isSelected = selectedValue === value;

  if (!forceMount && !isSelected) {
    return null;
  }

  return (
    <div
      {...props}
      ref={ref}
      role="tabpanel"
      id={contentId}
      aria-labelledby={triggerId}
      data-orientation={orientation}
      data-state={isSelected ? "active" : "inactive"}
      hidden={!isSelected}
      tabIndex={tabIndex}
      className={cn(
        TABS_CONTENT_CLASSES.base,
        TABS_CONTENT_CLASSES[orientation],
        ui.content,
        className,
      )}
    >
      {children}
    </div>
  );
});

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { Tabs };
export default Tabs;
