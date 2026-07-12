import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Pagination } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Pagination", () => {
  it("renders page buttons from count prop", () => {
    renderWithProvider(<Pagination count={5} />);
    expect(screen.getByLabelText("Página anterior")).toBeTruthy();
    expect(screen.getByLabelText("Página siguiente")).toBeTruthy();
  });

  it("highlights current page with aria-current", () => {
    renderWithProvider(<Pagination count={5} defaultPage={1} />);
    const btn1 = screen.getByLabelText(/Página actual, 1/);
    expect(btn1).toBeTruthy();
    expect(btn1.getAttribute("aria-current")).toBe("page");
  });

  it("respects controlled page prop", () => {
    renderWithProvider(<Pagination count={3} page={2} />);
    const btn2 = screen.getByLabelText(/Página actual, 2/);
    expect(btn2).toBeTruthy();
  });

  it("disables prev button on first page", () => {
    renderWithProvider(<Pagination count={3} defaultPage={1} />);
    expect(screen.getByLabelText("Página anterior").getAttribute("disabled")).not.toBeNull();
  });

  it("disables next button on last page", () => {
    renderWithProvider(<Pagination count={3} defaultPage={3} />);
    expect(screen.getByLabelText("Página siguiente").getAttribute("disabled")).not.toBeNull();
  });

  it("renders nav landmark with accessible label", () => {
    const { container } = renderWithProvider(<Pagination count={3} />);
    const nav = container.querySelector("nav");
    expect(nav?.getAttribute("aria-label")).toBeTruthy();
  });
});
