import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Divider", () => {
  it("renders horizontal separator by default", () => {
    const { container } = renderWithProvider(<Divider />);
    const el = container.firstChild;
    expect(el.getAttribute("role")).toBe("separator");
    expect(el.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("renders vertical separator", () => {
    const { container } = renderWithProvider(<Divider orientation="vertical" />);
    const el = container.firstChild;
    expect(el.getAttribute("role")).toBe("separator");
    expect(el.getAttribute("aria-orientation")).toBe("vertical");
  });

  it("renders label in horizontal mode", () => {
    renderWithProvider(<Divider label="O" />);
    expect(screen.getByText("O")).toBeTruthy();
  });

  it("forwards className", () => {
    const { container } = renderWithProvider(<Divider className="my-4" />);
    expect(container.firstChild.className).toContain("my-4");
  });
});
