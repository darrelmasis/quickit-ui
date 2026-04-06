import { forwardRef, useRef, useState } from "react";
import { useQuickitFocusRing } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  composeInputRefs,
  dispatchNativeInputValue,
  getInputActionButtonClassName,
  getInputClassName,
  INPUT_ACTION_BUTTON_SIZE_CLASSES,
  INPUT_ACTION_ICON_SIZE_CLASSES,
  INPUT_ACTION_PADDING_CLASSES,
  INPUT_PRIMITIVES,
  normalizeInputValue,
  useInputFieldState,
} from "./input.shared";

function ClearIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M6 6l8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M1.75 10s2.9-5 8.25-5 8.25 5 8.25 5-2.9 5-8.25 5-8.25-5-8.25-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EyeOffIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M2 2l16 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7.2 4.86A9.77 9.77 0 0 1 10 4.5c5.35 0 8.25 5.5 8.25 5.5a13.4 13.4 0 0 1-2.89 3.47M4.46 7.32A13.2 13.2 0 0 0 1.75 10s2.9 5.5 8.25 5.5c1.08 0 2.07-.22 2.97-.58"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.53 8.53A2.08 2.08 0 0 0 8 10a2 2 0 0 0 2 2c.54 0 1.03-.21 1.39-.56"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Input = forwardRef(function Input(
  {
    actionShape = "circle",
    className,
    clearButton,
    clearButtonLabel = "Limpiar búsqueda",
    clearIcon,
    color = "neutral",
    defaultPasswordVisible = false,
    disabled = false,
    hidePasswordIcon,
    hidePasswordLabel = "Ocultar contraseña",
    id,
    invalid = false,
    onClear,
    onPasswordVisibilityChange,
    required = false,
    showPasswordIcon,
    showPasswordLabel = "Mostrar contraseña",
    passwordToggle,
    size = "md",
    ...props
  },
  ref,
) {
  const originalType = props.type ?? "text";
  const inputRef = useRef(null);
  const focusRingEnabled = useQuickitFocusRing("input");
  const isControlled = props.value !== undefined;
  const shouldEnableClear = clearButton ?? originalType === "search";
  const shouldEnablePasswordToggle =
    passwordToggle ?? originalType === "password";
  const [passwordVisible, setPasswordVisible] = useState(defaultPasswordVisible);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    normalizeInputValue(props.value ?? props.defaultValue),
  );
  const currentValue = isControlled
    ? normalizeInputValue(props.value)
    : uncontrolledValue;
  const {
    colorUi,
    describedBy,
    resolvedDisabled,
    resolvedId,
    resolvedInvalid,
    resolvedRequired,
    theme,
    ui,
  } = useInputFieldState({
    ariaDescribedBy: props["aria-describedby"],
    color,
    disabled,
    id,
    invalid,
    required,
  });
  const resolvedActionShape =
    actionShape === "circle" ? "circle" : "square";
  const resolvedActionSize =
    INPUT_ACTION_BUTTON_SIZE_CLASSES[resolvedActionShape]?.[size]
      ? size
      : "md";
  const hasAction = shouldEnableClear || shouldEnablePasswordToggle;
  const resolvedType = shouldEnablePasswordToggle
    ? passwordVisible
      ? "text"
      : "password"
    : originalType;
  const showClearButton =
    shouldEnableClear &&
    !resolvedDisabled &&
    !shouldEnablePasswordToggle &&
    currentValue.length > 0;
  const iconSizeClassName = INPUT_ACTION_ICON_SIZE_CLASSES[resolvedActionSize];
  const clearButtonContent = clearIcon ?? (
    <ClearIcon className={iconSizeClassName} />
  );
  const passwordButtonContent = passwordVisible
    ? hidePasswordIcon ?? <EyeOffIcon className={iconSizeClassName} />
    : showPasswordIcon ?? <EyeIcon className={iconSizeClassName} />;

  return (
    <div className={cn(INPUT_PRIMITIVES.shell, props.type === "hidden" && "contents")}>
      <input
        ref={composeInputRefs(ref, inputRef)}
        id={resolvedId}
        required={resolvedRequired}
        disabled={resolvedDisabled}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        className={getInputClassName({
          className,
          colorUi,
          focusRingEnabled,
          resolvedDisabled,
          resolvedInvalid,
          size,
          ui,
          paddingEndClassName: hasAction
            ? shouldEnablePasswordToggle
              ? INPUT_ACTION_PADDING_CLASSES.password[resolvedActionSize]
              : INPUT_ACTION_PADDING_CLASSES.clear[resolvedActionSize]
            : undefined,
        })}
        {...props}
        type={resolvedType}
        onChange={(event) => {
          if (!isControlled) {
            setUncontrolledValue(event.target.value);
          }
          props.onChange?.(event);
        }}
      />

      {showClearButton ? (
        <button
          type="button"
          tabIndex={resolvedDisabled ? -1 : 0}
          aria-label={clearButtonLabel}
          disabled={resolvedDisabled}
          title={clearButtonLabel}
          className={getInputActionButtonClassName({
            shape: resolvedActionShape,
            size: resolvedActionSize,
            theme,
            focusRingEnabled,
          })}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            dispatchNativeInputValue(inputRef.current, "");
            inputRef.current?.focus();
            onClear?.();
          }}
        >
          {clearButtonContent}
        </button>
      ) : null}

      {shouldEnablePasswordToggle ? (
        <button
          type="button"
          tabIndex={resolvedDisabled ? -1 : 0}
          aria-label={passwordVisible ? hidePasswordLabel : showPasswordLabel}
          aria-pressed={passwordVisible}
          disabled={resolvedDisabled}
          title={passwordVisible ? hidePasswordLabel : showPasswordLabel}
          className={getInputActionButtonClassName({
            shape: resolvedActionShape,
            size: resolvedActionSize,
            theme,
            focusRingEnabled,
          })}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            const nextVisible = !passwordVisible;
            setPasswordVisible(nextVisible);
            onPasswordVisibilityChange?.(nextVisible);
          }}
        >
          {passwordButtonContent}
        </button>
      ) : null}
    </div>
  );
});

export { Input };
export default Input;
