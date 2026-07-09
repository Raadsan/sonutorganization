"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop" 
          alt="Teachers and students" 
          className="w-full h-full object-cover"
        />
        {/* Dark Blue Overlay to make text readable and keep brand identity */}
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            JOIN OUR MOVEMENT
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white mb-6 leading-tight">
            Ready to Shape the Future of <br className="hidden md:block" /> Education in Somalia?
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Join thousands of educators across the nation. Together we advocate for teachers' rights, improve educational standards, and build a brighter tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/join" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-base font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-300 hover:bg-secondary/90 hover:scale-105 hover:shadow-xl hover:shadow-secondary/40 group"
            >
              Become a Member
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white hover:text-primary hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
