import BreadcrumbAuto from "@/components/BreadcrumbAuto";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, User, Code, ShieldCheck, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Clean Formatter | Fast, Private Text & Code Tools",
  description:
    "Clean Formatter is a modern suite of fast, privacy-first text and code tools built for developers, writers, and content creators. Learn our mission, values, and how we help users work smarter with clean, efficient formatting tools.",
  keywords: [
    "clean formatter",
    "about clean formatter",
    "text formatting tools",
    "code formatter",
    "developer utilities",
    "online text tools",
    "online code tools",
    "privacy focused text tools",
    "fast formatting tools",
    "SEO text tools",
  ],

  alternates: {
    canonical: "https://cleanformatter.com/about",
  },

  openGraph: {
    title: "About Clean Formatter | Fast, Private Text & Code Tools",
    description:
      "Explore Clean Formatter — a powerful, privacy-first platform offering text and code tools for developers, creators, and teams. Built with Next.js and optimized for performance.",
    url: "https://cleanformatter.com/about",
    siteName: "Clean Formatter",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://cleanformatter.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Clean Formatter",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Clean Formatter",
    description:
      "Learn about Clean Formatter — a fast, privacy-first toolkit for text and code formatting.",
    images: ["https://cleanformatter.com/twitter-card.png"],
    creator: "@CFormatter",
  },

  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL("https://cleanformatter.com"),
};

const pathname = `/about`;

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbAuto pathname={pathname} />
      <main className="flex-1 pt-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Header */}
          <header className="text-center max-w-7xl mx-auto mb-12">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <User className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">About Clean Formatter</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              For writers, developers, students, and anybody else who works with
              digital content on a daily basis, Clean Formatter is a quick,
              privacy-focused collection of text and code formatting tools.
            </p>
          </header>

          {/* Founder Card */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
              <Badge variant="outline" className="px-3 py-1 text-primary">
                Founder
              </Badge>
              <Code className="w-6 h-6 text-primary" /> Meet the Founder
            </h2>
            <p className="leading-relaxed">
              I'm <span className="font-semibold">Sushil</span>, a content
              writer and front-end web developer. I created Clean Formatter as a
              lightweight solution that operates instantly and respects user
              privacy after years of juggling messy copy-pasted text,
              inconsistent code formatting, and never-ending cleanup tasks.
            </p>
            <p className="leading-relaxed">
              Initially, Clean Formatter was a collection of personal tools I
              used on a daily basis. It developed into a feature-rich platform
              over time to assist anyone looking for quicker, cleaner formatting
              without the complexity or clutter.
            </p>
          </Card>

          {/* Why Section */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" /> Why I Built Clean
              Formatter
            </h2>
            <p className="leading-relaxed">
              Most formatting tools online are slow, filled with ads, or collect
              user data unnecessarily. I wanted something different — something
              clean, fast, and trustworthy.
            </p>
            <div className="space-y-3">
              <Card className="p-3 bg-muted/30 border-border text-sm">
                Instant results without lag or redirects
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                All processing done locally in your browser
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                Simple UI using Next.js, Tailwind, and shadcn tokens
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                No tracking, no data storage, no sign-up required
              </Card>
            </div>
          </Card>

          {/* Tools Section */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" /> What You’ll Find Here
            </h2>
            <p className="leading-relaxed">
              Clean Formatter now includes a growing library of tools:
            </p>
            <div className="space-y-3">
              <Card className="p-3 bg-muted/30 border-border text-sm">
                Instant results without lag or redirects
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                All processing done locally in your browser
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                Simple UI using Next.js, Tailwind, and shadcn tokens
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                No tracking, no data storage, no sign-up required
              </Card>
            </div>
          </Card>

          {/* What Makes Unique */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> What Makes Clean
              Formatter Different
            </h2>
            <div className="space-y-3">
              <Card className="p-3 bg-muted/30 border-border text-sm">
                Instant results without lag or redirects
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                All processing done locally in your browser
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                Simple UI using Next.js, Tailwind, and shadcn tokens
              </Card>
              <Card className="p-3 bg-muted/30 border-border text-sm">
                No tracking, no data storage, no sign-up required
              </Card>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" /> Get in Touch
            </h2>
            <p className="leading-relaxed">
              Have feedback, feature requests, or ideas? You can reach me
              anytime using the Contact page. I personally read every message.
            </p>

            <Button>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </Card>

          {/* Outro */}
          <footer className="pt-8 border-t border-muted">
            <p className="text-muted-foreground text-sm">
              Thank you for using Clean Formatter — your support helps keep this
              platform fast, private, and constantly improving.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default page;
