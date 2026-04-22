import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox, FormControl, FormMessage } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Checkbox", () => {
  it("incluye el mensaje de error en aria-describedby cuando es invalido", () => {
    renderWithProvider(
      <FormControl invalid>
        <Checkbox>Terminos</Checkbox>
        <FormMessage>Error de validación</FormMessage>
      </FormControl>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Terminos" });
    const message = screen.getByText("Error de validación");

    expect(checkbox.getAttribute("aria-describedby")).toContain(
      message.getAttribute("id"),
    );
  });

  it("emite onCheckedChange al cambiar", async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();

    renderWithProvider(
      <Checkbox onCheckedChange={handleCheckedChange}>Terminos</Checkbox>,
    );

    await user.click(screen.getByRole("checkbox", { name: "Terminos" }));

    expect(handleCheckedChange).toHaveBeenCalledWith(true, expect.any(Object));
  });
});
