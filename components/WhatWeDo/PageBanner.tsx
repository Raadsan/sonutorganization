import Link from "next/link";

export default function WhatWeDoPageBanner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">What We Do</span>
        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/75 md:text-lg">{description}</p>
        <nav className="mt-7 inline-flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <span>/</span>
          <span>What We Do</span>
          <span>/</span>
          <span className="text-white">{title}</span>
        </nav>
      </div>
    </section>
  );
}
