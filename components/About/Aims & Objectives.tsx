"use client";

import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Gavel,
  GraduationCap,
  HeartHandshake,
  Globe,
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

const objectives = [
  {
    icon: Users,
    title: "Teacher Unity",
    description:
      "To unite teachers across Somalia under one strong, democratic, and representative professional union.",
  },
  {
    icon: BookOpen,
    title: "Quality Education",
    description:
      "To promote and support quality education that is accessible, inclusive, and beneficial to all Somali children.",
  },
  {
    icon: Gavel,
    title: "Teachers' Rights",
    description:
      "To advocate for and protect the professional, economic, and social rights of teachers nationwide.",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    description:
      "To provide training, capacity building, and continuous learning opportunities that enhance teaching standards.",
  },
  {
    icon: HeartHandshake,
    title: "Teacher Welfare",
    description:
      "To improve the social and economic well-being of members through welfare initiatives and support programs.",
  },
  {
    icon: Globe,
    title: "Partnerships & Advocacy",
    description:
      "To build strong national and international partnerships that advance education and strengthen teachers' voices.",
  },
];

export default function AimsAndObjectives() {
  return (
    <section className="py-24 bg-white overflow-hidden">
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
            WHAT WE AIM TO ACHIEVE
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            Our Strategic Objectives
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Our goals are focused on strengthening the teaching profession and improving education outcomes across Somalia.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {objectives.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-6 transition-all duration-500 shadow-sm">
                <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
