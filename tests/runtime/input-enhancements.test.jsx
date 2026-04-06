import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Input,
  InputGroup,
  InputGroupAction,
  InputGroupAddon,
  InputGroupItem,
  Select,
} from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("enhanced input actions", () => {
  it("toggles password visibility from the same Input component", async () => {
    const user = userEvent.setup();
    const onPasswordVisibilityChange = vi.fn();

    renderWithProvider(
      <Input
        type="password"
        passwordToggle
        onPasswordVisibilityChange={onPasswordVisibilityChange}
        placeholder="Clave"
      />,
    );

    const input = screen.getByPlaceholderText("Clave");
    const toggle = screen.getByRole("button", {
      name: "Mostrar contraseña",
    });

    expect(input.getAttribute("type")).toBe("password");

    await user.click(toggle);

    expect(input.getAttribute("type")).toBe("text");
    expect(onPasswordVisibilityChange).toHaveBeenCalledWith(true);
  });

  it("clears search content from the same Input component", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onChange = vi.fn();

    renderWithProvider(
      <Input
        type="search"
        defaultValue="Quickit"
        onClear={onClear}
        onChange={onChange}
        placeholder="Buscar componentes"
      />,
    );

    const input = screen.getByPlaceholderText("Buscar componentes");
    const clear = screen.getByRole("button", { name: "Limpiar búsqueda" });

    expect(input.value).toBe("Quickit");

    await user.click(clear);

    expect(input.value).toBe("");
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalled();
  });

  it("renders left and right embedded elements inside the input", () => {
    renderWithProvider(
      <Input
        type="search"
        shape="pill"
        placeholder="Buscar en Quickit"
        leftElement={<span data-testid="left-slot">L</span>}
        rightElement={<span data-testid="right-slot">R</span>}
        defaultValue="AVA"
      />,
    );

    const input = screen.getByPlaceholderText("Buscar en Quickit");

    expect(screen.getByTestId("left-slot")).toBeTruthy();
    expect(screen.getByTestId("right-slot")).toBeTruthy();
    expect(input.className).toContain("rounded-full");
    expect(screen.getByRole("button", { name: "Limpiar búsqueda" })).toBeTruthy();
  });

  it("renders InputGroup as a composable wrapper", () => {
    const { container } = renderWithProvider(
      <InputGroup data-testid="group">
        <Input placeholder="Buscar" />
        <InputGroupAction variant="outline">Ir</InputGroupAction>
      </InputGroup>,
    );

    expect(screen.getByTestId("group")).toBeTruthy();
    expect(screen.getByPlaceholderText("Buscar")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Ir" })).toBeTruthy();
    expect(container).toBeTruthy();
  });

  it("renders InputGroupAction as a real button and handles clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithProvider(
      <InputGroup attached>
        <Input placeholder="Buscar" />
        <InputGroupAction onClick={onClick}>Buscar</InputGroupAction>
      </InputGroup>,
    );

    const action = screen.getByRole("button", { name: "Buscar" });

    expect(action.tagName).toBe("BUTTON");
    expect(action.getAttribute("type")).toBe("button");

    await user.click(action);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders attached groups with passive addons and inherited segments", () => {
    renderWithProvider(
      <InputGroup attached color="dark" shape="pill" data-testid="attached-group">
        <InputGroupAddon>https://</InputGroupAddon>
        <Input placeholder="quickit.dev" />
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>,
    );

    const group = screen.getByTestId("attached-group");
    const input = screen.getByPlaceholderText("quickit.dev");

    expect(group.getAttribute("data-attached")).toBe("");
    expect(screen.getByText("https://")).toBeTruthy();
    expect(screen.getByText("12 results")).toBeTruthy();
    expect(input.className).toContain("rounded-none");
    expect(input.className).toContain("border-0");
  });

  it("supports grid segments through InputGroupItem", () => {
    renderWithProvider(
      <InputGroup attached layout="grid" columns={2}>
        <InputGroupItem span={2} data-testid="card-number-item">
          <Input placeholder="Card number" />
        </InputGroupItem>
        <InputGroupItem>
          <Input placeholder="MM / YY" />
        </InputGroupItem>
        <InputGroupItem>
          <Input placeholder="CVC" />
        </InputGroupItem>
      </InputGroup>,
    );

    expect(screen.getByPlaceholderText("Card number")).toBeTruthy();
    expect(screen.getByPlaceholderText("MM / YY")).toBeTruthy();
    expect(screen.getByPlaceholderText("CVC")).toBeTruthy();
    expect(screen.getByTestId("card-number-item").style.gridColumn).toBe(
      "span 2 / span 2",
    );
  });

  it("adapts Select inside attached InputGroup", () => {
    renderWithProvider(
      <InputGroup attached data-testid="attached-select-group">
        <Select defaultValue="all" usePortal={false}>
          <option value="all">Todos</option>
          <option value="core">Core</option>
        </Select>
        <Input placeholder="Buscar" />
      </InputGroup>,
    );

    const trigger = screen.getByRole("combobox", { name: "" });

    expect(screen.getByTestId("attached-select-group").getAttribute("data-attached")).toBe("");
    expect(trigger.className).toContain("rounded-none");
    expect(trigger.className).toContain("border-0");
  });
});
