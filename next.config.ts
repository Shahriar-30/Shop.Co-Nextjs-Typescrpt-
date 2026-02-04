import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ⚠️ allows ANY domain
      },
    ],
  },
};

export default nextConfig;
