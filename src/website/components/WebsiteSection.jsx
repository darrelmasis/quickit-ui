export default function WebsiteSection({
  children,
  id,
  title,
  description,
}) {
  return (
    <section id={id} className="scroll-mt-20 first:mt-0 mt-10 border-b border-neutral-100 pb-2 first:border-b-0 dark:border-neutral-800">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-7 text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
