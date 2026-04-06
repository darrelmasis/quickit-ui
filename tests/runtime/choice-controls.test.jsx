import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox, Radio, Switch } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("choice controls", () => {
  it("supports native and convenience handlers on Checkbox and Radio", async () => {
    const user = userEvent.setup();
    const onCheckboxChange = vi.fn();
    const onCheckboxCheckedChange = vi.fn();
    const onRadioChange = vi.fn();
    const onRadioCheckedChange = vi.fn();

    renderWithProvider(
      <div>
        <Checkbox
          label="Recibir alertas"
          onChange={onCheckboxChange}
          onCheckedChange={onCheckboxCheckedChange}
        />
        <Radio
          name="privacy"
          label="Equipo interno"
          onChange={onRadioChange}
          onCheckedChange={onRadioCheckedChange}
        />
      </div>,
    );

    await user.click(screen.getByRole("checkbox", { name: "Recibir alertas" }));
    await user.click(screen.getByRole("radio", { name: "Equipo interno" }));

    expect(onCheckboxChange).toHaveBeenCalledTimes(1);
    expect(onCheckboxCheckedChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({
        target: expect.objectContaining({ checked: true }),
      }),
    );

    expect(onRadioChange).toHaveBeenCalledTimes(1);
    expect(onRadioCheckedChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({
        target: expect.objectContaining({ checked: true }),
      }),
    );
  });

  it("keeps Switch toggle behavior while exposing onChange and onCheckedChange", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onChange = vi.fn();
    const onCheckedChange = vi.fn();

    renderWithProvider(
      <Switch
        label="Modo revisión"
        onClick={onClick}
        onChange={onChange}
        onCheckedChange={onCheckedChange}
      />,
    );

    const control = screen.getByRole("switch", { name: "Modo revisión" });

    expect(control.getAttribute("aria-checked")).toBe("false");

    await user.click(control);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ checked: true, value: "on" }),
      }),
    );
    expect(control.getAttribute("aria-checked")).toBe("true");
  });

  it("aligns semantic surfaces and supports light/dark color variants", () => {
    renderWithProvider(
      <div>
        <Checkbox label="Checkbox black" color="black" defaultChecked />
        <Radio
          name="choice-theme"
          label="Radio light"
          color="light"
          defaultChecked
        />
        <Switch label="Switch light" color="light" defaultChecked />
        <Switch label="Switch invalid" invalid />
      </div>,
      { theme: "dark" },
    );

    const checkboxVisual = screen
      .getByRole("checkbox", { name: "Checkbox black" })
      .nextElementSibling;
    const radioVisual = screen
      .getByRole("radio", { name: "Radio light" })
      .nextElementSibling;
    const switchControl = screen.getByRole("switch", { name: "Switch light" });
    const invalidSwitch = screen.getByRole("switch", { name: "Switch invalid" });

    expect(checkboxVisual.className).toContain("peer-checked:border-white");
    expect(radioVisual.className).toContain("peer-checked:border-stone-200");
    expect(switchControl.className).toContain("border-stone-200");
    expect(invalidSwitch.className).toContain("border-rose-500/70");
  });
});
