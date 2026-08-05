import Link from "next/link";

export default function MediaPageBanner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-secondary/25 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Media</span>
        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/75 md:text-lg">{description}</p>
        <nav className="mt-7 inline-flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <span>/</span>
          <span>Media</span>
          <span>/</span>
          <span className="text-white">{title}</span>
        </nav>
      </div>
    </section>
  );
}
