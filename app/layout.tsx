import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title:
    "Online Text & Code Tools - Case Converter, Formatter, Counters | Clean Formatter",
  description:
    "Access a suite of fast and intuitive online tools for case conversion (camelCase, snake_case, kebab-case, etc.), code formatting, word count, diff check, and more. Boost your productivity with easy copy, download, and SEO-optimized utilities suitable for writers, developers, and content creators.",
  keywords: [
    "online text tools",
    "case converter",
    "code formatter",
    "word counter",
    "character counter",
    "camelCase converter",
    "snake_case converter",
    "kebab-case",
    "text utilities online",
    "programming tools",
    "markdown tools",
    "text difference tool",
    "encode decode online",
    "random text generator",
    "free online tools",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Text & Code Tools",
    description:
      "Fast, intuitive online tools for text transformation and code formatting.",
    creator: "@YourTwitterHandle",
    images: ["/twitter-card.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
