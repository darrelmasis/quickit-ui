import { cn } from "@/lib";

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
      {code ? <CodeExample code={code} title={codeTitle} ui={ui} /> : null}
    </div>
  );
}

export function CodeExample({ code, title = "Uso base", ui }) {
  return (
    <div className={`rounded-2xl border p-4 ${ui.code}`}>
      <p className={`text-xs uppercase tracking-[0.18em] ${ui.codeMuted}`}>
        {title}
      </p>
      <pre className="mt-3 overflow-x-auto text-sm leading-6">
        <code>{code}</code>
      </pre>
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
