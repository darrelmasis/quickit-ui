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
import { useQuickitTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { DropdownContext, useDropdownContext } from "./dropdown-context";

const DROPDOWN_CONTENT_PRIMITIVES = {
  layout:
    "z-50 min-w-[12rem] list-none rounded-[1rem] border p-1 outline-none",
};

const DROPDOWN_ITEM_PRIMITIVES = {
  base: [
    "flex w-full items-center gap-2 rounded-[0.75rem] px-3 py-2 text-left cursor-pointer ",
    "text-sm font-medium transition-colors outline-none",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
  ].join(" "),
};

const DROPDOWN_CONTENT_THEME_CLASSES = {
  light: "border-slate-200 bg-white text-slate-950",
  dark: "border-zinc-800 bg-zinc-950 text-stone-100",
};

const DROPDOWN_ITEM_THEME_CLASSES = {
  light: {
    default: [
      "text-slate-700",
      "hover:bg-slate-100 hover:text-slate-950",
      "focus-visible:bg-slate-100 focus-visible:text-slate-950",
      "focus-visible:outline-slate-300",
    ].join(" "),
    danger: [
      "text-red-700",
      "hover:bg-red-50 hover:text-red-800",
      "focus-visible:bg-red-50 focus-visible:text-red-800",
      "focus-visible:outline-red-300",
    ].join(" "),
    disabled:
      "cursor-not-allowed text-slate-400 opacity-60 hover:bg-transparent",
    separator: "border-slate-200",
  },
  dark: {
    default: [
      "text-stone-300",
      "hover:bg-zinc-900 hover:text-stone-50",
      "focus-visible:bg-zinc-900 focus-visible:text-stone-50",
      "focus-visible:outline-zinc-700",
    ].join(" "),
    danger: [
      "text-red-300",
      "hover:bg-red-500/10 hover:text-red-200",
      "focus-visible:bg-red-500/10 focus-visible:text-red-200",
      "focus-visible:outline-red-500/40",
    ].join(" "),
    disabled:
      "cursor-not-allowed text-stone-500 opacity-60 hover:bg-transparent",
    separator: "border-zinc-800",
  },
};

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

function getPlacementOrigin(placement) {
  switch (placement) {
    case "top-start":
      return "bottom left";
    case "top-end":
      return "bottom right";
    case "top":
      return "bottom center";
    case "bottom-start":
      return "top left";
    case "bottom-end":
      return "top right";
    case "bottom":
      return "top center";
    case "left-start":
      return "top right";
    case "left-end":
      return "bottom right";
    case "left":
      return "right center";
    case "right-start":
      return "top left";
    case "right-end":
      return "bottom left";
    case "right":
      return "left center";
    default:
      return "top center";
  }
}

function getClosedTransform(side) {
  switch (side) {
    case "top":
      return "translateY(4px) scale(0.98)";
    case "bottom":
      return "translateY(-4px) scale(0.98)";
    case "left":
      return "translateX(4px) scale(0.98)";
    case "right":
      return "translateX(-4px) scale(0.98)";
    default:
      return "scale(0.98)";
  }
}

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
  const theme = resolveTheme(useQuickitTheme());
  const floatingRef = useCallback(
    (node) => {
      refs.setFloating(node);
      assignRef(ref, node);
    },
    [ref, refs],
  );
  const arrowFill = theme === "dark" ? "#09090b" : "#ffffff";
  const arrowStroke = theme === "dark" ? "#27272a" : "#e2e8f0";
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: animated ? { open: 140, close: 100 } : 0,
    initial: ({ side }) => ({
      opacity: 0,
      transform: getClosedTransform(side),
    }),
    open: {
      opacity: 1,
      transform: "translate(0px, 0px) scale(1)",
    },
    close: ({ side }) => ({
      opacity: 0,
      transform: getClosedTransform(side),
    }),
    common: {
      transformOrigin: getPlacementOrigin(placement),
    },
  });

  if (!isMounted) {
    return null;
  }

  const content = (
    <ul
      ref={floatingRef}
      className={cn(
        DROPDOWN_CONTENT_PRIMITIVES.layout,
        DROPDOWN_CONTENT_THEME_CLASSES[theme],
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
  const theme = resolveTheme(useQuickitTheme());
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
          DROPDOWN_ITEM_PRIMITIVES.base,
          DROPDOWN_ITEM_THEME_CLASSES[theme][resolvedVariant],
          disabled && DROPDOWN_ITEM_THEME_CLASSES[theme].disabled,
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
  const theme = resolveTheme(useQuickitTheme());

  return (
    <li
      role="separator"
      className={cn(
        "my-1 border-t",
        DROPDOWN_ITEM_THEME_CLASSES[theme].separator,
        className,
      )}
    />
  );
}
