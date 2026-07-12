import { forwardRef, useEffect, useRef, useState } from "react";
import { useQuickitFocusRing } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  ClearIcon,
  EyeIcon,
  EyeOffIcon,
  MinusIcon,
  PlusIcon,
} from "@/lib/assets/icons";
import Button from "@/lib/components/button/Button";
import {
  composeInputRefs,
  dispatchNativeInputValue,
  getInputActionButtonClassName,
  getInputClassName,
  INPUT_ACTION_BUTTON_SIZE_CLASSES,
  INPUT_ACTION_ICON_SIZE_CLASSES,
  INPUT_ACTION_PADDING_CLASSES,
  INPUT_NUMBER_BUTTON_ICON_SIZE_CLASSES,
  INPUT_NUMBER_BUTTON_WIDTH_CLASSES,
  INPUT_PRIMITIVES,
  INPUT_SIDE_ELEMENT_SIZE_CLASSES,
  INPUT_SIDE_ELEMENT_THEME_CLASSES,
  normalizeInputValue,
  resolveInputShape,
  useInputFieldState,
} from "./input.shared";
import { useInputGroup } from "./input-group.context";
import { TXT } from "@/lib/texts";
import { getFormFieldAutofillStyle } from "@/lib/components/_shared/form-field";

function toFocusWithinClasses(className) {
  return className
    .split(/\s+/)
    .filter((token) => token.startsWith("focus-visible:"))
    .map((token) => token.replace("focus-visible:", "focus-within:"))
    .join(" ");
}

