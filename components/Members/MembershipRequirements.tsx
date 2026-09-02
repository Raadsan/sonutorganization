"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardList,
  DollarSign,
  IdCard,
  Users,
  ShieldCheck,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";

const requirements = [
  {
    icon: BookOpen,
    title: "Recognized Educator",
    description:
      "Be an educator employed by a recognized school, college, university, or vocational training institution.",
    light: "bg-[#1E0D79]/10",
    textColor: "text-[#1E0D79]",
  },
  {
    icon: ClipboardList,
    title: "Complete Application",
    description:
      "Complete and submit the official membership application form accurately and in full with all details.",
    light: "bg-[#F4313F]/10",
    textColor: "text-[#F4313F]",
  },
  {
    icon: DollarSign,
    title: "Monthly Membership Fee",
    description:
      "Pay the regular monthly union membership contribution fee of USD $3 on a timely basis.",
    light: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    icon: IdCard,
    title: "Annual ID Card Fee",
    description:
      "Pay the annual Membership ID Card fee of USD $5 for the official issuance or renewal.",
    light: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    icon: Users,
    title: "Active Participation",
    description:
      "Actively participate in union assemblies, professional training programs, workshops, and events.",
    light: "bg-sky-50",
    textColor: "text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Constitution & Rules",
    description:
      "Comply with and uphold the official Constitution, Bylaws, organizational policies, and union rules.",
    light: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    icon: BadgeCheck,
    title: "Values & Code of Conduct",
    description:
      "Uphold professional teaching ethics, union integrity, and the established educator Code of Conduct.",
    light: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    icon: HeartHandshake,
    title: "Support the Union",
    description:
      "Support the mission, vision, and advocacy of the union to advance the dignity of all teachers.",
    light: "bg-rose-50",
    textColor: "text-rose-600",
  },
];

export default function MembershipRequirements() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4313F]/10 text-[#F4313F] text-xs font-bold tracking-widest uppercase mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#F4313F] animate-pulse" />
            CRITERIA
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1E0D79] mb-4 font-serif"
          >
            Membership Requirements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base"
          >
            Please review the requirements below to verify your eligibility for SONUT membership.
          </motion.p>
        </div>

        {/* Two balanced rows of four requirements */}
        <div className="space-y-6">
          {[requirements.slice(0, 4), requirements.slice(4, 8)].map(
            (row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {row.map((req, cardIndex) => {
                  const Icon = req.icon;
                  const animationIndex = rowIndex * 4 + cardIndex;

                  return (
                    <motion.div
                      key={req.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: animationIndex * 0.08,
                      }}
                      whileHover={{ y: -6 }}
                      className="group flex flex-col justify-between h-full min-h-[290px] rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
                    >
                      <div>
                        <div
                          className={`w-14 h-14 rounded-2xl ${req.light} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className={`w-7 h-7 ${req.textColor}`} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 min-h-[3.25rem] flex items-start">
                          {req.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {req.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
