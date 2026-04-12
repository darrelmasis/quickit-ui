import { useId, useMemo, useState } from "react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@/lib/assets/icons";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./accordion-context";

const ACCORDION_THEME_CLASSES = {
  light: {
    item: "border-slate-200",
    trigger:
      "text-slate-950 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-slate-300",
    triggerOpen: "bg-slate-100/80 text-slate-950",
    content: "text-slate-600",
    icon: "text-slate-500",
  },
  dark: {
    item: "border-zinc-800",
    trigger:
      "text-stone-50 hover:bg-zinc-900 hover:text-stone-200 focus-visible:outline-zinc-700",
    triggerOpen: "bg-zinc-900/80 text-stone-50",
    content: "text-stone-300",
    icon: "text-stone-400",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
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

export function Accordion({
  children,
  className,
  collapsible = true,
  defaultValue,
  onValueChange,
  type = "single",
  value: controlledValue,
}) {
  // single y multiple comparten la misma API externa; openValues normaliza
  // ambos modos para simplificar el resto del árbol.
  const generatedId = useId();
  const isMultiple = type === "multiple";
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(() => {
    if (isMultiple) {
      return Array.isArray(defaultValue) ? defaultValue : [];
    }
    return coerceSingleValue(defaultValue);
  });

  const value = isControlled ? controlledValue : internalValue;
  const openValues = deriveOpenValues(isMultiple, value);

  const setValue = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

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
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, className, value }) {
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
      <div className={cn("border-b", ui.item, className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children, className, ...props }) {
  const { toggleItem } = useAccordionContext("AccordionTrigger");
  const { contentId, isOpen, triggerId, value } =
    useAccordionItemContext("AccordionTrigger");
  const theme = resolveTheme(useQuickitTheme());
  const focusRingEnabled = useQuickitFocusRing("accordion");
  const ui = ACCORDION_THEME_CLASSES[theme];

  return (
    <button
      type="button"
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        resolveQuickitFocusRingClasses(
          focusRingEnabled,
          "flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium outline-none transition-[background-color,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
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
}

export function AccordionContent({
  children,
  className,
  forceMount,
  ...props
}) {
  void forceMount;
  const { contentId, isOpen, triggerId } =
    useAccordionItemContext("AccordionContent");
  const theme = resolveTheme(useQuickitTheme());
  const ui = ACCORDION_THEME_CLASSES[theme];

  return (
    <div
      role="region"
      id={contentId}
      aria-labelledby={triggerId}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "qk-accordion-panel grid",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden" inert={!isOpen || undefined}>
        <div
          className={cn("px-4 pb-4 text-sm leading-6", ui.content, className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
