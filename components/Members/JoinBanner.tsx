import Link from "next/link";

export default function Aboutbanner() {
  return (
    <section className="bg-[#1E0D79] py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
          JoinSONUT
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 text-sm text-white/80"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/50">/</span>
          <span className="text-white">Join</span>
        </nav>
      </div>
    </section>
  );
}
