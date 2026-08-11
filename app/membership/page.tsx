import WhoCanJoin from "@/components/Members/WhoCanJoin";
import MembershipBenefits from "@/components/Members/MembershipBenefits";
import MembershipRequirements from "@/components/Members/MembershipRequirements";
import MembersForm from "@/components/Members/memebrsform";

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
        </div>
      </section>
      
      <WhoCanJoin registerHref="#register" />
      <MembershipBenefits />
      <MembershipRequirements />
      
      <div id="register" className="py-12 bg-white">
        <MembersForm />
      </div>
    </main>
  );
}
