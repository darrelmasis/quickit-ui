import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuickitControlState } from "@/lib/theme";

const TABLE_SKIN = {
  light: {
    wrap: "border-slate-200",
    table: "divide-slate-200",
    head: "bg-slate-50 text-slate-600",
    row: "border-slate-100 hover:bg-slate-50/80",
    cell: "text-slate-800",
  },
  dark: {
    wrap: "border-zinc-800",
    table: "divide-zinc-800",
    head: "bg-zinc-900/80 text-zinc-400",
    row: "border-zinc-800/80 hover:bg-zinc-900/50",
    cell: "text-zinc-100",
  },
};

function nextDirection(prev, key) {
  if (prev?.column !== key) {
    return { column: key, dir: "asc" };
  }
  if (prev.dir === "asc") {
    return { column: key, dir: "desc" };
  }
  return null;
}

/**
 * Tabla de datos con cabecera sticky opcional y ordenación por columna.
 */
export function DataTable({
  caption,
  className,
  columns = [],
  data = [],
  defaultSort = null,
  onSortChange,
  rowKey = (row, index) => row.id ?? index,
  sort: controlledSort,
  stickyHeader = true,
}) {
  const { theme } = useQuickitControlState("data-table");
  const skin = TABLE_SKIN[theme] ?? TABLE_SKIN.light;
  const [internalSort, setInternalSort] = useState(defaultSort);
  const sortState =
    controlledSort !== undefined ? controlledSort : internalSort;

  const sortedData = useMemo(() => {
    if (!sortState?.column) {
      return data;
    }
    const col = columns.find((c) => c.key === sortState.column);
    if (!col?.sortable) {
      return data;
    }
    const accessor =
      col.accessor ??
      ((row) => row[col.key]);
    const copy = [...data];
    copy.sort((a, b) => {
      const av = accessor(a);
      const bv = accessor(b);
      if (av == null && bv == null) {
        return 0;
      }
      if (av == null) {
        return 1;
      }
      if (bv == null) {
        return -1;
      }
      if (typeof av === "number" && typeof bv === "number") {
        return sortState.dir === "asc" ? av - bv : bv - av;
      }
      return sortState.dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [columns, data, sortState]);

  const setSort = (key) => {
    const next = nextDirection(sortState, key);
    if (onSortChange) {
      onSortChange(next);
    }
    if (controlledSort === undefined) {
      setInternalSort(next);
    }
  };

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-2xl border",
        skin.wrap,
        className,
      )}
    >
      <table className={cn("min-w-full divide-y text-sm", skin.table)}>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className={cn(stickyHeader && "sticky top-0 z-[1]", skin.head)}>
          <tr>
            {columns.map((col) => {
              const active = sortState?.column === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide",
                    col.sortable && "cursor-pointer select-none",
                  )}
                  onClick={() => col.sortable && setSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && active ? (
                      <span aria-hidden="true">
                        {sortState.dir === "asc" ? "▲" : "▼"}
                      </span>
                    ) : null}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y bg-white dark:bg-zinc-950">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowKey(row, rowIndex)}
              className={cn("transition-colors", skin.row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn("whitespace-nowrap px-4 py-3", skin.cell)}
                >
                  {col.render
                    ? col.render(row, rowIndex)
                    : row[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
