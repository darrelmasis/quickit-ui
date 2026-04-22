import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button, Popover, Tooltip } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Popover", () => {
  it("usa semantica de tooltip en hover no interactivo", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Tooltip content="Ayuda contextual">
        <button type="button">Info</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Info" }));

    expect(await screen.findByRole("tooltip")).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("usa semantica dialog y foco cuando es interactivo", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Popover
        trigger="click"
        interactive
        content={<Button data-overlay-autofocus="true">Acción</Button>}
      >
        <button type="button">Abrir</button>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Abrir" }));

    const dialog = await screen.findByRole("dialog");
    const action = screen.getByRole("button", { name: "Acción" });

    expect(dialog).toBeTruthy();
    expect(document.activeElement).toBe(action);
  });
});
