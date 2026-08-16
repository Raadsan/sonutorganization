"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const prioritiesData = [
  {
    id: "01",
    title: "Teachers’ Rights & Dignity",
    description: "We stand for the rights, dignity, welfare, and professional recognition of every teacher."
  },
  {
    id: "02",
    title: "Quality Education for Every Child",
    description: "We believe every Somali child deserves access to safe, inclusive, equitable, and quality education."
  },
  {
    id: "03",
    title: "Professional Teachers",
    description: "We promote continuous professional development, teacher training, ethical standards, and career advancement."
  },
  {
    id: "04",
    title: "Fair Working Conditions",
    description: "We advocate for fair salaries, safe workplaces, reasonable workloads, job security, and social protection for teachers."
  },
  {
    id: "05",
    title: "Teacher Voice & Representation",
    description: "We ensure teachers have a strong and meaningful voice in education policies, reforms, and decision-making."
  },
  {
    id: "06",
    title: "Unity & Solidarity",
    description: "We bring Somali teachers together across regions and institutions to build a united and respected teaching profession."
  },
  {
    id: "07",
    title: "Education Reform & Innovation",
    description: "We support evidence-based reforms, technology, innovation, and modern approaches that improve teaching and learning."
  },
  {
    id: "08",
    title: "Equality, Inclusion & Non-Discrimination",
    description: "We stand for equal opportunities for teachers and learners, regardless of gender, location, background, or circumstance."
  },
  {
    id: "09",
    title: "Integrity & Accountability",
    description: "We promote transparency, professionalism, ethical leadership, and accountability within the education sector."
  },
  {
    id: "10",
    title: "Partnership for National Development",
    description: "We work with government, education institutions, civil society, development partners, and other stakeholders to strengthen Somalia’s education system."
  }
];

export default function Priorities() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = prioritiesData.length - visibleCount;

  // Clamps currentIndex if layout shifts
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex >= 0 ? maxIndex : 0);
    }
  }, [visibleCount, currentIndex, maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused) {
      console.log("[Priorities Slider] Auto-slide PAUSED");
      return;
    }
    console.log("[Priorities Slider] Auto-slide ACTIVE");
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  // Swipe gesture support for mobile touch screens
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX; // initialize
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
    // Resume auto-slide after touch interaction ends
    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      {/* Background Decorative Curves */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-primary/5 rounded-b-[100px] pointer-events-none -translate-y-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            OUR PRIORITIES
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            What We Stand For
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            The fundamental pillars that guide our mission, advocacy, and dedication to educators and students across the nation.
          </p>
        </motion.div>

        {/* Carousel / Slider Container */}
        <div 
          className="relative px-2 md:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Navigation Arrows (Desktop) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary hidden md:flex cursor-pointer"
            aria-label="Previous priority"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary hidden md:flex cursor-pointer"
            aria-label="Next priority"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Window */}
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-out items-stretch"
              style={{
                transform: `translateX(-${currentIndex * (100 / prioritiesData.length)}%)`,
                width: `${(prioritiesData.length / visibleCount) * 100}%`
              }}
            >
              {prioritiesData.map((item) => (
                <div 
                  key={item.id} 
                  className="px-4 flex-shrink-0 flex items-stretch"
                  style={{ width: `${100 / prioritiesData.length}%` }}
                >
                  <div className="bg-white rounded-3xl p-8 relative group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100/50 flex flex-col justify-between w-full min-h-[320px] hover:-translate-y-2 cursor-pointer">
                    {/* Background Big Number */}
                    <div className="absolute -right-4 -top-8 text-[120px] font-black text-gray-50 group-hover:text-secondary/5 transition-colors duration-500 pointer-events-none select-none z-0">
                      {item.id}
                    </div>

                    {/* Top Accent Gradient Line */}
                    <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        {/* Number Badge */}
                        <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-2xl font-bold text-primary mb-6 transition-all duration-300 shadow-sm">
                          {item.id}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="w-8 h-1 bg-secondary/20 group-hover:w-full group-hover:bg-secondary transition-all duration-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls (Mobile) */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary active:bg-primary active:text-white transition-colors"
              aria-label="Previous priority"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary active:bg-primary active:text-white transition-colors"
              aria-label="Next priority"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index 
                    ? "w-8 bg-secondary" 
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
