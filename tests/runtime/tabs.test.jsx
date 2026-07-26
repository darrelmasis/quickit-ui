import { useState } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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

  it("forwards html props through every tabs part", () => {
    renderWithProvider(
      <Tabs defaultValue="overview" data-testid="tabs-root" className="custom-root">
        <TabsList aria-label="Sections" data-testid="tabs-list">
          <TabsTrigger value="overview" title="Open overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          data-testid="overview-panel"
          tabIndex={-1}
        >
          Panel overview
        </TabsContent>
        <TabsContent value="settings">Panel settings</TabsContent>
      </Tabs>,
    );

    const root = screen.getByTestId("tabs-root");
    const list = screen.getByRole("tablist", { name: "Sections" });
    const listClasses = list.className.split(/\s+/);
    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const overviewPanel = screen.getByTestId("overview-panel");

    expect(root.getAttribute("data-orientation")).toBe("horizontal");
    expect(root.className).toContain("custom-root");
    expect(list.getAttribute("data-testid")).toBe("tabs-list");
    expect(listClasses).toContain("flex");
    expect(listClasses).toContain("flex-nowrap");
    expect(listClasses).toContain("overflow-x-auto");
    expect(listClasses).toContain("scrollbar-hidden");
    expect(listClasses).toContain("w-full");
    expect(overviewTab.getAttribute("title")).toBe("Open overview");
    expect(overviewPanel.getAttribute("tabindex")).toBe("-1");
  });

  it("keeps large horizontal tabs in one responsive row without scroll classes", () => {
    renderWithProvider(
      <Tabs defaultValue="overview" size="2xl">
        <TabsList aria-label="Large sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Panel overview</TabsContent>
        <TabsContent value="settings">Panel settings</TabsContent>
        <TabsContent value="billing">Panel billing</TabsContent>
      </Tabs>,
    );

    const listClasses = screen
      .getByRole("tablist", { name: "Large sections" })
      .className.split(/\s+/);
    const overviewClasses = screen
      .getByRole("tab", { name: "Overview" })
      .className.split(/\s+/);

    expect(listClasses).toContain("flex-nowrap");
    expect(listClasses).toContain("overflow-x-auto");
    expect(listClasses).toContain("scrollbar-hidden");
    expect(overviewClasses).toContain("max-w-full");
    expect(overviewClasses).toContain("flex-1");
    expect(overviewClasses).toContain("shrink-0");
    expect(overviewClasses).toContain("min-w-0");
  });

  it("supports controlled value changes without duplicate callbacks", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    function ControlledTabs() {
      const [value, setValue] = useState("design");

      return (
        <Tabs
          value={value}
          onValueChange={(nextValue) => {
            handleValueChange(nextValue);
            setValue(nextValue);
          }}
        >
          <TabsList>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="release">Release</TabsTrigger>
          </TabsList>
          <TabsContent value="design">Panel design</TabsContent>
          <TabsContent value="release">Panel release</TabsContent>
        </Tabs>
      );
    }

    renderWithProvider(<ControlledTabs />);

    const releaseTab = screen.getByRole("tab", { name: "Release" });

    await user.click(releaseTab);
    await user.click(releaseTab);

    expect(handleValueChange).toHaveBeenCalledTimes(1);
    expect(handleValueChange).toHaveBeenCalledWith("release");
    expect(releaseTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Panel release")).toBeTruthy();
  });

  it("keeps force mounted inactive panels hidden", () => {
    renderWithProvider(
      <Tabs defaultValue="design">
        <TabsList>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="release">Release</TabsTrigger>
        </TabsList>
        <TabsContent value="design">Panel design</TabsContent>
        <TabsContent value="release" forceMount data-testid="release-panel">
          Panel release
        </TabsContent>
      </Tabs>,
    );

    const releasePanel = screen.getByTestId("release-panel");

    expect(releasePanel.hidden).toBe(true);
    expect(releasePanel.getAttribute("data-state")).toBe("inactive");
  });

  it("uses vertical arrow keys when orientation is vertical", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <Tabs defaultValue="design" orientation="vertical">
        <TabsList aria-label="Workflow">
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="release">Release</TabsTrigger>
        </TabsList>
        <TabsContent value="design">Panel design</TabsContent>
        <TabsContent value="release">Panel release</TabsContent>
      </Tabs>,
    );

    const list = screen.getByRole("tablist", { name: "Workflow" });
    const designTab = screen.getByRole("tab", { name: "Design" });
    const releaseTab = screen.getByRole("tab", { name: "Release" });

    expect(list.getAttribute("aria-orientation")).toBe("vertical");

    designTab.focus();
    await user.keyboard("{ArrowDown}");

    expect(document.activeElement).toBe(releaseTab);
    expect(releaseTab.getAttribute("aria-selected")).toBe("true");

    await user.keyboard("{ArrowUp}");

    expect(document.activeElement).toBe(designTab);
    expect(designTab.getAttribute("aria-selected")).toBe("true");
  });
});
