import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    renderWithProvider(<Textarea />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("respects placeholder", () => {
    renderWithProvider(<Textarea placeholder="Escribe aquí" />);
    expect(screen.getByPlaceholderText("Escribe aquí")).toBeTruthy();
  });

  it("accepts defaultValue", () => {
    renderWithProvider(<Textarea defaultValue="Contenido inicial" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.value).toBe("Contenido inicial");
  });

  it("applies disabled state", () => {
    renderWithProvider(<Textarea disabled />);
    expect(screen.getByRole("textbox").getAttribute("disabled")).not.toBeNull();
  });

  it("forwards ref", () => {
    const ref = { current: null };
    renderWithProvider(<Textarea ref={ref} />);
    expect(ref.current).toBeTruthy();
    expect(ref.current.tagName).toBe("TEXTAREA");
  });
});
