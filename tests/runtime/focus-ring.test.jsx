import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Input, QuickitProvider } from "@/lib";
import { render } from "@testing-library/react";

describe("focus ring configuration", () => {
  it("disables focus styles globally from QuickitProvider", () => {
    render(
      <QuickitProvider focusRing={false}>
        <div>
          <Button color="neutral">Guardar</Button>
          <Input placeholder="Correo" />
        </div>
      </QuickitProvider>,
    );

    const button = screen.getByRole("button", { name: "Guardar" });
    const input = screen.getByPlaceholderText("Correo");

    expect(button.className).not.toContain("focus-visible:");
    expect(input.className).not.toContain("focus-visible:");
  });

  it("disables focus styles only on configured components", () => {
    render(
      <QuickitProvider focusRing={{ disabledComponents: ["input"] }}>
        <div>
          <Button color="neutral">Guardar</Button>
          <Input placeholder="Correo" />
        </div>
      </QuickitProvider>,
    );

    const button = screen.getByRole("button", { name: "Guardar" });
    const input = screen.getByPlaceholderText("Correo");

    expect(button.className).toContain("focus-visible:");
    expect(input.className).not.toContain("focus-visible:");
  });
});
