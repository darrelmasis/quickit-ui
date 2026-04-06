import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Checkbox, Input, Link, QuickitProvider, Radio } from "@/lib";
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

  it("disables focus styles for link, checkbox, and radio without affecting buttons", () => {
    const { container } = render(
      <QuickitProvider
        focusRing={{ disabledComponents: ["link", "checkbox", "radio"] }}
      >
        <div>
          <Link href="#docs">Ver docs</Link>
          <Checkbox label="Recordarme" defaultChecked />
          <Radio name="mode" label="Manual" defaultChecked />
          <Button color="neutral">Continuar</Button>
        </div>
      </QuickitProvider>,
    );

    const link = screen.getByRole("link", { name: "Ver docs" });
    const checkbox = screen.getByRole("checkbox", { name: "Recordarme" });
    const radio = screen.getByRole("radio", { name: "Manual" });
    const button = screen.getByRole("button", { name: "Continuar" });

    const checkboxVisual = checkbox.parentElement?.querySelector('[aria-hidden="true"]');
    const radioVisual = radio.parentElement?.querySelector('[aria-hidden="true"]');

    expect(container).toBeTruthy();
    expect(link.className).not.toContain("focus-visible:");
    expect(checkboxVisual?.className).not.toContain("peer-focus-visible:");
    expect(radioVisual?.className).not.toContain("peer-focus-visible:");
    expect(button.className).toContain("focus-visible:");
  });
});
