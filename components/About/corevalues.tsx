"use client";

import { motion } from "framer-motion";
import {
  Handshake,
  ShieldCheck,
  ClipboardCheck,
  Search,
  Scale,
  Star,
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
    icon: Handshake,
    title: "Unity",
    description:
      "We unite teachers across Somalia, fostering solidarity and a collective voice to strengthen the teaching profession.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We uphold the highest ethical standards in all our actions, ensuring transparency and honesty in serving our members.",
  },
  {
    icon: ClipboardCheck,
    title: "Accountability",
    description:
      "We take responsibility for our commitments and actions, ensuring that our work delivers real impact for teachers and students.",
  },
  {
    icon: Search,
    title: "Transparency",
    description:
      "We operate openly, keeping our members informed and engaged in every step of our advocacy and decision-making.",
  },
  {
    icon: Scale,
    title: "Equity",
    description:
      "We champion equal opportunities for all educators and students, working to eliminate disparities in education across Somalia.",
  },
  {
    icon: Star,
    title: "Excellence",
    description:
      "We strive for the highest standards in teacher professional development and quality education delivery nationwide.",
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
            take in serving Somali teachers and students.
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
