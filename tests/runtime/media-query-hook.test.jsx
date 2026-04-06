import { act, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "@/lib";
import { renderWithProvider } from "./test-utils";

function MediaQueryProbe({ defaultValue = false, query }) {
  const matches = useMediaQuery(query, { defaultValue });

  return <span data-testid="matches">{String(matches)}</span>;
}

function installMatchMedia(initialMatches = {}) {
  const listeners = new Map();
  const queries = new Map();

  const matchMedia = vi.fn((query) => {
    if (!queries.has(query)) {
      queries.set(query, {
        addEventListener: vi.fn((event, listener) => {
          if (event === "change") {
            listeners.set(query, listener);
          }
        }),
        addListener: vi.fn((listener) => {
          listeners.set(query, listener);
        }),
        dispatch(value) {
          const listener = listeners.get(query);

          if (listener) {
            listener({ matches: value, media: query });
          }
        },
        matches: Boolean(initialMatches[query]),
        media: query,
        removeEventListener: vi.fn((event) => {
          if (event === "change") {
            listeners.delete(query);
          }
        }),
        removeListener: vi.fn(() => {
          listeners.delete(query);
        }),
      });
    }

    return queries.get(query);
  });

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: matchMedia,
    writable: true,
  });

  return matchMedia;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useMediaQuery", () => {
  it("reads the current media query state", () => {
    installMatchMedia({
      "(min-width: 1024px)": true,
    });

    renderWithProvider(<MediaQueryProbe query="(min-width: 1024px)" />);

    expect(screen.getByTestId("matches").textContent).toBe("true");
  });

  it("updates when the media query changes", () => {
    const matchMedia = installMatchMedia({
      "(prefers-reduced-motion: reduce)": false,
    });

    renderWithProvider(
      <MediaQueryProbe query="(prefers-reduced-motion: reduce)" />,
    );

    expect(screen.getByTestId("matches").textContent).toBe("false");

    act(() => {
      matchMedia.mock.results[0].value.matches = true;
      matchMedia.mock.results[0].value.dispatch(true);
    });

    expect(screen.getByTestId("matches").textContent).toBe("true");
  });
});
