"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative py-20 lg:py-28">
      {/* Qurxin fudud oo dhanka geesaha ah (Optional Subtle Accents) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge-ka Sare */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-black text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            JOIN OUR MOVEMENT
          </div>

          {/* Ciwaanka / Heading */}
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary  mb-6 leading-tight">
            Ready to Shape the Future of <br className="hidden md:block" /> Education in Somalia?
          </h2>

          {/* Qoraalka / Paragraph */}
          <p className="text-base md:text-lg text-primary max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of educators across the nation. Together we advocate for teachers' rights, improve educational standards, and build a brighter tomorrow.
          </p>

          {/* Badhamada / Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-secondary/90 hover:scale-105"
            >
              Become a Member
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-white font-bold text-primary  border border-primary bg-primary transition-all duration-300 hover:bg-white hover:text-primary hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}