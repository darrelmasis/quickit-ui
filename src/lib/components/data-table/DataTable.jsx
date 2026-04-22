import { useMemo, useState } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { QUICKIT_SEMANTIC_COLORS, resolveQuickitToken } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const TABLE_SKIN = {
  light: {
    neutral: {
      wrap: "border-slate-200/70",
      table: "divide-slate-200/70",
      head: "border-slate-200/70 bg-slate-50/70 text-slate-600",
      headActive: "text-slate-900",
      row: "border-slate-100/80",
      cellHover: "group-hover:bg-slate-50",
      cell: "text-slate-800",
    },
    slate: {
      wrap: "border-slate-200/70",
      table: "divide-slate-200/70",
      head: "border-slate-200/70 bg-slate-50/70 text-slate-600",
      headActive: "text-slate-900",
      row: "border-slate-100/80",
      cellHover: "group-hover:bg-slate-50",
      cell: "text-slate-800",
    },
    zinc: {
      wrap: "border-zinc-200/75",
      table: "divide-zinc-200/75",
      head: "border-zinc-200/75 bg-zinc-50/70 text-zinc-600",
      headActive: "text-zinc-900",
      row: "border-zinc-100/75",
      cellHover: "group-hover:bg-zinc-50",
      cell: "text-zinc-800",
    },
    primary: {
      wrap: "border-sky-200",
      table: "divide-sky-100",
      head: "border-sky-200 bg-sky-50 text-sky-700",
      headActive: "text-sky-900",
      row: "border-sky-100",
      cellHover: "group-hover:bg-sky-50",
      cell: "text-slate-800",
    },
    brand: {
      wrap: "border-brand-200",
      table: "divide-brand-100",
      head: "border-brand-200 bg-brand-50 text-brand-700",
      headActive: "text-brand-900",
      row: "border-brand-100",
      cellHover: "group-hover:bg-brand-50",
      cell: "text-slate-800",
    },
    success: {
      wrap: "border-emerald-200",
      table: "divide-emerald-100",
      head: "border-emerald-200 bg-emerald-50 text-emerald-700",
      headActive: "text-emerald-900",
      row: "border-emerald-100",
      cellHover: "group-hover:bg-emerald-50",
      cell: "text-slate-800",
    },
    danger: {
      wrap: "border-rose-200",
      table: "divide-rose-100",
      head: "border-rose-200 bg-rose-50 text-rose-700",
      headActive: "text-rose-900",
      row: "border-rose-100",
      cellHover: "group-hover:bg-rose-50",
      cell: "text-slate-800",
    },
    warning: {
      wrap: "border-amber-200",
      table: "divide-amber-100",
      head: "border-amber-200 bg-amber-50 text-amber-700",
      headActive: "text-amber-900",
      row: "border-amber-100",
      cellHover: "group-hover:bg-amber-50",
      cell: "text-slate-800",
    },
    info: {
      wrap: "border-cyan-200",
      table: "divide-cyan-100",
      head: "border-cyan-200 bg-cyan-50 text-cyan-700",
      headActive: "text-cyan-900",
      row: "border-cyan-100",
      cellHover: "group-hover:bg-cyan-50",
      cell: "text-slate-800",
    },
    light: {
      wrap: "border-neutral-200/70",
      table: "divide-neutral-200/70",
      head: "border-neutral-200/70 bg-white text-neutral-600",
      headActive: "text-neutral-950",
      row: "border-neutral-100/75",
      cellHover: "group-hover:bg-neutral-50",
      cell: "text-neutral-900",
    },
    dark: {
      wrap: "border-zinc-300/80",
      table: "divide-zinc-200/80",
      head: "border-zinc-300/80 bg-zinc-100/85 text-zinc-700",
      headActive: "text-zinc-950",
      row: "border-zinc-200/80",
      cellHover: "group-hover:bg-zinc-100",
      cell: "text-zinc-900",
    },
    black: {
      wrap: "border-black",
      table: "divide-neutral-200",
      head: "border-black bg-neutral-950 text-neutral-100",
      headActive: "text-white",
      row: "border-neutral-200",
      cellHover: "group-hover:bg-neutral-50",
      cell: "text-neutral-900",
    },
  },
  dark: {
    neutral: {
      wrap: "border-zinc-800/75",
      table: "divide-zinc-800/70",
      head: "border-zinc-800/75 bg-zinc-900/70 text-zinc-400",
      headActive: "text-zinc-100",
      row: "border-zinc-800/60",
      cellHover: "group-hover:bg-zinc-900",
      cell: "text-zinc-100",
    },
    slate: {
      wrap: "border-slate-800/75",
      table: "divide-slate-800/70",
      head: "border-slate-800/75 bg-slate-900/70 text-slate-400",
      headActive: "text-slate-100",
      row: "border-slate-800/60",
      cellHover: "group-hover:bg-slate-900",
      cell: "text-slate-100",
    },
    zinc: {
      wrap: "border-zinc-800/75",
      table: "divide-zinc-800/70",
      head: "border-zinc-800/75 bg-zinc-900/70 text-zinc-400",
      headActive: "text-zinc-100",
      row: "border-zinc-800/60",
      cellHover: "group-hover:bg-zinc-900",
      cell: "text-zinc-100",
    },
    primary: {
      wrap: "border-sky-900/80",
      table: "divide-sky-900/60",
      head: "border-sky-900/80 bg-sky-950 text-sky-300",
      headActive: "text-sky-100",
      row: "border-sky-900/40",
      cellHover: "group-hover:bg-sky-950",
      cell: "text-zinc-100",
    },
    brand: {
      wrap: "border-brand-900/80",
      table: "divide-brand-900/60",
      head: "border-brand-900/80 bg-brand-950 text-brand-300",
      headActive: "text-brand-100",
      row: "border-brand-900/40",
      cellHover: "group-hover:bg-brand-950",
      cell: "text-zinc-100",
    },
    success: {
      wrap: "border-emerald-900/80",
      table: "divide-emerald-900/60",
      head: "border-emerald-900/80 bg-emerald-950 text-emerald-300",
      headActive: "text-emerald-100",
      row: "border-emerald-900/40",
      cellHover: "group-hover:bg-emerald-950",
      cell: "text-zinc-100",
    },
    danger: {
      wrap: "border-rose-900/80",
      table: "divide-rose-900/60",
      head: "border-rose-900/80 bg-rose-950 text-rose-300",
      headActive: "text-rose-100",
      row: "border-rose-900/40",
      cellHover: "group-hover:bg-rose-950",
      cell: "text-zinc-100",
    },
    warning: {
      wrap: "border-amber-900/80",
      table: "divide-amber-900/60",
      head: "border-amber-900/80 bg-amber-950 text-amber-300",
      headActive: "text-amber-100",
      row: "border-amber-900/40",
      cellHover: "group-hover:bg-amber-950",
      cell: "text-zinc-100",
    },
    info: {
      wrap: "border-cyan-900/80",
      table: "divide-cyan-900/60",
      head: "border-cyan-900/80 bg-cyan-950 text-cyan-300",
      headActive: "text-cyan-100",
      row: "border-cyan-900/40",
      cellHover: "group-hover:bg-cyan-950",
      cell: "text-zinc-100",
    },
    light: {
      wrap: "border-neutral-700/75",
      table: "divide-neutral-800/70",
      head: "border-neutral-700/75 bg-neutral-900/80 text-neutral-300",
      headActive: "text-neutral-50",
      row: "border-neutral-800/60",
      cellHover: "group-hover:bg-neutral-900",
      cell: "text-neutral-100",
    },
    dark: {
      wrap: "border-zinc-700/75",
      table: "divide-zinc-700/70",
      head: "border-zinc-700/75 bg-zinc-900/80 text-zinc-300",
      headActive: "text-zinc-50",
      row: "border-zinc-800/60",
      cellHover: "group-hover:bg-zinc-900",
      cell: "text-zinc-100",
    },
    black: {
      wrap: "border-black",
      table: "divide-zinc-900",
      head: "border-black bg-black text-neutral-300",
      headActive: "text-white",
      row: "border-zinc-900",
      cellHover: "group-hover:bg-zinc-950",
      cell: "text-neutral-100",
    },
  },
};

