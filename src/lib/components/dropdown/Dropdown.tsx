import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useQuickitControlState } from "@/lib/theme";
import { cn, useMergeRefs } from "@/lib/utils";
import {
  DROPDOWN_ARROW_COLORS,
  FLOATING_LIST_ITEM_THEME_CLASSES,
  FLOATING_LIST_SURFACE_PRIMITIVES,
  FLOATING_LIST_SURFACE_THEME_CLASSES,
  getFloatingListItemClasses,
  resolveFloatingListTheme,
  useFloatingTransition,
} from "@/lib/components/_shared/floating-list";
import {
  QUICKIT_SEMANTIC_COLORS,
  resolveQuickitToken,
} from "@/lib/tokens";
import { DropdownContext, useDropdownContext } from "./dropdown-context";

const DROPDOWN_ITEM_SELECTOR = '[data-qk-dropdown-item="true"]';

function getDropdownItems(container) {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll(DROPDOWN_ITEM_SELECTOR));
}

function isDropdownItemDisabled(item) {
  return (
    item.getAttribute("aria-disabled") === "true" || item.hasAttribute("disabled")
  );
}

function getNavigableDropdownItems(container) {
  return getDropdownItems(container).filter((item) => !isDropdownItemDisabled(item));
}

function focusDropdownItem(container, index) {
  const items = getNavigableDropdownItems(container);

  if (!items.length) {
    return null;
  }

  const normalizedIndex = ((index % items.length) + items.length) % items.length;
  const item = items[normalizedIndex];

  item?.focus();
  return item ?? null;
}

function focusDropdownEdgeItem(container, edge = "first") {
  const items = getNavigableDropdownItems(container);
  const item = edge === "last" ? items.at(-1) : items[0];

  item?.focus();
  return item ?? null;
}

export function Dropdown({
  arrowFill: arrowFillProp,
  arrowHeight = 8,
  arrowStroke: arrowStrokeProp,
  arrowStrokeWidth = 0.75,
  arrowTipRadius = 2,
  arrowWidth = 16,
  children,
  closeOnClickOutside = true,
  closeOnScroll = false,
  collisionPadding = 8,
  color,
  defaultOpen = false,
  offsetX = 0,
  onOpenChange,
  open: controlledOpen,
  placement = "bottom-start",
  /** `click`: abre al pulsar (por defecto). `hover`: abre al pasar el puntero por el trigger. */
  showArrow = false,
  trigger = "click",
  usePortal = true,
}) {
  const [arrowElement, setArrowElement] = useState(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const contentRef = useRef(null);

  const setOpen = useCallback(
    (nextOpen) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      if (nextOpen !== open) {
        onOpenChange?.(nextOpen);
      }
    },
    [isControlled, onOpenChange, open],
  );

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    transform: false,
    placement,
    middleware: [
      offset({ mainAxis: showArrow ? 8 : 6, crossAxis: offsetX }),
      flip({ padding: collisionPadding }),
      shift({ padding: collisionPadding }),
      ...(showArrow ? [arrow({ element: arrowElement })] : []),
    ],
    whileElementsMounted: autoUpdate,
  });

  const openOnClick = trigger === "click";
  const openOnHover = trigger === "hover";

  const click = useClick(context, { enabled: openOnClick });
  const hover = useHover(context, {
    enabled: openOnHover,
    move: false,
    delay: { open: 80, close: 220 },
    handleClose: safePolygon(),
  });
  const dismiss = useDismiss(context, {
    ancestorScroll: closeOnScroll,
    outsidePress: closeOnClickOutside,
  });
  const role = useRole(context, { role: "menu" });

  const interactions = useInteractions([click, hover, dismiss, role]);

  const { isMounted, styles: transitionStyles } = useFloatingTransition(context, {
    duration: { open: 140, close: 100 },
    placement,
  });

  const resolvedColor = resolveQuickitToken(QUICKIT_SEMANTIC_COLORS, color, "neutral");
  const { theme: effectiveTheme } = useQuickitControlState("dropdown");
  const theme = resolveFloatingListTheme(effectiveTheme);
  const arrowColors = DROPDOWN_ARROW_COLORS[theme]?.[resolvedColor] ?? DROPDOWN_ARROW_COLORS[theme]?.neutral;
  const resolvedArrowFill = arrowFillProp ?? arrowColors.fill;
  const resolvedArrowStroke = arrowStrokeProp ?? arrowColors.stroke;

  const contextValue = useMemo(
    () => ({
      arrowElement,
      arrowHeight,
      arrowStrokeWidth,
      arrowTipRadius,
      arrowWidth,
      close,
      context,
      floatingStyles,
      getContentRef: () => contentRef.current,
      getFloatingProps: interactions.getFloatingProps,
      getItemProps: interactions.getItemProps,
      getReferenceProps: interactions.getReferenceProps,
      isMounted,
      open,
      placement,
      refs,
      resolvedArrowFill,
      resolvedArrowStroke,
      resolvedColor,
      setArrowElement,
      setContentNode(node) {
        contentRef.current = node;
      },
      setOpen,
      showArrow,
      toggle,
      transitionStyles,
      usePortal,
    }),
    [
      arrowElement,
      arrowHeight,
      arrowStrokeWidth,
      arrowTipRadius,
      arrowWidth,
      close,
      context,
      floatingStyles,
      interactions.getFloatingProps,
      interactions.getItemProps,
      interactions.getReferenceProps,
      isMounted,
      open,
      placement,
      refs,
      resolvedArrowFill,
      resolvedArrowStroke,
      resolvedColor,
      setOpen,
      showArrow,
      toggle,
      transitionStyles,
      usePortal,
    ],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  );
}

