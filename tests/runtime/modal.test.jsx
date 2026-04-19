import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Button,
  Modal,
  ModalActions,
  ModalBody,
} from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Modal", () => {
  it("opens from trigger and closes from action", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Modal>
        <Modal.Trigger asChild>
          <Button color="neutral">Abrir</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Nuevo proyecto</Modal.Title>
          </Modal.Header>
          <ModalBody>Contenido del modal</ModalBody>
          <ModalActions placement="end">
            <Modal.Action color="neutral">Cerrar</Modal.Action>
          </ModalActions>
        </Modal.Content>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Abrir" }));
    const dialog = await screen.findByRole("dialog");
    const title = screen.getByText("Nuevo proyecto");
    const body = screen.getByText("Contenido del modal");

    expect(dialog).toBeTruthy();
    expect(body).toBeTruthy();
    expect(dialog.getAttribute("aria-labelledby")).toBe(title.getAttribute("id"));
    expect(dialog.getAttribute("aria-describedby")).toBe(body.getAttribute("id"));

    await user.click(screen.getByRole("button", { name: "Cerrar" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    }, { timeout: 1000 });
  });

  it("respects onBeforeClose returning false", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Modal onBeforeClose={() => false} defaultOpen>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Bloqueado</Modal.Title>
          </Modal.Header>
          <ModalBody>No debería cerrar.</ModalBody>
          <ModalActions placement="end">
            <Modal.Action color="neutral">Intentar cerrar</Modal.Action>
          </ModalActions>
        </Modal.Content>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Intentar cerrar" }));

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("No debería cerrar.")).toBeTruthy();
  });

  it("keeps focus trapped and still closes with Escape when outsideClick is disabled", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Modal defaultOpen outsideClick={false}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Atajos</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <Button color="neutral">Cancelar</Button>
          </ModalBody>
          <ModalActions placement="end">
            <Modal.Action color="neutral">Confirmar</Modal.Action>
          </ModalActions>
        </Modal.Content>
      </Modal>,
    );

    const closeButton = await screen.findByRole("button", { name: "Cerrar modal" });
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    const confirmButton = screen.getByRole("button", { name: "Confirmar" });

    await waitFor(() => {
      expect(closeButton).toBe(document.activeElement);
    });

    await user.tab();
    expect(cancelButton).toBe(document.activeElement);

    await user.tab();
    expect(confirmButton).toBe(document.activeElement);

    await user.tab();
    expect(closeButton).toBe(document.activeElement);

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(confirmButton).toBe(document.activeElement);

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });
});