const TABLE_ALIGNMENTS = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const TABLE_BUTTON_ALIGNMENTS = {
  center: "justify-center",
  left: "justify-start",
  right: "justify-end",
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
  color = "neutral",
  columns = [],
  data = [],
  defaultSort = null,
  onSortChange,
  rowKey = (row, index) => row.id ?? index,
  sort: controlledSort,
  stickyHeader = true,
}) {
  const { theme } = useQuickitControlState("data-table");
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    color,
    "neutral",
  );
  const themeSkin = TABLE_SKIN[theme] ?? TABLE_SKIN.light;
  const skin = themeSkin[resolvedColor] ?? themeSkin.neutral;
  const [internalSort, setInternalSort] = useState(defaultSort);
  const sortState =
    controlledSort !== undefined ? controlledSort : internalSort;

  const sortedData = useMemo(() => {
    if (!sortState?.column) {
      return data;
    }
    const col = columns.find((column) => column.key === sortState.column);
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
              const alignClass =
                TABLE_ALIGNMENTS[col.align] ?? TABLE_ALIGNMENTS.left;
              const buttonAlignClass =
                TABLE_BUTTON_ALIGNMENTS[col.align] ?? TABLE_BUTTON_ALIGNMENTS.left;
              const canSort = Boolean(col.sortable);
              const ariaSort = canSort
                ? active
                  ? sortState.dir === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
                : undefined;

              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wide",
                    alignClass,
                    active && skin.headActive,
                    col.headerClassName,
                  )}
                >
                  {canSort ? (
                    <button
                      type="button"
                      className={cn(
                        "inline-flex w-full select-none items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
                        buttonAlignClass,
                      )}
                      onClick={() => setSort(col.key)}
                    >
                      <span>{col.header}</span>
                      {active ? (
                        <span aria-hidden="true">
                          {sortState.dir === "asc" ? "▲" : "▼"}
                        </span>
                      ) : null}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y bg-white dark:bg-zinc-950">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowKey(row, rowIndex)}
              className={cn("group", skin.row)}
            >
              {columns.map((col) => {
                const alignClass =
                  TABLE_ALIGNMENTS[col.align] ?? TABLE_ALIGNMENTS.left;

                return (
                  <td
                    key={col.key}
                    className={cn(
                      "whitespace-nowrap px-4 py-3 align-middle transition-colors",
                      alignClass,
                      skin.cellHover,
                      skin.cell,
                      col.cellClassName,
                    )}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : row[col.key] ?? "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
