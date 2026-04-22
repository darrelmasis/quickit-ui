import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormControl, Label, Select } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Select", () => {
  it("hereda labelId desde FormControl", () => {
    renderWithProvider(
      <FormControl controlId="country">
        <Label>Pais</Label>
        <Select placeholder="Selecciona un pais">
          <option value="ni">Nicaragua</option>
          <option value="es">España</option>
        </Select>
      </FormControl>,
    );

    expect(screen.getByRole("combobox", { name: "Pais" })).toBeTruthy();
  });

  it("refleja disabled en el hidden input del formulario", () => {
    const { container } = renderWithProvider(
      <Select name="country" disabled defaultValue="ni">
        <option value="ni">Nicaragua</option>
      </Select>,
    );

    const hiddenInput = container.querySelector("input[type='hidden']");

    expect(hiddenInput?.disabled).toBe(true);
    expect(hiddenInput?.value).toBe("ni");
  });
});
