"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JoinBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a14] py-28 md:py-36 text-white">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#1E0D79]/40 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-[#F4313F]/20 blur-[100px]" />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#F4313F] animate-pulse" />
          Membership
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
        >
          Join{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4313F] to-[#ff6b6b]">
            SONUT
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Become part of Somalia&rsquo;s leading teachers&rsquo; union and help
          shape the future of education across the nation.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#register"
            className="group inline-flex items-center gap-2 rounded-full bg-[#F4313F] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#F4313F]/30 transition-all duration-300 hover:bg-[#F4313F]/90 hover:scale-105"
          >
            Register Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
