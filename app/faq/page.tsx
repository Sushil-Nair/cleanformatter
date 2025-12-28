// app/faq/page.tsx
// import AdUnit from "@/components/ad-unit";
import BreadcrumbAuto from "@/components/BreadcrumbAuto";
import FAQStructuredData from "@/components/FAQStructuredData";
import GeneralFAQ from "@/components/GeneralFAQ";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Clean Formatter | Text & Code Tools Help",
  description:
    "Find answers to frequently asked questions about Clean Formatter tools including text cleaners, code formatters, converters, generators, and more.",

  alternates: {
    canonical: "https://cleanformatter.com/faq",
  },

  openGraph: {
    title: "FAQ – Clean Formatter",
    description:
      "Get answers to the most common questions about Clean Formatter's suite of text and code tools.",
    url: "https://cleanformatter.com/faq",
    type: "website",
    images: [
      {
        url: "https://cleanformatter.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clean Formatter FAQ Page",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FAQ – Clean Formatter",
    description:
      "Frequently asked questions about Clean Formatter text and code tools.",
    images: ["https://cleanformatter.com/twitter-card.png"],
    creator: "@CFormatter",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
  return (
    <div>
      <BreadcrumbAuto pathname="/faq" />
      <FAQStructuredData />
      <main className="tools-title w-full relative min-h-[80vh] mx-auto px-4 py-8 flex flex-col gap-4 max-w-7xl mt-12">
        <h1 className="font-bold text-center mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Everything you need to know about using Clean Formatter for text and code.
        </p>
        <GeneralFAQ />
      </main>
    </div>
  );
}
