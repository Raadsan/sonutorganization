"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, GraduationCap, Users, Building2 } from "lucide-react";

function Counter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let frame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);

      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: "Years of Excellence", end: 15, suffix: "+", icon: Calendar },
  { label: "Students Empowered", end: 5000, suffix: "+", icon: GraduationCap },
  { label: "Qualified Teachers", end: 200, suffix: "+", icon: Users },
  { label: "Partner Schools", end: 50, suffix: "+", icon: Building2 },
];

export default function Statics() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.15em] font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
