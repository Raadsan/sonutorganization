"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103v3.328h-2.328c-2.144 0-2.412.934-2.412 2.328v1.799h3.536l-.413 3.667h-3.123v7.98H9.101z" />
  </svg>
);

export default function SocialUpdates() {
  const [activeTab, setActiveTab] = useState<"facebook" | "tiktok">("facebook");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-6 self-start border border-secondary/20 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              Social Media Updates
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-6 leading-[1.15]">
              Stay connected with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SONUT</span>
            </h2>

            {/* Paragraph */}
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Catch the latest programme highlights, educational achievements, teacher advocacy updates, and event recaps straight from our official social media channels.
            </p>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="https://www.facebook.com/somaliateachers"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-[#1877F2]/10 px-6 py-3.5 text-sm font-semibold text-[#1877F2] transition-all hover:bg-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/30 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <FacebookIcon className="w-5 h-5" />
                <span>Facebook Page</span>
              </Link>

              <Link
                href="#"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white hover:shadow-lg hover:shadow-[#25D366]/30 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </Link>

              <Link
                href="#"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gray-900/10 px-6 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-900 hover:text-white hover:shadow-lg hover:shadow-gray-900/30 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <TikTokIcon className="w-5 h-5" />
                <span>TikTok</span>
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-gray-100 z-[${4 - i}]`}>
                    <img src={`https://ui-avatars.com/api/?name=Educator+${i}&background=random`} alt="Follower" className="w-full h-full rounded-full object-cover" />
                  </div>
                ))}
              </div>
              <span>Join over <strong className="text-primary">10k+</strong> educators</span>
            </div>
          </motion.div>

          {/* Right Column - Embed / Tabs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-md mx-auto lg:max-w-none lg:mr-0 lg:ml-auto"
          >
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">

              {/* Tab Header */}
              <div className="bg-gray-50/80 border-b border-gray-100 p-3 sm:p-4">
                <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
                  <button
                    onClick={() => setActiveTab("facebook")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === "facebook"
                        ? "bg-[#1877F2] text-white shadow-md"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <FacebookIcon className="w-4 h-4" />
                    Facebook
                  </button>
                  <button
                    onClick={() => setActiveTab("tiktok")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === "tiktok"
                        ? "bg-gray-900 text-white shadow-md"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <TikTokIcon className="w-4 h-4" />
                    TikTok
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6 min-h-[500px] flex flex-col bg-white">
                <AnimatePresence mode="wait">
                  {activeTab === "facebook" ? (
                    <motion.div
                      key="facebook"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col items-center"
                    >
                      {/* Actual Facebook Page Plugin */}
                      <div className="w-full flex justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                        <iframe 
                          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsomaliateachers&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                          width="340" 
                          height="500" 
                          style={{ border: 'none', overflow: 'hidden' }} 
                          scrolling="no" 
                          frameBorder="0" 
                          allowFullScreen={true} 
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          className="max-w-full"
                        ></iframe>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="tiktok"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-gray-900/20 rotate-3">
                        <TikTokIcon className="w-10 h-10" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Follow us on TikTok</h4>
                      <p className="text-sm text-gray-500 mb-8 max-w-[250px]">
                        Watch behind-the-scenes, teacher highlights, and educational tips!
                      </p>
                      <Link
                        href="#"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:scale-105"
                      >
                        Watch Now <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
