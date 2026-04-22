import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormControl, Radio } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Radio", () => {
  it("no reutiliza el mismo id contextual para radios hermanos", () => {
    renderWithProvider(
      <FormControl controlId="shipping">
        <Radio name="shipping" label="Estandar" value="standard" />
        <Radio name="shipping" label="Express" value="express" />
      </FormControl>,
    );

    const radios = screen.getAllByRole("radio");

    expect(radios[0].id).not.toBe(radios[1].id);
  });

  it("puede heredar labelId contextual cuando no recibe label local", () => {
    renderWithProvider(
      <>
        <span id="radio-group-label">Metodo</span>
        <Radio aria-labelledby="radio-group-label" name="shipping" value="standard" />
      </>,
    );

    expect(screen.getByRole("radio", { name: "Metodo" })).toBeTruthy();
  });
});
