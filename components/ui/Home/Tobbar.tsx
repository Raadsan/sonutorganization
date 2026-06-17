"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full bg-[#1E0D79] text-xs sm:text-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-2">

        {/* ROW 1: Email & Location */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="flex justify-center sm:justify-between items-center gap-4"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-4 text-white flex-1">
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span>info@sonut.org.so</span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>Mogadishu, Somalia</span>
            </div>
          </motion.div>
          <div className="hidden sm:flex items-center gap-1 text-white ml-auto">
            <Phone size={14} />
            <span>+252 61 5625633</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}