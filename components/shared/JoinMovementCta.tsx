import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function JoinMovementCta() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-[#24138a] to-[#0f0547] text-white p-7 sm:p-9 shadow-lg">
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-blue-200 mb-4 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          Become a Member
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white mb-3">
          JOIN OUR MOVEMENT
        </h2>

        <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
          Join thousands of educators across the nation. Together we advocate for
          teachers&apos; rights, improve educational standards, and build a brighter
          tomorrow.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-gray-100 shadow-md transition-all duration-300 hover:scale-[1.02] text-center"
          >
            Join SONUT Today
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/membership/benefits"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/30 text-white hover:bg-white/10 text-sm font-semibold transition-colors text-center"
          >
            Membership Benefits
          </Link>
        </div>
      </div>
    </div>
  );
}
