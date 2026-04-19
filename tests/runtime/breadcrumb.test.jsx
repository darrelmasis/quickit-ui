import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Breadcrumb", () => {
  it("supports concise item syntax with automatic link and current states", () => {
    renderWithProvider(
      <Breadcrumb>
        <Breadcrumb.List separator="•">
          <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Ventas</Breadcrumb.Item>
          <Breadcrumb.Item current>Detalle</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>,
    );

    expect(screen.getByRole("link", { name: "Inicio" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Ventas" })).toBeTruthy();
    expect(screen.getByText("Detalle").getAttribute("aria-current")).toBe("page");
    expect(screen.getAllByText("•")).toHaveLength(2);
  });

  it("still supports explicit link and current primitives", () => {
    renderWithProvider(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Current>Proyecto</Breadcrumb.Current>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeTruthy();
    expect(screen.getByText("Proyecto").getAttribute("aria-current")).toBe("page");
  });
});
