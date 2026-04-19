import { describe, expect, it } from "vitest";
import {
  buildWebsiteSearchIndex,
  getWebsiteSearchGroups,
} from "@/website/docs-search";

describe("website docs search", () => {
  it("indexes guides, hooks, and components", () => {
    const entries = buildWebsiteSearchIndex();

    expect(entries.some((entry) => entry.href === "/docs")).toBe(true);
    expect(entries.some((entry) => entry.href === "/docs/hooks/use-quickit-theme")).toBe(true);
    expect(entries.some((entry) => entry.href === "/docs/components/accordion")).toBe(true);
  });

  it("builds command palette groups with working callbacks", () => {
    const navigations = [];
    const groups = getWebsiteSearchGroups((href) => navigations.push(href));
    const componentItem = groups
      .flatMap((group) => group.items)
      .find((item) => item.id === "component-accordion");

    expect(groups.some((group) => group.heading === "Guías")).toBe(true);
    expect(groups.some((group) => group.heading === "Hooks")).toBe(true);
    expect(componentItem).toBeTruthy();

    componentItem.onSelect();

    expect(navigations).toEqual(["/docs/components/accordion"]);
  });
});
