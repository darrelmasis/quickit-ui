import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Alert, Button } from "@/lib";
import { renderWithProvider } from "./test-utils";

afterEach(() => {
  vi.useRealTimers();
});

describe("Alert", () => {
  it("dismisses itself in uncontrolled mode", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();

    renderWithProvider(
      <Alert
        dismissible
        title="Cambios pendientes"
        description="Todavía no has guardado la configuración."
        onDismiss={handleDismiss}
      />,
    );

    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText("Cambios pendientes")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Cerrar alerta" }));

    expect(screen.queryByText("Cambios pendientes")).toBeNull();
    expect(handleDismiss).toHaveBeenCalledWith("manual");
  });

  it("supports controlled mode without mutating visibility by itself", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();
    const handleDismiss = vi.fn();

    renderWithProvider(
      <Alert
        open
        dismissible
        title="Sesión expirada"
        onDismiss={handleDismiss}
        onOpenChange={handleOpenChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Cerrar alerta" }));

    expect(handleOpenChange).toHaveBeenCalledWith(false);
    expect(handleDismiss).toHaveBeenCalledWith("manual");
    expect(screen.getByText("Sesión expirada")).toBeTruthy();
  });

  it("auto dismisses after the configured timeout", async () => {
    vi.useFakeTimers();

    const handleDismiss = vi.fn();

    renderWithProvider(
      <Alert
        autoDismiss={1200}
        title="Actualización disponible"
        description="Quickit UI 1.0.0 ya está lista."
        onDismiss={handleDismiss}
      />,
    );

    expect(screen.getByText("Actualización disponible")).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.queryByText("Actualización disponible")).toBeNull();
    expect(handleDismiss).toHaveBeenCalledWith("auto");
  });

  it("renders compound content and pauses auto dismiss while hovered", async () => {
    vi.useFakeTimers();

    renderWithProvider(
      <Alert autoDismiss={1000} dismissible>
        <Alert.Title>Espacio casi lleno</Alert.Title>
        <Alert.Description>Quedan 2 GB libres.</Alert.Description>
        <Alert.Actions>
          <Button size="sm">Actualizar plan</Button>
        </Alert.Actions>
      </Alert>,
    );

    const alert = screen.getByRole("status");

    fireEvent.pointerEnter(alert);
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText("Espacio casi lleno")).toBeTruthy();

    fireEvent.pointerLeave(alert);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("Espacio casi lleno")).toBeNull();
  });
});
