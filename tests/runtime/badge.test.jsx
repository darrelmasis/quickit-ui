import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Badge", () => {
  it("renders with children", () => {
    renderWithProvider(<Badge>Nuevo</Badge>);
    expect(screen.getByText("Nuevo")).toBeTruthy();
  });

  it("applies semantic colors via color prop", () => {
    renderWithProvider(<Badge color="primary">Primary</Badge>);
    expect(screen.getByText("Primary")).toBeTruthy();
  });

  it("renders as a span element", () => {
    renderWithProvider(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag").tagName).toBe("SPAN");
  });
});
