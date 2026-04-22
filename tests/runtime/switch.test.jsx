import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormControl, FormMessage, Switch } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Switch", () => {
  it("incluye el mensaje de error en aria-describedby cuando es invalido", () => {
    renderWithProvider(
      <FormControl invalid>
        <Switch label="Notificaciones" />
        <FormMessage>Error de validación</FormMessage>
      </FormControl>,
    );

    const control = screen.getByRole("switch", { name: "Notificaciones" });
    const message = screen.getByText("Error de validación");

    expect(control.getAttribute("aria-describedby")).toContain(
      message.getAttribute("id"),
    );
  });

  it("respeta el label contextual cuando no recibe label local", () => {
    renderWithProvider(
      <FormControl controlId="notifications">
        <span id="switch-label">Notificaciones</span>
        <Switch aria-labelledby="switch-label" />
      </FormControl>,
    );

    expect(screen.getByRole("switch", { name: "Notificaciones" })).toBeTruthy();
  });

  it("emite onCheckedChange y onChange con el valor siguiente", async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();
    const handleChange = vi.fn();

    renderWithProvider(
      <Switch
        label="Notificaciones"
        onCheckedChange={handleCheckedChange}
        onChange={handleChange}
      />,
    );

    await user.click(screen.getByRole("switch", { name: "Notificaciones" }));

    expect(handleCheckedChange).toHaveBeenCalledWith(true);
    expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
  });
});
