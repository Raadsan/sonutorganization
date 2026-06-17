"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const subLinks = [
  { label: "Events", href: "/Resources/events" },
  { label: "Our News", href: "/Resources/ournews" },
];

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section>
      {/* Sub-menu */}
      <div className="w-full bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 h-12">
          {subLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#1E0D79] text-white"
                    : "text-gray-600 hover:text-[#1E0D79] hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {children}
    </section>
  );
}
