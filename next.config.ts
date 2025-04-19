// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.tradeindia.com", 
      },
      {
        protocol: "https",
        hostname: "www.junaidjamshed.com", // ✅ Junaid Jamshed
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
