import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CheckStrokeIcon,
  ClearIcon,
  CloseIcon,
  SpinnerIcon,
} from "@/lib/assets/icons";
import Button from "@/lib/components/button/Button";
import { useQuickitControlState } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { TOAST_ICON_CLASSES } from "@/lib/theme/theme-classes";
import { TXT } from "@/lib/texts";
import {
  dismissToast,
  MAX_VISIBLE_TOASTS,
  pauseToastStackAutoDismiss,
  resumeToastStackAutoDismiss,
  subscribeToToasts,
} from "./toast-store";

const POSITIONS = {
  "top-left": "top-6 left-6",
  "top-right": "top-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-right": "bottom-6 right-6",
};

const TOASTER_Z_INDEX = 10_000;

const TOAST_ROOT_WIDTH_CLASS =
  "w-[min(24rem,calc(100vw-2rem))] max-w-sm min-w-0";

const TOAST_THEME = {
  light: "border-neutral-200 bg-white text-neutral-950",
  dark: "border-neutral-800 bg-neutral-950 text-neutral-100",
};

const DEFAULT_GAP_COLLAPSED = 16;
const DEFAULT_GAP_EXPANDED = 80;
const SCALE_STEP = 0.052;
const OPACITY_STEP = 0;
const TOAST_BASE_MIN_H = 76;

function getBuiltinKindIcon(kind, theme) {
  const iconClasses = TOAST_ICON_CLASSES[theme]?.[kind];
  if (!iconClasses) return null;

  const className = cn("size-5 shrink-0", kind === "loading" && "animate-spin", iconClasses);

  switch (kind) {
    case "loading":
      return <SpinnerIcon className={className} />;
    case "success":
      return <CheckStrokeIcon className={className} />;
    case "error":
      return <ClearIcon className={className} />;
    default:
      return null;
  }
}

function stackAnimClasses(position, dismissing) {
  const top = position.startsWith("top");

  if (dismissing) {
    return top ? "qk-toast-surface--out-t" : "qk-toast-surface--out-b";
  }

  return top ? "qk-toast-surface--in-t" : "qk-toast-surface--in-b";
}

function stackTransformOrigin(position) {
  const verticalOrigin = position.startsWith("top") ? "top" : "bottom";

  return `${verticalOrigin} center`;
}

function clampVisibleToasts(n) {
  const value = Number(n);

  if (!Number.isFinite(value)) {
    return MAX_VISIBLE_TOASTS;
  }

  return Math.min(10, Math.max(1, Math.floor(value)));
}

function resolveGap(gapProp, expanded) {
  if (gapProp == null) {
    return expanded ? DEFAULT_GAP_EXPANDED : DEFAULT_GAP_COLLAPSED;
  }

  if (typeof gapProp === "number") {
    const collapsedGap = Math.max(0, gapProp);

    return expanded ? Math.max(36, Math.round(collapsedGap * 4)) : collapsedGap;
  }

  const collapsed = gapProp.collapsed ?? DEFAULT_GAP_COLLAPSED;
  const expandedGap = gapProp.expanded ?? DEFAULT_GAP_EXPANDED;

  return expanded ? expandedGap : collapsed;
}

function resolveToastIcon(item, { defaultIcon, icons, theme }) {
  if (item.icon != null) {
    return item.icon;
  }

  const kindKey = item.kind ?? "default";

  if (icons?.[kindKey] != null) {
    return icons[kindKey];
  }

  if (defaultIcon != null) {
    return defaultIcon;
  }

  if (item.kind && item.kind !== "default") {
    return getBuiltinKindIcon(item.kind, theme);
  }

  return null;
}

function getToastAnnouncementProps(item) {
  if (item.kind === "error") {
    return {
      role: "alert",
      "aria-atomic": "true",
      "aria-live": "assertive",
    };
  }

  return {
    role: "status",
    "aria-atomic": "true",
    "aria-live": "polite",
  };
}

