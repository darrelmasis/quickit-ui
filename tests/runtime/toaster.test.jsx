import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toaster, dismiss, toast } from "@/lib";
import { renderWithProvider } from "./test-utils";

afterEach(() => {
  dismiss();
});

describe("Toaster", () => {
  it("renders and dismisses toasts through the public API", async () => {
    renderWithProvider(<Toaster />);

    const id = toast({
      title: "Cambios guardados",
      description: "La configuración fue actualizada.",
      duration: 0,
    });

    expect(await screen.findByText("Cambios guardados")).toBeTruthy();
    expect(screen.getByText("La configuración fue actualizada.")).toBeTruthy();

    dismiss(id);

    await waitFor(
      () => {
        expect(screen.queryByText("Cambios guardados")).toBeNull();
      },
      { timeout: 1000 },
    );
  });

  it("executes toast actions and closes the toast", async () => {
    const user = userEvent.setup();
    const handleAction = vi.fn();

    renderWithProvider(<Toaster />);

    toast({
      title: "Sincronización pendiente",
      action: {
        label: "Reintentar",
        onClick: handleAction,
      },
      duration: 0,
    });

    await user.click(await screen.findByRole("button", { name: "Reintentar" }));

    expect(handleAction).toHaveBeenCalledTimes(1);

    await waitFor(
      () => {
        expect(screen.queryByText("Sincronización pendiente")).toBeNull();
      },
      { timeout: 1000 },
    );
  });
});
