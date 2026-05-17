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

  it("no bloquea la rueda cuando allowWheel es false", () => {
    const onValueChange = vi.fn();

    renderWithProvider(
      <Range defaultValue={40} step={5} allowWheel={false} onValueChange={onValueChange} />,
    );

    const input = screen.getByRole("slider");
    const root = input.parentElement;
    const wheelEvent = new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      deltaY: -120,
    });

    root.dispatchEvent(wheelEvent);

    expect(wheelEvent.defaultPrevented).toBe(false);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(input.value).toBe("40");
  });

  it("mantiene la actualizacion interna aunque el consumer pase onChange", () => {
    const onChange = vi.fn();

    renderWithProvider(
      <Range
        min={0}
        max={100}
        defaultValue={20}
        onChange={onChange}
      />,
    );

    const input = screen.getByRole("slider");
    fireEvent.change(input, { target: { value: "55" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("55");
  });

  it("diferencia accesiblemente los thumbs en modo dual", () => {
    renderWithProvider(
      <>
        <span id="range-label">Precio</span>
        <Range
          range
          defaultValue={[10, 70]}
          aria-labelledby="range-label"
        />
      </>,
    );

    expect(
      screen.getByRole("slider", { name: /precio valor mínimo/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("slider", { name: /precio valor máximo/i }),
    ).toBeTruthy();
  });

  it("serializa ambos valores en formularios cuando recibe name en modo dual", () => {
    renderWithProvider(
      <form aria-label="Filtros">
        <Range range name="priceMin" defaultValue={[15, 85]} />
      </form>,
    );

    const form = screen.getByRole("form", { name: "Filtros" });
    const data = new FormData(form);

    expect(data.get("priceMin")).toBe("15");
    expect(data.get("priceMinEnd")).toBe("85");
  });
});
