import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("enhanced input actions", () => {
  it("toggles password visibility from the same Input component", async () => {
    const user = userEvent.setup();
    const onPasswordVisibilityChange = vi.fn();

    renderWithProvider(
      <Input
        type="password"
        passwordToggle
        onPasswordVisibilityChange={onPasswordVisibilityChange}
        placeholder="Clave"
      />,
    );

    const input = screen.getByPlaceholderText("Clave");
    const toggle = screen.getByRole("button", {
      name: "Mostrar contraseña",
    });

    expect(input.getAttribute("type")).toBe("password");

    await user.click(toggle);

    expect(input.getAttribute("type")).toBe("text");
    expect(onPasswordVisibilityChange).toHaveBeenCalledWith(true);
  });

  it("clears search content from the same Input component", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onChange = vi.fn();

    renderWithProvider(
      <Input
        type="search"
        defaultValue="Quickit"
        onClear={onClear}
        onChange={onChange}
        placeholder="Buscar componentes"
      />,
    );

    const input = screen.getByPlaceholderText("Buscar componentes");
    const clear = screen.getByRole("button", { name: "Limpiar búsqueda" });

    expect(input.value).toBe("Quickit");

    await user.click(clear);

    expect(input.value).toBe("");
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalled();
  });
});
