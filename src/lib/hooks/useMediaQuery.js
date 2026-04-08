import { useEffect, useState } from "react";

function getMatches(query, fallback) {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return fallback;
  }

  return window.matchMedia(query).matches;
}

export function useMediaQuery(query, options = {}) {
  const { defaultValue = false } = options;
  const [matches, setMatches] = useState(() =>
    getMatches(query, defaultValue),
  );

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatches();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMatches);

      return () => {
        mediaQuery.removeEventListener("change", updateMatches);
      };
    }

    // Safari antiguo todavía expone addListener/removeListener en lugar del
    // contrato moderno basado en addEventListener.
    mediaQuery.addListener(updateMatches);

    return () => {
      mediaQuery.removeListener(updateMatches);
    };
  }, [defaultValue, query]);

  return matches;
}

export default useMediaQuery;
