"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const aboutImages = [
  "/images/Sonut imges -04.jpg",
  "/images/Sonut imges -06.jpg",
  "/images/Sonut imges -05.jpg",
  "/images/Sonut imges -07.jpg",
];

export default function About() {
  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % aboutImages.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Images */}
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

          {/* Right Column - Content */}
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
            {/* <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-6 leading-[1.15]">
              Somali National Union of Teachers
            </h2> */}

            {/* Updated Description */}
            <div className="text-muted-foreground text-sm md:text-base leading-relaxed space-y-5 mb-8 text-justify">

              <p>
                <strong>Somali National Union of Teachers (SONUT)</strong> is a service organization that is concerned with ensuring better conditions of service for its members who are drawn from pre-tertiary levels of the educational system, that is from public and private primary, secondary schools, teacher training colleges, technical institutes and offices of educational administration units.
              </p>

              <p>
                SONUT formerly SNUT was established in November 21st 2004 by a group of head teachers from seven different regions across Somalia. It has been set to relive the hopes and support teachers in our effort to transform the lives of our pupils/students at all levels of education.
              </p>

              <p>
                SONUT is committed to provide programs answering to teacher's basic needs that are relevant on the current situation. It is open to all teachers no matter which race or location the individual belongs.
              </p>

              <p>
                At the moment SONUT is in the process of developing an educational policy to guide regional scholastic process as it embarks on the path of reconstruction and educational development Current membership is about 490 schools and 27,200 membership teachers.
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
