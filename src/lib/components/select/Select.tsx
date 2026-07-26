import {
  Children,
  type ReactElement,
  type ReactNode,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
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
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import { FORM_FIELD_AUTOFILL_CLASS, FORM_FIELD_BASE_CLASSES, getFormFieldRadius } from "@/lib/components/_shared/form-field-base";
import { CheckFillIcon, ChevronDownIcon } from "@/lib/assets/icons";
import { useFormControl } from "@/lib/components/form-control/useFormControl";
import { useInputGroup } from "@/lib/components/input/input-group.context";
import {
  FORM_FIELD_THEME_CLASSES,
  resolveFormFieldColor,
} from "@/lib/components/_shared/form-field";
import {
  FLOATING_LIST_ITEM_THEME_CLASSES,
  FLOATING_LIST_SURFACE_PRIMITIVES,
  FLOATING_LIST_SURFACE_THEME_CLASSES,
  getFloatingListItemClasses,
  resolveFloatingListTheme,
  useFloatingTransition,
  useMatchFloatingWidth,
} from "@/lib/components/_shared/floating-list";
import { useTXT } from "@/lib/i18n";

const SELECT_PRIMITIVES = {
  wrapper: "relative w-full",
  trigger: [
    FORM_FIELD_AUTOFILL_CLASS,
    "flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-3.5 text-sm",
    FORM_FIELD_BASE_CLASSES,
  ].join(" "),
  value: "min-w-0 truncate text-left",
  icon: "shrink-0 text-current/55 transition-transform duration-200",
  content: "max-h-72 sm:max-h-96 overflow-y-auto",
};

const SELECT_PLACEMENT = "bottom-start";

const SELECT_SIZE_CLASSES = {
  sm: "h-9",
  md: "h-11",
  lg: "h-12 text-base",
};

import { SELECT_THEME_CLASSES } from "@/lib/theme/theme-classes";

function normalizeOptionValue(value: ReactNode): string {
  if (value == null) {
    return "";
  }

  return String(value);
}

function extractOptionLabel(children: ReactNode): ReactNode {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  return children;
}

function parseOptions(children: ReactNode) {
  return (Children.toArray(children) as ReactElement<{ children?: ReactNode; value?: string | number; disabled?: boolean }>[])
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

function getInitialSelectValue({
  controlledValue,
  defaultValue,
  options,
  placeholder,
}: {
  controlledValue: ReactNode;
  defaultValue: ReactNode;
  options: Array<{ value: string }>;
  placeholder: string | undefined;
}): string {
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

function getInitialActiveIndex({
  nextOpen,
  selectedIndex,
  firstEnabledIndex,
}: {
  nextOpen: boolean;
  selectedIndex: number;
  firstEnabledIndex: number;
}): number | null {
  if (!nextOpen) {
    return null;
  }

  return selectedIndex >= 0 ? selectedIndex : firstEnabledIndex;
}

function assignRef(ref: React.Ref<unknown>, value: HTMLElement | null): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && typeof ref === "object") {
    ref.current = value;
  }
}

function createChangeEvent({
  id,
  name,
  nativeEvent,
  value,
}: {
  id: string;
  name: string | undefined;
  nativeEvent: React.SyntheticEvent | undefined;
  value: string;
}) {
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
    contentClassName,
    color: colorProp,
    shape = "square",
    size: controlSizeProp,
    defaultValue,
    disabled = false,
    emptyText,
    id,
    invalid = false,
    loading = false,
    name,
    onChange,
    onValueChange,
    placeholder,
    required = false,
    usePortal = true,
    value: controlledValue,
    "aria-labelledby": ariaLabelledBy,
    ...props
  },
  ref,
) {

  const TXT = useTXT();
  const resolvedEmptyText = emptyText ?? TXT.EMPTY_OPTIONS;
  const group = useInputGroup();
  const isAttached = Boolean(group?.attached);
  const { theme: fieldTheme, focusRing: focusRingEnabled } = useQuickitControlState("select");
  const theme = resolveFloatingListTheme(fieldTheme);
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
  const listRef = useRef<(HTMLElement | null)[]>([]);

  const resolvedValue =
    controlledValue !== undefined
      ? normalizeOptionValue(controlledValue)
      : uncontrolledValue;
  const selectedIndex = options.findIndex(
    (option) => option.value === resolvedValue,
  );
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled || loading;
  const resolvedRequired = required || field?.required;
  const generatedId = useId();
  const resolvedId = id ?? field?.controlId ?? generatedId;
  const listboxId = `${resolvedId}-listbox`;
  const labelledBy = [ariaLabelledBy, field?.labelId]
    .filter(Boolean)
    .join(" ") || undefined;
  const describedBy = [
    props["aria-describedby"],
    field?.descriptionId,
    resolvedInvalid ? field?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const firstEnabledIndex = options.findIndex((option) => !option.disabled);
  const handleOpenChange = useCallback((nextOpen: boolean) => {
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
      useMatchFloatingWidth(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, {
    referencePress: false,
  });
  const role = useRole(context, { role: "listbox" });
  const listNavigation = useListNavigation(context, {
    activeIndex,
    disabledIndices: options.reduce((indices, option, index) => {
      if (option.disabled) {
        indices.push(index);
      }
      return indices;
    }, []),
    listRef,
    loop: true,
    onNavigate: setActiveIndex,
    selectedIndex,
  });
  const interactions = useInteractions([dismiss, role, listNavigation]);
  const { isMounted, styles: transitionStyles } = useFloatingTransition(context, {
    duration: { open: 140, close: 100 },
    placement: SELECT_PLACEMENT,
  });
  const floatingRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );
  const referenceRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node);
      assignRef(ref, node);
    },
    [ref, refs],
  );

  const handleValueChange = useCallback((nextValue: string, nativeEvent: React.SyntheticEvent) => {
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
  const handleTriggerKeyDown = useCallback((event: React.KeyboardEvent) => {
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
  const handleOptionMouseEnter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);
  const handleOptionKeyDown = useCallback((event: React.KeyboardEvent, nextValue: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleValueChange(nextValue, event);
    }
  }, [handleValueChange]);
  const getOptionProps = useCallback((option: { value: string; disabled: boolean }, index: number) => interactions.getItemProps({
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

  const triggerLabel = loading ? TXT.LOADING : (selectedOption?.label ?? placeholder ?? TXT.SELECT_OPTION);

  const content = isMounted ? (
    <ul
      id={listboxId}
      ref={floatingRef}
      role="listbox"
      className={cn(
        FLOATING_LIST_SURFACE_PRIMITIVES.layout,
        FLOATING_LIST_SURFACE_THEME_CLASSES[theme].neutral,
        SELECT_PRIMITIVES.content,
        contentClassName,
      )}
      style={{
        ...floatingStyles,
        ...transitionStyles,
      }}
      {...interactions.getFloatingProps({
        "aria-labelledby": resolvedId,
      })}
    >
      {options.length === 0 ? (
        <li role="presentation" className="px-3 py-2 text-sm text-current/50">
          {resolvedEmptyText}
        </li>
      ) : (
        options.map((option, index) => {
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
              className={getFloatingListItemClasses({
                focusRingEnabled,
                theme,
                color,
                selected,
                disabled: option.disabled,
              })}
              {...getOptionProps(option, index)}
            >
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {selected ? (
                <CheckFillIcon className="size-4 shrink-0 fill-current text-current" />
              ) : null}
            </button>
          </li>
        );
      })
    )}
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
        <input
          type="hidden"
          name={name}
          value={resolvedValue}
          disabled={resolvedDisabled}
        />
      ) : null}
      <button
        ref={referenceRef}
        id={resolvedId}
        type="button"
        disabled={resolvedDisabled}
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : triggerLabel}
        aria-describedby={describedBy}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-invalid={resolvedInvalid || undefined}
        aria-required={resolvedRequired || undefined}
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        className={cn(
          SELECT_PRIMITIVES.trigger,
          isAttached
            ? "h-full rounded-none border-0 shadow-none focus-visible:border-transparent focus-visible:ring-0"
            : getFormFieldRadius(shape, controlSize),
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
          <ChevronDownIcon className="size-4 fill-current" />
        </span>
      </button>

      {usePortal ? <FloatingPortal>{content}</FloatingPortal> : content}
    </span>
  );
});

export { Select };
export default Select;
