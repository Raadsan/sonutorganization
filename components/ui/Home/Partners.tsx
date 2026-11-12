"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type PartnerData = {
  id: number;
  name: string;
  logoUrl: string | null;
  website: string | null;
};

function PartnerCard({ partner }: { partner: PartnerData }) {
  const content = (
    <>
      {partner.logoUrl ? (
        <Image
          src={partner.logoUrl}
          alt={partner.name}
          width={200}
          height={80}
          unoptimized
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <span className="font-bold text-gray-400 text-xl text-center px-4 leading-tight">
          {partner.name}
        </span>
      )}
    </>
  );

  const className =
    "flex-shrink-0 w-56 h-24 mx-4 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:shadow-lg hover:border-primary/20 hover:scale-105 transition-all duration-300 overflow-hidden p-2";

  if (partner.website) {
    return (
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={partner.name}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function Partners({
  initialData,
}: {
  initialData?: PartnerData[];
}) {
  const displayPartners = initialData ?? [];

  if (displayPartners.length === 0) {
    return null;
  }

  // Enough copies for a seamless loop even with few logos
  const loop = [...displayPartners, ...displayPartners, ...displayPartners];

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
            <span className="w-2 h-2 rounded-full bg-secondary" />
            OUR PARTNERS
          </div>

          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            We collaborate with leading national and international organizations
            to improve the quality of education and support educators across
            Somalia.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden group py-4">
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-partners-marquee group-hover:[animation-play-state:paused]">
          {loop.map((partner, index) => (
            <PartnerCard
              key={`${partner.id}-${index}`}
              partner={partner}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes partners-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-partners-marquee {
          animation: partners-marquee 28s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
