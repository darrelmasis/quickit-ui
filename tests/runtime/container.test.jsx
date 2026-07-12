import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Container", () => {
  it("renders children", () => {
    renderWithProvider(<Container>Contenido</Container>);
    expect(screen.getByText("Contenido")).toBeTruthy();
  });

  it("renders polymorphic as prop", () => {
    renderWithProvider(<Container as="section">Sección</Container>);
    expect(screen.getByText("Sección").tagName).toBe("SECTION");
  });

  it("applies max-width class based on size", () => {
    const { container } = renderWithProvider(<Container size="sm">Sm</Container>);
    expect(container.firstChild.className).toContain("max-w-3xl");
  });
});
