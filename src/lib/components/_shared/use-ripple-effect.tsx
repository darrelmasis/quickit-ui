import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

const KEYBOARD_RIPPLE_KEYS = new Set(["Enter", " "]);
const RIPPLE_ACTIVATION_DELAY_MS = 16;
const RIPPLE_DIAMETER_MULTIPLIER = 2.0;

interface RipplePosition {
  left: number;
  top: number;
}

interface RippleStyle {
  color: string;
  opacity: number;
}

interface RippleItem {
  id: number;
  left: number;
  size: number;
  state: "idle" | "enter";
  top: number;
}

interface RippleRect {
  height: number;
  left: number;
  top: number;
  width: number;
  xScale: number;
  yScale: number;
}

interface RippleEvent {
  clientX?: number;
  clientY?: number;
}

interface RippleOptions {
  centered?: boolean;
}

interface RippleHandlers {
  handlePointerDown: (event: PointerEvent<HTMLElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

function getRipplePosition(
  event: RippleEvent,
  rect: RippleRect,
  diameter: number,
  centered = false,
): RipplePosition {
  const fallbackX = rect.width / 2;
  const fallbackY = rect.height / 2;
  const xScale = rect.xScale || 1;
  const yScale = rect.yScale || 1;

  if (centered) {
    return {
      left: fallbackX - diameter / 2,
      top: fallbackY - diameter / 2,
    };
  }

  const clientX =
    typeof event?.clientX === "number"
      ? (event.clientX - rect.left) / xScale
      : fallbackX;
  const clientY =
    typeof event?.clientY === "number"
      ? (event.clientY - rect.top) / yScale
      : fallbackY;

  return {
    left: clientX - diameter / 2,
    top: clientY - diameter / 2,
  };
}

function getElementTransformScale(
  element: EventTarget | null,
): { x: number; y: number } {
  if (!(element instanceof HTMLElement)) {
    return { x: 1, y: 1 };
  }

  const transform = window.getComputedStyle(element).transform;

  if (!transform || transform === "none") {
    return { x: 1, y: 1 };
  }

  try {
    const matrix = new DOMMatrixReadOnly(transform);

    return {
      x: Math.abs(matrix.a) || 1,
      y: Math.abs(matrix.d) || 1,
    };
  } catch {
    return { x: 1, y: 1 };
  }
}

function parseRgbColor(value: string | null | undefined): {
  a: number;
  b: number;
  g: number;
  r: number;
} | null {
  const match = value?.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i,
  );

  if (!match) {
    return null;
  }

  return {
    a: match[4] === undefined ? 1 : Number(match[4]),
    b: Number(match[3]),
    g: Number(match[2]),
    r: Number(match[1]),
  };
}

function getRelativeLuminance({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}): number {
  const channel = (value: number): number => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

const RIPPLE_HUE_MAP = {
  neutral: { light: "rgb(255 255 255)", dark: "rgb(15 23 42)" },
  primary: { light: "var(--color-blue-100)", dark: "var(--color-blue-900)" },
  secondary: { light: "var(--color-purple-100)", dark: "var(--color-purple-900)" },
  success: { light: "var(--color-green-100)", dark: "var(--color-green-900)" },
  danger: { light: "var(--color-red-100)", dark: "var(--color-red-900)" },
  warning: { light: "var(--color-amber-100)", dark: "var(--color-amber-900)" },
  info: { light: "var(--color-cyan-100)", dark: "var(--color-cyan-900)" },
  light: { light: "rgb(255 255 255)", dark: "rgb(15 23 42)" },
  dark: { light: "rgb(255 255 255)", dark: "rgb(15 23 42)" },
};

export function resolveRippleStyleFromElement(element: EventTarget | null, fallback: RippleStyle): RippleStyle {
  if (!(element instanceof HTMLElement)) {
    return fallback;
  }

  const hue = element.dataset.qkRippleHue || "neutral";
  const shades = RIPPLE_HUE_MAP[hue] || RIPPLE_HUE_MAP.neutral;

  const styles = window.getComputedStyle(element);
  const background = parseRgbColor(styles.backgroundColor);

  if (!background || background.a < 0.45) {
    return fallback;
  }

  const luminance = getRelativeLuminance(background);

  // Fondos muy claros (luminancia > 0.7) necesitan ripple oscuro con más
  // opacidad para ser perceptible. Fondos medios/oscuros usan ripple claro.
  if (luminance > 0.7) {
    return {
      color: shades.dark,
      opacity: 0.28,
    };
  }

  if (luminance > 0.52) {
    return {
      color: shades.dark,
      opacity: 0.18,
    };
  }

  return {
    color: shades.light,
    opacity: 0.28,
  };
}

export function useRippleHandlers(
  rippleUi: RippleStyle,
  { handlePointerDown, handleKeyDown }: RippleHandlers,
  externalHandlers: {
    onPointerDown?: (event: PointerEvent<HTMLElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  } = {},
): { onPointerDown: (event: PointerEvent<HTMLElement>) => void; onKeyDown: (event: KeyboardEvent<HTMLElement>) => void } {
  const extPointerDown = externalHandlers.onPointerDown;
  const extKeyDown = externalHandlers.onKeyDown;

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      extPointerDown?.(event);

      if (!event.defaultPrevented) {
        const runtimeRipple = resolveRippleStyleFromElement(
          event.currentTarget,
          rippleUi,
        );
        event.currentTarget.style.setProperty(
          "--qk-ripple-color",
          runtimeRipple.color,
        );
        event.currentTarget.style.setProperty(
          "--qk-ripple-opacity",
          `${runtimeRipple.opacity}`,
        );
        handlePointerDown(event);
      }
    },
    [extPointerDown, handlePointerDown, rippleUi],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      extKeyDown?.(event);

      if (!event.defaultPrevented) {
        const runtimeRipple = resolveRippleStyleFromElement(
          event.currentTarget,
          rippleUi,
        );
        event.currentTarget.style.setProperty(
          "--qk-ripple-color",
          runtimeRipple.color,
        );
        event.currentTarget.style.setProperty(
          "--qk-ripple-opacity",
          `${runtimeRipple.opacity}`,
        );
        handleKeyDown(event);
      }
    },
    [extKeyDown, handleKeyDown, rippleUi],
  );

