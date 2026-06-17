import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Tobbar from "@/components/ui/Home/Tobbar";
import Nav from "@/components/ui/Home/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SONUT",
  description: "Somali National Union of Teachers (SONUT)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Tobbar />
        <Nav />
        {children}
      </body>
    </html>
  );
}
