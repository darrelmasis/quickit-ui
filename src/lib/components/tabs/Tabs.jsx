import { forwardRef, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { TABS_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, useMergeRefs } from "@/lib/utils";
import {
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_TAB_SIZES,
  resolveQuickitToken,
} from "@/lib/tokens";
import { QUICKIT_EASE_DEFAULT } from "@/lib/tokens";
import { TabsContext, useTabsContext } from "./tabs-context";

const TABS_ROOT_PRIMITIVES = {
  base: "w-full",
};

const TABS_LIST_PRIMITIVES = {
  base: "relative flex items-center gap-1 border w-full",
  horizontal: "flex-row overflow-x-auto scrollbar-hidden",
  vertical: "flex-col items-stretch",
};

const TABS_TRIGGER_PRIMITIVES = {
  base: [
    "relative z-[1] inline-flex shrink-0 items-center justify-center font-medium",
    "outline-none cursor-pointer border-0",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  vertical: "justify-start text-left",
};

const TABS_SIZE_CLASSES = {
  xs: {
    list: "rounded-[var(--qi-radius-lg)] p-1",
    trigger: "h-6 min-w-[4.75rem] rounded-[var(--qi-radius)] px-2.5 text-xs",
  },
  sm: {
    list: "rounded-[var(--qi-radius)] p-1",
    trigger: "h-9 min-w-[5.5rem] rounded-[var(--qi-radius-xs)] px-3 text-sm",
  },
  md: {
    list: "rounded-[var(--qi-radius-xl)] p-1",
    trigger: "h-11 min-w-[6.5rem] rounded-[var(--qi-radius)] px-3.5 text-sm",
  },
  lg: {
    list: "rounded-[var(--qi-radius-xl)] p-1.5",
    trigger: "h-12 min-w-[7.5rem] rounded-[var(--qi-radius-xl)] px-4 text-base",
  },
  xl: {
    list: "rounded-[var(--qi-radius-2xl)] p-1.5",
    trigger: "h-14 min-w-[8.5rem] rounded-[var(--qi-radius-xl)] px-6 text-lg",
  },
  "2xl": {
    list: "rounded-[var(--qi-radius-2xl)] p-2",
    trigger: "shrink-0 h-16 min-w-[9.5rem] rounded-[var(--qi-radius-2xl)] px-7 text-lg",
  },
};

const TABS_CONTENT_PRIMITIVES = {
  base: "mt-4 outline-none",
};

function getEnabledTabs(container) {
  return Array.from(container.querySelectorAll('[role="tab"]')).filter(
    (tab) => tab.getAttribute("aria-disabled") !== "true" && !tab.disabled,
  );
}

function positionIndicator(list, indicator, orientation) {
  if (!list || !indicator) return;
  const activeTab = list.querySelector('[role="tab"][data-state="active"]');
  if (!activeTab) {
    indicator.style.display = "none";
    return;
  }
  indicator.style.display = "block";
  indicator.style.width = `${activeTab.offsetWidth}px`;
  indicator.style.height = `${activeTab.offsetHeight}px`;
  if (orientation === "horizontal") {
    indicator.style.top = `${activeTab.offsetTop}px`;
    indicator.style.left = `${activeTab.offsetLeft - list.scrollLeft}px`;
  } else {
    indicator.style.top = `${activeTab.offsetTop - list.scrollTop}px`;
    indicator.style.left = `${activeTab.offsetLeft}px`;
  }
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
}, ref) {
  const generatedId = useId();
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (nextValue) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      if (nextValue !== value) {
        onValueChange?.(nextValue);
      }
    },
    [isControlled, onValueChange, value],
  );

  const resolvedOrientation =
    orientation === "vertical" ? "vertical" : "horizontal";
  const resolvedActivationMode =
    activationMode === "manual" ? "manual" : "automatic";
  const resolvedSize = resolveQuickitToken(QUICKIT_TAB_SIZES, size, "md");
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    color,
    "neutral",
  );

  const contextValue = useMemo(
    () => ({
      activationMode: resolvedActivationMode,
      baseId: generatedId,
      color: resolvedColor,
      orientation: resolvedOrientation,
      setValue,
      size: resolvedSize,
      value,
    }),
    [
      generatedId,
      resolvedActivationMode,
      resolvedColor,
      resolvedOrientation,
      resolvedSize,
      setValue,
      value,
    ],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-orientation={resolvedOrientation}
        data-size={resolvedSize}
        className={cn(TABS_ROOT_PRIMITIVES.base, className)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef(function TabsList({ children, className }, ref) {
  const { color, orientation, size, value } = useTabsContext("TabsList");
  const { theme } = useQuickitControlState("tabs");
  const ui = TABS_THEME_CLASSES[theme];
  const listRef = useRef(null);
  const indicatorRef = useRef(null);
  const scrollTimerRef = useRef(null);

  const updateIndicator = useCallback(() => {
    positionIndicator(listRef.current, indicatorRef.current, orientation);
  }, [orientation]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeTab = list.querySelector('[role="tab"][data-state="active"]');
    activeTab?.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center" });
    updateIndicator();
  }, [updateIndicator, size, value]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    updateIndicator();
    const onScroll = () => {
      const ind = indicatorRef.current;
      if (ind) ind.style.transition = "none";
      updateIndicator();
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        const ind2 = indicatorRef.current;
        if (ind2) ind2.style.transition = "";
      }, 80);
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      updateIndicator();
    });
    ro.observe(list);
    return () => {
      list.removeEventListener("scroll", onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      ro.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div
      ref={useMergeRefs(listRef, ref)}
      role="tablist"
      aria-orientation={orientation}
      data-size={size}
      className={cn(
        TABS_LIST_PRIMITIVES.base,
        TABS_LIST_PRIMITIVES[orientation],
        TABS_SIZE_CLASSES[size].list,
        ui.list,
        className,
      )}
    >
      <div
        ref={indicatorRef}
        className={cn(
          `absolute z-0 hidden border transition-all duration-300 ease-[${QUICKIT_EASE_DEFAULT}]`,
          TABS_SIZE_CLASSES[size].trigger,
          ui.bubbleActive[color],
        )}
        style={{ transitionProperty: "top, left, width, height" }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
});

export const TabsTrigger = forwardRef(function TabsTrigger({
  children,
  className,
  disabled = false,
  value,
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
  const isSelected = selectedValue === value;

  const handleKeyDown = (event) => {
    const container = event.currentTarget.parentElement;
    if (!container) return;
    const enabledTabs = getEnabledTabs(container);
    const currentIndex = enabledTabs.indexOf(event.currentTarget);
    if (currentIndex === -1) return;
    const isHorizontal = orientation === "horizontal";
    let nextIndex = currentIndex;
    if (
      (isHorizontal && event.key === "ArrowRight") ||
      (!isHorizontal && event.key === "ArrowDown")
    ) {
      nextIndex = (currentIndex + 1) % enabledTabs.length;
    } else if (
      (isHorizontal && event.key === "ArrowLeft") ||
      (!isHorizontal && event.key === "ArrowUp")
    ) {
      nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabledTabs.length - 1;
    } else if (
      activationMode === "manual" &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      setValue(value);
      return;
    } else {
      return;
    }
    event.preventDefault();
    const nextTab = enabledTabs[nextIndex];
    nextTab?.focus();
    if (activationMode === "automatic") {
      setValue(nextTab?.dataset.value);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${baseId}-trigger-${value}`}
      aria-controls={`${baseId}-content-${value}`}
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      data-state={isSelected ? "active" : "inactive"}
      data-size={size}
      data-value={value}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          TABS_TRIGGER_PRIMITIVES.base,
        ),
        TABS_SIZE_CLASSES[size].trigger,
        orientation === "vertical" && TABS_TRIGGER_PRIMITIVES.vertical,
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
  value,
}, ref) {
  const { baseId, value: selectedValue } = useTabsContext("TabsContent");
  const { theme } = useQuickitControlState("tabs");
  const ui = TABS_THEME_CLASSES[theme];
  const isSelected = selectedValue === value;

  if (!forceMount && !isSelected) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-content-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      hidden={!isSelected}
      tabIndex={0}
      className={cn(TABS_CONTENT_PRIMITIVES.base, ui.content, className)}
    >
      {children}
    </div>
  );
});

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
