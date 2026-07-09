"use client";

import { motion } from "framer-motion";
import {
  Shield,
  BookOpen,
  Users,
  Scale,
  HeartHandshake,
  Award,
} from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Legal Protection",
    description:
      "Access expert legal advice and representation if you face workplace disputes, disciplinary proceedings, or professional challenges.",
    color: "bg-[#1E0D79]",
    light: "bg-[#1E0D79]/10",
    textColor: "text-[#1E0D79]",
  },
  {
    icon: BookOpen,
    title: "Professional Development",
    description:
      "Take advantage of free and subsidised training courses, workshops, and conferences designed to advance your teaching career.",
    color: "bg-[#F4313F]",
    light: "bg-[#F4313F]/10",
    textColor: "text-[#F4313F]",
  },
  {
    icon: Users,
    title: "Strong Community",
    description:
      "Connect and collaborate with thousands of educators nationwide. Share knowledge, experiences, and best practices.",
    color: "bg-emerald-600",
    light: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    icon: Scale,
    title: "Collective Bargaining",
    description:
      "Benefit from union negotiations that secure better pay, working conditions, and job security for all members.",
    color: "bg-amber-600",
    light: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    icon: HeartHandshake,
    title: "Welfare Support",
    description:
      "Access financial assistance, health programmes, and personal support services when you need them most.",
    color: "bg-sky-600",
    light: "bg-sky-50",
    textColor: "text-sky-600",
  },
  {
    icon: Award,
    title: "National Recognition",
    description:
      "Be part of an internationally recognised union that advocates for your rights on the national and global stage.",
    color: "bg-purple-600",
    light: "bg-purple-50",
    textColor: "text-purple-600",
  },
];

export default function MembershipBenefits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E0D79]/10 text-[#1E0D79] text-xs font-bold tracking-widest uppercase mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#1E0D79] animate-pulse" />
            WHY JOIN US
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1E0D79] mb-4 font-serif"
          >
            Membership Benefits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            As a SONUT member, you gain access to a comprehensive package of
            support, resources, and representation designed to protect and
            advance your career.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
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
                  className={`w-14 h-14 rounded-2xl ${benefit.light} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`w-7 h-7 ${benefit.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
