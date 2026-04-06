import { useCallback, useId, useMemo, useState } from "react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import {
  QUICKIT_SEMANTIC_COLORS,
  QUICKIT_TAB_SIZES,
  resolveQuickitToken,
} from "@/lib/tokens";
import { TabsContext, useTabsContext } from "./tabs-context";

const TABS_ROOT_PRIMITIVES = {
  base: "w-full",
};

const TABS_LIST_PRIMITIVES = {
  base: [
    "inline-flex items-center gap-1 border",
    "w-fit",
  ].join(" "),
  horizontal: "flex-row",
  vertical: "flex-col items-stretch",
};

const TABS_TRIGGER_PRIMITIVES = {
  base: [
    "inline-flex items-center justify-center border border-transparent font-medium",
    "transition-colors outline-none cursor-pointer",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  vertical: "justify-start text-left",
};

const TABS_SIZE_CLASSES = {
  xs: {
    list: "min-h-9 rounded-[0.9rem] p-1",
    trigger: "min-w-[4.75rem] rounded-[0.7rem] px-2.5 py-1 text-xs",
  },
  sm: {
    list: "min-h-10 rounded-xl p-1",
    trigger: "min-w-[5.5rem] rounded-lg px-3 py-1.5 text-sm",
  },
  md: {
    list: "min-h-11 rounded-[1rem] p-1",
    trigger: "min-w-[6.5rem] rounded-[0.8rem] px-3.5 py-2 text-sm",
  },
  lg: {
    list: "min-h-12 rounded-[1.1rem] p-1.5",
    trigger: "min-w-[7.5rem] rounded-[0.95rem] px-4 py-2.5 text-base",
  },
};

const TABS_CONTENT_PRIMITIVES = {
  base: "mt-4 outline-none",
};

const TABS_THEME_CLASSES = {
  light: {
    list: "border-slate-200 bg-slate-100/80",
    triggerIdle:
      "text-slate-600 hover:bg-white hover:text-slate-950 focus-visible:outline-slate-300",
    triggerActive: {
      neutral: "border-slate-200 bg-slate-50 text-slate-900",
      slate: "border-slate-200 bg-slate-50 text-slate-900",
      zinc: "border-zinc-200 bg-zinc-50 text-zinc-900",
      primary: "border-sky-200 bg-sky-50 text-sky-800",
      brand: "border-brand-200 bg-brand-50 text-brand-800",
      success: "border-emerald-200 bg-emerald-50 text-emerald-800",
      danger: "border-rose-200 bg-rose-50 text-rose-800",
      warning: "border-amber-200 bg-amber-50 text-amber-800",
      info: "border-cyan-200 bg-cyan-50 text-cyan-800",
      light: "border-slate-200 bg-slate-50 text-slate-700",
      dark: "border-zinc-800 bg-zinc-900 text-white",
      black: "border-slate-950 bg-slate-950 text-white",
    },
    content: "text-slate-600",
  },
  dark: {
    list: "border-zinc-800 bg-zinc-900/80",
    triggerIdle:
      "text-stone-300 hover:bg-zinc-950 hover:text-stone-50 focus-visible:outline-zinc-700",
    triggerActive: {
      neutral: "border-zinc-700 bg-zinc-950 text-zinc-100",
      slate: "border-slate-700 bg-slate-900 text-slate-100",
      zinc: "border-zinc-700 bg-zinc-900 text-zinc-100",
      primary: "border-sky-800 bg-sky-950 text-sky-200",
      brand: "border-brand-800 bg-brand-950 text-brand-200",
      success: "border-emerald-800 bg-emerald-950 text-emerald-200",
      danger: "border-rose-800 bg-rose-950 text-rose-200",
      warning: "border-amber-800 bg-amber-950 text-amber-200",
      info: "border-cyan-800 bg-cyan-950 text-cyan-200",
      light: "border-slate-600 bg-slate-800 text-slate-50",
      dark: "border-zinc-800 bg-zinc-950 text-white",
      black: "border-slate-950 bg-black text-white",
    },
    content: "text-stone-300",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

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
  const { orientation, size } = useTabsContext("TabsList");
  const theme = resolveTheme(useQuickitTheme());
  const ui = TABS_THEME_CLASSES[theme];

  return (
    <div
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
  const theme = resolveTheme(useQuickitTheme());
  const focusRingEnabled = useQuickitFocusRing("tabs");
  const ui = TABS_THEME_CLASSES[theme];
  const isSelected = selectedValue === value;

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
}

export function TabsContent({
  children,
  className,
  forceMount = false,
  value,
}) {
  const { baseId, value: selectedValue } = useTabsContext("TabsContent");
  const theme = resolveTheme(useQuickitTheme());
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

export default Tabs;
