import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProvider } from "./test-utils";
import ExamplesPage from "@/website/sections/ExamplesPage";
import { EXAMPLE_FLOWS } from "@/website/examples/flows";

describe("Examples flows smoke", () => {
  it("renders all flow headings", async () => {
    renderWithProvider(<ExamplesPage />);

    for (const flow of EXAMPLE_FLOWS) {
      const headings = await screen.findAllByRole("heading", { name: flow.title });
      expect(headings.length).toBeGreaterThan(0);
    }
  }, 30000);
});
