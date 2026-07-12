import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, ButtonGroup } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("ButtonGroup", () => {
  it("renders grouped buttons", () => {
    renderWithProvider(
      <ButtonGroup>
        <Button>Uno</Button>
        <Button>Dos</Button>
      </ButtonGroup>,
    );
    expect(screen.getByText("Uno")).toBeTruthy();
    expect(screen.getByText("Dos")).toBeTruthy();
  });
});
