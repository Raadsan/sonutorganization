"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const eligibleGroups = [
  "All teachers in public primary schools",
  "All teachers in public secondary schools",
  "Teachers in approved private schools",
  "Education officers in ministries and agencies",
  "Lecturers in universities and colleges",
  "Retired teachers (associate membership)",
];

export default function WhoCanJoin() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Who Can Join */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 font-serif">
              Who Can Join?
            </h2>
            <ul className="space-y-4">
              {eligibleGroups.map((group, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1E0D79] shrink-0" />
                  <span className="text-sm font-medium">{group}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Ready to Join card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#fafafa] rounded-2xl border border-gray-200 p-8 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Ready to Join?
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Membership is open to all qualified teachers and education
              professionals in Somalia. Scroll down to fill in the registration
              form and join thousands of educators today.
            </p>

            <div className="space-y-4">
              <a
                href="#register"
                className="group w-full flex items-center justify-center gap-2 rounded-xl bg-[#F4313F] text-white font-bold text-sm py-4 px-6 shadow-lg shadow-[#F4313F]/20 transition-all duration-300 hover:bg-[#F4313F]/90 hover:scale-[1.02]"
              >
                REGISTER ONLINE NOW →
              </a>
              <a
                href="mailto:info@sonut.org"
                className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-[#1E0D79] text-[#1E0D79] font-bold text-sm py-4 px-6 transition-all duration-300 hover:bg-[#1E0D79] hover:text-white"
              >
                CONTACT US BY EMAIL
              </a>
            </div>

            {/* Note */}
            <p className="mt-6 text-xs text-muted-foreground text-center">
              For any queries about eligibility, contact your nearest SONUT
              regional office.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
