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
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("Contenido del modal")).toBeTruthy();

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
});
