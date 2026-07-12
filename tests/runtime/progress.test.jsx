import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Progress", () => {
  it("renders with progressbar role", () => {
    renderWithProvider(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeTruthy();
  });

  it("sets aria-valuenow correctly", () => {
    renderWithProvider(<Progress value={75} />);
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("75");
  });

  it("clamps value between min and max", () => {
    renderWithProvider(<Progress value={150} min={0} max={100} />);
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("100");
  });

  it("sets aria-valuemin and aria-valuemax", () => {
    renderWithProvider(<Progress value={5} min={0} max={10} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("10");
  });
});
