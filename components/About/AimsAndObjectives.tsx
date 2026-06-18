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
    icon: GraduationCap,
    title: "Quality Education",
    description:
      "To promote and ensure access to quality education for all Somali children, regardless of their background or location.",
  },
  {
    icon: Scale,
    title: "Teachers' Rights",
    description:
      "To defend and protect the professional, economic, and social rights of teachers across Somalia.",
  },
  {
    icon: Handshake,
    title: "Union Unity",
    description:
      "To strengthen the unity and solidarity of teachers through a strong, democratic, and representative union structure.",
  },
  {
    icon: BookOpen,
    title: "Professional Development",
    description:
      "To provide continuous professional development opportunities that enhance teaching quality and career growth.",
  },
  {
    icon: Globe,
    title: "Global Partnership",
    description:
      "To build partnerships with local and international organizations dedicated to education and teachers' welfare.",
  },
  {
    icon: Users,
    title: "Social Dialogue",
    description:
      "To foster constructive dialogue between teachers, government, and communities for educational reform.",
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
