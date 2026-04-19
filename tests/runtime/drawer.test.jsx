import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Button,
  Drawer,
  DrawerActions,
  DrawerBody,
} from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Drawer", () => {
  it("opens from trigger and closes from action", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Drawer>
        <Drawer.Trigger asChild>
          <Button color="neutral">Abrir drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Configuración</Drawer.Title>
          </Drawer.Header>
          <DrawerBody>Contenido del drawer</DrawerBody>
          <DrawerActions placement="end">
            <Drawer.Action color="neutral">Cerrar drawer</Drawer.Action>
          </DrawerActions>
        </Drawer.Content>
      </Drawer>,
    );

    const trigger = screen.getByRole("button", { name: "Abrir drawer" });

    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    const title = screen.getByText("Configuración");
    const body = screen.getByText("Contenido del drawer");

    expect(dialog).toBeTruthy();
    expect(body).toBeTruthy();
    expect(dialog.getAttribute("aria-labelledby")).toBe(title.getAttribute("id"));
    expect(dialog.getAttribute("aria-describedby")).toBe(body.getAttribute("id"));

    await user.click(screen.getByText("Cerrar drawer").closest("button"));

    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).toBeNull();
      },
      { timeout: 1000 },
    );
    await waitFor(() => {
      expect(trigger).toBe(document.activeElement);
    });
  });

  it("keeps Escape available when outsideClick is disabled", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Drawer defaultOpen outsideClick={false}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Filtros</Drawer.Title>
          </Drawer.Header>
          <DrawerBody>Panel lateral</DrawerBody>
        </Drawer.Content>
      </Drawer>,
    );

    expect(await screen.findByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Cerrar drawer" })).toBeTruthy();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });
});
