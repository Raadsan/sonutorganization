"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2004",
    title: "Foundation of SONUT",
    description:
      "SONUT was established by education professionals and school leaders from different regions of Somalia to unite and support teachers nationwide.",
  },
  {
    year: "2008",
    title: "National Expansion",
    description:
      "The union expanded its membership and strengthened teacher representation across multiple regions of Somalia.",
  },
  {
    year: "2012",
    title: "Educational Advocacy",
    description:
      "SONUT intensified its efforts in advocating for teachers’ rights, welfare, and improved educational policies.",
  },
  {
    year: "2016",
    title: "Capacity Building Programs",
    description:
      "Launched training and professional development initiatives aimed at improving teaching quality and leadership skills.",
  },
  {
    year: "2020",
    title: "Strategic Development",
    description:
      "Introduced organizational reforms and strategic planning frameworks to enhance effectiveness and sustainability.",
  },
  {
    year: "2024",
    title: "20 Years of Service",
    description:
      "Celebrating two decades of commitment to empowering teachers and strengthening education throughout Somalia.",
  },
];

export default function OurHistory() {
  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            THE JOURNEY SO FAR
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            Our History
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2" />

          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-between mb-12 md:mb-16 ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              } flex-row`}
            >
              {/* Spacer for desktop layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-[#fafafa] transform -translate-x-1/2 z-10"
              />

              {/* Content card */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-12 md:ml-0 ${
                  index % 2 === 0 ? "md:pl-8" : "md:pr-8 text-left md:text-right"
                }`}
              >
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className={`text-primary font-black text-2xl md:text-3xl mb-2 ${index % 2 !== 0 && "md:text-right"}`}>
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
