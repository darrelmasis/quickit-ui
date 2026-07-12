import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input, InputGroup, InputGroupItem, InputGroupAddon, InputGroupAction, Button } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("InputGroup", () => {
  it("renders input with addon", () => {
    renderWithProvider(
      <InputGroup>
        <InputGroupItem>
          <InputGroupAddon position="start">$</InputGroupAddon>
          <Input placeholder="Monto" />
        </InputGroupItem>
      </InputGroup>,
    );
    expect(screen.getByText("$")).toBeTruthy();
    expect(screen.getByPlaceholderText("Monto")).toBeTruthy();
  });

  it("renders input with action button", () => {
    renderWithProvider(
      <InputGroup>
        <InputGroupItem>
          <Input placeholder="Buscar" />
          <InputGroupAction>
            <Button size="sm">Ir</Button>
          </InputGroupAction>
        </InputGroupItem>
      </InputGroup>,
    );
    expect(screen.getByText("Ir")).toBeTruthy();
  });
});
