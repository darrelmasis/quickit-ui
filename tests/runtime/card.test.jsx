import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardBody, CardHeader, CardFooter, Button } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Card", () => {
  it("renders children", () => {
    renderWithProvider(<Card>Contenido</Card>);
    expect(screen.getByText("Contenido")).toBeTruthy();
  });

  it("renders header subcomponent", () => {
    renderWithProvider(
      <Card>
        <CardHeader>
          <h3>Título</h3>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByText("Título")).toBeTruthy();
  });

  it("renders body subcomponent", () => {
    renderWithProvider(
      <Card>
        <CardBody>Cuerpo</CardBody>
      </Card>,
    );
    expect(screen.getByText("Cuerpo")).toBeTruthy();
  });

  it("renders footer subcomponent with actions", () => {
    renderWithProvider(
      <Card>
        <CardFooter>
          <Button size="sm">Aceptar</Button>
        </CardFooter>
      </Card>,
    );
    expect(screen.getByText("Aceptar")).toBeTruthy();
  });
});