export const DropdownTrigger = forwardRef(function DropdownTrigger(
  { asChild = false, children, ...props },
  ref,
) {
  const {
    getContentRef,
    getReferenceProps,
    open,
    refs,
    setOpen,
  } = useDropdownContext("DropdownTrigger");
  const mergedRef = useMergeRefs(refs.setReference, ref);
  const childRef = isValidElement(children)
    ? (children.props?.ref ?? children.ref)
    : null;
  const mergedChildRef = useMergeRefs(mergedRef, childRef);

  const focusEdgeItem = useCallback(
    (edge) => {
      window.requestAnimationFrame(() => {
        focusDropdownEdgeItem(getContentRef(), edge);
      });
    },
    [getContentRef],
  );

  const handleTriggerKeyDown = useCallback(
    (event) => {
      if (
        event.key !== "ArrowDown" &&
        event.key !== "ArrowUp" &&
        event.key !== "Enter" &&
        event.key !== " "
      ) {
        return;
      }

      event.preventDefault();

      if (!open) {
        setOpen(true);
      }

      focusEdgeItem(event.key === "ArrowUp" ? "last" : "first");
    },
    [focusEdgeItem, open, setOpen],
  );

  if (asChild && isValidElement(children)) {
    return Children.only(
      cloneElement(children, {
        ...getReferenceProps({
          ...props,
          ...children.props,
          "aria-expanded": open,
          "aria-haspopup": "menu",
          onKeyDown(event) {
            children.props.onKeyDown?.(event);
            props.onKeyDown?.(event);

            if (!event.defaultPrevented) {
              handleTriggerKeyDown(event);
            }
          },
          ref: mergedChildRef,
        }),
      }),
    );
  }

  return (
    <button
      ref={mergedRef}
      type="button"
      {...getReferenceProps({
        ...props,
        "aria-expanded": open,
        "aria-haspopup": "menu",
        onKeyDown(event) {
          props.onKeyDown?.(event);

          if (!event.defaultPrevented) {
            handleTriggerKeyDown(event);
          }
        },
      })}
    >
      {children}
    </button>
  );
});

