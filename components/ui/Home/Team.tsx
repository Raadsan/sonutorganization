"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, ChevronRight, ChevronLeft } from "lucide-react";

type TeamMember = {
  id: string | number;
  name: string;
  role: string;
  image: string | null;
  bio: string | null;
  socials: {
    facebook?: string;
    tiktok?: string;
    instagram?: string;
  };
};

const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Prof. Mohamed Ali",
    role: "Chairman",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    bio: "Prof. Mohamed has over 20 years of experience in the education sector, leading various national initiatives for teachers' rights and curriculum development. He has been instrumental in the founding of SONUT and its continued success in advocating for educators.",
    socials: { facebook: "#", tiktok: "#", instagram: "#" }
  },
  {
    id: "2",
    name: "Dr. Amina Hassan",
    role: "Secretary General",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bio: "Dr. Amina is a dedicated advocate for female educators and has spearheaded professional development programs across Somalia. She works closely with international partners to bring modern teaching methodologies to local schools.",
    socials: { facebook: "#", instagram: "#" }
  },
  {
    id: "3",
    name: "Mr. Ahmed Omar",
    role: "Head of Training",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    bio: "Ahmed specializes in curriculum development and capacity building for primary and secondary school teachers. His workshops have directly impacted over 5,000 teachers nationwide.",
    socials: { facebook: "#", tiktok: "#" }
  },
  {
    id: "4",
    name: "Ms. Fadumo Abdi",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    bio: "Fadumo manages the financial strategy of SONUT, ensuring resources are effectively allocated to support educators, provide training, and maintain organizational transparency.",
    socials: { instagram: "#", facebook: "#" }
  },
  {
    id: "5",
    name: "Eng. Hassan Nur",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    bio: "Hassan oversees the integration of technology in education, building platforms for remote learning and digital resource sharing among teachers in rural areas.",
    socials: { tiktok: "#", instagram: "#" }
  }
];

// Custom Facebook SVG Icon
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// Custom TikTok SVG Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Custom Instagram SVG Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Team({ initialData }: { initialData?: TeamMember[] }) {
  const [activeShareId, setActiveShareId] = useState<string | number | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const displayData = initialData !== undefined ? initialData : teamData;

  if (displayData.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    const slider = document.getElementById('team-slider');
    if (slider) slider.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const slider = document.getElementById('team-slider');
    if (slider) slider.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title with Fade In Down */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            OUR LEADERSHIP
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary">
            Executive Committee
          </h2>
        </motion.div>

        {/* Slider Controls */}
        <div className="flex justify-end gap-3 mb-6 pr-2">
          <button onClick={scrollLeft} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={scrollRight} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Team Slider */}
        <div 
          id="team-slider"
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayData.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-center bg-white rounded-3xl p-4 shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-gray-100 flex items-center justify-center">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-gray-400 font-medium">No Image</span>
                )}
                
                {/* Overlay for aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Share Button Logic */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
                  <button 
                    onClick={() => setActiveShareId(activeShareId === member.id ? null : member.id)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
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
                          <a href={member.socials.facebook} className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                            <FacebookIcon className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.tiktok && (
                          <a href={member.socials.tiktok} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                            <TikTokIcon className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.instagram && (
                          <a href={member.socials.instagram} className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
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
                <button 
                  onClick={() => setSelectedMember(member)}
                  className="block w-full"
                >
                  <h3 className="text-xl font-bold text-primary hover:text-secondary transition-colors cursor-pointer mb-1">
                    {member.name}
                  </h3>
                </button>
                <p className="text-sm font-medium text-secondary uppercase tracking-wider">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

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
                  <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-2xl font-bold font-serif">{selectedMember.name}</h3>
                  <p className="text-secondary font-medium">{selectedMember.role}</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">About {selectedMember.name.split(' ')[0]}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedMember.bio}
                </p>
                
                <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                  <span className="text-sm font-semibold text-primary">Connect:</span>
                  <div className="flex gap-3">
                    {selectedMember.socials.facebook && (
                      <a href={selectedMember.socials.facebook} className="text-gray-400 hover:text-[#1877F2] transition-colors"><FacebookIcon className="w-5 h-5" /></a>
                    )}
                    {selectedMember.socials.tiktok && (
                      <a href={selectedMember.socials.tiktok} className="text-gray-400 hover:text-black transition-colors"><TikTokIcon className="w-5 h-5" /></a>
                    )}
                    {selectedMember.socials.instagram && (
                      <a href={selectedMember.socials.instagram} className="text-gray-400 hover:text-[#E1306C] transition-colors"><InstagramIcon className="w-5 h-5" /></a>
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
