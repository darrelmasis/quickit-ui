import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button, Dropdown, useDropdown } from "@/lib";
import { renderWithProvider } from "./test-utils";

function DropdownState() {
  const { open } = useDropdown();

  return (
    <Dropdown.Item as="div" disabled>
      {open ? "Abierto" : "Cerrado"}
    </Dropdown.Item>
  );
}

describe("Dropdown", () => {
  it("mantiene la composicion aunque trigger y content esten envueltos", async () => {
    const user = userEvent.setup();

    function WrappedTrigger() {
      return <Dropdown.Trigger>Opciones envueltas</Dropdown.Trigger>;
    }

    function WrappedContent() {
      return (
        <Dropdown.Content>
          <Dropdown.Item>Editar</Dropdown.Item>
        </Dropdown.Content>
      );
    }

    renderWithProvider(
      <Dropdown>
        <WrappedTrigger />
        <WrappedContent />
      </Dropdown>,
    );

    await user.click(screen.getByRole("button", { name: "Opciones envueltas" }));

    expect(await screen.findByRole("menu")).toBeTruthy();
    expect(screen.getByRole("menuitem", { name: "Editar" })).toBeTruthy();
  });

  it("supports asChild triggers and keyboard navigation without manual indexes", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    renderWithProvider(
      <Dropdown>
        <Dropdown.Trigger asChild>
          <Button color="neutral">Opciones</Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Editar</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item variant="danger" onClick={onDelete}>
            Eliminar
          </Dropdown.Item>
          <DropdownState />
        </Dropdown.Content>
      </Dropdown>,
    );

    await user.tab();
    expect(screen.getByRole("button", { name: "Opciones" })).toBe(document.activeElement);

    await user.keyboard("{ArrowDown}");

    expect(await screen.findByRole("menu")).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Editar" })).toBe(
        document.activeElement,
      );
    });

    await user.keyboard("{ArrowDown}");

    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Eliminar" })).toBe(
        document.activeElement,
      );
    });

    await user.keyboard("{Enter}");

    expect(onDelete).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole("menu")).toBeNull();
    });
    expect(screen.getByRole("button", { name: "Opciones" })).toBe(document.activeElement);
  });

  it("keeps non-button items open when closeOnClick is disabled", async () => {
    const user = userEvent.setup();
    const onStatus = vi.fn();

    renderWithProvider(
      <Dropdown defaultOpen>
        <Dropdown.Trigger>Opciones</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item as="div" closeOnClick={false} onClick={onStatus}>
            Estado
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );

    const item = await screen.findByRole("menuitem", { name: "Estado" });
    await user.click(item);

    expect(onStatus).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("menu")).toBeTruthy();
  });

  it("activa con Space y mueve foco desde el contenedor con flechas", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onClose = vi.fn();

    renderWithProvider(
      <Dropdown defaultOpen>
        <Dropdown.Trigger>Acciones</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onClick={onOpen}>Abrir</Dropdown.Item>
          <Dropdown.Item onClick={onClose}>Cerrar</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>,
    );

    const menu = await screen.findByRole("menu");
    menu.focus();

    await user.keyboard("{ArrowDown}");
    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "Abrir" })).toBe(
        document.activeElement,
      );
    });

    await user.keyboard(" ");
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("menu")).toBeTruthy();
  });
});
