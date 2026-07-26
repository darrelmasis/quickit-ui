import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "jest-axe";

import {
  Button,
  Drawer,
  Modal,
  Popover,
  Select,
} from "@/lib";
import { renderWithProvider } from "./test-utils";

async function expectNoViolations(node) {
  const results = await axe(node);
  if (results.violations.length > 0) {
    throw new Error(
      `Accessibility violations:\n${results.violations
        .map((v) => `  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`)
        .join("\n")}`,
    );
  }
  expect(results.violations).toEqual([]);
}

describe("a11y: axe no violations", () => {
  it("Button has no violations", async () => {
    const { container } = renderWithProvider(<Button>Action</Button>);
    await expectNoViolations(container);
  });

  it("Modal open has no violations", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProvider(
      <Modal>
        <Modal.Trigger asChild>
          <Button>Open</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Title>Confirm</Modal.Title>
          <p>Content</p>
          <Modal.Action>Close</Modal.Action>
        </Modal.Content>
      </Modal>,
    );
    await user.click(screen.getByText("Open"));
    const dialog = await screen.findByRole("dialog");
    await expectNoViolations(dialog);
    await expectNoViolations(container);
  });

  it("Popover open has no violations", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProvider(
      <Popover content="Popover content">
        <Button>Open</Button>
      </Popover>,
    );
    await user.click(screen.getByText("Open"));
    const popover = await screen.findByText("Popover content");
    await expectNoViolations(popover.parentElement ?? popover);
    await expectNoViolations(container);
  });

  it("Select open has no violations", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProvider(
      <Select>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    );
    await user.click(screen.getByRole("combobox"));
    const listbox = await screen.findByRole("listbox");
    await expectNoViolations(listbox);
    await expectNoViolations(container);
  });
});

describe("keyboard navigation", () => {
  it("Modal closes on Escape", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Modal>
        <Modal.Trigger asChild>
          <Button>Open</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Title>Confirm</Modal.Title>
          <p>Content</p>
        </Modal.Content>
      </Modal>,
    );
    await user.click(screen.getByText("Open"));
    expect(await screen.findByRole("dialog")).toBeTruthy();
    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });

  it("Drawer closes on Escape", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Drawer>
        <Drawer.Trigger asChild>
          <Button>Open</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <p>Content</p>
        </Drawer.Content>
      </Drawer>,
    );
    await user.click(screen.getByText("Open"));
    expect(await screen.findByRole("dialog")).toBeTruthy();
    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });

  it("Select navigates options with ArrowDown and selects with Enter", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <Select defaultValue="a">
        <option value="a">Apple</option>
        <option value="b">Banana</option>
        <option value="c">Cherry</option>
      </Select>,
    );
    const trigger = screen.getByRole("combobox");
    trigger.focus();
    await user.keyboard("{Enter}");
    const listbox = await screen.findByRole("listbox");
    expect(listbox).toBeTruthy();
    await user.keyboard("{ArrowDown}{Enter}");
    expect(screen.getAllByText("Banana").length).toBeGreaterThan(0);
  });
});
