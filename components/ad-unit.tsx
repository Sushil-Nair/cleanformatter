"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdUnitProps {
  slot: string;
  format?:
    | "auto"
    | "horizontal"
    | "vertical"
    | "rectangle"
    | "square"
    | "in-article"
    | "in-feed";
  className?: string;
  client?: string;
  closeable?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

export default function AdUnit({
  slot,
  format = "auto",
  className = "",
  client = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID,
  closeable = false,
  style = {},
  id,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [isClosed, setIsClosed] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  // Setup IntersectionObserver for lazy loading
  useEffect(() => {
    if (isClosed) return;

    if (!adRef.current) return;

    if ("IntersectionObserver" in window) {
      intersectionObserver.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !adLoaded) {
              if (window.adsbygoogle && adRef.current) {
                try {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  setAdLoaded(true);
                  if (intersectionObserver.current && adRef.current) {
                    intersectionObserver.current.unobserve(adRef.current);
                  }
                } catch (error) {
                  console.error("AdSense error:", error);
                }
              }
            }
          });
        },
        { rootMargin: "200px" } // start loading 200px before ad is visible
      );
      intersectionObserver.current.observe(adRef.current);
    } else {
      // Fallback if IntersectionObserver not supported
      if ((window as any).adsbygoogle && !adLoaded && adRef.current) {
        try {
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({});
          setAdLoaded(true);
        } catch (error) {
          console.error("AdSense error:", error);
        }
      }
    }

    return () => {
      if (intersectionObserver.current && adRef.current) {
        intersectionObserver.current.unobserve(adRef.current);
      }
    };
  }, [isClosed, adLoaded]);

  const getAdConfig = () => {
    switch (format) {
      case "horizontal":
        return {
          style: {
            width: "100%",
            height: "60px",
            maxWidth: "728px",
            minHeight: "60px",
            aspectRatio: "728 / 90",
          },
          dataAdFormat: "auto",
          dataFullWidthResponsive: "true",
        };
      case "vertical":
        return {
          style: {
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            aspectRatio: "300 / 600",
          },
          dataAdFormat: "auto",
          dataFullWidthResponsive: "true",
        };
      case "rectangle":
        return {
          style: {
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            aspectRatio: "300 / 250",
          },
          dataAdFormat: "auto",
          dataFullWidthResponsive: "true",
        };
      case "square":
        return {
          style: {
            width: "100%",
            maxWidth: "250px",
            height: "auto",
            aspectRatio: "250 / 250",
          },
          dataAdFormat: "auto",
          dataFullWidthResponsive: "true",
        };
      case "in-article":
        return {
          style: { display: "block", textAlign: "center" },
          dataAdFormat: "fluid",
          dataAdLayout: "in-article",
          dataFullWidthResponsive: "true",
        };
      case "in-feed":
        return {
          style: { display: "block" },
          dataAdFormat: "fluid",
          dataAdLayout: "in-feed",
          dataFullWidthResponsive: "true",
        };
      default:
        return {
          style: { display: "block" },
          dataAdFormat: "auto",
          dataFullWidthResponsive: "true",
        };
    }
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  if (isClosed) return null;

  const adConfig = getAdConfig();

  return (
    <div
      className={`relative flex justify-center items-center mt-4 p-2 ${className}`}
    >
      {closeable && (
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 z-10 p-1 bg-accent hover:bg-muted-foreground rounded-full transition-colors"
          aria-label="Close advertisement"
        >
          <X className="w-3 h-3 text-muted-foreground" />
        </button>
      )}
      <ins
        id={id}
        ref={adRef}
        className="adsbygoogle"
        style={{
          ...(adConfig.style as React.CSSProperties),
          ...(style as React.CSSProperties),
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={adConfig.dataAdFormat}
        data-ad-layout={adConfig.dataAdLayout}
        data-full-width-responsive={adConfig.dataFullWidthResponsive}
      />
    </div>
  );
}
