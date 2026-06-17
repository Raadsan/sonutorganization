"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

export default function About() {
  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Images (Fade In Left) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeLeft}
            className="relative sticky top-24"
          >
            {/* Main large image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto md:mx-0">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop" 
                alt="Main About Image" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlapping small image */}
            <div className="absolute -bottom-8 -right-8 w-2/3 max-w-[300px] rounded-2xl overflow-hidden border-[8px] border-white shadow-xl aspect-[4/3] hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" 
                alt="Secondary About Image" 
                className="w-full h-full object-cover"
              />
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
              WHO WE ARE
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-6 leading-[1.15]">
              Empowering Teachers, <br className="hidden md:block" /> Strengthening Education
            </h2>

            {/* Paragraph */}
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              <strong className="text-foreground">Somali National Union of Teachers (SONUT)</strong> is a national teachers’ organization established in 2004 to unite, support, and advocate for educators across Somalia. SONUT works to improve the quality of education, protect teachers’ rights, strengthen professional development, and promote a strong, unified voice for teachers at both national and international levels.
            </p>

            {/* Two Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col gap-3 bg-gray-50/80 border border-gray-100 p-5 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-primary">Teacher Advocacy</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Defending teachers’ rights, welfare, and professional interests.
                </p>
              </div>
              <div className="flex flex-col gap-3 bg-gray-50/80 border border-gray-100 p-5 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-primary">Professional Development</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Providing training, capacity building, and educational support.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <ul className="space-y-4 mb-10">
              {[
                "Established in 2004 and serving teachers across Somalia.",
                "Represents educators from primary, secondary, technical, and teacher training institutions.",
                "Promotes quality education, teacher welfare, and educational development nationwide.",
                "Builds partnerships with government institutions, communities, and international organizations."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-secondary/20 p-1 shrink-0">
                    <Check className="w-3.5 h-3.5 text-secondary" strokeWidth={3} />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

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
