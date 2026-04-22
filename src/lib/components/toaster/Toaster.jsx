import { useEffect, useRef, useState } from "react";
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
  light:
    "border-neutral-200 bg-white text-neutral-950",
  dark:
    "border-neutral-800 bg-neutral-950 text-neutral-100",
};

const DEFAULT_GAP_COLLAPSED = 12;
const DEFAULT_GAP_EXPANDED = 96;
const SCALE_STEP = 0.052;
const OPACITY_STEP = 0.11;
const TOAST_BASE_MIN_H = 76;

const BUILTIN_KIND_ICONS = {
  loading: (
    <SpinnerIcon className="size-5 shrink-0 animate-spin text-sky-600 dark:text-sky-400" />
  ),
  success: (
    <CheckStrokeIcon className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
  ),
  error: (
    <ClearIcon className="size-5 shrink-0 text-rose-600 dark:text-rose-400" />
  ),
};

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

    return expanded ? Math.max(72, Math.round(collapsedGap * 6.5)) : collapsedGap;
  }

  const collapsed = gapProp.collapsed ?? DEFAULT_GAP_COLLAPSED;
  const expandedGap = gapProp.expanded ?? DEFAULT_GAP_EXPANDED;

  return expanded ? expandedGap : collapsed;
}

function resolveToastIcon(item, { defaultIcon, icons }) {
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

  if (item.kind && item.kind !== "default" && BUILTIN_KIND_ICONS[item.kind]) {
    return BUILTIN_KIND_ICONS[item.kind];
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

export function Toaster({
  position = "bottom-right",
  visibleToasts: visibleToastsProp,
  gap,
  expandOnHover = true,
  showCloseButton = true,
  defaultIcon,
  icons: iconsProp,
  toastClassName,
  className,
  style,
  ...rootProps
}) {
  const { theme } = useQuickitControlState("toaster");
  const [items, setItems] = useState([]);
  const [stackExpanded, setStackExpanded] = useState(false);
  const pointerInsideRef = useRef(false);
  const rootRef = useRef(null);

  const visibleCount = clampVisibleToasts(
    visibleToastsProp ?? MAX_VISIBLE_TOASTS,
  );
  const iconOptions = { defaultIcon, icons: iconsProp };

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
  const stackMinHeight =
    layoutSlots > 0
      ? TOAST_BASE_MIN_H + (layoutSlots - 1) * stackGapPx
      : 0;

  return createPortal(
    <div
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
          const inset = sliceIndex * stackGapPx;
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
                  transition:
                    "transform 380ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <div
                  {...getToastAnnouncementProps(item)}
                  className={cn(
                    "qk-toast-surface pointer-events-auto w-full min-w-0 max-w-full rounded-2xl border px-4 py-3",
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
                        variant="ghost"
                        shape="square"
                        size="sm"
                        color="neutral"
                        aria-label="Cerrar"
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
}

export default Toaster;
