import { describe, expect, it } from "vitest";
import { Skeleton } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Skeleton", () => {
  it("renders a placeholder div", () => {
    const { container } = renderWithProvider(<Skeleton />);
    const el = container.firstChild;
    expect(el).toBeTruthy();
  });

  it("has aria-hidden for screen readers", () => {
    const { container } = renderWithProvider(<Skeleton />);
    expect(container.firstChild.getAttribute("aria-hidden")).toBe("true");
  });

  it("defaults to line shape", () => {
    const { container } = renderWithProvider(<Skeleton />);
    expect(container.firstChild.className).toContain("rounded-full");
  });

  it("renders rect shape", () => {
    const { container } = renderWithProvider(<Skeleton shape="rect" />);
    expect(container.firstChild.className).toContain("rounded-[var(--qk-radius-xl)]");
  });

  it("renders circle shape", () => {
    const { container } = renderWithProvider(<Skeleton shape="circle" />);
    expect(container.firstChild.className).toContain("rounded-full");
  });
});
