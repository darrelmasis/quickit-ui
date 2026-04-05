import { useEffect, useState } from "react";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger, cn } from "@/lib";
import { Highlight, themes } from "prism-react-renderer";

const CODE_THEMES = {
  light: themes.oneLight,
  dark: themes.oneDark,
};

const CODE_PREVIEW_LINES = 4;
const CODE_FADE_CLASSES = {
  light: "from-white via-stone-50/95 to-transparent",
  dark: "from-zinc-950 via-zinc-950/80 to-transparent",
};

const QUICKIT_EXPORTS = [
  "Accordion",
  "AccordionContent",
  "AccordionItem",
  "AccordionTrigger",
  "Avatar",
  "AvatarFallback",
  "AvatarGroup",
  "AvatarImage",
  "Badge",
  "Breadcrumb",
  "BreadcrumbCurrent",
  "BreadcrumbItem",
  "BreadcrumbLink",
  "BreadcrumbList",
  "BreadcrumbSeparator",
  "Button",
  "Checkbox",
  "Dropdown",
  "DropdownContent",
  "DropdownItem",
  "DropdownSeparator",
  "DropdownTrigger",
  "EmptyState",
  "EmptyStateDescription",
  "EmptyStateTitle",
  "FormControl",
  "FormDescription",
  "FormMessage",
  "Input",
  "QUICKIT_BUTTON_SHAPES",
  "QUICKIT_CONTROL_SIZES",
  "QUICKIT_SEMANTIC_COLORS",
  "Label",
  "Link",
  "Default",
  "For",
  "Match",
  "Modal",
  "ModalAction",
  "ModalActions",
  "ModalBody",
  "ModalContent",
  "ModalHeader",
  "ModalTitle",
  "Pagination",
  "Popover",
  "QuickitProvider",
  "Radio",
  "RenderSwitch",
  "Select",
  "Show",
  "Skeleton",
  "Switch",
  "Tabs",
  "TabsContent",
  "TabsList",
  "TabsTrigger",
  "Textarea",
  "Tooltip",
  "useQuickitTheme",
];

function getQuickitImports(code) {
  if (/^\s*import\s/m.test(code)) {
    return code.trim();
  }

  const usedExports = QUICKIT_EXPORTS.filter((exportName) =>
    new RegExp(
      `(<${exportName}\\b|</${exportName}\\b|\\b${exportName}\\s*[.(])`,
    ).test(code),
  );

  if (!usedExports.length) {
    return code.trim();
  }

  return `import { ${usedExports.join(", ")} } from "quickit-ui";\n\n${code.trim()}`;
}

