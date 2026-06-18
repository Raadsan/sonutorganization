"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const data = [
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become Africa’s leading teachers’ union, internationally recognized for excellence in advocacy, continuous professional development, and strong member welfare.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To promote unity and sustained progress among all teachers in Somalia, elevating the teaching profession through stronger education quality and improved conditions of service.",
  },
];

export default function VissionAndMission() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInDown}
              className="group relative bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-primary flex items-center justify-center mb-6 transition-all duration-500 shadow-sm">
                <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
