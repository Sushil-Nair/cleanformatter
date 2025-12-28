// app/tools/page.tsx

import { Metadata } from "next";
import { toolCategories } from "@/lib/tool-categories";
import ToolsPageContent from "@/components/sections/ToolsPageContent";

export async function generateMetadata(): Promise<Metadata> {
  const url = "https://cleanformatter.com/tools";

  return {
    title: "Online Text & Code Tools - Case Converter, Formatter, Counters",
    description:
      "Boost productivity with fast online tools for text conversion, code formatting, word counting, and more — built for developers and content creators.",

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: "All Online Tools – Clean Formatter",
      description:
        "Explore the complete suite of online text, code, encoding, and generator tools.",
      url,
      siteName: "Clean Formatter",
      type: "website",
      images: [
        {
          url: "https://cleanformatter.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "Clean Formatter Tools Overview",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "All Online Tools – Clean Formatter",
      description:
        "Explore the complete suite of online text, code, encoding, and generator tools.",
      images: ["https://cleanformatter.com/twitter-card.png"],
      creator: "@CFormatter",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default function ToolsPage() {
  return <ToolsPageContent categories={toolCategories} />;
}
