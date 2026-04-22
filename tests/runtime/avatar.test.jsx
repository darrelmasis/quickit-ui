import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, UserChip } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Avatar", () => {
  it("no muestra el fallback mientras una imagen valida esta cargando", () => {
    renderWithProvider(
      <Avatar>
        <Avatar.Image src="https://example.com/avatar.png" alt="Ada Lovelace" />
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.queryByText("AL")).toBeNull();
  });

  it("deja la presencia como decorativa por defecto", () => {
    const { container } = renderWithProvider(
      <Avatar>
        <Avatar.Fallback>AL</Avatar.Fallback>
        <Avatar.Presence status="online" />
      </Avatar>,
    );

    const presence = container.querySelector("[data-slot='avatar-presence']");

    expect(presence?.getAttribute("aria-hidden")).toBe("true");
    expect(presence?.getAttribute("role")).toBeNull();
  });

  it("mantiene un fallback seguro cuando UserChip recibe un nombre no textual", () => {
    renderWithProvider(
      <UserChip
        name={<strong>Ada</strong>}
        description="Matematica"
      />,
    );

    expect(screen.getByText("?")).toBeTruthy();
    expect(screen.getByText("Ada")).toBeTruthy();
  });
});
