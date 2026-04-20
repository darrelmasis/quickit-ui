import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Modal from "@/lib/components/modal/Modal";
import Input from "@/lib/components/input/Input";
import { cn } from "@/lib/utils";

function normalizeSearchText(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "";
}

function normalizeGroups(groups) {
  if (!Array.isArray(groups)) {
    return [];
  }
  return groups.map((g, gi) => ({
    heading: g?.heading ?? "",
    items: Array.isArray(g?.items)
      ? g.items.map((item, ii) => ({
        id: item?.id ?? `${gi}-${ii}`,
        keywords: item?.keywords,
        label: item?.label ?? String(item?.id ?? ii),
        onSelect: item?.onSelect,
        textValue:
          item?.textValue ??
          normalizeSearchText(item?.label ?? item?.id ?? ii),
      }))
      : [],
  }));
}

/**
 * Paleta de comandos (búsqueda + acciones) basada en `Modal`.
 */
export function CommandPalette({
  className,
  emptyText = "Sin resultados",
  groups = [],
  headerTrailing,
  title = "Comandos",
  onOpenChange,
  open,
  placeholder = "Buscar comando…",
  shortcutLabel = "Ctrl+K",
  autoFocusOnOpen = true,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const normalized = useMemo(() => normalizeGroups(groups), [groups]);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  // Callback ref: fires when the <Input> mounts/unmounts in the DOM.
  // Modal's ModalContent uses a single rAF to `focusFirstElement` (which
  // targets the close button). A double-rAF here guarantees we run one
  // frame *after* that, so the input always wins the focus race.
  const handleInputMount = useCallback(
    (node) => {
      inputRef.current = node;

      if (!node || !autoFocusOnOpen) {
        return;
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          node.focus?.();
          node.select?.();
        });
      });
    },
    [autoFocusOnOpen],
  );

  const handleOpenChange = useCallback(
    (next) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      if (!next) {
        setQuery("");
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    const onKey = (event) => {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable
      ) {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        handleOpenChange(!resolvedOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleOpenChange, resolvedOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return normalized;
    }
    return normalized
      .map((g) => ({
        ...g,
        items: g.items.filter((item) => {
          const hay = [
            item.textValue,
            ...(Array.isArray(item.keywords) ? item.keywords : []),
          ]
            .join(" ")
            .toLowerCase();
          return hay.includes(q);
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [normalized, query]);

  const flatCount = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <Modal open={resolvedOpen} onOpenChange={handleOpenChange}>
      <Modal.Content className={cn("max-w-lg", className)}>
        <Modal.Header>
          <Modal.Title className="text-left">
            {title}
            {headerTrailing != null ? (
              <span className="ml-2 inline-flex items-center">
                {headerTrailing}
              </span>
            ) : shortcutLabel ? (
              <span className="ml-2 text-xs font-normal text-current/50">
                {shortcutLabel}
              </span>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-3">
          <Input
            ref={handleInputMount}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Buscar en la paleta de comandos"
          />
          <div
            className={cn(
              "max-h-72 overflow-y-auto rounded-xl border border-current/10",
              "[scrollbar-width:thin] [scrollbar-color:rgb(163_163_163)_transparent]",
              "[&::-webkit-scrollbar]:w-2",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent",
              "[&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:bg-clip-content",
              "[&::-webkit-scrollbar-thumb:hover]:bg-neutral-400",
              "dark:[scrollbar-color:rgb(115_115_115)_transparent]",
              "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700",
              "dark:[&::-webkit-scrollbar-thumb:hover]:bg-neutral-600",
            )}
          >
            {flatCount === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-current/50">
                {emptyText}
              </div>
            ) : (
              filtered.map((group) => (
                <div key={group.heading || "group"} className="p-2">
                  {group.heading ? (
                    <div className="px-2 pb-1 text-[0.65rem] font-semibold uppercase tracking-wide text-current/45">
                      {group.heading}
                    </div>
                  ) : null}
                  <ul className="space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="flex w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10"
                          onClick={() => {
                            item.onSelect?.();
                            handleOpenChange(false);
                          }}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default CommandPalette;
