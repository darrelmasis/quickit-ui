import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Avatar,
  AvatarFallback,
  AvatarPresence,
  Badge,
  getInitials,
  Initials,
  UserChip,
} from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("identity components", () => {
  it("builds initials from names consistently", () => {
    expect(getInitials("Elena Ruiz")).toBe("ER");
    expect(getInitials("Quickit UI")).toBe("QU");
    expect(getInitials("Plataforma de diseño", { max: 3 })).toBe("PDD");
  });

  it("renders Initials and AvatarPresence", () => {
    const { container } = renderWithProvider(
      <div>
        <Initials name="Elena Ruiz" />
        <Avatar size="lg">
          <AvatarFallback>ER</AvatarFallback>
          <AvatarPresence status="away" />
        </Avatar>
      </div>,
    );

    expect(screen.getAllByText("ER").length).toBe(2);
    expect(screen.getByLabelText("Away")).toBeTruthy();
    expect(
      container
        .querySelector('[data-slot="avatar-shell"]')
        ?.querySelector('[data-slot="avatar-presence"]'),
    ).toBeNull();
  });

  it("renders UserChip content with presence and trailing content", () => {
    renderWithProvider(
      <UserChip
        name="Elena Ruiz"
        description="Design lead"
        initials="ER"
        presence="online"
        trailing={<Badge color="brand">Core</Badge>}
      />,
    );

    expect(screen.getByText("Elena Ruiz")).toBeTruthy();
    expect(screen.getByText("Design lead")).toBeTruthy();
    expect(screen.getByText("Core")).toBeTruthy();
    expect(screen.getByLabelText("Online")).toBeTruthy();
  });
});
