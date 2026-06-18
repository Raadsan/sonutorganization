"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const timelineData = [
  {
    year: "2004",
    title: "Foundation of SONUT",
    description:
      "Somali National Union of Teachers (SONUT) was established to unite and represent teachers across Somalia.",
  },
  {
    year: "2008",
    title: "First National Conference",
    description:
      "SONUT held its first national conference, bringing together educators from all regions to shape the union's vision and strategy.",
  },
  {
    year: "2012",
    title: "International Recognition",
    description:
      "SONUT gained affiliation with Education International, strengthening its global partnerships and advocacy reach.",
  },
  {
    year: "2016",
    title: "Policy Advocacy Milestone",
    description:
      "Successfully advocated for key education policy reforms, including better working conditions and salary improvements for teachers.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Launched digital training programs for teachers, adapting to modern educational challenges and expanding reach to remote areas.",
  },
  {
    year: "2024",
    title: "20 Years of Service",
    description:
      "Celebrated two decades of dedicated service to Somali teachers and students, reaffirming commitment to quality education for all.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

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
            OUR HISTORY
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            The Journey So Far
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            From our founding in 2004 to today, SONUT has been at the forefront
            of advocating for teachers and transforming education in Somalia.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-px" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative space-y-12"
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />

                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md -translate-x-1.5 md:-translate-x-2 mt-2 z-10" />

                <div className="md:w-1/2 pl-14 md:pl-0 md:px-8">
                  <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
                        <Calendar className="w-4 h-4" />
                        {item.year}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
