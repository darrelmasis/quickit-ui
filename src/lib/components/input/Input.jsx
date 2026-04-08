import { forwardRef, useEffect, useRef, useState } from "react";
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
  INPUT_SIDE_ELEMENT_SIZE_CLASSES,
  INPUT_SIDE_ELEMENT_THEME_CLASSES,
  normalizeInputValue,
  resolveInputShape,
  useInputFieldState,
} from "./input.shared";
import { useInputGroup } from "./input-group.context";
import { getFormFieldAutofillStyle } from "@/lib/components/_shared/form-field";

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
    color: colorProp,
    defaultPasswordVisible = false,
    disabled = false,
    hidePasswordIcon,
    hidePasswordLabel = "Ocultar contraseña",
    id,
    invalid = false,
    leftElement,
    onClear,
    onPasswordVisibilityChange,
    required = false,
    rightElement,
    shape: shapeProp,
    showPasswordIcon,
    showPasswordLabel = "Mostrar contraseña",
    passwordToggle,
    size: sizeProp,
    style,
    ...props
  },
  ref,
) {
  const originalType = props.type ?? "text";
  const inputRef = useRef(null);
  const leftElementRef = useRef(null);
  const rightClusterRef = useRef(null);
  const group = useInputGroup();
  const focusRingEnabled = useQuickitFocusRing("input");
  const size = sizeProp ?? group?.size ?? "md";
  const color = colorProp ?? group?.color ?? "neutral";
  const shape = shapeProp ?? group?.shape ?? "square";
  const isControlled = props.value !== undefined;
  const shouldEnableClear = clearButton ?? originalType === "search";
  const shouldEnablePasswordToggle =
    passwordToggle ?? originalType === "password";
  // search y password heredan mejoras automáticas, pero siguen permitiendo que
  // el usuario las apague o reemplace por props explícitas.
  const [passwordVisible, setPasswordVisible] = useState(defaultPasswordVisible);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    normalizeInputValue(props.value ?? props.defaultValue),
  );
  const [leftElementWidth, setLeftElementWidth] = useState(0);
  const [rightClusterWidth, setRightClusterWidth] = useState(0);
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
  const resolvedShape = resolveInputShape(shape);
  const isAttached = Boolean(group?.attached);
  const resolvedActionSize =
    INPUT_ACTION_BUTTON_SIZE_CLASSES[resolvedActionShape]?.[size]
      ? size
      : "md";
  const hasLeftElement = Boolean(leftElement);
  const hasRightElement = Boolean(rightElement);
  const resolvedType = shouldEnablePasswordToggle
    ? passwordVisible
      ? "text"
      : "password"
    : originalType;
  const resolvedAutoComplete =
    props.autoComplete ?? (originalType === "password" ? "new-password" : undefined);
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
  const hasActionButton = showClearButton || shouldEnablePasswordToggle;
  const paddingStartClassName = hasLeftElement
    ? INPUT_ACTION_PADDING_CLASSES.leftElement[resolvedActionSize]
    : undefined;
  const paddingEndClassName = hasRightElement && hasActionButton
    ? INPUT_ACTION_PADDING_CLASSES.elementWithAction[resolvedActionSize]
    : hasActionButton
      ? shouldEnablePasswordToggle
        ? INPUT_ACTION_PADDING_CLASSES.password[resolvedActionSize]
        : INPUT_ACTION_PADDING_CLASSES.clear[resolvedActionSize]
      : hasRightElement
        ? INPUT_ACTION_PADDING_CLASSES.element[resolvedActionSize]
        : undefined;
  const sideElementClassName = cn(
    INPUT_SIDE_ELEMENT_SIZE_CLASSES[resolvedActionSize] ??
      INPUT_SIDE_ELEMENT_SIZE_CLASSES.md,
    INPUT_SIDE_ELEMENT_THEME_CLASSES[theme],
  );
  const clearInputValue = () => {
    dispatchNativeInputValue(inputRef.current, "");
    inputRef.current?.focus();
    onClear?.();
  };
  const inputStyle = {
    ...getFormFieldAutofillStyle({
      color,
      invalid: resolvedInvalid,
      style,
      theme,
    }),
    ...(hasLeftElement
      ? {
          paddingLeft: `calc(${leftElementWidth}px + 1.75rem)`,
        }
      : null),
    ...(hasRightElement || hasActionButton
      ? {
          paddingRight: `calc(${rightClusterWidth}px + 1rem)`,
        }
      : null),
  };

  useEffect(() => {
    const leftNode = leftElementRef.current;
    const rightNode = rightClusterRef.current;
    const updateMeasurements = () => {
      // Los side elements pueden ser texto, badges o iconos; medimos su ancho
      // real para ajustar padding sin asumir una geometría fija.
      setLeftElementWidth(leftNode?.offsetWidth ?? 0);
      setRightClusterWidth(rightNode?.offsetWidth ?? 0);
    };

    updateMeasurements();

    if (typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(updateMeasurements);

    if (leftNode) {
      resizeObserver.observe(leftNode);
    }

    if (rightNode) {
      resizeObserver.observe(rightNode);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    currentValue,
    hasActionButton,
    hasLeftElement,
    hasRightElement,
    leftElement,
    passwordVisible,
    rightElement,
    resolvedActionSize,
    showClearButton,
  ]);

  return (
    <div
      data-slot="input-shell"
      data-attached={isAttached ? "" : undefined}
      className={cn(
        INPUT_PRIMITIVES.shell,
        isAttached && "h-full",
        group?.layout === "inline" && "flex-1",
        props.type === "hidden" && "contents",
      )}
    >
      {hasLeftElement ? (
        <span ref={leftElementRef} className={INPUT_PRIMITIVES.leftElement}>
          <span className={sideElementClassName}>{leftElement}</span>
        </span>
      ) : null}

      <input
        ref={composeInputRefs(ref, inputRef)}
        id={resolvedId}
        required={resolvedRequired}
        disabled={resolvedDisabled}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        className={getInputClassName({
          attached: isAttached,
          className,
          colorUi,
          focusRingEnabled: isAttached ? false : focusRingEnabled,
          shape: resolvedShape,
          resolvedDisabled,
          resolvedInvalid,
          size,
          ui,
          paddingStartClassName,
          paddingEndClassName,
        })}
        style={inputStyle}
        {...props}
        autoComplete={resolvedAutoComplete}
        type={resolvedType}
        onKeyDown={(event) => {
          props.onKeyDown?.(event);

          if (event.defaultPrevented) {
            return;
          }

          // Ctrl + Espacio funciona como escape rápido para limpiar el valor
          // actual del campo sin depender del botón de clear ni del mouse.
          if (
            event.ctrlKey &&
            !event.altKey &&
            !event.metaKey &&
            !event.shiftKey &&
            !event.isComposing &&
            !resolvedDisabled &&
            !props.readOnly &&
            currentValue.length > 0 &&
            (event.code === "Space" || event.key === " ")
          ) {
            event.preventDefault();
            clearInputValue();
          }
        }}
        onChange={(event) => {
          if (!isControlled) {
            setUncontrolledValue(event.target.value);
          }
          props.onChange?.(event);
        }}
      />

      {hasRightElement || hasActionButton ? (
        <span ref={rightClusterRef} className={INPUT_PRIMITIVES.rightCluster}>
          {hasRightElement ? (
            <span className={cn(INPUT_PRIMITIVES.rightElement, sideElementClassName)}>
              {rightElement}
            </span>
          ) : null}

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
                clearInputValue();
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
        </span>
      ) : null}
    </div>
  );
});

export { Input };
export default Input;
