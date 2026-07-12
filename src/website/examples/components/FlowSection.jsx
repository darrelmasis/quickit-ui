export default function FlowSection({ id, title, description, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-20 mt-10 flex flex-col gap-4 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          {title}
        </h2>
        <p className="text-sm leading-7 text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
