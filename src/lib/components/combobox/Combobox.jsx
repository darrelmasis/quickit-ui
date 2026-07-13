import {
  forwardRef,
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
import { cn, getControlRadius } from "@/lib/utils";
import { CheckFillIcon, ChevronDownIcon, ClearIcon } from "@/lib/assets/icons";
import Button from "@/lib/components/button/Button";
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
import { TXT } from "@/lib/texts";

const COMBOBOX_PRIMITIVES = {
  wrapper: "relative w-full",
  input: [
    "flex w-full items-center gap-2 border px-3.5 text-sm outline-none",
    "transition-[background-color,border-color,color,box-shadow] duration-200",
    "focus-visible:ring-4 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" "),
  icon: "shrink-0 text-current/55",
  actionButton:
    "p-0 text-current/55 transition-[background-color,color,opacity] hover:bg-current/10 hover:text-current disabled:pointer-events-none disabled:opacity-40",
  rightCluster:
    "absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1",
  content: "max-h-72 overflow-y-auto",
};

const COMBOBOX_PLACEMENT = "bottom-start";

const COMBOBOX_SIZE_CLASSES = {
  sm: "h-9",
  md: "h-11",
  lg: "h-12 text-base",
};

import { COMBOBOX_THEME_CLASSES } from "@/lib/theme/theme-classes";

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

function getOptionTextValue(item, value) {
  if (typeof item?.textValue === "string") {
    return item.textValue;
  }

  if (typeof item?.label === "string" || typeof item?.label === "number") {
    return String(item.label);
  }

  return value;
}

function normalizeOptions(raw) {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.map((item, index) => {
    if (item == null) {
      return {
        disabled: true,
        key: `opt-${index}`,
        label: "",
        textValue: "",
        value: "",
      };
    }

    const value =
      item.value !== undefined && item.value !== null
        ? String(item.value)
        : String(item.label ?? index);
    const label = item.label ?? value;
    const textValue = getOptionTextValue(item, value);

    return {
      disabled: Boolean(item.disabled),
      key: `${value}-${index}`,
      label,
      textValue,
      value,
    };
  });
}

function filterOptionsByQuery(options, rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) {
    return options;
  }
  return options.filter((o) =>
    `${o.textValue} ${o.value}`.toLowerCase().includes(q),
  );
}

function firstEnabledIndex(list) {
  const index = list.findIndex((o) => !o.disabled);
  return index >= 0 ? index : null;
}

const Combobox = forwardRef(function Combobox(
  {
    className,
    clearButton = true,
    clearButtonLabel = TXT.CLEAR_SELECTION,
    clearIcon,
    color: colorProp,
    defaultValue,
    disabled = false,
    emptyText = TXT.EMPTY,
    id,
    invalid = false,
    loading = false,
    name,
    onChange,
    onClear,
    onInputChange,
    onValueChange,
    options: optionsProp = [],
    placeholder = TXT.SEARCH,
    required = false,
    size: controlSizeProp,
    usePortal = true,
    value: controlledValue,
    "aria-labelledby": ariaLabelledBy,
    ...props
  },
  ref,
) {
  const group = useInputGroup();
  const isAttached = Boolean(group?.attached);
  const { theme: fieldTheme, focusRing: focusRingEnabled } =
    useQuickitControlState("combobox");
  const theme = resolveFloatingListTheme(fieldTheme);
  const ui = COMBOBOX_THEME_CLASSES[fieldTheme];
  const controlSize = controlSizeProp ?? group?.size ?? "md";
  const color = colorProp ?? group?.color ?? "neutral";
  const resolvedColor = resolveFormFieldColor(color);
  const colorUi = FORM_FIELD_THEME_CLASSES[fieldTheme][resolvedColor];
  const field = useFormControl();
  const options = useMemo(() => normalizeOptions(optionsProp), [optionsProp]);
  const resolvedInvalid = invalid || field?.invalid;
  const resolvedDisabled = disabled || field?.disabled || loading;
  const resolvedRequired = required || field?.required;
  const generatedId = useId();
  const resolvedId = id ?? field?.controlId ?? generatedId;
  const listboxId = `${resolvedId}-listbox`;
  const labelledBy =
    [ariaLabelledBy, field?.labelId].filter(Boolean).join(" ") || undefined;
  const describedBy =
    [
      props["aria-describedby"],
      field?.descriptionId,
      resolvedInvalid ? field?.messageId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    defaultValue !== undefined ? String(defaultValue) : "",
  );
  const resolvedValue =
    controlledValue !== undefined ? String(controlledValue) : uncontrolledValue;

  const selectedOption = options.find((o) => o.value === resolvedValue);
  const [open, setOpen] = useState(false);
  const [draftQuery, setDraftQuery] = useState(selectedOption?.textValue ?? "");
  const [activeIndex, setActiveIndex] = useState(null);
  const listRef = useRef([]);

  const inputValue = open ? draftQuery : (selectedOption?.textValue ?? "");
  const clearButtonContent = clearIcon ?? (
    <ClearIcon className="size-4 fill-current" />
  );
  const showClearButton =
    clearButton &&
    !resolvedDisabled &&
    (resolvedValue.length > 0 || draftQuery.length > 0);

  const filteredOptions = useMemo(
    () => filterOptionsByQuery(options, open ? draftQuery : ""),
    [draftQuery, open, options],
  );

  const handleOpenChange = useCallback(
    (nextOpen) => {
      if (!nextOpen) {
        setOpen(false);
        setActiveIndex(null);
        return;
      }
      setOpen((wasOpen) => {
        if (!wasOpen) {
          const seed = selectedOption?.textValue ?? "";
          setDraftQuery(seed);
          const list = filterOptionsByQuery(options, seed);
          setActiveIndex(firstEnabledIndex(list));
        }
        return true;
      });
    },
    [options, selectedOption],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: COMBOBOX_PLACEMENT,
    transform: false,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      useMatchFloatingWidth(),
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
    /** Evita mover el foco DOM a los botones de cada opción; el input conserva el foco (patrón combobox). */
    virtual: true,
  });
  const interactions = useInteractions([dismiss, role, listNavigation]);

  const { isMounted, styles: transitionStyles } = useFloatingTransition(context, {
    duration: { open: 140, close: 100 },
    placement: COMBOBOX_PLACEMENT,
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

  const handleValueChange = useCallback(
    (nextValue, labelText, nativeEvent) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(nextValue);
      }
      setDraftQuery(labelText);
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
    },
    [
      controlledValue,
      handleOpenChange,
      name,
      onChange,
      onValueChange,
      refs.reference,
      resolvedId,
    ],
  );

  const clearSelection = useCallback(
    (nativeEvent) => {
      if (controlledValue === undefined) {
        setUncontrolledValue("");
      }
      setDraftQuery("");
      setActiveIndex(firstEnabledIndex(options));
      onValueChange?.("");
      onChange?.(
        createChangeEvent({
          id: resolvedId,
          name,
          nativeEvent,
          value: "",
        }),
      );
      onClear?.();
      handleOpenChange(false);
      refs.reference.current?.focus?.();
    },
    [
      controlledValue,
      handleOpenChange,
      name,
      onChange,
      onClear,
      onValueChange,
      options,
      refs.reference,
      resolvedId,
    ],
  );
  const activeOptionId =
    open && activeIndex !== null && filteredOptions[activeIndex]
      ? `${resolvedId}-opt-${activeIndex}`
      : undefined;

  const getOptionProps = useCallback(
    (option, index) =>
      interactions.getItemProps({
        active: activeIndex === index,
        selected: option.value === resolvedValue,
        onClick(event) {
          if (option.disabled) {
            return;
          }
          handleValueChange(option.value, option.textValue, event);
        },
        onMouseEnter() {
          setActiveIndex(index);
        },
        onKeyDown(event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!option.disabled) {
              handleValueChange(option.value, option.textValue, event);
            }
          }
        },
      }),
    [activeIndex, handleValueChange, interactions, resolvedValue],
  );

  const content = isMounted ? (
    <ul
      id={listboxId}
      ref={floatingRef}
      className={cn(
        FLOATING_LIST_SURFACE_PRIMITIVES.layout,
        FLOATING_LIST_SURFACE_THEME_CLASSES[theme].neutral,
        COMBOBOX_PRIMITIVES.content,
      )}
      style={{
        ...floatingStyles,
        ...transitionStyles,
      }}
      {...interactions.getFloatingProps({
        "aria-labelledby": resolvedId,
      })}
    >
      {loading ? (
        <li role="presentation" className="px-3 py-2 text-sm text-current/50">
          {TXT.LOADING}
        </li>
      ) : filteredOptions.length === 0 ? (
        <li role="presentation" className="px-3 py-2 text-sm text-current/50">
          {emptyText}
        </li>
      ) : (
        filteredOptions.map((option, index) => {
          const selected = option.value === resolvedValue;
          return (
            <li key={option.key} role="presentation">
              <button
                id={`${resolvedId}-opt-${index}`}
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
                  color: "neutral",
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
        COMBOBOX_PRIMITIVES.wrapper,
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
      <div className={cn("relative flex w-full", isAttached && "h-full")}>
        <input
          ref={referenceRef}
          id={resolvedId}
          type="text"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-labelledby={labelledBy}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={activeOptionId}
          aria-autocomplete="list"
          aria-invalid={resolvedInvalid || undefined}
          aria-required={resolvedRequired || undefined}
          aria-describedby={describedBy}
          disabled={resolvedDisabled}
          placeholder={placeholder}
          value={inputValue}
          className={cn(
            COMBOBOX_PRIMITIVES.input,
            isAttached
              ? "h-full rounded-none border-0 shadow-none focus-visible:border-transparent focus-visible:ring-0"
              : getControlRadius(controlSize),
            isAttached
              ? null
              : (COMBOBOX_SIZE_CLASSES[controlSize] ??
                  COMBOBOX_SIZE_CLASSES.md),
            resolveQuickitFocusRingClasses(
              isAttached ? false : focusRingEnabled,
              resolvedInvalid ? ui.invalid : colorUi.base,
            ),
            !isAttached &&
              !resolvedDisabled &&
              !resolvedInvalid &&
              colorUi.hover,
            showClearButton ? "pr-[3.5rem]" : "pr-10",
            className,
          )}
          {...interactions.getReferenceProps({
            ...props,
            onChange(event) {
              const next = event.target.value;
              setDraftQuery(next);
              setOpen(true);
              const list = filterOptionsByQuery(options, next);
              setActiveIndex(firstEnabledIndex(list));
              onInputChange?.(next, event);
            },
            onClick(event) {
              props.onClick?.(event);
              if (!resolvedDisabled && !open) {
                handleOpenChange(true);
              }
            },
            onKeyDown(event) {
              props.onKeyDown?.(event);
              if (event.defaultPrevented || resolvedDisabled) {
                return;
              }
              if (event.key === "Escape") {
                handleOpenChange(false);
                return;
              }
              if (
                !open &&
                (event.key === "ArrowDown" ||
                  event.key === "ArrowUp" ||
                  event.key === "Enter")
              ) {
                event.preventDefault();
                handleOpenChange(true);
              }
            },
          })}
        />
        <span className={COMBOBOX_PRIMITIVES.rightCluster}>
          {showClearButton ? (
            <Button
              type="button"
              variant="ghost"
              color="neutral"
              shape="circle"
              size="sm"
              aria-label={clearButtonLabel}
              title={clearButtonLabel}
              disabled={resolvedDisabled}
              className={cn(
                COMBOBOX_PRIMITIVES.actionButton,
                "size-7 min-w-7 p-0",
              )}
              onPointerDown={(event) => {
                event.preventDefault();
              }}
              onClick={(event) => {
                clearSelection(event);
              }}
            >
              {clearButtonContent}
            </Button>
          ) : null}

          <Button
            type="button"
            variant="ghost"
            color="neutral"
            shape="square"
            size="sm"
            tabIndex={-1}
            title={open ? TXT.CLOSE_OPTIONS : TXT.OPEN_OPTIONS}
            aria-label={open ? TXT.CLOSE_OPTIONS : TXT.OPEN_OPTIONS}
            disabled={resolvedDisabled}
            className={cn(
              COMBOBOX_PRIMITIVES.actionButton,
              COMBOBOX_PRIMITIVES.icon,
              "size-7 min-w-7 p-0",
              open && "rotate-180",
            )}
            onPointerDown={(event) => {
              event.preventDefault();
            }}
            onClick={() => {
              if (!resolvedDisabled) {
                handleOpenChange(!open);
              }
            }}
          >
            <ChevronDownIcon className="size-4 fill-current" />
          </Button>
        </span>
      </div>

      {usePortal ? <FloatingPortal>{content}</FloatingPortal> : content}
    </span>
  );
});

export { Combobox };
export default Combobox;
