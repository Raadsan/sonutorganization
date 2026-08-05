import Link from "next/link";
import WhatWeDoPageBanner from "@/components/WhatWeDo/PageBanner";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Earth,
  GraduationCap,
  HandCoins,
  Handshake,
  HeartPulse,
  Megaphone,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import MembersForm from "@/components/Members/memebrsform";

const activities = [
  { icon: Megaphone, title: "Advocate for Teachers’ Rights and Freedoms" },
  { icon: HandCoins, title: "Collective Bargaining for Salaries and Working Conditions" },
  { icon: GraduationCap, title: "Professional Development and Training for Members" },
  { icon: Scale, title: "Legal Representation and Protection for Members" },
  { icon: HeartPulse, title: "Welfare Programs, Including Health Insurance Support" },
  { icon: BookOpen, title: "Research and Publications on Education Matters" },
  { icon: Users, title: "Educational Awareness Campaigns and Forums for Social Integration" },
  { icon: Earth, title: "Environmental Conservation Awareness" },
  { icon: Handshake, title: "International Cooperation with Teachers’ Unions Worldwide" },
];

const eligibleMembers = [
  "Teachers in public primary and secondary schools",
  "Teachers in private primary and secondary schools",
  "Institute and college teachers",
  "Retired teachers",
];

const benefits = [
  {
    icon: Megaphone,
    title: "Advocacy & Voice",
    description: "Be part of a collective voice that influences education policy at all levels of government.",
  },
  {
    icon: ShieldCheck,
    title: "Legal Protection",
    description: "Comprehensive legal support for professional matters, including wrongful termination and workplace disputes.",
  },
  {
    icon: HandCoins,
    title: "Collective Bargaining",
    description: "SONUT negotiates better salaries, allowances, and working conditions on your behalf.",
  },
  {
    icon: GraduationCap,
    title: "Training Program",
    description: "Continuous professional development opportunities through workshops, seminars, and conferences.",
  },
  {
    icon: HeartPulse,
    title: "Health Insurance",
    description: "Access to affordable healthcare plans and medical support for members and their families.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Financial Support",
    description: "Access to loans, grants, and emergency assistance during difficult times.",
  },
];

export const metadata = {
  title: "Activities | SONUT",
  description: "Discover SONUT activities, membership eligibility, and benefits for teachers across Somalia.",
};

export default function ActivityPage() {
  return (
    <main>
      <WhatWeDoPageBanner
        title="Our Activities"
        description="To achieve its objectives and aspirations, SONUT has planned to undertake the following activities."
      />

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">What We Undertake</span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">Activities That Advance Our Mission</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <article key={activity.title} className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <span className="absolute right-5 top-2 text-6xl font-black text-primary/5">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                  <activity.icon className="h-6 w-6" />
                </div>
                <h3 className="relative text-lg font-bold leading-snug text-primary">{activity.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">Membership Eligibility</span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">Who Can Join?</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              SONUT welcomes teachers from across the education sector who want to strengthen their profession and collective voice.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">
            <ul className="space-y-5">
              {eligibleMembers.map((member) => (
                <li key={member} className="flex items-center gap-4 font-medium text-gray-700">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-secondary" />
                  {member}
                </li>
              ))}
            </ul>
            <Link href="/join#register" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
              Join SONUT <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">Why Join Us</span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">Membership Benefits</h2>
            <p className="mt-5 text-muted-foreground">Join over 25,000 teachers who are already benefiting from SONUT membership.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="group rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <MembersForm />
    </main>
  );
}
