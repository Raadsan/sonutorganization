import Link from "next/link";

export default function Newssbanner() {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          News
        </h1>
        <nav className="inline-flex items-center gap-2 text-white/80 text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/50">/</span>
          <span className="text-white">News</span>
        </nav>
      </div>
    </section>
  );
}
