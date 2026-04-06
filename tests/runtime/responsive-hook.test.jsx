import { act, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useBreakpoint } from "@/lib";
import { renderWithProvider } from "./test-utils";

function ResponsiveProbe({ options }) {
  const responsive = useBreakpoint(options);

  return (
    <div>
      <span data-testid="breakpoint">{String(responsive.breakpoint)}</span>
      <span data-testid="is-mobile">{String(responsive.isMobile)}</span>
      <span data-testid="is-tablet">{String(responsive.isTablet)}</span>
      <span data-testid="is-desktop">{String(responsive.isDesktop)}</span>
      <span data-testid="width">{String(responsive.width)}</span>
      <span data-testid="ready">{String(responsive.ready)}</span>
    </div>
  );
}

function setViewportWidth(width) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
    writable: true,
  });
}

describe("useBreakpoint", () => {
  it("derives mobile, tablet and desktop flags from the viewport width", () => {
    setViewportWidth(720);

    renderWithProvider(<ResponsiveProbe />);

    expect(screen.getByTestId("breakpoint").textContent).toBe("sm");
    expect(screen.getByTestId("is-mobile").textContent).toBe("true");
    expect(screen.getByTestId("is-tablet").textContent).toBe("false");
    expect(screen.getByTestId("is-desktop").textContent).toBe("false");
    expect(screen.getByTestId("ready").textContent).toBe("true");

    act(() => {
      setViewportWidth(900);
      window.dispatchEvent(new Event("resize"));
    });

    expect(screen.getByTestId("breakpoint").textContent).toBe("md");
    expect(screen.getByTestId("is-mobile").textContent).toBe("false");
    expect(screen.getByTestId("is-tablet").textContent).toBe("true");
    expect(screen.getByTestId("is-desktop").textContent).toBe("false");

    act(() => {
      setViewportWidth(1280);
      window.dispatchEvent(new Event("resize"));
    });

    expect(screen.getByTestId("breakpoint").textContent).toBe("xl");
    expect(screen.getByTestId("is-mobile").textContent).toBe("false");
    expect(screen.getByTestId("is-tablet").textContent).toBe("false");
    expect(screen.getByTestId("is-desktop").textContent).toBe("true");
  });

  it("supports custom breakpoint overrides", () => {
    setViewportWidth(800);

    renderWithProvider(
      <ResponsiveProbe options={{ breakpoints: { md: 700, lg: 900 } }} />,
    );

    expect(screen.getByTestId("breakpoint").textContent).toBe("md");
    expect(screen.getByTestId("is-mobile").textContent).toBe("false");
    expect(screen.getByTestId("is-tablet").textContent).toBe("true");
    expect(screen.getByTestId("is-desktop").textContent).toBe("false");
    expect(screen.getByTestId("width").textContent).toBe("800");
  });
});
