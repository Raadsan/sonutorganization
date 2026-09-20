"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface MembershipBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function MembershipBanner({
  title,
  subtitle,
  badge = "SONUT Membership",
}: MembershipBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#1E0D79] py-16 md:py-24 text-white">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#F4313F]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-white/90 backdrop-blur-sm border border-white/15 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#F4313F] animate-pulse" />
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed mb-6 font-normal">
              {subtitle}
            </p>
          )}

          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-white transition-colors duration-200"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link
              href="/membership"
              className="hover:text-white transition-colors duration-200"
            >
              Membership
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white font-semibold">{title}</span>
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
