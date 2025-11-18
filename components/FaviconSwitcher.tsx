"use client";

import { useEffect } from "react";

export default function FaviconSwitcher() {
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Map of icon IDs to their light/dark versions
    const iconMap: Record<string, string> = {
      favicon32: isDark ? "/favicon-32x32.png" : "/favicon-light-32x32.png",
      favicon16: isDark ? "/favicon-16x16.png" : "/favicon-light-16x16.png",
      appleIcon: isDark
        ? "/apple-touch-icon.png"
        : "/apple-touch-icon-light.png",
      android192: isDark
        ? "/android-chrome-192x192.png"
        : "/android-chrome-light-192x192.png",
      android512: isDark
        ? "/android-chrome-512x512.png"
        : "/android-chrome-light-512x512.png",
      faviconICO: isDark ? "/favicon.ico" : "/favicon-light.ico",
    };

    // Loop & update each favicon if present in DOM
    Object.keys(iconMap).forEach((id) => {
      const el = document.getElementById(id) as HTMLLinkElement | null;
      if (el) el.href = iconMap[id];
    });
  }, []);

  return null;
}
