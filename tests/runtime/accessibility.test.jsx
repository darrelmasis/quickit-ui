import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Button,
  Combobox,
  Drawer,
  Modal,
  Popover,
  Select,
  Tooltip,
} from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("ARIA: Tooltip", () => {
  it("establece aria-describedby en el trigger que apunta al tooltip", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProvider(
      <Tooltip content="Ayuda">
        <button type="button">Info</button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole("button", { name: "Info" }));
    const tooltip = await screen.findByRole("tooltip");
    const triggerWrapper = container.querySelector("[aria-describedby]");
    expect(triggerWrapper).toBeTruthy();
    expect(triggerWrapper.getAttribute("aria-describedby")).toBe(tooltip.id);
  });
});

describe("ARIA: Modal", () => {
  it("tiene aria-label cuando no hay titulo", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Modal>
        <Modal.Trigger>
          <span>Abrir</span>
        </Modal.Trigger>
        <Modal.Content>
          <p>Contenido</p>
        </Modal.Content>
      </Modal>,
    );
    await user.click(screen.getByText("Abrir"));
    const dialog = await screen.findByRole("dialog");
    expect(dialog.getAttribute("aria-label")).toBe("Modal");
    expect(dialog.getAttribute("aria-labelledby")).toBeFalsy();
  });

  it("usa aria-labelledby cuando hay Modal.Title", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Modal>
        <Modal.Trigger>
          <span>Abrir</span>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Title>Confirmar</Modal.Title>
          <p>Contenido</p>
        </Modal.Content>
      </Modal>,
    );
    await user.click(screen.getByText("Abrir"));
    const dialog = await screen.findByRole("dialog");
    expect(dialog.getAttribute("aria-labelledby")).toBeTruthy();
    const title = screen.getByText("Confirmar");
    expect(title.id).toBe(dialog.getAttribute("aria-labelledby"));
  });
});

describe("ARIA: Drawer", () => {
  it("tiene aria-label cuando no hay titulo", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Drawer>
        <Drawer.Trigger>
          <span>Abrir</span>
        </Drawer.Trigger>
        <Drawer.Content>
          <p>Contenido</p>
        </Drawer.Content>
      </Drawer>,
    );
    await user.click(screen.getByText("Abrir"));
    const dialog = await screen.findByRole("dialog");
    expect(dialog.getAttribute("aria-label")).toBe("Drawer");
  });
});

describe("ARIA: Select", () => {
  it("tiene aria-haspopup y aria-controls en el trigger", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Select>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger.getAttribute("aria-haspopup")).toBe("listbox");
    expect(trigger.getAttribute("aria-controls")).toBeFalsy();
    await user.click(trigger);
    const listbox = await screen.findByRole("listbox");
    expect(trigger.getAttribute("aria-controls")).toBe(listbox.id);
  });
});

describe("ARIA: Combobox", () => {
  const options = [
    { value: "1", label: "Uno" },
    { value: "2", label: "Dos" },
  ];

  it("tiene aria-haspopup en el input", () => {
    renderWithProvider(<Combobox options={options} />);
    const input = screen.getByRole("combobox");
    expect(input.getAttribute("aria-haspopup")).toBe("listbox");
  });

  it("aria-controls en input solo cuando está abierto", async () => {
    const user = userEvent.setup();
    renderWithProvider(<Combobox options={options} />);
    const input = screen.getByRole("combobox");
    expect(input.getAttribute("aria-controls")).toBeFalsy();
    await user.click(input);
    const listbox = await screen.findByRole("listbox");
    expect(input.getAttribute("aria-controls")).toBe(listbox.id);
  });
});
