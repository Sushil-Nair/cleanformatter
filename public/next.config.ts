// next.config.js
import type { NextConfig } from "next";

/**
 * NOTE:
 * - Requires: `npm i next-pwa` (or yarn add next-pwa)
 * - next-pwa uses CommonJS style, so we `require` it here.
 */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    // next static assets (JS/CSS) - Cache First (app shell)
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static-resources",
        expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
    // Public static assets (icons/fonts/favicons) - Cache First
    {
      urlPattern: /\/icons\/.*|\/fonts\/.*|\/favicons\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: { maxEntries: 60, maxAgeSeconds: 60 * 24 * 60 * 60 },
      },
    },
    // Images - StaleWhileRevalidate
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "images",
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 24 * 60 * 60 },
      },
    },
    // API calls - Network First (fresh responses; fallback to cache)
    {
      urlPattern: /^\/api\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 3,
        expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    // IMPORTANT: Tool pages - ALWAYS network (no cache) to ensure ads & monetization run
    {
      urlPattern: /^\/tools\/.*$/i,
      handler: "NetworkOnly",
      options: {
        cacheName: "tools-network-only",
      },
    },
  ],
});

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
    ],
  },
  // any additional Next.js config you want
};

export default withPWA(nextConfig);
