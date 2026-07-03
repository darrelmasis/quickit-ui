import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("action controls", () => {
  it("disables Button and exposes busy state while loading", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderWithProvider(
      <Button loading loadingText="Guardando" onClick={onClick}>
        Guardar
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Guardando" });

    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button.hasAttribute("disabled")).toBe(true);

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies shape classes to buttons", () => {
    renderWithProvider(
      <Button
        shape="square"
        color="neutral"
        aria-label="Abrir panel"
      >
        +
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Abrir panel" });

    expect(button.className).toContain("size-11");
    expect(button.className).toContain("border");
    expect(button.className).not.toContain("active:translate-y-px");
  });

  it("disables active motion by default on square buttons", () => {
    renderWithProvider(
      <div>
        <Button shape="square" color="neutral" aria-label="Abrir acciones">
          +
        </Button>
        <Button shape="circle" color="neutral" aria-label="Abrir favorito">
          +
        </Button>
      </div>,
    );

    const button = screen.getByRole("button", { name: "Abrir acciones" });
    const circleButton = screen.getByRole("button", { name: "Abrir favorito" });

    expect(button.className).not.toContain("active:translate-y-px");
    expect(circleButton.className).not.toContain("active:translate-y-px");
  });

  it("applies active color classes to button states", () => {
    renderWithProvider(
      <Button variant="outline" color="neutral" active>
        Activo
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Activo" });

    expect(button.className).toContain("bg-neutral-300");
    expect(button.className).toContain("border-neutral-600");
  });

  it("switches the default press effect from transform to ripple through QuickitProvider", () => {
    renderWithProvider(
      <Button color="neutral">Guardar</Button>,
      { pressEffect: "ripple" },
    );

    const button = screen.getByRole("button", { name: "Guardar" });

    expect(button.className).not.toContain("active:translate-y-px");
    expect(button.className).toContain("qi-ripple-host");
  });
});
