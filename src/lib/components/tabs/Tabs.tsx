import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
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
import {
  TAB_TRIGGER_SELECTOR,
  useIsomorphicLayoutEffect,
  TABS_ROOT_CLASSES,
  TABS_LIST_CLASSES,
  TABS_TRIGGER_CLASSES,
  TABS_SIZE_CLASSES,
  TABS_INDICATOR_CLASSES,
  TABS_CONTENT_CLASSES,
  resolveOrientation,
  resolveActivationMode,
  getTabIds,
  getTabValue,
  getEnabledTabs,
  getNextTabIndex,
  isActivationKey,
  scrollTabIntoView,
  positionIndicator,
  callHandler,
} from "./tabs.utils";

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
    (nextValue: string) => {
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
  const listRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
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

  const handleClick = (event: React.MouseEvent) => {
    if (callHandler(event, onClick) || disabled) {
      return;
    }

    setValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
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

    (nextTab as HTMLElement | undefined)?.focus();

    if (activationMode === "automatic" && nextValue != null) {
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
        orientation === "horizontal" && "shrink-0 flex-1",
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
