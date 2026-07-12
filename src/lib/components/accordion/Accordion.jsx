import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useQuickitFocusRing, useQuickitTheme, resolveQuickitThemeMode } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, useMergeRefs } from "@/lib/utils";
import { PlusIcon } from "@/lib/assets/icons";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./accordion-context";

import { ACCORDION_THEME_CLASSES } from "@/lib/theme/theme-classes";

function resolveTheme(theme) {
  return resolveQuickitThemeMode(theme);
}

/** En `type="single"`, solo un valor activo: normaliza arrays o valores raros. */
function coerceSingleValue(raw) {
  if (raw == null || raw === "") {
    return null;
  }
  if (Array.isArray(raw)) {
    return raw[0] ?? null;
  }
  return raw;
}

function deriveOpenValues(isMultiple, value) {
  if (isMultiple) {
    return Array.isArray(value) ? [...value] : [];
  }
  const single = coerceSingleValue(value);
  return single != null ? [single] : [];
}

const Accordion = forwardRef(function Accordion({
  children,
  className,
  clickOutside = false,
  collapsible = true,
  defaultValue,
  onValueChange,
  type = "single",
  value: controlledValue,
}, ref) {
  // single y multiple comparten la misma API externa; openValues normaliza
  // ambos modos para simplificar el resto del árbol.
  const generatedId = useId();
  const isMultiple = type === "multiple";
  const isControlled = controlledValue !== undefined;
  const rootRef = useRef(null);
  const [internalValue, setInternalValue] = useState(() => {
    if (isMultiple) {
      return Array.isArray(defaultValue) ? defaultValue : [];
    }
    return coerceSingleValue(defaultValue);
  });

  const value = isControlled ? controlledValue : internalValue;
  const openValues = deriveOpenValues(isMultiple, value);
  const closedValue = useMemo(
    () => (isMultiple ? [] : null),
    [isMultiple],
  );

  const setValue = useCallback((nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }, [isControlled, onValueChange]);

  useEffect(() => {
    if (!clickOutside || openValues.length === 0) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const root = rootRef.current;
      const target = event.target;

      if (!(target instanceof Node) || !root || root.contains(target)) {
        return;
      }

      setValue(closedValue);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [clickOutside, closedValue, openValues.length, setValue]);

  const toggleItem = (itemValue) => {
    if (isMultiple) {
      const nextValue = openValues.includes(itemValue)
        ? openValues.filter((valueItem) => valueItem !== itemValue)
        : [...openValues, itemValue];
      setValue(nextValue);
      return;
    }

    if (openValues.includes(itemValue)) {
      if (collapsible) {
        setValue(null);
      }
      return;
    }

    setValue(itemValue);
  };

  const contextValue = {
    baseId: generatedId,
    openValues,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div ref={useMergeRefs(rootRef, ref)} className={cn("flex w-full flex-col gap-3", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export const AccordionItem = forwardRef(function AccordionItem({ children, className, value }, ref) {
  const { baseId, openValues } = useAccordionContext("AccordionItem");
  const theme = resolveTheme(useQuickitTheme());
  const ui = ACCORDION_THEME_CLASSES[theme];
  const isOpen = openValues.includes(value);
  const contextValue = useMemo(
    () => ({
      contentId: `${baseId}-content-${value}`,
      isOpen,
      triggerId: `${baseId}-trigger-${value}`,
      value,
    }),
    [baseId, isOpen, value],
  );

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-[1rem] border transition-[border-color,background-color,box-shadow] duration-200",
          ui.item,
          className,
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});

export const AccordionTrigger = forwardRef(function AccordionTrigger({ children, className, ...props }, ref) {
  const { toggleItem } = useAccordionContext("AccordionTrigger");
  const { contentId, isOpen, triggerId, value } =
    useAccordionItemContext("AccordionTrigger");
  const theme = resolveTheme(useQuickitTheme());
  const focusRingEnabled = useQuickitFocusRing("accordion");
  const ui = ACCORDION_THEME_CLASSES[theme];

  return (
    <button
      ref={ref}
      type="button"
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          "flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium outline-none transition-[background-color,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        ),
        resolveQuickitFocusRingClasses(focusRingEnabled, ui.trigger),
        isOpen && ui.triggerOpen,
        className,
      )}
      onClick={() => toggleItem(value)}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "transition-transform duration-200",
          ui.icon,
          // El ícono rota en lugar de cambiar de glyph para mantener el layout estable.
          isOpen && "rotate-45",
        )}
      >
        <PlusIcon className="size-4 fill-current" />
      </span>
    </button>
  );
});

export const AccordionContent = forwardRef(function AccordionContent({
  children,
  className,
  forceMount,
  ...props
}, ref) {
  void forceMount;
  const { contentId, isOpen, triggerId } =
    useAccordionItemContext("AccordionContent");
  const theme = resolveTheme(useQuickitTheme());
  const ui = ACCORDION_THEME_CLASSES[theme];

  return (
    <div
      ref={ref}
      role="region"
      id={contentId}
      aria-labelledby={triggerId}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "qk-accordion-panel grid",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div
        className={cn(
          "min-h-0 overflow-hidden",
          isOpen && "border-t",
          isOpen && ui.contentShell,
        )}
        inert={!isOpen || undefined}
      >
        <div
          className={cn("px-5 pt-4 pb-5 text-sm leading-6", ui.content, className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion };
export default Accordion;
