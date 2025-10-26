"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any[];
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
}

export default function AdUnit({
  slot,
  format = "auto",
  className = "",
  client = "ca-pub-5120078891027855", // Replace with your AdSense client ID
  closeable = false,
  style = {},
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isClosed) return;

    let timeoutId: NodeJS.Timeout;

    const loadAd = () => {
      if (typeof window !== "undefined" && adRef.current) {
        try {
          // Check if adsbygoogle is available
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } else {
            // Retry if not loaded yet
            timeoutId = setTimeout(loadAd, 100);
          }
        } catch (error) {
          console.error("AdSense error:", error);
        }
      }
    };

    // Initial load attempt
    timeoutId = setTimeout(loadAd, 100);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isClosed]);

  const getAdConfig = () => {
    switch (format) {
      case "horizontal":
        return {
          style: { width: "100%", height: "90px", maxWidth: "728px" },
          dataAdFormat: "horizontal",
          dataFullWidthResponsive: "true",
        };
      case "vertical":
        return {
          style: { width: "300px", height: "600px" },
          dataAdFormat: "vertical",
          dataFullWidthResponsive: "true",
        };
      case "rectangle":
        return {
          style: { width: "300px", height: "250px" },
          dataAdFormat: "rectangle",
          dataFullWidthResponsive: "true",
        };
      case "square":
        return {
          style: { width: "250px", height: "250px" },
          dataAdFormat: "square",
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
      default: // auto
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
      className={`relative flex justify-center items-center ${className} bg-red-400`}
    >
      {closeable && (
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 z-10 p-1 bg-accent hover:bg-muted-foreground rounded-full transition-colors"
          aria-label="Close advertisement"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
      <ins
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

      <h1>Hello</h1>
    </div>
  );
}

// Specialized ad components for easy use
export function HorizontalAd({
  slot,
  className = "",
  closeable = false,
}: {
  slot: string;
  className?: string;
  closeable?: boolean;
}) {
  return (
    <AdUnit
      slot={slot}
      format="horizontal"
      className={className}
      closeable={closeable}
    />
  );
}

export function VerticalAd({
  slot,
  className = "",
  closeable = false,
}: {
  slot: string;
  className?: string;
  closeable?: boolean;
}) {
  return (
    <AdUnit
      slot={slot}
      format="vertical"
      className={className}
      closeable={closeable}
    />
  );
}

export function RectangleAd({
  slot,
  className = "",
  closeable = false,
}: {
  slot: string;
  className?: string;
  closeable?: boolean;
}) {
  return (
    <AdUnit
      slot={slot}
      format="rectangle"
      className={className}
      closeable={closeable}
    />
  );
}

export function SquareAd({
  slot,
  className = "",
  closeable = false,
}: {
  slot: string;
  className?: string;
  closeable?: boolean;
}) {
  return (
    <AdUnit
      slot={slot}
      format="square"
      className={className}
      closeable={closeable}
    />
  );
}

export function InArticleAd({
  slot,
  className = "",
  closeable = false,
}: {
  slot: string;
  className?: string;
  closeable?: boolean;
}) {
  return (
    <AdUnit
      slot={slot}
      format="in-article"
      className={className}
      closeable={closeable}
    />
  );
}

export function InFeedAd({
  slot,
  className = "",
  closeable = false,
}: {
  slot: string;
  className?: string;
  closeable?: boolean;
}) {
  return (
    <AdUnit
      slot={slot}
      format="in-feed"
      className={className}
      closeable={closeable}
    />
  );
}

export function ResponsiveAd({
  slot,
  className = "",
  closeable = false,
}: {
  slot: string;
  className?: string;
  closeable?: boolean;
}) {
  return (
    <AdUnit
      slot={slot}
      format="auto"
      className={className}
      closeable={closeable}
    />
  );
}
