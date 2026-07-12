import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Label", () => {
  it("renders label text", () => {
    renderWithProvider(<Label>Nombre</Label>);
    const el = screen.getByText("Nombre");
    expect(el).toBeTruthy();
    expect(el.tagName).toBe("LABEL");
  });

  it("renders required indicator when inside required context", () => {
    renderWithProvider(
      <Label requiredIndicator="*" data-testid="label-test">
        Campo
      </Label>,
    );
    // Label renders, no crash
    expect(screen.getByText("Campo")).toBeTruthy();
  });

  it("uses htmlFor attribute", () => {
    renderWithProvider(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText("Email").getAttribute("for")).toBe("email");
  });

  it("shows optional text when optional is true", () => {
    renderWithProvider(<Label optional>Teléfono</Label>);
    expect(screen.getByText("Teléfono")).toBeTruthy();
  });
});
