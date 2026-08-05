import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MembershipBenefits from "@/components/Members/MembershipBenefits";
import ReasonsToJoin from "@/components/Members/ReasonsToJoin";
import WhoCanJoin from "@/components/Members/WhoCanJoin";

export const metadata = {
  title: "Membership | SONUT",
  description: "Learn about SONUT membership, its benefits, and who can join Somalia's national teachers' union.",
};

export default function MembershipPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-primary py-20 text-white md:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">SONUT Membership</span>
          <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">Stronger Together</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Join a nationwide community that represents teachers, protects their rights, and strengthens education across Somalia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/join#register"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Become a Member
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contactus"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <MembershipBenefits />
      <ReasonsToJoin registerHref="/join#register" />
      <WhoCanJoin registerHref="/join#register" />
    </main>
  );
}
