"use client";

import { motion } from "framer-motion";
import {
  Handshake,
  ShieldCheck,
  ClipboardCheck,
  Scale,
  Lightbulb,
  Heart,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const coreValues = [
  {
    icon: Scale,
    title: "Equity & Inclusion",
    description:
      "We champion equal access to quality education for all—regardless of gender, geography, ability, or background. Our programs prioritize marginalized communities and promote inclusive teaching practices.",
  },
  {
    icon: ShieldCheck,
    title: "Professionalism & Integrity",
    description:
      "We uphold the highest standards of ethical conduct, transparency, and accountability in all our operations. Our members are committed to lifelong learning and responsible leadership.",
  },
  {
    icon: Handshake,
    title: "Solidarity & Unity",
    description:
      "We believe in the collective strength of teachers. SONUT fosters collaboration, mutual support, and a unified voice to advocate for educators’ rights and well-being.",
  },
  {
    icon: Lightbulb,
    title: "Resilience & Innovation",
    description:
      "In the face of crisis and change, we adapt, innovate, and persevere. SONUT empowers teachers to be agents of transformation in their classrooms and communities.",
  },
  {
    icon: Heart,
    title: "Cultural Respect & Local Ownership",
    description:
      "We honor Somalia’s diverse cultural heritage and promote locally led solutions. SONUT’s work is rooted in community engagement and contextual relevance.",
  },
  {
    icon: ClipboardCheck,
    title: "Accountability & Good Governance",
    description:
      "We ensure transparent decision-making, responsible leadership, and ethical management in all our activities and partnerships, building trust and credibility across the education sector.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            OUR CORE VALUES
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            What Guides Us
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            The principles that drive every decision we make and every action we
            take in serving teachers and strengthening education across Somalia.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-primary flex items-center justify-center mb-5 transition-all duration-500 shadow-sm">
                <value.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-500">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
