import { forwardRef, useEffect, useRef, useState } from "react";
import { CheckIcon, MinusIcon } from "@/lib/assets/icons";
import { useQuickitControlState } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn, getCheckboxRadius } from "@/lib/utils";
import { useFormControl } from "@/lib/components/form-control";

const CHECKBOX_PRIMITIVES = {
  host: "flex cursor-pointer items-center gap-2.5",
  input:
    "peer absolute inset-0 z-10 m-0 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed",
  box: [
    "pointer-events-none inline-flex items-center justify-center rounded border transition-all duration-200",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
  ].join(" "),
  indicator: "size-3.5 fill-current",
  label: "font-medium leading-none select-none",
};

const CHECKBOX_SIZE_CLASSES = {
  sm: {
    box: "size-4",
    icon: "size-3",
  },
  md: {
    box: "size-5",
    icon: "size-3.5",
  },
};

const CHECKBOX_THEME_CLASSES = {
  light: {
    box: {
      idle: "border-slate-300 bg-white hover:border-slate-400",
      invalid: "border-rose-500 bg-white",
      focus: "focus-visible:ring-slate-400/50 focus-visible:ring-offset-white",
      colors: {
        neutral:
          "peer-checked:border-slate-700 peer-checked:bg-slate-700 peer-checked:text-white",
        slate:
          "peer-checked:border-slate-700 peer-checked:bg-slate-700 peer-checked:text-white",
        zinc:
          "peer-checked:border-zinc-700 peer-checked:bg-zinc-700 peer-checked:text-white",
        primary:
          "peer-checked:border-sky-600 peer-checked:bg-sky-600 peer-checked:text-white",
        brand:
          "peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white",
        success:
          "peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white",
        danger:
          "peer-checked:border-rose-600 peer-checked:bg-rose-600 peer-checked:text-white",
        warning:
          "peer-checked:border-amber-500 peer-checked:bg-amber-500 peer-checked:text-slate-950",
        info:
          "peer-checked:border-cyan-600 peer-checked:bg-cyan-600 peer-checked:text-white",
        light:
          "peer-checked:border-stone-300 peer-checked:bg-stone-300 peer-checked:text-slate-950",
        dark:
          "peer-checked:border-zinc-800 peer-checked:bg-zinc-800 peer-checked:text-white",
        black:
          "peer-checked:border-black peer-checked:bg-black peer-checked:text-white",
      },
    },
    label: "text-slate-900",
  },
  dark: {
    box: {
      idle: "border-zinc-700 bg-zinc-950 hover:border-zinc-600",
      invalid: "border-rose-500 bg-zinc-950",
      focus: "focus-visible:ring-zinc-500/50 focus-visible:ring-offset-zinc-950",
      colors: {
        neutral:
          "peer-checked:border-zinc-100 peer-checked:bg-zinc-100 peer-checked:text-zinc-950",
        slate:
          "peer-checked:border-slate-100 peer-checked:bg-slate-100 peer-checked:text-slate-950",
        zinc:
          "peer-checked:border-zinc-100 peer-checked:bg-zinc-100 peer-checked:text-zinc-950",
        primary:
          "peer-checked:border-sky-300 peer-checked:bg-sky-300 peer-checked:text-zinc-950",
        brand:
          "peer-checked:border-brand-300 peer-checked:bg-brand-300 peer-checked:text-zinc-950",
        success:
          "peer-checked:border-emerald-300 peer-checked:bg-emerald-300 peer-checked:text-zinc-950",
        danger:
          "peer-checked:border-rose-300 peer-checked:bg-rose-300 peer-checked:text-zinc-950",
        warning:
          "peer-checked:border-amber-300 peer-checked:bg-amber-300 peer-checked:text-zinc-950",
        info:
          "peer-checked:border-cyan-300 peer-checked:bg-cyan-300 peer-checked:text-zinc-950",
        light:
          "peer-checked:border-stone-200 peer-checked:bg-stone-200 peer-checked:text-zinc-950",
        dark:
          "peer-checked:border-zinc-300 peer-checked:bg-zinc-300 peer-checked:text-zinc-950",
        black:
          "peer-checked:border-white peer-checked:bg-white peer-checked:text-zinc-950",
      },
    },
    label: "text-stone-50",
  },
};

const Checkbox = forwardRef(function Checkbox(
  {
    checked,
    children,
    className,
    color = "neutral",
    containerClassName,
    defaultChecked = false,
    disabled = false,
    id,
    indeterminate = false,
    invalid = false,
    label,
    labelClassName,
    name,
    onChange,
    onCheckedChange,
    required = false,
    size = "md",
    ...props
  },
  ref,
) {
  const inputRef = useRef(null);
  const formControl = useFormControl();
  const { theme, focusRing: focusRingEnabled } = useQuickitControlState("checkbox");
  const ui = CHECKBOX_THEME_CLASSES[theme];
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const resolvedColor = ui.box.colors[color] ? color : "neutral";
  const resolvedSize = CHECKBOX_SIZE_CLASSES[size] ? size : "md";
  const labelContent = label ?? children;

  const isInvalid = invalid || formControl?.invalid;
  const isDisabled = disabled || formControl?.disabled;
  const isRequired = required || formControl?.required;
  const describedBy = [
    props["aria-describedby"],
    formControl?.descriptionId,
    isInvalid ? formControl?.messageId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const labelledBy =
    [props["aria-labelledby"], formControl?.labelId].filter(Boolean).join(" ") || undefined;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event) => {
    if (isDisabled) {
      return;
    }

    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }

    onChange?.(event);
    onCheckedChange?.(event.target.checked, event);
  };

  return (
    <label
      className={cn(
        CHECKBOX_PRIMITIVES.host,
        isDisabled && "pointer-events-none opacity-50",
        containerClassName,
      )}
    >
      <div className="relative flex items-center">
        <input
          {...props}
          ref={(node) => {
            inputRef.current = node;

            if (typeof ref === "function") {
              ref(node);
              return;
            }

            if (ref) {
              ref.current = node;
            }
          }}
          type="checkbox"
          id={id ?? formControl?.controlId}
          name={name}
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={isInvalid || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={describedBy}
          aria-labelledby={labelContent ? undefined : labelledBy}
          className={cn(CHECKBOX_PRIMITIVES.input, className)}
          onChange={handleChange}
        />

        <div
          className={cn(
            resolveQuickitFocusRingClasses(focusRingEnabled, CHECKBOX_PRIMITIVES.box),
            CHECKBOX_SIZE_CLASSES[resolvedSize].box,
            getCheckboxRadius(resolvedSize),
            ui.box.idle,
            ui.box.focus,
            ui.box.colors[resolvedColor],
            isInvalid && ui.box.invalid,
          )}
        >
          {indeterminate ? (
            <MinusIcon
              className={cn(CHECKBOX_PRIMITIVES.indicator, CHECKBOX_SIZE_CLASSES[resolvedSize].icon)}
            />
          ) : resolvedChecked ? (
            <CheckIcon
              className={cn(CHECKBOX_PRIMITIVES.indicator, CHECKBOX_SIZE_CLASSES[resolvedSize].icon)}
            />
          ) : null}
        </div>
      </div>

      {labelContent ? (
        <span className={cn(CHECKBOX_PRIMITIVES.label, ui.label, labelClassName)}>
          {labelContent}
        </span>
      ) : null}
    </label>
  );
});

export { Checkbox };
export default Checkbox;
