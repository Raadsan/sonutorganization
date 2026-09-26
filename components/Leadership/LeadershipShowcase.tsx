'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, ChevronRight, ChevronLeft, UserCircle2 } from 'lucide-react';

export type TeamMember = {
  id: string | number;
  name: string;
  role: string;
  category: string;
  image: string | null;
  bio: string | null;
  socials: {
    facebook?: string;
    tiktok?: string;
    instagram?: string;
  };
};

// 3 Sections in exact user-requested order:
// 1. Executive Committee
// 2. Trustee Board
// 3. State Representative
const CATEGORY_SECTIONS = [
  {
    id: 'Executive Committee',
    badge: 'OUR LEADERSHIP',
    title: 'Executive Committee',
    subtitle: 'Guddiga Fulinta Qaranka',
    emptyNotice: 'Executive Committee members are being updated.',
  },
  {
    id: 'Trustee Board',
    badge: 'GOVERNANCE & TRUSTEES',
    title: 'Trustee Board',
    subtitle: 'Guddiga Ammaanada',
    emptyNotice: 'Trustee Board members are currently being appointed by the General Assembly.',
  },
  {
    id: 'State Representative',
    badge: 'REGIONAL LEADERSHIP',
    title: 'State Representative',
    subtitle: 'Wakiillada Dowlad-Goboleedyada',
    emptyNotice: 'State Representatives from Federal Member States are being compiled.',
  },
] as const;

// Custom Facebook SVG Icon
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Custom TikTok SVG Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Custom Instagram SVG Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Single Category Slider Section (Exact style as shown in the screenshot)
function CategorySlider({
  categoryInfo,
  members,
  onSelectMember,
  activeShareId,
  setActiveShareId,
}: {
  categoryInfo: (typeof CATEGORY_SECTIONS)[number];
  members: TeamMember[];
  onSelectMember: (m: TeamMember) => void;
  activeShareId: string | number | null;
  setActiveShareId: (id: string | number | null) => void;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-20 md:mb-28 last:mb-0">
      {/* Title with Fade In Down */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-10 md:mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          {categoryInfo.badge}
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-primary">
          {categoryInfo.title}
        </h2>
        {categoryInfo.subtitle && (
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
            {categoryInfo.subtitle}
          </p>
        )}
      </motion.div>

      {/* Slider Controls (shown when there are members) */}
      {members.length > 0 && (
        <div className="flex justify-end gap-3 mb-6 pr-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Team Slider / List */}
      {members.length === 0 ? (
        /* Clean placeholder if category has no members added yet */
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 text-slate-300">
            <UserCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-primary mb-1">{categoryInfo.title}</h3>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            {categoryInfo.emptyNotice}
          </p>
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-center bg-white rounded-3xl p-4 shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-gray-100 flex items-center justify-center">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-gray-400 font-medium">No Image</span>
                )}

                {/* Overlay for aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Share Button Logic */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
                  <button
                    onClick={() =>
                      setActiveShareId(activeShareId === member.id ? null : member.id)
                    }
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {activeShareId === member.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        className="flex flex-col gap-2"
                      >
                        {member.socials.facebook && (
                          <a
                            href={member.socials.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                          >
                            <FacebookIcon className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.tiktok && (
                          <a
                            href={member.socials.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                          >
                            <TikTokIcon className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.instagram && (
                          <a
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                          >
                            <InstagramIcon className="w-4 h-4" />
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Info */}
              <div className="text-center px-2 pb-2">
                <button onClick={() => onSelectMember(member)} className="block w-full">
                  <h3 className="text-xl font-bold text-primary hover:text-secondary transition-colors cursor-pointer mb-1">
                    {member.name}
                  </h3>
                </button>
                <p className="text-sm font-medium text-secondary uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LeadershipShowcase({ leaders }: { leaders: TeamMember[] }) {
  const [activeShareId, setActiveShareId] = useState<string | number | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Group leaders by category
  const getCategoryLeaders = (catId: string) => {
    return leaders.filter((l) => (l.category || '').toLowerCase() === catId.toLowerCase());
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Render each of the 3 sections stacked vertically in order */}
        {CATEGORY_SECTIONS.map((categoryInfo) => {
          const sectionMembers = getCategoryLeaders(categoryInfo.id);

          return (
            <CategorySlider
              key={categoryInfo.id}
              categoryInfo={categoryInfo}
              members={sectionMembers}
              onSelectMember={(m) => setSelectedMember(m)}
              activeShareId={activeShareId}
              setActiveShareId={setActiveShareId}
            />
          );
        })}
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <div className="h-48 w-full relative bg-gray-200">
                {selectedMember.image && (
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-2xl font-bold font-serif">{selectedMember.name}</h3>
                  <p className="text-secondary font-medium">{selectedMember.role}</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  About {selectedMember.name.split(' ')[0]}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedMember.bio || 'Member of Somali National Union of Teachers leadership.'}
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                  <span className="text-sm font-semibold text-primary">Connect:</span>
                  <div className="flex gap-3">
                    {selectedMember.socials.facebook && (
                      <a
                        href={selectedMember.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#1877F2] transition-colors"
                      >
                        <FacebookIcon className="w-5 h-5" />
                      </a>
                    )}
                    {selectedMember.socials.tiktok && (
                      <a
                        href={selectedMember.socials.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <TikTokIcon className="w-5 h-5" />
                      </a>
                    )}
                    {selectedMember.socials.instagram && (
                      <a
                        href={selectedMember.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#E1306C] transition-colors"
                      >
                        <InstagramIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
