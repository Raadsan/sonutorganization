"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const eligibleGroups = [
  "1. All teachers in public primary and secondary schools",
  "2. All teachers in private primary and secondary schools",
  "3. Institute and collage teachers",
  "4. Retired teachers",
];

export default function WhoCanJoin({ registerHref = "#register" }: { registerHref?: string }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-serif">
            Who Can Join?
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-12">
            Membership in SONUT is open to all qualified teachers, academic staff, and education management professionals across Somalia.
          </p>

          <ul className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            {eligibleGroups.map((group, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4 text-gray-700 bg-[#fafafa]/80 hover:bg-white p-5 rounded-2xl border border-gray-200/50 hover:border-[#1E0D79]/20 transition-all duration-300 shadow-sm hover:shadow-md cursor-default group"
              >
                <CheckCircle2 className="w-6 h-6 text-[#1E0D79] group-hover:text-[#F4313F] transition-colors shrink-0 mt-0.5" />
                <span className="text-sm font-medium leading-relaxed text-gray-800">{group}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
