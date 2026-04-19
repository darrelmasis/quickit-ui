import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DatePicker } from "@/lib";
import { renderWithProvider } from "./test-utils";

function getPlainCalendarButtons() {
  return screen.getAllByRole("button").filter((button) => {
    const ariaLabel = button.getAttribute("aria-label");
    return !ariaLabel && button.textContent;
  });
}

function getHeaderButton(label) {
  return getPlainCalendarButtons().find((button) => button.textContent === label);
}

describe("DatePicker", () => {
  it("switches between day, month, and year views", async () => {
    const user = userEvent.setup();

    renderWithProvider(<DatePicker value={new Date(2026, 3, 18)} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(getHeaderButton("abril de 2026"));

    expect(
      getPlainCalendarButtons().filter((button) => button.textContent !== "2026"),
    ).toHaveLength(12);

    await user.click(getHeaderButton("2026"));
    expect(screen.getByText("2016 - 2027")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "2027" }));
    expect(screen.getByRole("button", { name: "2027" })).toBeTruthy();

    const monthButtons = getPlainCalendarButtons().filter(
      (button) => button.textContent !== "2027",
    );

    expect(monthButtons).toHaveLength(12);

    await user.click(monthButtons[4]);

    expect(screen.getByText("Lu")).toBeTruthy();
    expect(getHeaderButton("mayo de 2027")).toBeTruthy();
  }, 10000);
});
