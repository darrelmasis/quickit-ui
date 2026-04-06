import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { useQuickitFocusRing, useQuickitTheme } from "@/lib/theme";
import { resolveQuickitFocusRingClasses } from "@/lib/theme/focus-ring";
import { cn } from "@/lib/utils";
import {
  FLOATING_LIST_ITEM_PRIMITIVES,
  FLOATING_LIST_ITEM_THEME_CLASSES,
  FLOATING_LIST_SURFACE_PRIMITIVES,
  FLOATING_LIST_SURFACE_THEME_CLASSES,
  getFloatingArrowColors,
  getFloatingClosedTransform,
  getFloatingPlacementOrigin,
  resolveFloatingListTheme,
} from "@/lib/components/_shared/floating-list";
import { DropdownContext, useDropdownContext } from "./dropdown-context";

function isTriggerDisabled(element) {
  return Boolean(
    element?.props?.disabled || element?.props?.["aria-disabled"] === true,
  );
}

function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && typeof ref === "object") {
    ref.current = value;
  }
}

export function Dropdown({
  children,
  closeOnClickOutside = true,
  closeOnScroll = false,
  collisionPadding = 8,
  defaultOpen = false,
  offsetX = 0,
  onOpenChange,
  open: controlledOpen,
  placement = "bottom-end",
  showArrow = true,
  usePortal = true,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [arrowElement, setArrowElement] = useState(null);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback((nextOpen) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }, [isControlled, onOpenChange]);

  const middleware = useMemo(
    () => [
      offset({ mainAxis: 8, crossAxis: offsetX }),
      flip({ padding: collisionPadding }),
      shift({ padding: collisionPadding }),
      ...(showArrow ? [arrow({ element: arrowElement })] : []),
    ],
    [arrowElement, collisionPadding, offsetX, showArrow],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement,
    transform: false,
    middleware,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePress: closeOnClickOutside,
  });
  const role = useRole(context, { role: "menu" });
  const interactions = useInteractions([click, dismiss, role]);

  useEffect(() => {
    if (!closeOnScroll || !open) {
      return;
    }

    let lastScrollPosition = window.scrollY;

    const handleScroll = (event) => {
      const currentScrollPosition = window.scrollY;

      if (Math.abs(currentScrollPosition - lastScrollPosition) < 10) {
        return;
      }

      lastScrollPosition = currentScrollPosition;

      const target = event.target;
      const floatingElement = refs.floating.current;
      const referenceElement = refs.reference.current;

      if (
        target instanceof Node &&
        (floatingElement?.contains(target) || referenceElement?.contains(target))
      ) {
        return;
      }

      handleOpenChange(false);
    };

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [closeOnScroll, open, refs, handleOpenChange]);

  const value = useMemo(
    () => ({
      open,
      setOpen: handleOpenChange,
      toggle: () => handleOpenChange(!open),
      close: () => handleOpenChange(false),
      refs,
      context,
      interactions,
      floatingStyles,
      placement,
      setArrowElement,
      showArrow,
      usePortal,
    }),
    [
      context,
      floatingStyles,
      handleOpenChange,
      interactions,
      open,
      placement,
      refs,
      showArrow,
      usePortal,
    ],
  );

  return (
    <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>
  );
}

export const DropdownTrigger = forwardRef(function DropdownTrigger(
  { asChild = false, children, className, ...props },
  ref,
) {
  const { refs, interactions, open } = useDropdownContext("DropdownTrigger");
  const referenceRef = useCallback(
    (node) => {
      refs.setReference(node);
      assignRef(ref, node);
    },
    [ref, refs],
  );
  const sharedProps = {
    "data-state": open ? "open" : "closed",
    ...props,
  };

  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      throw new Error(
        "DropdownTrigger con asChild requiere un único elemento React válido.",
      );
    }

    return (
      <span
        ref={referenceRef}
        className={cn("inline-flex", className)}
        {...(isTriggerDisabled(child)
          ? sharedProps
          : interactions.getReferenceProps(sharedProps))}
      >
        {cloneElement(child, {
          className: cn(child.props.className),
        })}
      </span>
    );
  }

  return (
    <button
      ref={referenceRef}
      type="button"
      className={className}
      {...interactions.getReferenceProps(sharedProps)}
    >
      {children}
    </button>
  );
});

