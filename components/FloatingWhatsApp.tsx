"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/252615625633"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="text-sm font-medium">Chat on WhatsApp</span>
    </a>
  );
}
