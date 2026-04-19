import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Range } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Range", () => {
  it("refleja defaultValue en modo no controlado y emite onValueChange", () => {
    const onValueChange = vi.fn();

    renderWithProvider(
      <Range min={0} max={100} defaultValue={40} onValueChange={onValueChange} />,
    );

    const input = screen.getByRole("slider");
    expect(input.value).toBe("40");

    fireEvent.change(input, { target: { value: "41" } });
    expect(onValueChange).toHaveBeenCalled();
  });

  it("evita NaN cuando max es menor o igual que min", () => {
    renderWithProvider(<Range min={10} max={10} value={10} />);
    const input = screen.getByRole("slider");
    expect(input.value).toBe("10");
  });

  it("soporta rango doble [inicio, fin] y emite tuple", () => {
    const onValueChange = vi.fn();

    renderWithProvider(
      <Range
        min={0}
        max={100}
        range
        defaultValue={[20, 70]}
        onValueChange={onValueChange}
      />,
    );

    const sliders = screen.getAllByRole("slider");
    expect(sliders).toHaveLength(2);
    expect(sliders[0].value).toBe("20");
    expect(sliders[1].value).toBe("70");

    fireEvent.change(sliders[1], { target: { value: "80" } });
    expect(onValueChange).toHaveBeenLastCalledWith([20, 80]);
  });

  it("soporta orientación vertical", () => {
    renderWithProvider(
      <Range orientation="vertical" defaultValue={60} className="h-40" />,
    );
    const input = screen.getByRole("slider");
    expect(input.value).toBe("60");
  });

  it("cambia con la rueda del mouse cuando allowWheel está activo", () => {
    const onValueChange = vi.fn();
    renderWithProvider(<Range defaultValue={40} step={5} onValueChange={onValueChange} />);

    const input = screen.getByRole("slider");
    const root = input.parentElement;
    fireEvent.wheel(root, { deltaY: -120 });
    expect(onValueChange).toHaveBeenLastCalledWith(45);
  });
});
