import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, Button } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Accordion", () => {
  it("does not close on outside click by default", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <div>
        <Accordion type="single" defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Detalles</Accordion.Trigger>
            <Accordion.Content>Contenido</Accordion.Content>
          </Accordion.Item>
        </Accordion>
        <Button color="neutral">Fuera</Button>
      </div>,
    );

    const trigger = screen.getByRole("button", { name: "Detalles" });

    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    await user.click(screen.getByRole("button", { name: "Fuera" }));

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("closes on outside click when clickOutside is enabled", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <div>
        <Accordion type="single" defaultValue="item-1" clickOutside>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Detalles</Accordion.Trigger>
            <Accordion.Content>Contenido</Accordion.Content>
          </Accordion.Item>
        </Accordion>
        <Button color="neutral">Fuera</Button>
      </div>,
    );

    const trigger = screen.getByRole("button", { name: "Detalles" });

    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    await user.click(screen.getByRole("button", { name: "Fuera" }));

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
});
