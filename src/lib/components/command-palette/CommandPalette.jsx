import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Modal from "@/lib/components/modal/Modal";
import Input from "@/lib/components/input/Input";
import { cn } from "@/lib/utils";

const SHORTCUT_REGISTRY = [];

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
  shortcutEnabled = true,
  autoFocusOnOpen = true,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const shortcutIdRef = useRef(Symbol("qi-command-palette-shortcut"));
  const normalized = useMemo(() => normalizeGroups(groups), [groups]);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  const handleInputMount = useCallback(
    (node) => {
      inputRef.current = node;
    },
    [],
  );

  const handleOpenChange = useCallback(
    (next) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      if (!next) {
        setQuery("");
        setActiveIndex(-1);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!resolvedOpen || !autoFocusOnOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      inputRef.current?.focus?.();
      inputRef.current?.select?.();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [autoFocusOnOpen, resolvedOpen]);

  useEffect(() => {
    if (!shortcutEnabled) {
      return;
    }

    const shortcutId = shortcutIdRef.current;
    SHORTCUT_REGISTRY.push(shortcutId);

    return () => {
      const nextIndex = SHORTCUT_REGISTRY.indexOf(shortcutId);

      if (nextIndex !== -1) {
        SHORTCUT_REGISTRY.splice(nextIndex, 1);
      }
    };
  }, [shortcutEnabled]);

  useEffect(() => {
    if (!shortcutEnabled) {
      return;
    }

    const onKey = (event) => {
      if (SHORTCUT_REGISTRY[0] !== shortcutIdRef.current) {
        return;
      }

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
  }, [handleOpenChange, resolvedOpen, shortcutEnabled]);

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

  const flatItems = useMemo(
    () =>
      filtered.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          groupHeading: group.heading,
        })),
      ),
    [filtered],
  );

  const flatCount = filtered.reduce((n, g) => n + g.items.length, 0);
  const activeItem = activeIndex >= 0 ? flatItems[activeIndex] : null;
  const activeItemId = activeItem ? `qi-command-item-${activeItem.id}` : undefined;

  useEffect(() => {
    if (flatItems.length === 0) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex((current) => {
      if (current < 0 || current >= flatItems.length) {
        return 0;
      }
      return current;
    });
  }, [flatItems]);

  const handleSelectItem = useCallback((item) => {
    item.onSelect?.();
    handleOpenChange(false);
  }, [handleOpenChange]);

  const handleInputKeyDown = useCallback((event) => {
    if (!resolvedOpen) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => {
        if (flatItems.length === 0) {
          return -1;
        }
        return current < 0 ? 0 : Math.min(flatItems.length - 1, current + 1);
      });
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => {
        if (flatItems.length === 0) {
          return -1;
        }
        return current < 0 ? flatItems.length - 1 : Math.max(0, current - 1);
      });
      return;
    }

    if (event.key === "Enter" && activeItem) {
      event.preventDefault();
      handleSelectItem(activeItem);
    }
  }, [activeItem, flatItems, handleSelectItem, resolvedOpen]);

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
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            aria-label="Buscar en la paleta de comandos"
            role="combobox"
            aria-expanded={resolvedOpen}
            aria-controls="qi-command-palette-listbox"
            aria-activedescendant={activeItemId}
            aria-autocomplete="list"
            data-overlay-autofocus={autoFocusOnOpen ? "true" : undefined}
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
              <div id="qi-command-palette-listbox" role="listbox" aria-label={title}>
                {filtered.map((group, groupIndex) => (
                <div key={`${group.heading || "group"}-${groupIndex}`} className="p-2">
                  {group.heading ? (
                    <div className="px-2 pb-1 text-[0.65rem] font-semibold uppercase tracking-wide text-current/45">
                      {group.heading}
                    </div>
                  ) : null}
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      const itemIndex = flatItems.findIndex(
                        (flatItem) => flatItem.id === item.id,
                      );
                      const isActive = itemIndex === activeIndex;

                      return (
                      <li key={item.id}>
                        <button
                          id={`qi-command-item-${item.id}`}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          className={cn(
                            "flex w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10",
                            isActive && "bg-black/5 dark:bg-white/10",
                          )}
                          onMouseEnter={() => {
                            setActiveIndex(itemIndex);
                          }}
                          onClick={() => {
                            handleSelectItem(item);
                          }}
                        >
                          {item.label}
                        </button>
                      </li>
                      );
                    })}
                  </ul>
                </div>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default CommandPalette;
