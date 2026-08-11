"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardList,
  DollarSign,
  IdCard,
  Users,
  ShieldCheck,
} from "lucide-react";

const requirements = [
  {
    icon: BookOpen,
    title: "Active Educator",
    description: "You must be an active teacher working in an official educational institution.",
    color: "bg-[#1E0D79]",
    light: "bg-[#1E0D79]/10",
    textColor: "text-[#1E0D79]",
  },
  {
    icon: ClipboardList,
    title: "Complete Application",
    description: "You must complete the membership application form fully and accurately.",
    color: "bg-[#F4313F]",
    light: "bg-[#F4313F]/10",
    textColor: "text-[#F4313F]",
  },
  {
    icon: DollarSign,
    title: "Monthly Membership Fee",
    description: "You must pay a monthly membership fee of $3.",
    color: "bg-emerald-600",
    light: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    icon: IdCard,
    title: "Annual ID Card Fee",
    description: "You must pay an annual ID Card issuance fee of $5.",
    color: "bg-amber-600",
    light: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    icon: Users,
    title: "Active Participation",
    description: "You must be willing to participate in Union meetings, trainings, and activities.",
    color: "bg-sky-600",
    light: "bg-sky-50",
    textColor: "text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Constitution & Values",
    description: "You must respect and adhere to the Union's Constitution and values.",
    color: "bg-purple-600",
    light: "bg-purple-50",
    textColor: "text-purple-600",
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
            Requirements for Membership
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base"
          >
            Please review the requirements below to verify your eligibility before proceeding to the registration form.
          </motion.p>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requirements.map((req, index) => {
            const Icon = req.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${req.light} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`w-7 h-7 ${req.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {req.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {req.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
