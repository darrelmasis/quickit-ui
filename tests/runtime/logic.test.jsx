import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Badge,
  Default,
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
  For,
  Match,
  RenderSwitch,
  Show,
} from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("logic components", () => {
  it("renders Show fallback and render function values", () => {
    renderWithProvider(
      <div>
        <Show when={false} fallback={<span>Sin acceso</span>}>
          <span>Visible</span>
        </Show>
        <Show when={{ name: "Elena" }}>
          {(user) => <span>{user.name}</span>}
        </Show>
      </div>,
    );

    expect(screen.getByText("Sin acceso")).toBeTruthy();
    expect(screen.getByText("Elena")).toBeTruthy();
  });

  it("resolves RenderSwitch with predicates and default", () => {
    renderWithProvider(
      <div>
        <RenderSwitch value={17}>
          <Match when={(value) => value < 10}>
            <Badge color="warning">Medio</Badge>
          </Match>
          <Default>
            {(value) => <Badge color="success">Alto: {value}</Badge>}
          </Default>
        </RenderSwitch>
        <RenderSwitch value="archived">
          <Match when="draft">
            <span>Draft</span>
          </Match>
          <Default>
            <span>Archivado</span>
          </Default>
        </RenderSwitch>
      </div>,
    );

    expect(screen.getByText("Alto: 17")).toBeTruthy();
    expect(screen.getByText("Archivado")).toBeTruthy();
  });

  it("renders For items and empty fallback", () => {
    renderWithProvider(
      <div>
        <For each={[{ id: 1, name: "Landing" }, { id: 2, name: "Billing" }]}>
          {(item, index) => <span key={item.id}>{`${index + 1}. ${item.name}`}</span>}
        </For>
        <For
          each={[]}
          fallback={
            <EmptyState align="start">
              <EmptyStateTitle>No hay items</EmptyStateTitle>
              <EmptyStateDescription>La lista quedó vacía.</EmptyStateDescription>
            </EmptyState>
          }
        >
          {(item) => <span key={item.id}>{item.name}</span>}
        </For>
      </div>,
    );

    expect(screen.getByText("1. Landing")).toBeTruthy();
    expect(screen.getByText("2. Billing")).toBeTruthy();
    expect(screen.getByText("No hay items")).toBeTruthy();
    expect(screen.getByText("La lista quedó vacía.")).toBeTruthy();
  });
});
