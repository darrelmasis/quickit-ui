import { describe, expect, it } from "vitest";
import {
  getWebsiteScrollTargetId,
  normalizeWebsitePathname,
  resolveWebsiteNavigation,
} from "@/website/router";

describe("website router", () => {
  it("normalizes pathnames consistently", () => {
    expect(normalizeWebsitePathname("")).toBe("/");
    expect(normalizeWebsitePathname("/docs/")).toBe("/docs");
    expect(normalizeWebsitePathname("/")).toBe("/");
  });

  it("resolves hash, internal, external, and ignored links", () => {
    const hashAnchor = document.createElement("a");
    hashAnchor.setAttribute("href", "#uso");

    const internalAnchor = document.createElement("a");
    internalAnchor.href = "https://quickit.dev/docs/components/accordion#api";

    const externalAnchor = document.createElement("a");
    externalAnchor.href = "https://example.com/docs";

    const mailAnchor = document.createElement("a");
    mailAnchor.setAttribute("href", "mailto:test@example.com");

    expect(resolveWebsiteNavigation(hashAnchor, "https://quickit.dev")).toEqual({
      type: "hash",
      hash: "#uso",
      href: `${window.location.pathname}#uso`,
    });

    expect(resolveWebsiteNavigation(internalAnchor, "https://quickit.dev")).toEqual({
      type: "internal",
      hash: "#api",
      href: "/docs/components/accordion#api",
      path: "/docs/components/accordion",
    });

    expect(resolveWebsiteNavigation(externalAnchor, "https://quickit.dev").type).toBe(
      "external",
    );
    expect(resolveWebsiteNavigation(mailAnchor, "https://quickit.dev")).toEqual({
      type: "ignore",
    });
  });

  it("decodes hash targets", () => {
    expect(getWebsiteScrollTargetId("#Instalaci%C3%B3n")).toBe("Instalación");
  });
});
