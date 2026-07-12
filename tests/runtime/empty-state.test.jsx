import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState, Button } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("EmptyState", () => {
  it("renders title and description shorthands", () => {
    renderWithProvider(
      <EmptyState title="Sin datos" description="No hay información disponible." />,
    );
    expect(screen.getByText("Sin datos")).toBeTruthy();
    expect(screen.getByText("No hay información disponible.")).toBeTruthy();
  });

  it("renders compound subcomponents", () => {
    renderWithProvider(
      <EmptyState>
        <EmptyState.Title>Vacío</EmptyState.Title>
        <EmptyState.Description>Desc</EmptyState.Description>
        <EmptyState.Actions>
          <Button size="sm">Crear</Button>
        </EmptyState.Actions>
      </EmptyState>,
    );
    expect(screen.getByText("Vacío")).toBeTruthy();
    expect(screen.getByText("Crear")).toBeTruthy();
  });

  it("aligns content to start when align is start", () => {
    const { container } = renderWithProvider(
      <EmptyState align="start">Contenido</EmptyState>,
    );
    expect(container.firstChild.className).toContain("text-left");
  });
});
