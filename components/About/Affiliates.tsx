'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export interface AffiliateData {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  description: string | null;
}

export default function Affiliates({ initialData }: { initialData: AffiliateData[] }) {
  if (initialData.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-b from-white to-slate-50 py-20 md:py-24">
      <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            Our Affiliates
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            We are proud to be affiliated with organizations that share our commitment
            to teachers, quality education, and stronger communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialData.map((affiliate, index) => (
            <motion.article
              key={affiliate.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.32) }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <a
                href={affiliate.website ?? undefined}
                target={affiliate.website ? '_blank' : undefined}
                rel={affiliate.website ? 'noopener noreferrer' : undefined}
                aria-label={affiliate.website ? `Visit ${affiliate.name} website` : affiliate.name}
                className={affiliate.website ? 'block h-full' : 'block h-full cursor-default'}
              >
                <div className="relative flex h-36 items-center justify-center border-b border-slate-100 bg-white p-6">
                  <Image
                    src={affiliate.logoUrl}
                    alt={`${affiliate.name} logo`}
                    width={220}
                    height={112}
                    unoptimized
                    className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-bold text-slate-900 transition-colors group-hover:text-secondary">
                      {affiliate.name}
                    </h3>
                    {affiliate.website && (
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-secondary" />
                    )}
                  </div>
                  {affiliate.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {affiliate.description}
                    </p>
                  )}
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
