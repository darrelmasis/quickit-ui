import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, getControlRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";
import { useInputGroup } from "@/lib/components/input/input-group.context";
import {
  FORM_FIELD_THEME_CLASSES,
  resolveFormFieldColor,
  resolveFormFieldTheme,
} from "@/lib/components/_shared/form-field";
import {
  FLOATING_LIST_ITEM_PRIMITIVES,
  FLOATING_LIST_ITEM_THEME_CLASSES,
  FLOATING_LIST_SURFACE_PRIMITIVES,
  FLOATING_LIST_SURFACE_THEME_CLASSES,
  getFloatingClosedTransform,
  getFloatingPlacementOrigin,
  resolveFloatingListTheme,
} from "@/lib/components/_shared/floating-list";

const SELECT_PRIMITIVES = {
  wrapper: "relative w-full",
  trigger: [
    "flex w-full items-center justify-between gap-3 border px-3.5 text-sm outline-none",
    "transition-[background-color,border-color,color,box-shadow] duration-200",
    "focus-visible:ring-4 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
  value: "min-w-0 truncate text-left",
  icon: "shrink-0 text-current/55 transition-transform duration-200",
  content: "max-h-72 overflow-y-auto",
};

const SELECT_PLACEMENT = "bottom-start";
const SELECT_OPEN_DURATION = 140;
const SELECT_CLOSE_DURATION = 100;

const SELECT_SIZE_CLASSES = {
  sm: "h-9",
  md: "h-11",
  lg: "h-12 text-base",
};

const SELECT_THEME_CLASSES = {
  light: {
    invalid: FORM_FIELD_THEME_CLASSES.light.invalid,
  },
  dark: {
    invalid: FORM_FIELD_THEME_CLASSES.dark.invalid,
  },
};

function normalizeOptionValue(value) {
  if (value == null) {
    return "";
  }

  return String(value);
}

function extractOptionLabel(children) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  return children;
}

function parseOptions(children) {
  return Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === "option")
    .map((child, index) => {
      const label = extractOptionLabel(child.props.children);
      const textLabel =
        typeof child.props.children === "string" ||
        typeof child.props.children === "number"
          ? String(child.props.children)
          : "";
      const optionValue =
        child.props.value !== undefined
          ? normalizeOptionValue(child.props.value)
          : textLabel || String(index);

      return {
        disabled: Boolean(child.props.disabled),
        key: child.key ?? `${optionValue}-${index}`,
        label,
        value: optionValue,
      };
    });
}

function getInitialSelectValue({ controlledValue, defaultValue, options, placeholder }) {
  if (controlledValue !== undefined) {
    return normalizeOptionValue(controlledValue);
  }

  if (defaultValue !== undefined) {
    return normalizeOptionValue(defaultValue);
  }

  if (placeholder) {
    return "";
  }

  return options[0]?.value ?? "";
}

function getInitialActiveIndex({ nextOpen, selectedIndex, firstEnabledIndex }) {
  if (!nextOpen) {
    return null;
  }

  return selectedIndex >= 0 ? selectedIndex : firstEnabledIndex;
}

function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && typeof ref === "object") {
    ref.current = value;
  }
}

function createChangeEvent({ id, name, nativeEvent, value }) {
  return {
    type: "change",
    nativeEvent,
    target: { id, name, value },
    currentTarget: { id, name, value },
    preventDefault() {
      nativeEvent?.preventDefault?.();
    },
    stopPropagation() {
      nativeEvent?.stopPropagation?.();
    },
  };
}

