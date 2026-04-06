import { useEffect, useMemo, useState } from "react";
import { QUICKIT_BREAKPOINTS } from "@/lib/tokens";

const DEFAULT_BREAKPOINTS = QUICKIT_BREAKPOINTS;

function getViewportSnapshot() {
  if (typeof window === "undefined") {
    return { height: null, width: null };
  }

  return {
    height: window.innerHeight,
    width: window.innerWidth,
  };
}

function normalizeBreakpoints(breakpoints = {}) {
  return {
    ...DEFAULT_BREAKPOINTS,
    ...breakpoints,
  };
}

function resolveBreakpoint(width, breakpoints) {
  if (width == null) {
    return null;
  }

  if (width >= breakpoints["2xl"]) {
    return "2xl";
  }

  if (width >= breakpoints.xl) {
    return "xl";
  }

  if (width >= breakpoints.lg) {
    return "lg";
  }

  if (width >= breakpoints.md) {
    return "md";
  }

  if (width >= breakpoints.sm) {
    return "sm";
  }

  return "xs";
}

export function useBreakpoint(options = {}) {
  const { breakpoints: customBreakpoints } = options;
  const breakpoints = useMemo(
    () => normalizeBreakpoints(customBreakpoints),
    [customBreakpoints],
  );
  const [viewport, setViewport] = useState(getViewportSnapshot);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const updateViewport = () => {
      setViewport(getViewportSnapshot());
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  const breakpoint = resolveBreakpoint(viewport.width, breakpoints);
  const ready = viewport.width != null;
  const isMobile = ready ? viewport.width < breakpoints.md : false;
  const isTablet = ready
    ? viewport.width >= breakpoints.md && viewport.width < breakpoints.lg
    : false;
  const isDesktop = ready ? viewport.width >= breakpoints.lg : false;

  return {
    breakpoint,
    breakpoints,
    height: viewport.height,
    isDesktop,
    isMobile,
    isTablet,
    ready,
    width: viewport.width,
  };
}

export default useBreakpoint;
