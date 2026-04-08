import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const KEYBOARD_RIPPLE_KEYS = new Set(["Enter", " "]);
const RIPPLE_ACTIVATION_DELAY_MS = 16;
const RIPPLE_DIAMETER_MULTIPLIER = 1.7;

function getRipplePosition(event, rect, diameter, centered = false) {
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

function getElementTransformScale(element) {
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

function parseRgbColor(value) {
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

function getRelativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function resolveRippleStyleFromElement(element, fallback) {
  if (!(element instanceof HTMLElement)) {
    return fallback;
  }

  const styles = window.getComputedStyle(element);
  const background = parseRgbColor(styles.backgroundColor);

  if (!background || background.a < 0.45) {
    return fallback;
  }

  const luminance = getRelativeLuminance(background);

  return luminance > 0.52
    ? {
        color: "rgb(15 23 42)",
        opacity: 0.18,
      }
    : {
        color: "rgb(255 255 255)",
        opacity: 0.28,
      };
}

export function useRippleEffect({
  centered = false,
  duration = 650,
  enabled = true,
  opacity = 0.18,
}) {
  const [ripples, setRipples] = useState([]);
  const activationIdsRef = useRef(new Map());
  const removalIdsRef = useRef(new Map());
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

  const clearRippleHandles = useCallback((id) => {
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

  const removeRipple = useCallback((id) => {
    clearRippleHandles(id);

    setRipples((currentRipples) =>
      currentRipples.filter((ripple) => ripple.id !== id),
    );
  }, [clearRippleHandles]);

  const createRipple = useCallback(
    (event, options = {}) => {
      if (!enabled) {
        return;
      }

      const currentTarget = event?.currentTarget;

      if (!(currentTarget instanceof HTMLElement)) {
        return;
      }

      const rect = currentTarget.getBoundingClientRect();
      // El botón puede estar haciendo scale por activeMotion. Compensamos esa
      // transformación para que el origen del ripple coincida con el click.
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

      // El ripple entra en dos fases: primero se monta en estado idle y en el
      // frame siguiente pasa a enter para que la transición siempre se dispare.
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
    (event) => {
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
    (event) => {
      if (!enabled || event.repeat || !KEYBOARD_RIPPLE_KEYS.has(event.key)) {
        return;
      }

      createRipple(event, { centered: true });
    },
    [createRipple, enabled],
  );

  const rippleLayer = useMemo(
    () => (
      <span aria-hidden="true" className="qi-ripple-layer">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="qi-ripple"
            data-state={ripple.state}
            style={{
              height: `${ripple.size}px`,
              left: `${ripple.left}px`,
              top: `${ripple.top}px`,
              width: `${ripple.size}px`,
              "--qi-ripple-duration": `${duration}ms`,
              "--qi-ripple-opacity": opacity,
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
