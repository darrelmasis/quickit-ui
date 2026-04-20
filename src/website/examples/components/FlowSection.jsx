export default function FlowSection({ id, title, description, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          {title}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
