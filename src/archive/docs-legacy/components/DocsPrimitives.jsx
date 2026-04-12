import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from "@/lib";
import { Highlight, themes } from "prism-react-renderer";

const CODE_THEMES = {
  light: themes.oneLight,
  dark: themes.oneDark,
};

const QUICKIT_EXPORTS = [
  "Accordion","AccordionContent","AccordionItem","AccordionTrigger",
  "Avatar","AvatarFallback","AvatarGroup","AvatarImage","AvatarPresence",
  "Badge","Breadcrumb","BreadcrumbCurrent","BreadcrumbItem","BreadcrumbLink",
  "BreadcrumbList","BreadcrumbSeparator","Button","Checkbox",
  "Dropdown","DropdownContent","DropdownItem","DropdownSeparator","DropdownTrigger",
  "EmptyState","EmptyStateDescription","EmptyStateTitle",
  "FormControl","FormDescription","FormMessage",
  "Input","InputGroup","InputGroupAction","InputGroupAddon","InputGroupItem",
  "Initials","QUICKIT_BUTTON_SHAPES","QUICKIT_CONTROL_SIZES","QUICKIT_SEMANTIC_COLORS",
  "Label","Link","Default","For","Match",
  "Modal","ModalAction","ModalActions","ModalBody","ModalContent","ModalHeader","ModalTitle",
  "Pagination","Popover","QuickitProvider","QuickitThemeProvider",
  "Radio","RenderSwitch","Select","Show","Skeleton","Switch",
  "Tabs","TabsContent","TabsList","TabsTrigger","Textarea","Tooltip","UserChip",
  "useBreakpoint","useMediaQuery","useQuickitFocusRing","useQuickitPressEffect",
  "useQuickitRipple","useQuickitTheme","useQuickitThemeController",
];

function getQuickitImports(code) {
  if (/^\s*import\s/m.test(code)) {
    return code.trim();
  }

  const used = QUICKIT_EXPORTS.filter((name) =>
    new RegExp(`(<${name}\\b|</${name}\\b|\\b${name}\\s*[.(])`).test(code),
  );

  if (!used.length) {
    return code.trim();
  }

  return `import { ${used.join(", ")} } from "quickit-ui";\n\n${code.trim()}`;
}

