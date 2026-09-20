import Link from "next/link";
import MembershipBanner from "@/components/Members/MembershipBanner";
import {
  Users,
  Award,
  ClipboardCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Membership Overview | SONUT",
  description:
    "Learn about SONUT membership: explore who can join, discover exclusive member benefits, and review membership requirements.",
};

const membershipSections = [
  {
    title: "Who Can Join?",
    badge: "Eligibility",
    href: "/membership/who-can-join",
    icon: Users,
    color: "bg-blue-600",
    light: "bg-blue-50 text-blue-600",
    description:
      "Open to public, private, college, TVET, and retired teachers across Somalia. Discover which membership category applies to your professional background.",
    points: [
      "Public & private school teachers",
      "Colleges, institutes & universities",
      "Administrators & education staff",
      "Retired educators & trainees",
    ],
    ctaText: "Explore Eligibility",
  },
  {
    title: "Membership Benefits",
    badge: "Advantages",
    href: "/membership/benefits",
    icon: Award,
    color: "bg-[#1E0D79]",
    light: "bg-[#1E0D79]/10 text-[#1E0D79]",
    description:
      "Full spectrum workplace defense, collective bargaining for better compensation, continuous training certifications, and family healthcare assistance.",
    points: [
      "Full legal counsel & dispute defense",
      "Collective bargaining & salary advocacy",
      "Accredited professional workshops",
      "Health & emergency welfare funds",
    ],
    ctaText: "Discover Benefits",
  },
  {
    title: "Membership Requirements",
    badge: "Criteria & Fees",
    href: "/membership/requirements",
    icon: ClipboardCheck,
    color: "bg-[#F4313F]",
    light: "bg-[#F4313F]/10 text-[#F4313F]",
    description:
      "Understand the simple 4-item document checklist, transparent fee structure ($3 monthly dues, $5 annual ID card), and ethical obligations.",
    points: [
      "National ID & teaching credentials",
      "School employment verification",
      "Nominal transparent fee structure",
      "Adherence to union code of ethics",
    ],
    ctaText: "View Requirements",
  },
];

const highlights = [
  "Over 25,000 educators actively represented",
  "Branches operating in all federal member states",
  "Democratically elected leadership by teachers",
  "Recognized member of Education International (EI)",
];

export default function MembershipPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen">
      {/* Banner */}
      <MembershipBanner
        title="Membership Portal"
        subtitle="Empowering teachers, protecting rights, and strengthening education across Somalia. Discover how you can be part of our movement."
        badge="SONUT Union"
      />

      {/* Overview Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E0D79]/10 text-[#1E0D79] text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Everything You Need
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1E0D79] font-serif mb-4">
              Your Gateway to SONUT
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Navigate through our membership guidelines below to discover who is eligible, what advantages you gain as a member, and how to submit your application.
            </p>
          </div>

          {/* 3 Main Section Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {membershipSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl ${section.light} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {section.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1E0D79] transition-colors font-serif">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {section.description}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-gray-100 mb-8">
                      {section.points.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={section.href}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gray-50 group-hover:bg-[#1E0D79] text-gray-800 group-hover:text-white font-bold text-sm transition-all duration-300 shadow-sm"
                  >
                    <span>{section.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why We Are Stronger Together */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#1E0D79] p-8 sm:p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-[#F4313F]/20 blur-3xl" />
            <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70 mb-3 inline-block">
                  National Solidarity
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif mb-6 leading-tight">
                  Stronger Together, <br />
                  Advancing Somali Education
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                  Teaching is the foundation of our nation&apos;s recovery and prosperity. By standing together under SONUT, our voices cannot be ignored.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/join"
                    className="inline-flex items-center gap-2 rounded-full bg-[#F4313F] px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#d92936] transition-all hover:scale-105"
                  >
                    Join SONUT Online
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contactus"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3.5 text-sm font-bold text-white border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Talk to Membership Officer
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15">
                <h3 className="text-xl font-bold mb-4 font-serif">Quick Navigation</h3>
                <div className="space-y-3">
                  <Link
                    href="/membership/who-can-join"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/15 transition-colors text-sm"
                  >
                    <span>1. Who Can Join?</span>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                  </Link>
                  <Link
                    href="/membership/benefits"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/15 transition-colors text-sm"
                  >
                    <span>2. Membership Benefits</span>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                  </Link>
                  <Link
                    href="/membership/requirements"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/15 transition-colors text-sm"
                  >
                    <span>3. Membership Requirements</span>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                  </Link>
                  <Link
                    href="/join"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#F4313F]/80 hover:bg-[#F4313F] transition-colors text-sm font-bold mt-2"
                  >
                    <span>4. Registration Form</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
