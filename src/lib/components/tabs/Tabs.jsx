import { useCallback, useId, useMemo, useState } from "react";
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { TabsContext, useTabsContext } from "./tabs-context";

const TABS_ROOT_PRIMITIVES = {
  base: "w-full",
};

const TABS_LIST_PRIMITIVES = {
  base: [
    "inline-flex min-h-11 items-center gap-1 rounded-[1rem] border p-1",
    "w-fit",
  ].join(" "),
  horizontal: "flex-row",
  vertical: "flex-col items-stretch",
};

const TABS_TRIGGER_PRIMITIVES = {
  base: [
    "inline-flex items-center justify-center rounded-[0.8rem] border border-transparent px-3 py-2 text-sm font-medium",
    "transition-colors outline-none cursor-pointer",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  vertical: "justify-start text-left",
};

const TABS_CONTENT_PRIMITIVES = {
  base: "mt-4 outline-none",
};

const TABS_THEME_CLASSES = {
  light: {
    list: "border-slate-200 bg-slate-100/80",
    triggerIdle:
      "text-slate-600 hover:bg-white hover:text-slate-950 focus-visible:outline-slate-300",
    triggerActive:
      "border-slate-200 bg-white text-slate-950",
    content: "text-slate-600",
  },
  dark: {
    list: "border-zinc-800 bg-zinc-900/80",
    triggerIdle:
      "text-stone-300 hover:bg-zinc-950 hover:text-stone-50 focus-visible:outline-zinc-700",
    triggerActive:
      "border-zinc-800 bg-zinc-950 text-stone-50",
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
  defaultValue,
  onValueChange,
  orientation = "horizontal",
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

  const contextValue = useMemo(
    () => ({
      activationMode: resolvedActivationMode,
      baseId: generatedId,
      orientation: resolvedOrientation,
      setValue,
      value,
    }),
    [generatedId, resolvedActivationMode, resolvedOrientation, setValue, value],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        data-orientation={resolvedOrientation}
        className={cn(TABS_ROOT_PRIMITIVES.base, className)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  const { orientation } = useTabsContext("TabsList");
  const theme = resolveTheme(useQuickitTheme());
  const ui = TABS_THEME_CLASSES[theme];

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        TABS_LIST_PRIMITIVES.base,
        TABS_LIST_PRIMITIVES[orientation],
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
    orientation,
    setValue,
    value: selectedValue,
  } = useTabsContext("TabsTrigger");
  const theme = resolveTheme(useQuickitTheme());
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
      data-value={value}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        TABS_TRIGGER_PRIMITIVES.base,
        orientation === "vertical" && TABS_TRIGGER_PRIMITIVES.vertical,
        isSelected ? ui.triggerActive : ui.triggerIdle,
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