function createHeadingId(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function SectionCard({ children, className = "", id, sectionRef }) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("docs-page-section", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  actions,
  category,
  description,
  eyebrow,
  title,
  ui,
}) {
  const headingId = useMemo(() => createHeadingId(title), [title]);

  return (
    <header className="docs-page-header">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          {category || eyebrow ? (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {category ? (
                <Badge color="neutral" variant="outline" className="rounded-full px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.16em]">
                  {category}
                </Badge>
              ) : null}
              {eyebrow ? (
                <p className={cn("text-xs font-medium", ui?.accent ?? "text-zinc-500 dark:text-zinc-400")}>
                  {eyebrow}
                </p>
              ) : null}
            </div>
          ) : null}
          <h1
            id={headingId}
            className={cn(
              "text-[2rem] font-semibold tracking-tight sm:text-[2.5rem]",
              ui?.title ?? "text-zinc-950 dark:text-zinc-50",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "mt-3 max-w-3xl text-[0.98rem] leading-7 sm:text-base",
                ui?.body ?? "text-zinc-600 dark:text-zinc-400",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>

        {actions ? <div className="flex flex-wrap items-center gap-2.5">{actions}</div> : null}
      </div>
    </header>
  );
}

export function PreviewPanel({
  children,
  className = "",
  code,
  codeLanguage = "jsx",
  codeTitle = "Código",
  title,
  ui,
}) {
  const effectiveUi = ui ?? {
    mode: "light",
    title: "text-zinc-950",
    body: "text-zinc-600",
    preview: "border-zinc-200 bg-zinc-50",
    panel: "border-zinc-200 bg-white",
  };

  if (!code) {
    return (
      <div className={cn("docs-showcase", effectiveUi.panel)}>
        {title ? (
          <div className="docs-showcase-header">
            <h2 className={cn("text-sm font-semibold", effectiveUi.title)}>{title}</h2>
          </div>
        ) : null}
        <div className={cn("docs-preview-area", effectiveUi.preview, className)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <Tabs
      defaultValue="preview"
      size="sm"
      color="neutral"
      className={cn("docs-showcase", effectiveUi.panel)}
    >
      <div className="docs-showcase-header">
        <div className="min-w-0">
          {title ? (
            <h2 className={cn("truncate text-sm font-medium", effectiveUi.title)}>
              {title}
            </h2>
          ) : (
            <p className={cn("text-sm font-medium", effectiveUi.body)}>
              Ejemplo
            </p>
          )}
        </div>

        <TabsList size="sm">
          <TabsTrigger value="preview">Vista previa</TabsTrigger>
          <TabsTrigger value="code">Código</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="preview" className="mt-0">
        <div className={cn("docs-preview-area", effectiveUi.preview, className)}>
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code" className="mt-0">
        <CodeExample
          code={code}
          language={codeLanguage}
          title={codeTitle}
          ui={effectiveUi}
          hideTitle
        />
      </TabsContent>
    </Tabs>
  );
}

export function CodeExample({
  code,
  language = "jsx",
  title = "Uso",
  ui,
  hideTitle = false,
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const mode = ui?.mode ?? "light";
  const prismTheme = CODE_THEMES[mode] ?? themes.oneDark;
  const maxLines = 14;

  const displayCode =
    ["jsx", "tsx", "js", "javascript"].includes(language)
      ? getQuickitImports(code)
      : code.trim();

  const totalLines = displayCode.split("\n").length;
  const hasMore = totalLines > maxLines;

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
    } catch {
      // noop
    }
  };

  return (
    <div className="space-y-3">
      {!hideTitle ? (
        <h2
          id={createHeadingId(title)}
          className={cn(
            "text-sm font-medium",
            ui?.title ?? "text-zinc-950 dark:text-zinc-50",
          )}
        >
          {title}
        </h2>
      ) : null}

      <div className="docs-code-block">
        <div className="docs-code-toolbar">
          <Badge color="neutral" variant="outline" className="rounded-full px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.16em]">
            {language}
          </Badge>
          <Button
            size="sm"
            color="neutral"
            variant="outline"
            activeMotion={false}
            onClick={handleCopy}
          >
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </div>

        <Highlight theme={prismTheme} code={displayCode} language={language}>
          {({ className: cls, getLineProps, getTokenProps, style, tokens }) => {
            const { background: _bg, backgroundColor: _bgc, ...codeStyle } =
              style ?? {};
            const visibleTokens =
              expanded || !hasMore ? tokens : tokens.slice(0, maxLines);

            return (
              <div className="relative">
                <pre
                  className={cn(
                    cls,
                    "overflow-x-auto bg-transparent p-0 text-[0.82rem] leading-7",
                  )}
                  style={{ ...codeStyle, backgroundColor: "transparent" }}
                >
                  <code className="block min-w-full font-mono">
                    {visibleTokens.map((line, lineIndex) => {
                      const { key: lineKey, ...lineProps } = getLineProps({
                        line,
                        key: lineIndex,
                      });

                      return (
                        <div
                          key={lineKey}
                          {...lineProps}
                          className={cn(lineProps.className, "min-h-7")}
                        >
                          {line.map((token, tokenIndex) => {
                            const { key: tokenKey, ...tokenProps } = getTokenProps({
                              token,
                              key: tokenIndex,
                            });
                            return <span key={tokenKey} {...tokenProps} />;
                          })}
                        </div>
                      );
                    })}
                  </code>
                </pre>

                {hasMore && !expanded ? (
                  <div className="docs-code-fade" />
                ) : null}
              </div>
            );
          }}
        </Highlight>

        {hasMore ? (
          <div className="docs-code-footer">
            <Button
              size="sm"
              color="neutral"
              variant="ghost"
              activeMotion={false}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "Ver menos" : "Ver completo"}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function PropsTable({ rows, ui }) {
  const borderCls = ui?.divider ?? "border-zinc-200 dark:border-zinc-800";
  const titleCls = ui?.title ?? "text-zinc-950 dark:text-zinc-50";
  const bodyCls = ui?.body ?? "text-zinc-600 dark:text-zinc-400";

  return (
    <div className="docs-table-shell">
      <div className="overflow-x-auto">
        <table className={cn("docs-props-table", borderCls)}>
          <thead>
            <tr className={borderCls}>
              {["Prop", "Tipo", "Default", "Descripción"].map((heading) => (
                <th key={heading} className={titleCls}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.prop} className={borderCls}>
                <td className={titleCls}>
                  <code>{row.prop}</code>
                </td>
                <td className={cn(bodyCls, "font-mono text-xs")}>{row.type}</td>
                <td className={cn(bodyCls, "font-mono text-xs")}>
                  {row.defaultValue ?? "—"}
                </td>
                <td className={bodyCls}>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function NotesList({ items, ui }) {
  const bodyCls = ui?.body ?? "text-zinc-600 dark:text-zinc-400";
  const dividerCls = ui?.divider ?? "border-zinc-200 dark:border-zinc-800";

  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className={cn(
            "rounded-xl border px-4 py-3 text-sm leading-6",
            dividerCls,
            bodyCls,
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
