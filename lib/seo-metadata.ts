import { Metadata } from "next";

interface SEOOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  altOgImage?: string;
  twitterImage?: string;
  type?: "website" | "article";
}

export function generatePageMetadata(options: SEOOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = "https://cleanformatter.com/og-image.png",
    altOgImage = title,
    twitterImage = "https://cleanformatter.com/twitter-card.png",
    type,
  } = options;

  return {
    title: title,
    description: description,
    keywords: keywords,

    alternates: {
      canonical: canonical || undefined,
    },

    openGraph: {
      title: title,
      description: description,
      url: canonical,
      type: type,
      siteName: "Clean Formatter",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: altOgImage,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [twitterImage],
      creator: "@CFormatter",
    },

    robots: {
      index: true,
      follow: true,
    },

    metadataBase: new URL("https://cleanformatter.com"),
  };
}
