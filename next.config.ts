import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // ✅ Yeh sahi hai
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Bonus Tip
      },
     { hostname: "lh3.googleusercontent.com"}
    ],
  },
  experimental: {
    serverActions: true, // Yeh sahi hai Next.js 13.4+
  },
};

module.exports = nextConfig;
