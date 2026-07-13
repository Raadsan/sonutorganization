"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type HeroProps = {
  videoId?: string;
};

const DEFAULT_VIDEO_ID = "DlzdhLqHE2U";

function extractVideoId(raw?: string) {
  if (!raw) return DEFAULT_VIDEO_ID;

  try {
    const url = new URL(raw);
    if (!url.hostname.includes("youtu")) return raw;

    if (url.searchParams.has("v")) {
      return url.searchParams.get("v") ?? DEFAULT_VIDEO_ID;
    }

    const segments = url.pathname.split("/").filter(Boolean);
    return segments.pop() ?? DEFAULT_VIDEO_ID;
  } catch {
    return raw;
  }
}

export default function Hero({ videoId }: HeroProps) {
  const embedId = extractVideoId(videoId);
  const src = `https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&modestbranding=1&rel=0&playlist=${embedId}`;
  // Kala dambaynta animation-ka mid mid u soo galaya (Fade In Left)
  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: custom,
      },
    }),
  };

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-black text-white md:min-h-[680px] lg:min-h-[760px]">
      {/* ================= VIDEO BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <iframe
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          src={src}
          title="SONUT background video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.77vh",
          }}
        />

        {/* Overlays (waa la yareeyay madoobaha si muuqaalka u muuqdo) */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-12">

        {/* Badge - Fade In Left */}
        <motion.p
          variants={fadeLeftVariant}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md"
        >
          WELCOME TO SONUT
        </motion.p>

        {/* Heading - Dhamaan waa Cadaaan + Fade In Left */}
        <motion.h1
          variants={fadeLeftVariant}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="max-w-4xl text-4xl font-extrabold leading-[1.15] md:text-6xl lg:text-7xl tracking-wide text-white"
        >
          <span className="block mb-2">Empowering Teachers,</span>
          <span className="block opacity-95">Strengthening Education</span>
        </motion.h1>

        {/* ================= CTA BUTTONS ================= */}
        <motion.div
          variants={fadeLeftVariant}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/join"
            className="rounded-full bg-[#F4313F] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F4313F]/30 transition-all duration-300 hover:scale-105 hover:bg-[#F4313F]/90 hover:shadow-xl"
          >
            Join SONUT
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            About Sonut
          </Link>

          {/* <Link
            href="/contact"
            className="rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            Contact Us
          </Link> */}
        </motion.div>
      </div>

      {/* ================= BOTTOM FADE ================= */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}