const Toaster = forwardRef(function Toaster(
  {
    position = "bottom-right",
    visibleToasts: visibleToastsProp,
    gap,
    closeButtonLabel = TXT.CLOSE_TOAST,
    expandOnHover = true,
    showCloseButton = true,
    defaultIcon,
    icons: iconsProp,
    toastClassName,
    className,
    style,
    ...rootProps
  },
  ref,
) {
  const { theme } = useQuickitControlState("toaster");
  const [items, setItems] = useState([]);
  const [stackExpanded, setStackExpanded] = useState(false);
  const pointerInsideRef = useRef(false);
  const rootRef = useRef(null);

  const visibleCount = clampVisibleToasts(
    visibleToastsProp ?? MAX_VISIBLE_TOASTS,
  );
  const iconOptions = { defaultIcon, icons: iconsProp, theme };
  const [positions, setPositions] = useState([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !(expandOnHover && stackExpanded)) {
      return;
    }
    const measure = () => {
      const toastEls = root.querySelectorAll("[data-toast-idx]");
      const newPositions = [0];
      for (let i = 1; i < toastEls.length; i++) {
        const prevH = toastEls[i - 1].getBoundingClientRect().height;
        newPositions[i] = newPositions[i - 1] + prevH + 16;
      }
      setPositions(newPositions);
    };
    measure();
    const ro = new ResizeObserver(measure);
    const toastEls = root.querySelectorAll("[data-toast-idx]");
    toastEls.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [expandOnHover, stackExpanded, visibleCount, items]);

  useEffect(() => subscribeToToasts(setItems), []);

  const handlePointerEnter = () => {
    if (expandOnHover) {
      setStackExpanded(true);
    }

    if (!pointerInsideRef.current) {
      pointerInsideRef.current = true;
      pauseToastStackAutoDismiss();
    }
  };

  const handlePointerLeave = (event) => {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && rootRef.current?.contains(nextTarget)) {
      return;
    }

    requestAnimationFrame(() => {
      const root = rootRef.current;

      if (root?.matches(":focus-within")) {
        return;
      }

      if (expandOnHover) {
        setStackExpanded(false);
      }

      pointerInsideRef.current = false;
      resumeToastStackAutoDismiss();
    });
  };

  const handleFocusCapture = () => {
    if (expandOnHover) {
      setStackExpanded(true);
    }

    if (!pointerInsideRef.current) {
      pointerInsideRef.current = true;
      pauseToastStackAutoDismiss();
    }
  };

  const handleBlurCapture = () => {
    requestAnimationFrame(() => {
      const root = rootRef.current;

      if (root?.contains(document.activeElement)) {
        return;
      }

      if (expandOnHover) {
        setStackExpanded(false);
      }

      pointerInsideRef.current = false;
      resumeToastStackAutoDismiss();
    });
  };

  if (typeof window === "undefined") {
    return null;
  }

  const resolvedPosition = POSITIONS[position] ?? POSITIONS["bottom-right"];
  const orderedItems = [...items].reverse();
  const transformOrigin = stackTransformOrigin(position);
  const isTop = position.startsWith("top");
  const expandedLayout = expandOnHover && stackExpanded;
  const visibleList = orderedItems.slice(0, visibleCount);
  const layoutSlots = visibleList.length;
  const stackGapPx = resolveGap(gap, expandedLayout);
  const posArr = positions;
  const lastPos = posArr.length > 0 ? posArr[posArr.length - 1] : 0;
  const stackMinHeight =
    layoutSlots > 0
      ? expandedLayout && posArr.length > 0
        ? lastPos + TOAST_BASE_MIN_H
        : TOAST_BASE_MIN_H + (layoutSlots - 1) * stackGapPx
      : 0;

  return createPortal(
    <div
      ref={ref}
      {...rootProps}
      className={cn(
        "fixed overflow-visible",
        TOAST_ROOT_WIDTH_CLASS,
        resolvedPosition,
        className,
      )}
      style={{ zIndex: TOASTER_Z_INDEX, ...style }}
    >
      <div
        ref={rootRef}
        className={cn(
          "relative isolate w-full min-w-0 overflow-visible transition-[min-height] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          expandedLayout && "qk-toast-stack--expanded",
        )}
        style={{ minHeight: stackMinHeight }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
      >
        {visibleList.map((item, sliceIndex) => {
          const deckDepth = Math.min(sliceIndex, visibleCount - 1);
          const staticInset = sliceIndex * stackGapPx;
          const dynamicInset = posArr[sliceIndex] ?? staticInset;
          const inset = expandedLayout && posArr.length > 0 ? dynamicInset : staticInset;
          const scale =
            expandedLayout || item.dismissing ? 1 : 1 - deckDepth * SCALE_STEP;
          const stackOpacity =
            expandedLayout || item.dismissing
              ? 1
              : Math.max(0.38, 1 - deckDepth * OPACITY_STEP);
          const edgeStyle = isTop ? { top: inset } : { bottom: inset };
          const iconNode = resolveToastIcon(item, iconOptions);

          return (
            <div
              key={item.id}
              data-toast-idx={sliceIndex}
              className="absolute inset-x-0 min-w-0"
              style={{
                ...edgeStyle,
                opacity: stackOpacity,
                zIndex: 100 - sliceIndex,
                pointerEvents: "auto",
                transition:
                  "top 380ms cubic-bezier(0.32, 0.72, 0, 1), bottom 380ms cubic-bezier(0.32, 0.72, 0, 1), opacity 320ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            >
              <div
                className="w-full min-w-0 max-w-full will-change-transform"
                style={{
                  transform: `scale(${scale}) translateZ(0)`,
                  transformOrigin,
                  transition: "transform 380ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <div
                  {...getToastAnnouncementProps(item)}
                  className={cn(
                    "qk-toast-surface pointer-events-auto w-full min-w-0 max-w-full rounded-[var(--qi-radius-2xl)] border px-4 py-3",
                    stackAnimClasses(position, Boolean(item.dismissing)),
                    TOAST_THEME[theme],
                    toastClassName,
                  )}
                >
                  <div className="flex items-start gap-3">
                    {iconNode ? (
                      <span className="mt-0.5 flex shrink-0 [&_svg]:block">
                        {iconNode}
                      </span>
                    ) : null}

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold break-words">
                        {item.title}
                      </p>
                      {item.description ? (
                        <div className="mt-1 break-words text-sm text-neutral-500 dark:text-neutral-400">
                          {item.description}
                        </div>
                      ) : null}
                    </div>

                    {showCloseButton ? (
                      <Button
                        type="button"
                        variant="soft"
                        shape="square"
                        size="sm"
                        color="neutral"
                        aria-label={closeButtonLabel}
                        onClick={() => dismissToast(item.id)}
                        className="size-7 min-w-7 shrink-0 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                      >
                        <CloseIcon className="size-3.5" />
                      </Button>
                    ) : null}
                  </div>

                  {item.action ? (
                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        color="neutral"
                        onClick={(event) => {
                          item.action?.onClick?.(event);

                          if (!event.defaultPrevented) {
                            dismissToast(item.id);
                          }
                        }}
                      >
                        {item.action.label}
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>,
    document.body,
  );
});

export default Toaster;