const Select = forwardRef(function Select(
  {
    children,
    className,
    color: colorProp,
    size: controlSizeProp,
    defaultValue,
    disabled = false,
    id,
    invalid = false,
    name,
    onChange,
    onValueChange,
    placeholder,
    required = false,
    usePortal = true,
    value: controlledValue,
    ...props
  },
  ref,
) {
  const group = useInputGroup();
  const isAttached = Boolean(group?.attached);
  const theme = resolveFloatingListTheme(useQuickitTheme());
  const fieldTheme = resolveFormFieldTheme(useQuickitTheme());
  const focusRingEnabled = useQuickitFocusRing("select");
  const ui = SELECT_THEME_CLASSES[fieldTheme];
  const controlSize = controlSizeProp ?? group?.size ?? "md";
  const color = colorProp ?? group?.color ?? "neutral";
  const resolvedColor = resolveFormFieldColor(color);
  const colorUi = FORM_FIELD_THEME_CLASSES[fieldTheme][resolvedColor];
  const field = useFormControl();
  const options = useMemo(() => parseOptions(children), [children]);
  const initialValue = getInitialSelectValue({
    controlledValue,
    defaultValue,
    options,
    placeholder,
  });
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const listRef = useRef([]);

  const resolvedValue =
    controlledValue !== undefined
      ? normalizeOptionValue(controlledValue)
      : uncontrolledValue;
  const selectedIndex = options.findIndex(
    (option) => option.value === resolvedValue,
  );
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled;
  const resolvedRequired = required || field?.required;
  const resolvedId = id ?? field?.controlId;
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const firstEnabledIndex = options.findIndex((option) => !option.disabled);
  const handleOpenChange = useCallback((nextOpen) => {
    setOpen(nextOpen);
    setActiveIndex(getInitialActiveIndex({
      nextOpen,
      selectedIndex,
      firstEnabledIndex,
    }));
  }, [firstEnabledIndex, selectedIndex]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: SELECT_PLACEMENT,
    transform: false,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNavigation = useListNavigation(context, {
    activeIndex,
    listRef,
    loop: true,
    onNavigate: setActiveIndex,
    selectedIndex,
  });
  const interactions = useInteractions([dismiss, role, listNavigation]);
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: SELECT_OPEN_DURATION, close: SELECT_CLOSE_DURATION },
    initial: ({ side }) => ({
      opacity: 0,
      transform: getFloatingClosedTransform(side),
    }),
    open: {
      opacity: 1,
      transform: "translate(0px, 0px) scale(1)",
    },
    close: ({ side }) => ({
      opacity: 0,
      transform: getFloatingClosedTransform(side),
    }),
    common: {
      transformOrigin: getFloatingPlacementOrigin(SELECT_PLACEMENT),
    },
  });
  const floatingRef = useCallback(
    (node) => {
      refs.setFloating(node);
    },
    [refs],
  );
  const referenceRef = useCallback(
    (node) => {
      refs.setReference(node);
      assignRef(ref, node);
    },
    [ref, refs],
  );

  const handleValueChange = useCallback((nextValue, nativeEvent) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
    onChange?.(
      createChangeEvent({
        id: resolvedId,
        name,
        nativeEvent,
        value: nextValue,
      }),
    );
    handleOpenChange(false);
    refs.reference.current?.focus?.();
  }, [controlledValue, handleOpenChange, name, onChange, onValueChange, refs.reference, resolvedId]);
  const handleTriggerClick = useCallback(() => {
    if (resolvedDisabled) {
      return;
    }

    handleOpenChange(!open);
  }, [handleOpenChange, open, resolvedDisabled]);
  const handleTriggerKeyDown = useCallback((event) => {
    if (resolvedDisabled) {
      return;
    }

    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleOpenChange(true);
    }
  }, [handleOpenChange, resolvedDisabled]);
  const handleOptionMouseEnter = useCallback((index) => {
    setActiveIndex(index);
  }, []);
  const handleOptionKeyDown = useCallback((event, nextValue) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleValueChange(nextValue, event);
    }
  }, [handleValueChange]);
  const getOptionProps = useCallback((option, index) => interactions.getItemProps({
    onClick(event) {
      handleValueChange(option.value, event);
    },
    onMouseEnter() {
      handleOptionMouseEnter(index);
    },
    onKeyDown(event) {
      handleOptionKeyDown(event, option.value);
    },
  }), [handleOptionKeyDown, handleOptionMouseEnter, handleValueChange, interactions]);

  const triggerLabel = selectedOption?.label ?? placeholder ?? "Selecciona una opción";

  const content = isMounted ? (
    <ul
      ref={floatingRef}
      className={cn(
        FLOATING_LIST_SURFACE_PRIMITIVES.layout,
        FLOATING_LIST_SURFACE_THEME_CLASSES[theme],
        SELECT_PRIMITIVES.content,
      )}
      style={{
        ...floatingStyles,
        ...transitionStyles,
      }}
      {...interactions.getFloatingProps({
        "aria-labelledby": resolvedId,
      })}
    >
      {options.map((option, index) => {
        const selected = option.value === resolvedValue;

        return (
          <li key={option.key} role="presentation">
            <button
              ref={(node) => {
                listRef.current[index] = node;
              }}
              type="button"
              role="option"
              aria-selected={selected}
              disabled={option.disabled}
              className={cn(
                FLOATING_LIST_ITEM_PRIMITIVES.base,
                resolveQuickitFocusRingClasses(
                  focusRingEnabled,
                  FLOATING_LIST_ITEM_PRIMITIVES.base,
                ),
                resolveQuickitFocusRingClasses(
                  focusRingEnabled,
                  FLOATING_LIST_ITEM_THEME_CLASSES[theme].default,
                ),
                selected && FLOATING_LIST_ITEM_THEME_CLASSES[theme].selected,
                option.disabled && FLOATING_LIST_ITEM_THEME_CLASSES[theme].disabled,
              )}
              {...getOptionProps(option, index)}
            >
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {selected ? (
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-4 shrink-0 fill-current text-current"
                >
                  <path d="m7.75 13.1-3.4-3.4 1.06-1.06 2.34 2.34 6.84-6.84 1.06 1.06-7.9 7.9Z" />
                </svg>
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <span
      className={cn(
        SELECT_PRIMITIVES.wrapper,
        isAttached && "h-full",
        group?.layout === "inline" && "flex-1",
      )}
    >
      {name ? (
        <input type="hidden" name={name} value={resolvedValue} />
      ) : null}
      <button
        ref={referenceRef}
        id={resolvedId}
        type="button"
        disabled={resolvedDisabled}
        aria-describedby={describedBy}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={resolvedInvalid || undefined}
        aria-required={resolvedRequired || undefined}
        className={cn(
          SELECT_PRIMITIVES.trigger,
          isAttached
            ? "h-full rounded-none border-0 shadow-none focus-visible:border-transparent focus-visible:ring-0"
            : getControlRadius(controlSize),
          isAttached
            ? null
            : SELECT_SIZE_CLASSES[controlSize] ?? SELECT_SIZE_CLASSES.md,
          resolveQuickitFocusRingClasses(
            isAttached ? false : focusRingEnabled,
            resolvedInvalid ? ui.invalid : colorUi.base,
          ),
          !isAttached &&
            !resolvedDisabled &&
            !resolvedInvalid &&
            colorUi.hover,
          className,
        )}
        {...interactions.getReferenceProps({
          ...props,
          onClick(event) {
            props.onClick?.(event);
            handleTriggerClick(event);
          },
          onKeyDown(event) {
            props.onKeyDown?.(event);

            if (!event.defaultPrevented) {
              handleTriggerKeyDown(event);
            }
          },
        })}
      >
        <span
          className={cn(
            SELECT_PRIMITIVES.value,
            !selectedOption && "text-current/55",
          )}
        >
          {triggerLabel}
        </span>
        <span
          className={cn(
            SELECT_PRIMITIVES.icon,
            open && "rotate-180",
          )}
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" className="size-4 fill-current">
            <path d="M5.75 7.75 10 12l4.25-4.25 1.06 1.06-5.31 5.31-5.31-5.31 1.06-1.06Z" />
          </svg>
        </span>
      </button>

      {usePortal ? <FloatingPortal>{content}</FloatingPortal> : content}
    </span>
  );
});

export { Select };
export default Select;
