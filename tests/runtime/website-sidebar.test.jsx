import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WebsiteDocsSidebar from "@/website/components/WebsiteDocsSidebar";
import {
  WEBSITE_COMPONENT_GROUPS,
  WEBSITE_DOC_OVERVIEW_SECTIONS,
} from "@/website/docs-content";
import { renderWithProvider } from "./test-utils";

describe("WebsiteDocsSidebar", () => {
  it("allows collapsing and expanding sections with children", () => {
    renderWithProvider(
      <WebsiteDocsSidebar
        componentGroups={WEBSITE_COMPONENT_GROUPS}
        currentPath="/docs/introduccion"
        sections={WEBSITE_DOC_OVERVIEW_SECTIONS}
      />,
    );

    expect(
      screen.queryByRole("link", { name: "useQuickitTheme" }),
    ).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Expandir Hooks" }));

    expect(
      screen.getByRole("link", { name: "useQuickitTheme" }),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Colapsar Hooks" }));

    expect(
      screen.queryByRole("link", { name: "useQuickitTheme" }),
    ).toBeNull();
  });

  it("opens the hooks section automatically for active hook routes", () => {
    renderWithProvider(
      <WebsiteDocsSidebar
        componentGroups={WEBSITE_COMPONENT_GROUPS}
        currentPath="/docs/hooks/use-modal"
        sections={WEBSITE_DOC_OVERVIEW_SECTIONS}
      />,
    );

    expect(screen.getByRole("button", { name: "Colapsar Hooks" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "useModal" })).toBeTruthy();
  });
});
