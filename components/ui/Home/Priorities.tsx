"use client";

import { motion } from "framer-motion";

const prioritiesData = [
  {
    id: "01",
    title: "Quality Education for All",
    description: "Ensuring every Somali child has access to free, quality basic education regardless of geography or socioeconomic status."
  },
  {
    id: "02",
    title: "The Teaching Profession",
    description: "Raising the status of teaching through improved conditions of service, professional development, and career progression pathways in Somalia."
  },
  {
    id: "03",
    title: "Rights & Democracy",
    description: "Defending academic freedom, union rights, and democratic governance in education policy-making."
  },
  {
    id: "04",
    title: "Building Union Power",
    description: "Strengthening SONUT structures from the national level down to every regional branch across all districts in Somalia."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

export default function Priorities() {
  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
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

        {/* Priorities Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {prioritiesData.map((item, index) => (
            <motion.div 
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 relative group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100/50"
            >
              {/* Background Big Number */}
              <div className="absolute -right-4 -top-8 text-[120px] font-black text-gray-50 group-hover:text-secondary/5 transition-colors duration-500 pointer-events-none select-none z-0">
                {item.id}
              </div>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Number Badge */}
                <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-2xl font-bold text-primary mb-6 transition-all duration-300 shadow-sm">
                  {item.id}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">
                  {item.description}
                </p>
                
                <div className="mt-auto pt-8">
                  <div className="w-8 h-1 bg-secondary/20 group-hover:w-full group-hover:bg-secondary transition-all duration-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
