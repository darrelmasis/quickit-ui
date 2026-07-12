import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, Button } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Card", () => {
  it("renders children", () => {
    renderWithProvider(<Card>Contenido</Card>);
    expect(screen.getByText("Contenido")).toBeTruthy();
  });

  it("renders header subcomponent", () => {
    renderWithProvider(
      <Card>
        <Card.Header>
          <h3>Título</h3>
        </Card.Header>
      </Card>,
    );
    expect(screen.getByText("Título")).toBeTruthy();
  });

  it("renders body subcomponent", () => {
    renderWithProvider(
      <Card>
        <Card.Body>Cuerpo</Card.Body>
      </Card>,
    );
    expect(screen.getByText("Cuerpo")).toBeTruthy();
  });

  it("renders footer subcomponent with actions", () => {
    renderWithProvider(
      <Card>
        <Card.Footer>
          <Button size="sm">Aceptar</Button>
        </Card.Footer>
      </Card>,
    );
    expect(screen.getByText("Aceptar")).toBeTruthy();
  });
});
