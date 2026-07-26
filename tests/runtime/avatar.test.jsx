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

  it("renderiza UserChip con details enriquecidos", () => {
    renderWithProvider(
      <UserChip
        name="Elena Ruiz"
        initials="ER"
        details={{ role: "Design Lead", email: "elena@ejemplo.com", username: "elena" }}
      />,
    );

    expect(screen.getByText("Elena Ruiz")).toBeTruthy();
    expect(screen.getByText("Design Lead")).toBeTruthy();
    expect(screen.getByText("elena@ejemplo.com")).toBeTruthy();
    expect(screen.getByText("@elena")).toBeTruthy();
  });

  it("muestra description cuando no hay details", () => {
    renderWithProvider(
      <UserChip
        name="Elena Ruiz"
        initials="ER"
        description="Descripción simple"
      />,
    );

    expect(screen.getByText("Descripción simple")).toBeTruthy();
  });
});
