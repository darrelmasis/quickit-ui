import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}

if (!globalThis.ResizeObserver) {
  class ResizeObserverMock {
    observe = vi.fn();
    disconnect = vi.fn();
  }
  globalThis.ResizeObserver = ResizeObserverMock;
}

afterEach(() => {
  cleanup();
});
