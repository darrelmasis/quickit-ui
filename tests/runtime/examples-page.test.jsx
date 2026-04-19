import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProvider } from "./test-utils";
import ExamplesPage from "@/website/sections/ExamplesPage";

describe("ExamplesPage", () => {
  it("renders without invalid component types", () => {
    renderWithProvider(<ExamplesPage />);

    expect(
      screen.getByRole("heading", { name: "Flujos reales con Quickit UI" }),
    ).toBeTruthy();
  });
});
