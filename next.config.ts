import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/who-we-are",
        destination: "/about",
        permanent: false,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: false,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
