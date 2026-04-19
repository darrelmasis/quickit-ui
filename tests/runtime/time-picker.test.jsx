import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TimePicker } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("TimePicker", () => {
  it("selects a time and emits the normalized value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProvider(
      <TimePicker
        defaultValue="10:00"
        placeholder="Hora"
        minuteStep={30}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    const comboboxes = screen.getAllByRole("combobox");
    await user.click(comboboxes[2]);
    await user.click(screen.getByRole("option", { name: "30" }));
    await user.click(screen.getByRole("button", { name: "PM" }));
    await user.click(screen.getByRole("button", { name: "Aplicar" }));

    expect(screen.getAllByRole("combobox")[0].value).toBe("10:30 PM");
    expect(onChange).toHaveBeenLastCalledWith("22:30");
  });

  it("clears the current time from the action button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithProvider(
      <TimePicker
        defaultValue="14:30"
        clearButtonLabel="Limpiar hora"
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Limpiar hora" }));

    expect(screen.getAllByRole("combobox")[0].value).toBe("");
    expect(onChange).toHaveBeenLastCalledWith(null);
  });
});
