import WhatWeDoPageBanner from "@/components/WhatWeDo/PageBanner";
import {
  BookOpen,
  Earth,
  GraduationCap,
  HandCoins,
  Handshake,
  HeartPulse,
  Megaphone,
  Scale,
  Users,
} from "lucide-react";

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
    </main>
  );
}
