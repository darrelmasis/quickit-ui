import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Tabs", () => {
  it("skips disabled tabs during automatic keyboard navigation", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Tabs defaultValue="design">
        <TabsList>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="qa" disabled>QA</TabsTrigger>
          <TabsTrigger value="release">Release</TabsTrigger>
        </TabsList>
        <TabsContent value="design">Panel design</TabsContent>
        <TabsContent value="qa">Panel qa</TabsContent>
        <TabsContent value="release">Panel release</TabsContent>
      </Tabs>,
    );

    const designTab = screen.getByRole("tab", { name: "Design" });
    designTab.focus();

    await user.keyboard("{ArrowRight}");

    const releaseTab = screen.getByRole("tab", { name: "Release" });
    expect(document.activeElement).toBe(releaseTab);
    expect(releaseTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Panel release")).toBeTruthy();
  });

  it("requires Enter in manual activation mode", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Tabs defaultValue="design" activationMode="manual">
        <TabsList>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="release">Release</TabsTrigger>
        </TabsList>
        <TabsContent value="design">Panel design</TabsContent>
        <TabsContent value="release">Panel release</TabsContent>
      </Tabs>,
    );

    const designTab = screen.getByRole("tab", { name: "Design" });
    designTab.focus();

    await user.keyboard("{ArrowRight}");

    const releaseTab = screen.getByRole("tab", { name: "Release" });
    expect(document.activeElement).toBe(releaseTab);
    expect(screen.queryByText("Panel release")).toBeNull();

    await user.keyboard("{Enter}");

    expect(releaseTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Panel release")).toBeTruthy();
  });
});