  return { onPointerDown, onKeyDown };
}

export function useRippleEffect({
  centered = false,
  duration = 650,
  enabled = true,
  opacity = 0.18,
}: {
  centered?: boolean;
  duration?: number;
  enabled?: boolean;
  opacity?: number;
}) {
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const activationIdsRef = useRef<Map<number, number>>(new Map());
  const removalIdsRef = useRef<Map<number, number>>(new Map());
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const activationIds = activationIdsRef.current;
    const removalIds = removalIdsRef.current;

    return () => {
      activationIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      activationIds.clear();

      removalIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      removalIds.clear();
    };
  }, []);

  const clearRippleHandles = useCallback((id: number) => {
    const activationId = activationIdsRef.current.get(id);
    const removalId = removalIdsRef.current.get(id);

    if (activationId) {
      window.clearTimeout(activationId);
      activationIdsRef.current.delete(id);
    }

    if (removalId) {
      window.clearTimeout(removalId);
      removalIdsRef.current.delete(id);
    }
  }, []);

  const removeRipple = useCallback((id: number) => {
    clearRippleHandles(id);

    setRipples((currentRipples) =>
      currentRipples.filter((ripple) => ripple.id !== id),
    );
  }, [clearRippleHandles]);

  const createRipple = useCallback(
    (event: RippleEvent & { currentTarget?: EventTarget | null }, options: RippleOptions = {}) => {
      if (!enabled) {
        return;
      }

      const currentTarget = event?.currentTarget;

      if (!(currentTarget instanceof HTMLElement)) {
        return;
      }

      const rect = currentTarget.getBoundingClientRect();
      const scale = getElementTransformScale(currentTarget);
      const width =
        currentTarget.offsetWidth || currentTarget.clientWidth || rect.width || 1;
      const height =
        currentTarget.offsetHeight || currentTarget.clientHeight || rect.height || 1;

      const diameter =
        Math.sqrt(width ** 2 + height ** 2) * RIPPLE_DIAMETER_MULTIPLIER;
      const position = getRipplePosition(
        event,
        {
          height,
          left: rect.left,
          top: rect.top,
          width,
          xScale: scale.x,
          yScale: scale.y,
        },
        diameter,
        options.centered ?? centered,
      );
      const id = rippleIdRef.current++;

      setRipples((currentRipples) => [
        ...currentRipples,
        {
          id,
          left: position.left,
          size: diameter,
          state: "idle",
          top: position.top,
        },
      ]);

      const activationId = window.setTimeout(() => {
        activationIdsRef.current.delete(id);

        setRipples((currentRipples) =>
          currentRipples.map((ripple) =>
            ripple.id === id ? { ...ripple, state: "enter" } : ripple,
          ),
        );
      }, RIPPLE_ACTIVATION_DELAY_MS);

      const removalId = window.setTimeout(() => {
        removeRipple(id);
      }, duration + 220);

      activationIdsRef.current.set(id, activationId);
      removalIdsRef.current.set(id, removalId);
    },
    [centered, duration, enabled, removeRipple],
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (
        !enabled ||
        (typeof event.button === "number" && event.button !== 0)
      ) {
        return;
      }

      createRipple(event);
    },
    [createRipple, enabled],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!enabled || event.repeat || !KEYBOARD_RIPPLE_KEYS.has(event.key)) {
        return;
      }

      createRipple(event, { centered: true });
    },
    [createRipple, enabled],
  );

  const rippleLayer = useMemo(
    () => (
      <span aria-hidden="true" className="qk-ripple-layer">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="qk-ripple"
            data-state={ripple.state}
            style={{
              height: `${ripple.size}px`,
              left: `${ripple.left}px`,
              top: `${ripple.top}px`,
              width: `${ripple.size}px`,
              "--qk-ripple-duration": `${duration}ms`,
              "--qk-ripple-opacity": opacity,
            }}
          />
        ))}
      </span>
    ),
    [duration, opacity, ripples],
  );

  return {
    handleKeyDown,
    handlePointerDown,
    rippleLayer,
  };
}
