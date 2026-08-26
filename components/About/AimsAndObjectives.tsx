"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Scale,
  Handshake,
  BookOpen,
  Globe,
  Users,
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

const aimsData = [
  {
    icon: Handshake,
    title: "Unity & Progress",
    description:
      "To promote unity and progress among all teachers in Somalia.",
  },
  {
    icon: Users,
    title: "Teamwork & Cooperation",
    description:
      "To encourage teamwork and friendly cooperation between teachers and other workers.",
  },
  {
    icon: GraduationCap,
    title: "Quality & Conditions",
    description:
      "To improve the teaching profession by raising the quality of education and improving teachers' working conditions.",
  },
  {
    icon: Scale,
    title: "Advocacy & Reform",
    description:
      "To support education and the teaching profession across the country, and work to remove problems, abuses, unfair practices, and outdated rules that hinder progress.",
  },
  {
    icon: Globe,
    title: "Welfare & Well-being",
    description:
      "To improve the social and economic well-being of union members and create welfare funds to support them.",
  },
  {
    icon: BookOpen,
    title: "Collaboration",
    description:
      "To provide a meeting place for teachers to work together and promote their welfare, as well as the interests of education.",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            AIMS & OBJECTIVES
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            What We Aim to Achieve
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Our strategic goals that guide our efforts in transforming education
            and empowering teachers across Somalia.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {aimsData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/5 group-hover:bg-secondary flex items-center justify-center mb-5 transition-all duration-500 shadow-sm">
                <item.icon className="w-6 h-6 text-secondary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
