export default function WebsiteSection({
  children,
  id,
  title,
  description,
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-neutral-200 py-10 first:border-t-0 first:pt-0 dark:border-neutral-800">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          {title}
        </h2>
        {description ? (
          <p className="mt-6 text-base leading-8 text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
