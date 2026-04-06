import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input, Select, Textarea } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("form field variants", () => {
  it("applies semantic color variants to input and textarea", () => {
    renderWithProvider(
      <div>
        <Input color="dark" placeholder="Buscar" />
        <Input color="black" placeholder="Consola" />
        <Textarea color="light" minRows={3} />
      </div>,
    );

    expect(screen.getByPlaceholderText("Buscar").className).toContain(
      "border-zinc-800",
    );
    expect(screen.getByPlaceholderText("Buscar").className).toContain(
      "focus-visible:ring-zinc-700/32",
    );
    expect(screen.getByPlaceholderText("Consola").className).toContain(
      "bg-zinc-950",
    );
    expect(screen.getByPlaceholderText("Consola").className).toContain(
      "focus-visible:ring-zinc-700/32",
    );
    expect(screen.getAllByRole("textbox")[2].className).toContain("bg-stone-100");
    expect(screen.getAllByRole("textbox")[2].className).toContain(
      "focus-visible:ring-stone-400/25",
    );
  });

  it("uses the selected color on select and keeps invalid state priority", () => {
    renderWithProvider(
      <div>
        <Select color="brand" defaultValue="docs">
          <option value="docs">Docs</option>
          <option value="tokens">Tokens</option>
        </Select>
        <Input color="brand" invalid defaultValue="Error" />
      </div>,
      { theme: "dark" },
    );

    expect(screen.getByRole("combobox").className).toContain(
      "border-brand-500/55",
    );
    expect(screen.getByDisplayValue("Error").className).toContain(
      "border-rose-500/70",
    );
  });
});
