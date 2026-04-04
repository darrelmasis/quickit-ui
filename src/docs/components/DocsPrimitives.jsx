import { cn } from "@/lib";
import { Highlight, themes } from "prism-react-renderer";

const CODE_THEMES = {
  light: themes.oneLight,
  dark: themes.oneDark,
};

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
        "scroll-mt-6 border-b py-8 last:border-b-0 lg:scroll-mt-8",
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
      <h2 className={`mt-3 text-2xl font-semibold tracking-[-0.03em] ${ui.title}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-sm leading-7 ${ui.body}`}>{description}</p>
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
  return (
    <div className="mt-3 space-y-3">
      {title ? (
        <p className={`text-sm font-semibold ${ui.title}`}>{title}</p>
      ) : null}
      <div className={cn("rounded-[1.25rem] border p-4", ui.preview, className)}>
        {children}
      </div>
      {code ? (
        <CodeExample
          code={code}
          language={codeLanguage}
          title={codeTitle}
          ui={ui}
        />
      ) : null}
    </div>
  );
}

export function CodeExample({
  code,
  language = "jsx",
  title = "Uso base",
  ui,
}) {
  const prismTheme = CODE_THEMES[ui.mode] ?? themes.oneDark;

  return (
    <div className={`rounded-2xl border p-4 ${ui.code}`}>
      <p className={`text-xs uppercase tracking-[0.18em] ${ui.codeMuted}`}>
        {title}
      </p>
      <Highlight
        theme={prismTheme}
        code={code.trim()}
        language={language}
      >
        {({ className, getLineProps, getTokenProps, style, tokens }) => (
          <pre
            className={cn(
              className,
              "mt-3 overflow-x-auto rounded-xl bg-transparent p-0 text-sm leading-6",
            )}
            style={{ ...style, background: "transparent" }}
          >
            <code className="block min-w-full font-mono">
              {tokens.map((line, lineIndex) => {
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
        )}
      </Highlight>
    </div>
  );
}

export function PropsTable({ rows, ui }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className={`border-b px-0 py-3 pr-4 text-left text-sm font-semibold ${ui.title}`}>
              Prop
            </th>
            <th className={`border-b px-0 py-3 pr-4 text-left text-sm font-semibold ${ui.title}`}>
              Tipo
            </th>
            <th className={`border-b px-0 py-3 pr-4 text-left text-sm font-semibold ${ui.title}`}>
              Default
            </th>
            <th className={`border-b px-0 py-3 text-left text-sm font-semibold ${ui.title}`}>
              Descripción
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop}>
              <td className={`border-b px-0 py-3 pr-4 text-sm font-semibold ${ui.title}`}>
                <code>{row.prop}</code>
              </td>
              <td className={`border-b px-0 py-3 pr-4 text-sm ${ui.body}`}>
                {row.type}
              </td>
              <td className={`border-b px-0 py-3 pr-4 text-sm ${ui.body}`}>
                {row.defaultValue}
              </td>
              <td className={`border-b px-0 py-3 text-sm leading-6 ${ui.body}`}>
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
