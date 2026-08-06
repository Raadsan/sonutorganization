import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "@/components/SiteLayout";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SONUT",
  description: "Somali National Union of Teachers (SONUT)",
  icons: {
    icon: [{ url: "/images/fv.jpg", type: "image/jpeg" }],
    shortcut: [{ url: "/images/fv.jpg", type: "image/jpeg" }],
    apple: [{ url: "/images/fv.jpg", type: "image/jpeg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <SiteLayout>{children}</SiteLayout>
        </TooltipProvider>
      </body>
    </html>
  );
}
