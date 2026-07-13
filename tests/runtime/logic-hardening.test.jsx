import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DatePicker,
  Link,
  Pagination,
} from "@/lib";
import { renderWithProvider } from "./test-utils";

function setViewportWidth(width) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
    writable: true,
  });
}

describe("logic hardening", () => {
  it("adds safe rel values to links that open in a new tab", () => {
    renderWithProvider(
      <Link href="https://example.com" target="_blank">
        Docs
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Docs" });
    const rel = link.getAttribute("rel") ?? "";

    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  });

  it("opens DatePicker from the keyboard", async () => {
    const user = userEvent.setup();

    renderWithProvider(<DatePicker />);

    const combobox = screen.getByRole("combobox");
    combobox.focus();
    await user.keyboard("{ArrowDown}");

    expect(screen.getByText("Lu")).toBeTruthy();
    expect(combobox.getAttribute("aria-expanded")).toBe("true");
  });




  it("renders no page buttons when Pagination receives zero pages", () => {
    renderWithProvider(<Pagination count={0} />);

    expect(screen.queryByRole("button", { name: "Ir a la página 1" })).toBeNull();
    expect(screen.getByRole("button", { name: "Página anterior" }).hasAttribute("disabled")).toBe(true);
    expect(screen.getByRole("button", { name: "Página siguiente" }).hasAttribute("disabled")).toBe(true);
  });

  it("reduces pagination density and shows a page summary on mobile", () => {
    setViewportWidth(375);

    renderWithProvider(<Pagination count={10} page={5} onPageChange={() => {}} />);

    expect(screen.getByText("Pagina 5 de 10")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Ir a la página 4" })).toBeNull();
    expect(screen.getByRole("button", { name: "Ir a la página 1" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Página actual, 5" })).toBeTruthy();

    act(() => {
      setViewportWidth(1280);
      window.dispatchEvent(new Event("resize"));
    });
  });
});
