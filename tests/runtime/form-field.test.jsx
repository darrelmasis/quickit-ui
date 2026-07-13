import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input, Select, Textarea } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("form field variants", () => {
  it("applies semantic color variants to input and textarea", () => {
    renderWithProvider(
      <div>
        <Input color="dark" placeholder="Buscar" />
        <Input color="dark" placeholder="Consola" />
        <Textarea color="light" minRows={3} />
      </div>,
    );

    expect(screen.getByPlaceholderText("Buscar").className).toContain(
      "border-neutral-800",
    );
    expect(screen.getByPlaceholderText("Buscar").className).toContain(
      "focus-visible:ring-neutral-700/32",
    );
    expect(screen.getByPlaceholderText("Consola").className).toContain(
      "bg-neutral-900",
    );
    expect(screen.getByPlaceholderText("Consola").className).toContain(
      "focus-visible:ring-neutral-700/32",
    );
    expect(screen.getAllByRole("textbox")[2].className).toContain("bg-neutral-50");
    expect(screen.getAllByRole("textbox")[2].className).toContain(
      "focus-visible:ring-neutral-400/45",
    );
  });

  it("keeps the neutral hover darker than the base field tone", () => {
    renderWithProvider(<Input placeholder="Neutral field" color="neutral" />);

    expect(screen.getByPlaceholderText("Neutral field").className).toContain(
      "hover:border-neutral-400",
    );
    expect(screen.getByPlaceholderText("Neutral field").className).not.toContain(
      "hover:bg-",
    );
  });

  it("uses the selected color on select and keeps invalid state priority", () => {
    renderWithProvider(
      <div>
        <Select color="primary" defaultValue="docs">
          <option value="docs">Docs</option>
          <option value="tokens">Tokens</option>
        </Select>
        <Input color="primary" invalid defaultValue="Error" />
      </div>,
      { theme: "dark" },
    );

    expect(screen.getByRole("combobox").className).toContain(
      "border-blue-500/55",
    );
    expect(screen.getByDisplayValue("Error").className).toContain(
      "border-red-500/70",
    );
  });

  it("assigns autofill tokens that follow theme and color", () => {
    renderWithProvider(
      <div>
        <Input color="primary" placeholder="Correo" />
        <Textarea color="neutral" minRows={3} placeholder="Notas" />
      </div>,
      { theme: "dark" },
    );

    expect(screen.getByPlaceholderText("Correo").style.getPropertyValue(
      "--qi-field-autofill-bg",
    )).toContain("var(--color-blue-500)");
    expect(screen.getByPlaceholderText("Correo").style.getPropertyValue(
      "--qi-field-autofill-border",
    )).toBe("var(--color-blue-400)");
    expect(screen.getByPlaceholderText("Correo").style.getPropertyValue(
      "--qi-field-autofill-text",
    )).toBe("var(--color-neutral-50)");
    expect(screen.getByPlaceholderText("Notas").style.getPropertyValue(
      "--qi-field-autofill-bg",
    )).toBe("var(--color-neutral-900)");
  });
});
