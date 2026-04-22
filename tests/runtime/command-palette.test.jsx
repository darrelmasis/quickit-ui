import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommandPalette } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("CommandPalette", () => {
  it("navega con flechas y selecciona con Enter", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onClose = vi.fn();

    renderWithProvider(
      <CommandPalette
        open
        groups={[
          {
            heading: "General",
            items: [
              { id: "open", label: "Abrir", onSelect: onOpen },
              { id: "close", label: "Cerrar", onSelect: onClose },
            ],
          },
        ]}
      />,
    );

    const input = await screen.findByRole("combobox", {
      name: "Buscar en la paleta de comandos",
    });

    await user.keyboard("{ArrowDown}");
    expect(input.getAttribute("aria-activedescendant")).toBe("qi-command-item-close");

    await user.keyboard("{Enter}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("expone una lista accesible de opciones", async () => {
    renderWithProvider(
      <CommandPalette
        open
        groups={[
          {
            heading: "General",
            items: [
              { id: "open", label: "Abrir" },
              { id: "close", label: "Cerrar" },
            ],
          },
        ]}
      />,
    );

    expect(await screen.findByRole("listbox", { name: "Comandos" })).toBeTruthy();
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("solo deja a una instancia responder al atajo global", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <>
        <CommandPalette
          title="Paleta principal"
          groups={[{ heading: "General", items: [{ id: "one", label: "Uno" }] }]}
        />
        <CommandPalette
          title="Paleta secundaria"
          groups={[{ heading: "General", items: [{ id: "two", label: "Dos" }] }]}
        />
      </>,
    );

    await user.keyboard("{Control>}k{/Control}");

    expect(await screen.findByRole("dialog", { name: /paleta principal/i })).toBeTruthy();
    expect(screen.queryByRole("dialog", { name: /paleta secundaria/i })).toBeNull();
  });
});
