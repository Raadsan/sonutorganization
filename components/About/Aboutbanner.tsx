import Link from "next/link";

export default function Aboutbanner() {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-white/70">
          Who We Are
        </p>
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          About Us
        </h1>
        <nav className="inline-flex items-center gap-2 text-sm text-white/80" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-white/50">/</span>
          <span>Who We Are</span>
          <span className="text-white/50">/</span>
          <span className="text-white">About Us</span>
        </nav>
      </div>
    </section>
  );
}
