"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const aboutImages = [
  "/images/1.jpg",
  "/images/2222.jpg",
  "/images/3.jpg",
  "/images/1 (2).jpg"
];

export default function About() {
  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Images (Fade In Left) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeLeft}
            className="relative"
          >
            {/* Main large image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto md:mx-0 bg-gray-100">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={aboutImages[currentImageIndex]}
                  alt="About SONUT"
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column - Content (Fade In Right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRight}
            className="flex flex-col"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-6 self-start">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              About Us
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-6 leading-[1.15]">
              Somali National Union of Teachers
            </h2>

            {/* Paragraphs */}
            <div className="text-muted-foreground text-sm md:text-base leading-relaxed space-y-5 mb-8 text-justify">
              <p>
                Established on{" "}
                <strong className="text-foreground">November 21st, 2004</strong>{" "}
                by a dedicated group of head teachers from seven different regions across Somalia, the{" "}
                <strong className="text-foreground">Somali National Union of Teachers (SONUT)</strong>{" "}
                is a national service organization committed to securing better working conditions and safeguarding the interests of pre-tertiary educators.
              </p>
              <p>
                SONUT was founded to break ethnic and tribal barriers, uniting teachers from public and private primary and secondary schools, training colleges, technical institutes, and educational offices into one cohesive force. We advocate for safety, fairness, and professional support, ensuring that teachers can work in an atmosphere that brings out their very best.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
              >
                More About Us
                <div className="bg-white/20 rounded-full p-1 ml-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
