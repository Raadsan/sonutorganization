"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Who We Are",
    href: "#",
    submenu: [
      { label: "About", href: "/about" },
      { label: "Structure", href: "/structure" },
      { label: "Leadership", href: "/leadership" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "What We Do",
    href: "#",
    submenu: [
      { label: "Our Programmes", href: "/our-programmes" },
      { label: "Activity", href: "/activity" },
    ],
  },
  { label: "Membership", href: "/membership" },
  {
    label: "Media",
    href: "#",
    submenu: [
      { label: "News", href: "/media/news" },
      { label: "Reports", href: "/media/reports" },
      { label: "SONUT Talk", href: "/media/sonut-talk" },
    ],
  },
  { label: "Contact", href: "/contactus" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo - Bidix */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo1.png"
            alt="Logo"
            width={200}
            height={100}
            className="object-contain"
          />
         
        </Link>

        {/* Menu - Dhaxda (Desktop) */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              {link.submenu ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.label ? null : link.label)
                    }
                    aria-expanded={openDropdown === link.label}
                    className="flex items-center gap-1 text-gray-700 hover:text-[#1E0D79] transition-colors cursor-pointer"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-44 rounded-lg bg-white shadow-lg border z-50">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:text-[#1E0D79] hover:bg-gray-50 rounded-lg"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-[#1E0D79] transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Button - Gesh (Mobile + Desktop) */}
        <div className="flex items-center gap-3">
          <Link
            href="/join"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#1E0D79] border border-[#1E0D79] hover:bg-gray-50 transition-colors"
          >
            Join SONUT
          </Link>
          <Link
            href="/contactus"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#F4313F] px-4 py-2 text-sm font-medium text-white hover:bg-[#d92936] transition-colors"
          >
            Verify Your ID
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden border-t"
          >
            <ul className="flex flex-col px-4 py-4 gap-3 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.label ? null : link.label)
                        }
                        aria-expanded={openDropdown === link.label}
                        className="flex items-center justify-between w-full py-1.5 text-gray-700 hover:text-[#1E0D79]"
                      >
                        {link.label}
                        <svg
                          className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === link.label && (
                        <div className="pl-4 flex flex-col gap-2 mt-1">
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => {
                                setOpen(false);
                                setOpenDropdown(null);
                              }}
                              className="block py-1.5 text-gray-600 hover:text-[#1E0D79] text-sm"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-gray-700 hover:text-[#1E0D79]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-2 flex flex-col gap-2">
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white border border-[#1E0D79] px-4 py-2 text-sm font-medium text-[#1E0D79]"
                >
                  Join SONUT
                </Link>
                <Link
                  href="/contactus"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#F4313F] px-4 py-2 text-sm font-medium text-white"
                >
                  Verify Your ID 
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