export function SectionCard({
  children,
  className = "",
  id,
  sectionRef,
}) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "scroll-mt-6 border-b py-6 last:border-b-0 sm:py-8 lg:scroll-mt-8",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  category,
  description,
  title,
  ui,
}) {
  return (
    <>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.accent}`}>
        {category}
      </p>
      <h2 className={`mt-3 text-xl font-semibold tracking-[-0.03em] sm:text-2xl ${ui.title}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-sm leading-6 sm:leading-7 ${ui.body}`}>{description}</p>
      ) : null}
    </>
  );
}

export function PreviewPanel({
  children,
  className = "",
  code,
  codeLanguage = "jsx",
  codeTitle = "Código del ejemplo",
  title,
  ui,
}) {
  if (!code) {
    return (
      <div className="mt-3 space-y-3">
        {title ? (
          <p className={`text-sm font-semibold ${ui.title}`}>{title}</p>
        ) : null}
        <div
          className={cn(
            "rounded-[1rem] border p-3 sm:rounded-[1.25rem] sm:p-4",
            ui.preview,
            className,
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-3">
      {title ? (
        <p className={`text-sm font-semibold ${ui.title}`}>{title}</p>
      ) : null}
      <Tabs defaultValue="preview" size="sm" color="neutral" className="space-y-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Código</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-0">
          <div
            className={cn(
              "rounded-[1rem] border p-3 sm:rounded-[1.25rem] sm:p-4",
              ui.preview,
              className,
            )}
          >
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <CodeExample
            code={code}
            language={codeLanguage}
            title={codeTitle}
            ui={ui}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function CodeExample({
  code,
  language = "jsx",
  title = "Uso base",
  ui,
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const prismTheme = CODE_THEMES[ui.mode] ?? themes.oneDark;
  const displayCode =
    language === "jsx" || language === "tsx" || language === "js" || language === "javascript"
      ? getQuickitImports(code)
      : code.trim();

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`rounded-[1rem] border p-3 sm:rounded-2xl sm:p-4 ${ui.code}`}>
      <div className="flex items-center justify-between gap-3">
        <p className={`text-xs uppercase tracking-[0.18em] ${ui.codeMuted}`}>
          {title}
        </p>
        <Button
          size="sm"
          color="neutral"
          variant="outline"
          className="min-w-0 px-3"
          onClick={handleCopy}
        >
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
      <Highlight
        theme={prismTheme}
        code={displayCode}
        language={language}
      >
        {({ className, getLineProps, getTokenProps, style, tokens }) => {
          const {
            background: _background,
            backgroundColor: _backgroundColor,
            ...codeBlockStyle
          } = style ?? {};
          const hasHiddenLines = tokens.length > CODE_PREVIEW_LINES;
          const visibleTokens =
            expanded || !hasHiddenLines
              ? tokens
              : tokens.slice(0, CODE_PREVIEW_LINES);

          return (
            <div className="mt-3">
              <div className="relative">
                <pre
                  className={cn(
                    className,
                    "overflow-x-auto rounded-xl bg-transparent p-0 text-xs leading-5 sm:text-sm sm:leading-6",
                  )}
                  style={{ ...codeBlockStyle, backgroundColor: "transparent" }}
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
                          className={cn(lineProps.className, "min-h-6")}
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

                {hasHiddenLines && !expanded ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-xl bg-gradient-to-t",
                      CODE_FADE_CLASSES[ui.mode] ?? CODE_FADE_CLASSES.dark,
                    )}
                  />
                ) : null}
              </div>

              {hasHiddenLines ? (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className={`text-xs ${ui.codeMuted}`}>
                    {expanded
                      ? `Mostrando ${tokens.length} líneas`
                      : `Mostrando ${CODE_PREVIEW_LINES} de ${tokens.length} líneas`}
                  </p>
                  <Button
                    size="sm"
                    color="neutral"
                    variant="outline"
                    className="min-w-0 px-3"
                    onClick={() => setExpanded((current) => !current)}
                  >
                    {expanded ? "Ver menos" : "Ver completo"}
                  </Button>
                </div>
              ) : null}
            </div>
          );
        }}
      </Highlight>
    </div>
  );
}

export function PropsTable({ rows, ui }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-[640px] border-separate border-spacing-0">
        <thead>
          <tr>
            <th className={`border-b px-0 py-3 pr-4 text-left text-xs font-semibold sm:text-sm ${ui.title}`}>
              Prop
            </th>
            <th className={`border-b px-0 py-3 pr-4 text-left text-xs font-semibold sm:text-sm ${ui.title}`}>
              Tipo
            </th>
            <th className={`border-b px-0 py-3 pr-4 text-left text-xs font-semibold sm:text-sm ${ui.title}`}>
              Default
            </th>
            <th className={`border-b px-0 py-3 text-left text-xs font-semibold sm:text-sm ${ui.title}`}>
              Descripción
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop}>
              <td className={`border-b px-0 py-3 pr-4 text-xs font-semibold sm:text-sm ${ui.title}`}>
                <code>{row.prop}</code>
              </td>
              <td className={`border-b px-0 py-3 pr-4 text-xs sm:text-sm ${ui.body}`}>
                {row.type}
              </td>
              <td className={`border-b px-0 py-3 pr-4 text-xs sm:text-sm ${ui.body}`}>
                {row.defaultValue}
              </td>
              <td className={`border-b px-0 py-3 text-xs leading-5 sm:text-sm sm:leading-6 ${ui.body}`}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NotesList({ items, ui }) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <p key={item} className={`border-l-2 pl-4 text-sm leading-6 ${ui.body} ${ui.divider}`}>
          {item}
        </p>
      ))}
    </div>
  );
}
