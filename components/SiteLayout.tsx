"use client";

import { usePathname } from "next/navigation";
import Tobbar from "@/components/ui/Home/Tobbar";
import Nav from "@/components/ui/Home/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Tobbar />}
      {!isAdmin && <Nav />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWhatsApp />}
    </>
  );
}
