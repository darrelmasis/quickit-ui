import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
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
  base: [
    "relative flex items-center gap-1 border",
    "w-fit max-w-full",
  ].join(" "),
  horizontal:
    "flex-row overflow-x-auto snap-x snap-mandatory [scroll-snap-stop:always] [&::-webkit-scrollbar]:hidden",
  vertical: "flex-col items-stretch",
};

const TABS_TRIGGER_PRIMITIVES = {
  base: [
    "relative z-[1] inline-flex items-center justify-center font-medium",
    "outline-none cursor-pointer border-0",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  vertical: "justify-start text-left",
};

const TABS_SIZE_CLASSES = {
  xs: {
    list: "min-h-9 rounded-[0.875rem] p-1",
    trigger: "min-w-[4.75rem] rounded-xl px-2.5 py-1 text-xs",
  },
  sm: {
    list: "min-h-10 rounded-xl p-1",
    trigger: "min-w-[5.5rem] rounded-lg px-3 py-1.5 text-sm",
  },
  md: {
    list: "min-h-11 rounded-2xl p-1",
    trigger: "min-w-[6.5rem] rounded-xl px-3.5 py-2 text-sm",
  },
  lg: {
    list: "min-h-12 rounded-2xl p-1.5",
    trigger: "min-w-[7.5rem] rounded-2xl px-4 py-2.5 text-base",
  },
};

const TABS_CONTENT_PRIMITIVES = {
  base: "mt-4 outline-none",
};

const TABS_THEME_CLASSES = {
  light: {
    list: "border-slate-200 bg-slate-100/80",
    triggerIdle:
      "text-slate-500 hover:text-slate-950 focus-visible:outline-slate-300",
    triggerActive: {
      neutral: "text-slate-900",
      slate: "text-slate-900",
      zinc: "text-zinc-900",
      primary: "text-sky-800",
      brand: "text-brand-800",
      success: "text-emerald-800",
      danger: "text-rose-800",
      warning: "text-amber-800",
      info: "text-cyan-800",
      light: "text-slate-700",
      dark: "text-white",
      black: "text-white",
    },
    bubbleActive: {
      neutral: "border-slate-200 bg-white",
      slate: "border-slate-200 bg-white",
      zinc: "border-zinc-200 bg-white",
      primary: "border-sky-200 bg-sky-50",
      brand: "border-brand-200 bg-brand-50",
      success: "border-emerald-200 bg-emerald-50",
      danger: "border-rose-200 bg-rose-50",
      warning: "border-amber-200 bg-amber-50",
      info: "border-cyan-200 bg-cyan-50",
      light: "border-slate-200 bg-white",
      dark: "border-zinc-800 bg-zinc-900",
      black: "border-slate-950 bg-slate-950",
    },
    content: "text-slate-600",
  },
  dark: {
    list: "border-zinc-800 bg-zinc-900/80",
    triggerIdle:
      "text-stone-400 hover:text-stone-50 focus-visible:outline-zinc-700",
    triggerActive: {
      neutral: "text-neutral-100",
      slate: "text-slate-100",
      zinc: "text-zinc-100",
      primary: "text-sky-200",
      brand: "text-brand-200",
      success: "text-emerald-200",
      danger: "text-rose-200",
      warning: "text-amber-200",
      info: "text-cyan-200",
      light: "text-neutral-50",
      dark: "text-white",
      black: "text-white",
    },
    bubbleActive: {
      neutral: "border-neutral-700 bg-neutral-800",
      slate: "border-slate-700 bg-slate-800",
      zinc: "border-zinc-700 bg-zinc-800",
      primary: "border-sky-800 bg-sky-950",
      brand: "border-brand-800 bg-brand-950",
      success: "border-emerald-800 bg-emerald-950",
      danger: "border-rose-800 bg-rose-950",
      warning: "border-amber-800 bg-amber-950",
      info: "border-cyan-800 bg-cyan-950",
      light: "border-neutral-600 bg-neutral-800",
      dark: "border-zinc-800 bg-zinc-950",
      black: "border-slate-950 bg-black",
    },
    content: "text-stone-300",
  },
};

function getEnabledTabs(container) {
  return Array.from(container.querySelectorAll('[role="tab"]')).filter(
    (tab) => tab.getAttribute("aria-disabled") !== "true" && !tab.disabled,
  );
}

export function Tabs({
  activationMode = "automatic",
  children,
  className,
  color = "neutral",
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  size = "md",
  value: controlledValue,
}) {
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
        data-orientation={resolvedOrientation}
        data-size={resolvedSize}
        className={cn(TABS_ROOT_PRIMITIVES.base, className)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  const { color, orientation, size, value } = useTabsContext("TabsList");
  const { theme } = useQuickitControlState("tabs");
  const ui = TABS_THEME_CLASSES[theme];
  const listRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: false, right: false });
  const [indicatorStyle, setIndicatorStyle] = useState(null);

  const measureIndicator = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const activeTab = list.querySelector('[role="tab"][data-state="active"]');
    if (!activeTab) {
      setIndicatorStyle(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    setIndicatorStyle({
      width: tabRect.width,
      height: tabRect.height,
      top: tabRect.top - listRect.top - list.clientTop,
      left: tabRect.left - listRect.left - list.clientLeft,
    });
  }, []);

  useEffect(() => {
    measureIndicator();
  }, [measureIndicator, value]);

  const checkScroll = useCallback(() => {
    const el = listRef.current;
    if (!el || orientation !== "horizontal") return;
    setScrollState({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 4,
    });
  }, [orientation]);

  useEffect(() => {
    const el = listRef.current;
    if (!el || orientation !== "horizontal") return;
    checkScroll();
    const handleScroll = () => {
      checkScroll();
      measureIndicator();
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      checkScroll();
      measureIndicator();
    });
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      ro.disconnect();
    };
  }, [checkScroll, measureIndicator]);

  const fadeMask = useMemo(() => {
    if (orientation !== "horizontal") return undefined;
    const f = 16;
    if (!scrollState.left && !scrollState.right) return undefined;
    if (scrollState.left && scrollState.right) {
      return `linear-gradient(to right, transparent ${f}px, black ${f * 2}px, black calc(100% - ${f * 2}px), transparent calc(100% - ${f}px))`;
    }
    if (scrollState.left) {
      return `linear-gradient(to right, transparent ${f}px, black ${f * 2}px, black 100%)`;
    }
    return `linear-gradient(to right, black 0%, black calc(100% - ${f * 2}px), transparent calc(100% - ${f}px))`;
  }, [orientation, scrollState]);

  return (
    <div
      ref={listRef}
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
      style={
        fadeMask
          ? { maskImage: fadeMask, WebkitMaskImage: fadeMask }
          : undefined
      }
    >
      {indicatorStyle && (
        <div
          className={cn(
            `absolute z-0 border transition-all duration-300 ease-[${QUICKIT_EASE_DEFAULT}]`,
            TABS_SIZE_CLASSES[size].trigger,
            ui.bubbleActive[color],
          )}
          style={{
            ...indicatorStyle,
            transitionProperty: "top, left, width, height",
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

export function TabsTrigger({
  children,
  className,
  disabled = false,
  value,
}) {
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
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isSelected && triggerRef.current?.scrollIntoView) {
      triggerRef.current.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isSelected]);

  const handleKeyDown = (event) => {
    const container = event.currentTarget.parentElement;

    if (!container) {
      return;
    }

    const enabledTabs = getEnabledTabs(container);
    const currentIndex = enabledTabs.indexOf(event.currentTarget);

    if (currentIndex === -1) {
      return;
    }

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
      ref={triggerRef}
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
        "snap-align-center",
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
}

export function TabsContent({
  children,
  className,
  forceMount = false,
  value,
}) {
  const { baseId, value: selectedValue } = useTabsContext("TabsContent");
  const { theme } = useQuickitControlState("tabs");
  const ui = TABS_THEME_CLASSES[theme];
  const isSelected = selectedValue === value;

  if (!forceMount && !isSelected) {
    return null;
  }

  return (
    <div
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
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
