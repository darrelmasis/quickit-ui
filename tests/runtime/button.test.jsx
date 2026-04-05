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
  });
});
