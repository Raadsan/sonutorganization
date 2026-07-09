"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const reasons = [
  {
    title: "Proven Track Record",
    description:
      "SONUT has been at the forefront of teachers' rights advocacy in Somalia for years, achieving real improvements in pay and conditions.",
  },
  {
    title: "Democratic & Transparent",
    description:
      "Every member has a voice. Our leadership is elected by members and all decisions are made transparently on behalf of the whole union.",
  },
  {
    title: "Nationwide Network",
    description:
      "With branches in every region, SONUT ensures that teachers from Banaadir to Puntland have access to the same quality of support.",
  },
  {
    title: "International Affiliations",
    description:
      "We are affiliated with global education bodies, giving our members access to international resources, training, and solidarity.",
  },
  {
    title: "Responsive to Members",
    description:
      "Our team responds quickly to members' concerns, providing timely advice and support whenever you face a professional challenge.",
  },
  {
    title: "Affordable Membership",
    description:
      "Our subscription fees are kept affordable so that every teacher in Somalia can benefit from full union membership.",
  },
];

export default function ReasonsToJoin() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4313F]/10 text-[#F4313F] text-xs font-bold tracking-widest uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-[#F4313F] animate-pulse" />
              OUR COMMITMENT
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E0D79] mb-6 leading-tight font-serif">
              Reasons to Join <br />
              <span className="text-[#F4313F]">SONUT</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Thousands of Somali educators have already chosen SONUT. Here is
              why teachers across the country trust us to fight for their
              interests.
            </p>

            <a
              href="#register"
              className="group inline-flex items-center gap-2 rounded-full bg-[#1E0D79] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1E0D79]/30 transition-all duration-300 hover:bg-[#1E0D79]/90 hover:scale-105"
            >
              Become a Member
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right: Reasons list */}
          <div className="space-y-5">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mt-0.5 shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#1E0D79]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