export const DropdownContent = forwardRef(function DropdownContent(
  { children, className, style, ...props },
  ref,
) {
  const {
    arrowHeight,
    arrowStrokeWidth,
    arrowTipRadius,
    arrowWidth,
    context,
    floatingStyles,
    getContentRef,
    getFloatingProps,
    isMounted,
    placement,
    refs,
    resolvedArrowFill,
    resolvedArrowStroke,
    resolvedColor,
    setArrowElement,
    setContentNode,
    showArrow,
    transitionStyles,
    usePortal,
  } = useDropdownContext("DropdownContent");
  const { theme: effectiveTheme } = useQuickitControlState("dropdown");
  const theme = resolveFloatingListTheme(effectiveTheme);
  const floatingRef = useMergeRefs(ref, refs.setFloating);
  const typeaheadRef = useRef({ buffer: "", timeoutId: null });

  useEffect(() => () => {
    if (typeaheadRef.current.timeoutId) {
      window.clearTimeout(typeaheadRef.current.timeoutId);
      typeaheadRef.current.timeoutId = null;
      typeaheadRef.current.buffer = "";
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  const floatingProps = getFloatingProps(props);

  const contentNode = (
    <div
      ref={floatingRef}
      role="menu"
      aria-orientation="vertical"
      data-placement={placement}
      style={{
        ...floatingStyles,
        ...transitionStyles,
        ...style,
        "--qk-arrow-fill": resolvedArrowFill,
        "--qk-arrow-stroke": resolvedArrowStroke,
      } as React.CSSProperties}
       className={cn(
         FLOATING_LIST_SURFACE_PRIMITIVES.layout,
         FLOATING_LIST_SURFACE_THEME_CLASSES[theme][resolvedColor],
         "z-[9999] min-w-[8rem] sm:min-w-[10rem] max-w-[calc(100vw-2rem)] sm:max-w-xs",
         className,
       )}
      {...floatingProps}
      onKeyDownCapture={(event) => {
        floatingProps.onKeyDownCapture?.(event);
        props.onKeyDownCapture?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (event.ctrlKey || event.metaKey || event.altKey) {
          return;
        }

        const { target } = event;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement ||
          target?.isContentEditable
        ) {
          return;
        }

        if (event.key.length !== 1) {
          return;
        }

        const char = event.key;
        if (!/^\S$/u.test(char)) {
          return;
        }

        event.preventDefault();
        const state = typeaheadRef.current;
        state.buffer = `${state.buffer}${char.toLowerCase()}`;
        if (state.timeoutId) {
          window.clearTimeout(state.timeoutId);
        }
        state.timeoutId = window.setTimeout(() => {
          state.buffer = "";
          state.timeoutId = null;
        }, 500);

        const items = getNavigableDropdownItems(getContentRef());
        const match = items.find((el) =>
          el.textContent.trim().toLowerCase().startsWith(state.buffer),
        );
        match?.focus();
      }}
      onKeyDown={(event) => {
        floatingProps.onKeyDown?.(event);
        props.onKeyDown?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const edge = event.key === "ArrowUp" ? "last" : "first";
          focusDropdownEdgeItem(getContentRef(), edge);
        }
      }}
    >
      {showArrow ? (
        <FloatingArrow
          ref={setArrowElement}
          context={context}
          width={arrowWidth}
          height={arrowHeight}
          tipRadius={arrowTipRadius}
          strokeWidth={arrowStrokeWidth}
          className="qk-floating-arrow pointer-events-none"
        />
      ) : null}
      <div ref={setContentNode} className="max-h-72 overflow-y-auto">{children}</div>
    </div>
  );

  return usePortal ? <FloatingPortal>{contentNode}</FloatingPortal> : contentNode;
});

export const DropdownItem = forwardRef(function DropdownItem(
  {
    as,
    children,
    className,
    closeOnClick = true,
    disabled = false,
    href,
    onClick,
    onKeyDown,
    onMouseEnter,
    variant = "soft",
    ...props
  },
  ref,
) {
  const {
    close,
    getContentRef,
    getItemProps,
    refs,
    resolvedColor,
    setOpen,
  } = useDropdownContext("DropdownItem");
  const { theme: effectiveTheme, focusRing: focusRingEnabled } =
    useQuickitControlState("dropdown");
  const theme = resolveFloatingListTheme(effectiveTheme);
  const Component = as ?? (href ? "a" : "button");
  const isButton = Component === "button";
  const isAnchor = Component === "a";
  const focusSiblingItem = useCallback(
    (currentItem, direction) => {
      const items = getNavigableDropdownItems(getContentRef());
      const currentIndex = items.indexOf(currentItem);

      if (currentIndex === -1) {
        return;
      }

      focusDropdownItem(getContentRef(), currentIndex + direction);
    },
    [getContentRef],
  );

  const handleActivate = useCallback(
    (event) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);

      if (!event.defaultPrevented && closeOnClick) {
        close();
        window.requestAnimationFrame(() => {
          refs.reference.current?.focus?.();
        });
      }
    },
    [close, closeOnClick, disabled, onClick, refs.reference],
  );

  return (
    <Component
      ref={ref}
      data-qk-dropdown-item="true"
      role="menuitem"
      aria-disabled={disabled || undefined}
      href={isAnchor ? href : undefined}
      disabled={isButton ? disabled : undefined}
      tabIndex={-1}
      className={cn(
        getFloatingListItemClasses({
          focusRingEnabled,
          theme,
          color: resolvedColor,
          variant,
          disabled,
        }),
        className,
      )}
      {...getItemProps({
        ...props,
        onClick: handleActivate,
        onKeyDown(event) {
          onKeyDown?.(event);

          if (event.key === "ArrowDown") {
            event.preventDefault();
            focusSiblingItem(event.currentTarget, 1);
            return;
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            focusSiblingItem(event.currentTarget, -1);
            return;
          }

          if (event.key === "Home") {
            event.preventDefault();
            focusDropdownEdgeItem(getContentRef(), "first");
            return;
          }

          if (event.key === "End") {
            event.preventDefault();
            focusDropdownEdgeItem(getContentRef(), "last");
            return;
          }

          if (event.key === "Escape") {
            event.preventDefault();
            close();
            refs.reference.current?.focus?.();
            return;
          }

          if (event.key === "Tab") {
            setOpen(false);
            return;
          }

          if (event.key === " " && !event.defaultPrevented) {
            event.preventDefault();
            handleActivate(event);
            return;
          }

          if (event.defaultPrevented) {
            return;
          }

          if (
            !isButton &&
            !isAnchor &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            handleActivate(event);
          }
        },
        onMouseEnter(event) {
          onMouseEnter?.(event);
        },
      })}
      type={isButton ? "button" : undefined}
    >
      {children}
    </Component>
  );
});

export const DropdownSeparator = forwardRef(function DropdownSeparator(
  { className, ...props },
  ref,
) {
  const { theme: effectiveTheme } = useQuickitControlState("dropdown");
  const theme = resolveFloatingListTheme(effectiveTheme);
  const { resolvedColor } = useDropdownContext("DropdownSeparator");

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "my-1 border-t",
        FLOATING_LIST_ITEM_THEME_CLASSES[theme][resolvedColor].separator,
        className,
      )}
      {...props}
    />
  );
});

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export default Dropdown;
