// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "as1.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "as2.ftcdn.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.cleanformatter.com" }],
        destination: "https://cleanformatter.com/:path*",
        permanent: true,
      },
    ];
  },
  // any additional Next.js config you want
};

export default nextConfig;