const Input = forwardRef(function Input(
  {
    actionShape = "circle",
    className,
    clearButton,
    clearButtonLabel = TXT.CLEAR_SEARCH,
    clearIcon,
    color: colorProp,
    defaultPasswordVisible = false,
    disabled = false,
    hidePasswordIcon,
    hidePasswordLabel = "Ocultar contraseña",
    id,
    invalid = false,
    leftElement,
    numberButtons = false,
    numberLayout = "horizontal",
    onClear,
    onDecrement,
    onIncrement,
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
  const numberRepeatDelayRef = useRef(null);
  const numberRepeatIntervalRef = useRef(null);
  const group = useInputGroup();
  const focusRingEnabled = useQuickitFocusRing("input");
  const size = sizeProp ?? group?.size ?? "md";
  const color = colorProp ?? group?.color ?? "neutral";
  const shape = shapeProp ?? group?.shape ?? "square";
  const isControlled = props.value !== undefined;
  const shouldEnableClear = clearButton ?? originalType === "search";
  const shouldEnablePasswordToggle =
    passwordToggle ?? originalType === "password";
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
    labelledBy,
    resolvedColor,
    resolvedDisabled,
    resolvedId,
    resolvedInvalid,
    resolvedRequired,
    theme,
    ui,
  } = useInputFieldState({
    ariaDescribedBy: props["aria-describedby"],
    ariaLabelledBy: props["aria-labelledby"],
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
  const isNumberType = originalType === "number";
  const showNumberButtons = isNumberType && numberButtons;
  const showVerticalNumberButtons =
    showNumberButtons && numberLayout === "vertical";
  const showHorizontalNumberButtons =
    showNumberButtons && !showVerticalNumberButtons;
  const resolvedStep = parseFloat(props.step) || 1;
  const minValue = props.min !== undefined ? parseFloat(props.min) : undefined;
  const maxValue = props.max !== undefined ? parseFloat(props.max) : undefined;
  const currentNumber = parseFloat(currentValue) || 0;
  const canDecrement =
    minValue !== undefined ? currentNumber - resolvedStep >= minValue : true;
  const canIncrement =
    maxValue !== undefined ? currentNumber + resolvedStep <= maxValue : true;
  const resolvedType = shouldEnablePasswordToggle
    ? passwordVisible
      ? "text"
      : "password"
    : originalType;
  const resolvedAutoComplete = props.autoComplete;
  const showClearButton =
    shouldEnableClear &&
    !resolvedDisabled &&
    !props.readOnly &&
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
  const paddingStartClassName =
    hasLeftElement && !showNumberButtons
      ? INPUT_ACTION_PADDING_CLASSES.leftElement[resolvedActionSize]
      : undefined;
  const paddingEndClassName =
    hasRightElement && hasActionButton
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
  const fieldStyle = getFormFieldAutofillStyle({
    color,
    invalid: resolvedInvalid,
    style,
    theme,
  });
  const inputStyle = {
    ...fieldStyle,
    ...(hasLeftElement && !showNumberButtons
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
  const numberFocusWithinClassName =
    focusRingEnabled && !isAttached
      ? toFocusWithinClasses(resolvedInvalid ? ui.invalid : colorUi.base)
      : undefined;
  const numberControlClassName = getInputClassName({
    attached: isAttached,
    className: cn(
      className,
      "flex items-stretch overflow-hidden p-0",
      numberFocusWithinClassName,
      resolvedDisabled && "cursor-not-allowed opacity-60",
    ),
    colorUi,
    focusRingEnabled: false,
    shape: resolvedShape,
    resolvedDisabled,
    resolvedInvalid,
    size,
    ui,
  });
  const numberInputClassName = cn(
    "qi-form-field-autofill min-w-0 flex-1 border-0 bg-transparent text-sm outline-none",
    "placeholder:text-current/45 disabled:cursor-not-allowed disabled:bg-transparent",
    "[&::-webkit-inner-spin-button]:appearance-none",
    "[&::-webkit-outer-spin-button]:appearance-none",
    "[-moz-appearance:textfield]",
    size === "lg" && "text-base",
    showHorizontalNumberButtons ? "px-1" : "px-3",
  );
  const numberButtonClassName = cn(
    "min-w-0 shrink-0 rounded-none border-0 bg-transparent p-0 shadow-none",
    "text-current/45 hover:text-current/75",
    "disabled:pointer-events-none disabled:opacity-30",
  );
  const numberSpinnerBorderClassName =
    theme === "dark"
      ? "border-neutral-700 divide-neutral-700"
      : "border-neutral-300 divide-neutral-300";

  const clearInputValue = () => {
    if (props.readOnly) {
      return;
    }

    dispatchNativeInputValue(inputRef.current, "");
    inputRef.current?.focus();
    onClear?.();
  };
  const stopNumberRepeat = () => {
    if (numberRepeatDelayRef.current) {
      window.clearTimeout(numberRepeatDelayRef.current);
      numberRepeatDelayRef.current = null;
    }

    if (numberRepeatIntervalRef.current) {
      window.clearInterval(numberRepeatIntervalRef.current);
      numberRepeatIntervalRef.current = null;
    }
  };
  const stepNumberValue = (direction) => {
    if (resolvedDisabled || props.readOnly) return;
    const current = parseFloat(inputRef.current?.value ?? currentValue) || 0;
    const isIncrement = direction === "increment";
    const next =
      isIncrement && maxValue !== undefined
        ? Math.min(current + resolvedStep, maxValue)
        : !isIncrement && minValue !== undefined
          ? Math.max(current - resolvedStep, minValue)
          : current + (isIncrement ? resolvedStep : -resolvedStep);

    if (next === current) {
      return false;
    }

    dispatchNativeInputValue(inputRef.current, String(next));
    inputRef.current?.focus();
    if (isIncrement) {
      onIncrement?.(next);
    } else {
      onDecrement?.(next);
    }

    return true;
  };
  const startNumberRepeat = (event, direction) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    event.preventDefault();
    stopNumberRepeat();

    const didStep = stepNumberValue(direction);

    if (!didStep) {
      return;
    }

    event.currentTarget.setPointerCapture?.(event.pointerId);

    numberRepeatDelayRef.current = window.setTimeout(() => {
      numberRepeatDelayRef.current = null;
      numberRepeatIntervalRef.current = window.setInterval(() => {
        const didRepeatStep = stepNumberValue(direction);

        if (!didRepeatStep) {
          stopNumberRepeat();
        }
      }, 75);
    }, 350);
  };
  const handleKeyDown = (event) => {
    props.onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

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
  };
  const handleChange = (event) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value);
    }
    props.onChange?.(event);
  };
  const renderInput = ({ className: inputClassName, style: inputStyleProp }) => (
    <input
      ref={composeInputRefs(ref, inputRef)}
      {...props}
      id={resolvedId}
      required={resolvedRequired}
      disabled={resolvedDisabled}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      className={inputClassName}
      style={inputStyleProp}
      autoComplete={resolvedAutoComplete}
      type={resolvedType}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );

  useEffect(() => {
    const leftNode = leftElementRef.current;
    const rightNode = rightClusterRef.current;
    const updateMeasurements = () => {
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
    hasActionButton,
    hasLeftElement,
    hasRightElement,
    leftElement,
    passwordVisible,
    rightElement,
    resolvedActionSize,
    showClearButton,
    showNumberButtons,
  ]);

  useEffect(() => stopNumberRepeat, []);

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
      {showNumberButtons ? (
        <div
          data-slot="input-number"
          data-layout={showVerticalNumberButtons ? "vertical" : "horizontal"}
          className={numberControlClassName}
          style={fieldStyle}
        >
          {showHorizontalNumberButtons ? (
            <Button
              type="button"
              tabIndex={-1}
              aria-label="Decrementar"
              disabled={resolvedDisabled || !canDecrement}
              title="Decrementar"
              variant="ghost"
              color={resolvedColor}
              shape="square"
              size={size}
              activeMotion={false}
              ripple={false}
              className={cn(
                numberButtonClassName,
                "h-full",
                INPUT_NUMBER_BUTTON_WIDTH_CLASSES[size],
              )}
              onPointerDown={(event) => startNumberRepeat(event, "decrement")}
              onPointerUp={stopNumberRepeat}
              onPointerCancel={stopNumberRepeat}
              onPointerLeave={stopNumberRepeat}
              onBlur={stopNumberRepeat}
            >
              <MinusIcon className={INPUT_NUMBER_BUTTON_ICON_SIZE_CLASSES[size]} />
            </Button>
          ) : null}

          {renderInput({
            className: numberInputClassName,
          })}

          {showHorizontalNumberButtons ? (
            <Button
              type="button"
              tabIndex={-1}
              aria-label="Incrementar"
              disabled={resolvedDisabled || !canIncrement}
              title="Incrementar"
              variant="ghost"
              color={resolvedColor}
              shape="square"
              size={size}
              activeMotion={false}
              ripple={false}
              className={cn(
                numberButtonClassName,
                "h-full",
                INPUT_NUMBER_BUTTON_WIDTH_CLASSES[size],
              )}
              onPointerDown={(event) => startNumberRepeat(event, "increment")}
              onPointerUp={stopNumberRepeat}
              onPointerCancel={stopNumberRepeat}
              onPointerLeave={stopNumberRepeat}
              onBlur={stopNumberRepeat}
            >
              <PlusIcon className={INPUT_NUMBER_BUTTON_ICON_SIZE_CLASSES[size]} />
            </Button>
          ) : null}

          {showVerticalNumberButtons ? (
            <span
              className={cn(
                "inline-flex h-full flex-col overflow-hidden border-l divide-y",
                numberSpinnerBorderClassName,
                INPUT_NUMBER_BUTTON_WIDTH_CLASSES[size],
              )}
            >
              <Button
                type="button"
                tabIndex={-1}
                aria-label="Incrementar"
                disabled={resolvedDisabled || !canIncrement}
                title="Incrementar"
                variant="ghost"
                color={resolvedColor}
                shape="square"
                size={size}
                activeMotion={false}
                ripple={false}
                className={cn(numberButtonClassName, "h-1/2 w-full flex-1")}
                onPointerDown={(event) => startNumberRepeat(event, "increment")}
                onPointerUp={stopNumberRepeat}
                onPointerCancel={stopNumberRepeat}
                onPointerLeave={stopNumberRepeat}
                onBlur={stopNumberRepeat}
              >
                <ChevronDownIcon
                  className={cn(
                    INPUT_NUMBER_BUTTON_ICON_SIZE_CLASSES[size],
                    "rotate-180",
                  )}
                />
              </Button>
              <Button
                type="button"
                tabIndex={-1}
                aria-label="Decrementar"
                disabled={resolvedDisabled || !canDecrement}
                title="Decrementar"
                variant="ghost"
                color={resolvedColor}
                shape="square"
                size={size}
                activeMotion={false}
                ripple={false}
                className={cn(numberButtonClassName, "h-1/2 w-full flex-1")}
                onPointerDown={(event) => startNumberRepeat(event, "decrement")}
                onPointerUp={stopNumberRepeat}
                onPointerCancel={stopNumberRepeat}
                onPointerLeave={stopNumberRepeat}
                onBlur={stopNumberRepeat}
              >
                <ChevronDownIcon className={INPUT_NUMBER_BUTTON_ICON_SIZE_CLASSES[size]} />
              </Button>
            </span>
          ) : null}
        </div>
      ) : (
        <>
          {hasLeftElement ? (
            <span ref={leftElementRef} className={INPUT_PRIMITIVES.leftElement}>
              <span className={sideElementClassName}>{leftElement}</span>
            </span>
          ) : null}

          {renderInput({
            className: getInputClassName({
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
            }),
            style: inputStyle,
          })}

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
                  tabIndex={-1}
                  aria-label={clearButtonLabel}
                  disabled={resolvedDisabled}
                  title={clearButtonLabel}
                  className={getInputActionButtonClassName({
                    shape: resolvedActionShape,
                    size: resolvedActionSize,
                    theme,
                    focusRingEnabled,
                    color: resolvedColor,
                    invalid: resolvedInvalid,
                  })}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    if (!props.readOnly) {
                      clearInputValue();
                    }
                  }}
                >
                  {clearButtonContent}
                </button>
              ) : null}

              {shouldEnablePasswordToggle ? (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={passwordVisible ? hidePasswordLabel : showPasswordLabel}
                  aria-pressed={passwordVisible}
                  disabled={resolvedDisabled}
                  title={passwordVisible ? hidePasswordLabel : showPasswordLabel}
                  className={getInputActionButtonClassName({
                    shape: resolvedActionShape,
                    size: resolvedActionSize,
                    theme,
                    focusRingEnabled,
                    color: resolvedColor,
                    invalid: resolvedInvalid,
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
        </>
      )}
    </div>
  );
});

export { Input };
export default Input;
