import { forwardRef, useMemo, useState } from "react";
import { useQuickitControlState } from "@/lib/theme";
import { DATA_TABLE_THEME_CLASSES } from "@/lib/theme/theme-classes";
import { QUICKIT_SEMANTIC_COLORS, resolveQuickitToken } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { useTXT } from "@/lib/i18n";

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
const SKELETON_ROWS = 5;

function SkeletonCell({ className }) {
  return (
    <td className={cn("px-3 sm:px-4 py-3", className)}>
      <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
    </td>
  );
}

const DataTable = forwardRef(function DataTable({
  caption,
  className,
  color = "neutral",
  columns = [],
  data = [],
  defaultSort = null,
  emptyText,
  loading = false,
  onSortChange,
  rowKey = (row, index) => row.id ?? index,
  sort: controlledSort,
  stickyHeader = true,
}, ref) {

  const TXT = useTXT();
  const resolvedEmptyText = emptyText ?? TXT.EMPTY;
  const { theme } = useQuickitControlState("data-table");
  const resolvedColor = resolveQuickitToken(
    QUICKIT_SEMANTIC_COLORS,
    color,
    "neutral",
  );
  const themeSkin = DATA_TABLE_THEME_CLASSES[theme] ?? DATA_TABLE_THEME_CLASSES.light;
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
        "overflow-x-auto rounded-[var(--qk-radius-xl)] border scroll-snap-type-x-mandatory touch-action-pan-x",
        skin.wrap,
        className,
      )}
    >
      <table ref={ref} className={cn("min-w-full divide-y text-xs sm:text-sm", skin.table)}>
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
                    "px-3 sm:px-4 py-3 text-xs font-semibold uppercase tracking-wide",
                    alignClass,
                    active && skin.headActive,
                    col.headerClassName,
                  )}
                >
                  {canSort ? (
                    <button
                      type="button"
                      className={cn(
                        "inline-flex w-full select-none items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
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
        <tbody className="divide-y bg-white dark:bg-neutral-950">
          {loading ? (
            Array.from({ length: SKELETON_ROWS }).map((_, i) => (
              <tr key={`skeleton-${i}`} className="group" aria-hidden="true">
                {columns.map((col) => (
                  <SkeletonCell key={col.key} className={skin.cell} />
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="px-3 sm:px-4 py-8 text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-400"
              >
                {resolvedEmptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});
export { DataTable };

export default DataTable;
