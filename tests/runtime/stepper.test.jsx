import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stepper } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Stepper", () => {
  it("renders step titles from steps prop", () => {
    renderWithProvider(
      <Stepper steps={[{ title: "Paso 1" }, { title: "Paso 2" }]} />,
    );
    expect(screen.getByText("Paso 1")).toBeTruthy();
    expect(screen.getByText("Paso 2")).toBeTruthy();
  });

  it("marks current step with aria-current", () => {
    const { container } = renderWithProvider(
      <Stepper activeStep={0} steps={[{ title: "Primero" }, { title: "Segundo" }]} />,
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].getAttribute("aria-current")).toBe("step");
    expect(buttons[1].hasAttribute("aria-current")).toBe(false);
  });

  it("renders nav landmark", () => {
    const { container } = renderWithProvider(
      <Stepper steps={[{ title: "Uno" }]} />,
    );
    const nav = container.querySelector("nav");
    expect(nav?.getAttribute("aria-label")).toBe("Progreso");
  });
});