export const DropdownContent = forwardRef(function DropdownContent(
  { animated = true, children, className, ...props },
  ref,
) {
  const {
    refs,
    interactions,
    floatingStyles,
    context,
    placement,
    setArrowElement,
    showArrow,
    open,
    usePortal,
  } = useDropdownContext("DropdownContent");
  const theme = resolveFloatingListTheme(useQuickitTheme());
  const floatingRef = useCallback(
    (node) => {
      refs.setFloating(node);
      assignRef(ref, node);
    },
    [ref, refs],
  );
  const { fill: arrowFill, stroke: arrowStroke } = getFloatingArrowColors(theme);
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: animated ? { open: 140, close: 100 } : 0,
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
      transformOrigin: getFloatingPlacementOrigin(placement),
    },
  });

  if (!isMounted) {
    return null;
  }

  const content = (
    <ul
      ref={floatingRef}
      className={cn(
        FLOATING_LIST_SURFACE_PRIMITIVES.layout,
        FLOATING_LIST_SURFACE_THEME_CLASSES[theme],
        className,
      )}
      style={{
        ...floatingStyles,
        ...transitionStyles,
      }}
      {...interactions.getFloatingProps({
        ...props,
        "data-state": open ? "open" : "closed",
      })}
    >
      {showArrow ? (
        <FloatingArrow
          ref={setArrowElement}
          context={context}
          width={16}
          height={8}
          tipRadius={2}
          fill={arrowFill}
          stroke={arrowStroke}
          strokeWidth={1}
          className="pointer-events-none"
        />
      ) : null}
      {children}
    </ul>
  );

  if (usePortal) {
    return <FloatingPortal>{content}</FloatingPortal>;
  }

  return content;
});

export const DropdownItem = forwardRef(function DropdownItem(
  {
    as: Component = "button",
    children,
    className,
    closeOnClick = true,
    disabled = false,
    href,
    onClick,
    variant = "default",
    ...props
  },
  ref,
) {
  const { close } = useDropdownContext("DropdownItem");
  const theme = resolveFloatingListTheme(useQuickitTheme());
  const focusRingEnabled = useQuickitFocusRing("dropdown");
  const resolvedVariant = variant === "danger" ? "danger" : "default";

  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);

    if (closeOnClick) {
      close();
    }
  };

  return (
    <li role="none">
      <Component
        ref={ref}
        role="menuitem"
        href={href}
        onClick={handleClick}
        disabled={Component === "button" ? disabled : undefined}
        aria-disabled={Component !== "button" && disabled ? true : undefined}
        tabIndex={Component !== "button" && disabled ? -1 : undefined}
        type={Component === "button" ? "button" : undefined}
        className={cn(
          resolveQuickitFocusRingClasses(
            focusRingEnabled,
            FLOATING_LIST_ITEM_PRIMITIVES.base,
          ),
          resolveQuickitFocusRingClasses(
            focusRingEnabled,
            FLOATING_LIST_ITEM_THEME_CLASSES[theme][resolvedVariant],
          ),
          disabled && FLOATING_LIST_ITEM_THEME_CLASSES[theme].disabled,
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    </li>
  );
});

export function DropdownSeparator({ className }) {
  const theme = resolveFloatingListTheme(useQuickitTheme());

  return (
    <li
      role="separator"
      className={cn(
        "my-1 border-t",
        FLOATING_LIST_ITEM_THEME_CLASSES[theme].separator,
        className,
      )}
    />
  );
}
