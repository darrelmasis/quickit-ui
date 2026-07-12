import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Link", () => {
  it("renders as a text link by default", () => {
    renderWithProvider(<Link href="#">Inicio</Link>);
    const link = screen.getByText("Inicio");
    expect(link).toBeTruthy();
    expect(link.tagName).toBe("A");
  });

  it("renders as button appearance", () => {
    renderWithProvider(<Link appearance="button" href="#">Click</Link>);
    expect(screen.getByText("Click")).toBeTruthy();
  });

  it("applies disabled state", () => {
    renderWithProvider(<Link disabled href="#">Disabled</Link>);
    const link = screen.getByText("Disabled");
    expect(link.getAttribute("aria-disabled")).toBe("true");
  });

  it("adds rel for external links", () => {
    renderWithProvider(<Link href="https://example.com" target="_blank">Externo</Link>);
    const link = screen.getByText("Externo");
    expect(link.getAttribute("rel")).toContain("noopener");
  });
});
