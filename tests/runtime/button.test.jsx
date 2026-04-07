import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button, Link } from "@/lib";
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

  it("shares shape API with Link button appearance", () => {
    renderWithProvider(
      <Link
        href="#"
        appearance="button"
        shape="square"
        color="neutral"
        aria-label="Abrir panel"
      >
        +
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Abrir panel" });

    expect(link.className).toContain("size-11");
    expect(link.className).toContain("border");
    expect(link.className).not.toContain("active:translate-y-px");
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

  it("applies active color classes to button states and button-like links", () => {
    renderWithProvider(
      <div>
        <Button variant="outline" color="neutral" active>
          Activo
        </Button>
        <Link
          href="#"
          appearance="button"
          variant="outline"
          color="neutral"
        >
          Ir
        </Link>
      </div>,
    );

    const button = screen.getByRole("button", { name: "Activo" });
    const link = screen.getByRole("link", { name: "Ir" });

    expect(button.className).toContain("bg-neutral-300");
    expect(button.className).toContain("border-neutral-600");
    expect(link.className).toContain("active:bg-neutral-300");
    expect(link.className).toContain("active:border-neutral-600");
  });

  it("switches the default press effect from transform to ripple through QuickitProvider", () => {
    renderWithProvider(
      <div>
        <Button color="neutral">Guardar</Button>
        <Link href="#" appearance="button" color="neutral">
          Ir
        </Link>
      </div>,
      { pressEffect: "ripple" },
    );

    const button = screen.getByRole("button", { name: "Guardar" });
    const link = screen.getByRole("link", { name: "Ir" });

    expect(button.className).not.toContain("active:translate-y-px");
    expect(link.className).not.toContain("active:translate-y-px");
    expect(button.className).toContain("qi-ripple-host");
    expect(link.className).toContain("qi-ripple-host");
  });
});
