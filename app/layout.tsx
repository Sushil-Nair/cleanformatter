import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";
import BackToTopButton from "@/components/backToTop";
import FaviconSwitcher from "@/components/FaviconSwitcher";
import ServiceWorkerManager from "@/components/ServiceWorkerManager";

export const metadata: Metadata = {
  title: "Online Text & Code Tools - Case Converter, Formatter, Counters",
  description:
    "Boost productivity with fast online tools for text conversion, code formatting, word counting, and more — built for developers and content creators.",
  keywords: [
    "online text tools",
    "case converter",
    "code formatter",
    "word counter",
    "diff checker",
    "unicode converter",
    "base64 encoder decoder",
    "url encoder decoder",
    "html entities converter",
    "password generator",
    "uuid generator",
    "font generator",
    "text cleaner",
    "text formatter",
    "developer tools",
    "writer tools",
    "seo text tools",
    "online code utilities",
    "JSON formatter",
    "JavaScript minifier",
    "CSS beautifier",
    "HTML formatter",
    "text analysis",
    "online converters",
    "productivity tools",
    "clean formatter",
    "Python formatter",
    "CSS Formatter",
    "HTML Cleaner",
    "Text Case Tools",
  ],

  authors: [
    {
      name: "Digital Crafts by Sushil Nair",
      url: "https://cleanformatter.com",
    },
  ],
  openGraph: {
    title: "Online Text & Code Tools - Efficient Formatting & Conversion",
    description:
      "Suite of online tools for writers, developers, and creators providing real-time text and code formatting, case conversion, word counting, and more.",
    url: "https://cleanformatter.com",
    siteName: "Clean Formatter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Online text and code tools banner",
      },
    ],
    locale: "en_US",
    type: "website",
    determiner: "the",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Text & Code Tools",
    description:
      "Fast, intuitive online tools for text transformation and code formatting.",
    creator: "@CFormatter",
    images: ["/twitter-card.png"],
  },
  alternates: {
    canonical: "https://cleanformatter.com",
  },
  metadataBase: new URL("https://cleanformatter.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link id="faviconICO" rel="icon" href="/favicon-light.ico" />
        <link
          id="favicon32"
          rel="icon"
          sizes="32x32"
          href="/favicon-light-32x32.png"
        />
        <link
          id="favicon16"
          rel="icon"
          sizes="16x16"
          href="/favicon-light-16x16.png"
        />
        <link
          id="appleIcon"
          rel="apple-touch-icon"
          href="/apple-touch-icon-light.png"
        />
        <link
          id="android192"
          rel="icon"
          sizes="192x192"
          href="/android-chrome-light-192x192.png"
        />
        <link
          id="android512"
          rel="icon"
          sizes="512x512"
          href="/android-chrome-light-512x512.png"
        />

        <link rel="manifest" href="/site.webmanifest" />
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen grid place-content-center">
        <FaviconSwitcher />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <BackToTopButton />
          <Footer />
          <Toaster />
        </ThemeProvider>
        <ServiceWorkerManager />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
    </html>
  );
}
