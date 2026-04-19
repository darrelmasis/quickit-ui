import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "@/lib/components/combobox/Combobox";
import { renderWithProvider } from "./test-utils";

describe("Combobox", () => {
  it("mantiene el foco en el input al abrir la lista", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Combobox
        options={[
          { value: "es", label: "Español" },
          { value: "en", label: "English" },
        ]}
        placeholder="Idioma"
      />,
    );
    const input = screen.getByPlaceholderText("Idioma");
    await user.click(input);
    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(document.activeElement).toBe(input);
  });

  it("filtra opciones al escribir", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Combobox
        options={[
          { value: "es", label: "Español" },
          { value: "en", label: "English" },
        ]}
        placeholder="Idioma"
      />,
    );
    const input = screen.getByPlaceholderText("Idioma");
    await user.click(input);
    await user.clear(input);
    await user.keyboard("engl");
    expect(await screen.findByRole("option", { name: "English" })).toBeTruthy();
    expect(screen.queryByRole("option", { name: "Español" })).toBeNull();
  });

  it("muestra un clear button y limpia la selección", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    const handleClear = vi.fn();

    renderWithProvider(
      <Combobox
        defaultValue="es"
        onClear={handleClear}
        onValueChange={handleValueChange}
        options={[
          { value: "es", label: "Español" },
          { value: "en", label: "English" },
        ]}
        placeholder="Idioma"
      />,
    );

    expect(screen.getByDisplayValue("Español")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Limpiar selección" }));

    expect(screen.getByPlaceholderText("Idioma").value).toBe("");
    expect(handleValueChange).toHaveBeenCalledWith("");
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
