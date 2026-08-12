"use client";

import { motion } from "framer-motion";

type PartnerData = {
  id: number;
  name: string;
  logoUrl: string | null;
  website: string | null;
};

const defaultPartners: PartnerData[] = [
  { id: 1, name: "UNICEF Somalia", logoUrl: null, website: null },
  { id: 2, name: "Ministry of Education", logoUrl: null, website: null },
  { id: 3, name: "Save the Children", logoUrl: null, website: null },
  { id: 4, name: "UNESCO", logoUrl: null, website: null },
  { id: 5, name: "World Bank Group", logoUrl: null, website: null },
  { id: 6, name: "USAID", logoUrl: null, website: null },
  { id: 7, name: "Care International", logoUrl: null, website: null },
  { id: 8, name: "Global Partnership", logoUrl: null, website: null }
];

export default function Partners({ initialData }: { initialData?: PartnerData[] }) {
  const displayPartners = initialData && initialData.length > 0 ? initialData : defaultPartners;

  if (displayPartners.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            OUR PARTNERS
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Trusted by the best
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            We collaborate with leading national and international organizations to improve the quality of education and support educators across Somalia.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden group py-4">
        
        {/* Left & Right Fading Edges to make it look smooth */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track (or Flex Container) */}
        <div className="flex items-center justify-center flex-wrap gap-8 w-full max-w-5xl mx-auto">
           {displayPartners.map((partner, idx) => (
             <div 
                key={partner.id} 
                className="flex-shrink-0 w-56 h-24 mx-6 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:shadow-lg hover:border-primary/20 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden p-2"
                onClick={() => partner.website && window.open(partner.website, '_blank')}
              >
                {partner.logoUrl ? (
                  <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="font-bold text-gray-400 hover:text-primary text-xl text-center px-4 leading-tight transition-colors">
                    {partner.name}
                  </span>
                )}
             </div>
           ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
