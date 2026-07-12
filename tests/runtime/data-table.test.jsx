import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DataTable } from "@/lib";
import { renderWithProvider } from "./test-utils";

describe("DataTable", () => {
  it("supports semantic colors and custom cell classes", () => {
    const { container } = renderWithProvider(
      <DataTable
        color="primary"
        stickyHeader={false}
        columns={[
          {
            key: "summary",
            header: "Resumen",
            headerClassName: "normal-case",
            cellClassName: "whitespace-normal",
          },
        ]}
        data={[
          {
            id: 1,
            summary: "Texto largo que debe poder envolver dentro de la celda.",
          },
        ]}
        rowKey={(row) => row.id}
      />,
    );

    expect(container.firstChild?.className).toContain("border-sky-200");
    expect(screen.getByRole("columnheader", { name: "Resumen" }).className).toContain(
      "normal-case",
    );
    expect(screen.getByText(/Texto largo/).closest("td")?.className).toContain(
      "whitespace-normal",
    );
  });

  it("sorts rows when clicking a sortable column", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <DataTable
        stickyHeader={false}
        columns={[
          {
            key: "usage",
            header: "Usage",
            sortable: true,
          },
        ]}
        data={[
          { id: 1, usage: 40 },
          { id: 2, usage: 10 },
        ]}
        rowKey={(row) => row.id}
      />,
    );

    const sortButton = screen.getByRole("button", { name: "Usage" });
    await user.click(sortButton);

    const cells = screen.getAllByRole("cell");

    expect(cells[0].textContent).toBe("10");
    expect(cells[1].textContent).toBe("40");
    expect(
      screen.getByRole("columnheader", { name: "Usage" }).getAttribute("aria-sort"),
    ).toBe("ascending");
  });

  it("expone el header sortable como boton navegable por teclado", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <DataTable
        stickyHeader={false}
        columns={[
          {
            key: "usage",
            header: "Usage",
            sortable: true,
          },
        ]}
        data={[
          { id: 1, usage: 40 },
          { id: 2, usage: 10 },
        ]}
        rowKey={(row) => row.id}
      />,
    );

    const sortButton = screen.getByRole("button", { name: "Usage" });
    sortButton.focus();
    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("columnheader", { name: "Usage" }).getAttribute("aria-sort"),
    ).toBe("ascending");
  });
});
