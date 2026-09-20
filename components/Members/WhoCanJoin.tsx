"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  School,
  Building2,
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const eligibleGroups = [
  {
    icon: School,
    badge: "Primary & Secondary",
    title: "All teachers in public primary and secondary schools",
    description:
      "All certified educators serving in government-supported primary, intermediate, and secondary schools across all federal member states of Somalia.",
    iconGradient: "from-[#1E0D79] to-[#3418ba]",
    shadowColor: "shadow-[#1E0D79]/20",
    statusText: "Eligible for Full Membership",
  },
  {
    icon: Building2,
    badge: "Private & Community",
    title: "All teachers in private primary and secondary schools",
    description:
      "Educators working in recognized private academies, community-owned schools, and international curriculum institutions across the country.",
    iconGradient: "from-[#F4313F] to-[#e62534]",
    shadowColor: "shadow-[#F4313F]/20",
    statusText: "Eligible for Full Membership",
  },
  {
    icon: GraduationCap,
    badge: "Higher Ed & TVET",
    title: "Institute and college teachers",
    description:
      "Lecturers, trainers, and instructional faculty at universities, teacher training colleges, and vocational technical institutes.",
    iconGradient: "from-violet-600 to-indigo-700",
    shadowColor: "shadow-violet-600/20",
    statusText: "Eligible for Full Membership",
  },
  {
    icon: Award,
    badge: "Senior & Honorary",
    title: "Retired teachers",
    description:
      "Former educators who have concluded their active classroom service and wish to retain union solidarity, mentorship roles, and member welfare support.",
    iconGradient: "from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/20",
    statusText: "Eligible for Senior Membership",
  },
];

export default function WhoCanJoin({
  registerHref = "/join",
}: {
  registerHref?: string;
}) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 overflow-hidden">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#1E0D79]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-[#F4313F]/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E0D79]/10 text-[#1E0D79] text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            ELIGIBILITY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E0D79] font-serif mb-4 tracking-tight"
          >
            Who Can Join?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Membership in SONUT is open to all qualified teachers, academic
            staff, and education management professionals across Somalia.
          </motion.p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {eligibleGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 sm:p-9 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_35px_-8px_rgba(30,13,121,0.12)] hover:border-[#1E0D79]/20 transition-all duration-300"
              >
                <div>
                  {/* Top row: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.iconGradient} text-white flex items-center justify-center shadow-lg ${group.shadowColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                      {group.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1E0D79] transition-colors leading-snug font-serif">
                    {group.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {group.description}
                  </p>
                </div>

                {/* Bottom Status Tag */}
                <div className="pt-5 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {group.statusText}
                  </span>
                  <span className="text-gray-400 group-hover:text-[#F4313F] transition-colors flex items-center gap-1 font-medium">
                    Apply <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 rounded-3xl bg-gradient-to-br from-[#1E0D79] via-[#1E0D79] to-[#2b149c] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Subtle glow */}
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[#F4313F]/25 blur-2xl" />

          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Membership
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif mb-2 text-white">
              Ready to Become a SONUT Member?
            </h3>
            <p className="text-white/80 text-sm sm:text-base max-w-xl">
              Join thousands of fellow teachers across Somalia today and receive your official national teacher credential.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={registerHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#F4313F] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F4313F]/30 hover:bg-[#d92936] transition-all hover:scale-105"
            >
              Apply Online Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contactus"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3.5 text-sm font-bold text-white border border-white/20 hover:bg-white/20 transition-all text-xs sm:text-sm"
            >
              Need Help?
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
