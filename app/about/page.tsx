import BreadcrumbAuto from "@/components/BreadcrumbAuto";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, User, Code, ShieldCheck, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Clean Formatter | The Mission Behind Our Privacy-First Tools",
  description:
    "Founded by developer Sushil, Clean Formatter provides professional-grade text and code utilities designed for privacy, speed, and accuracy. Discover how our smart formatting engine helps creators work faster.",
  keywords: [
    "clean formatter mission",
    "privacy-first developer tools",
    "smart case converter technology",
    "Sushil developer",
    "secure code formatting",
    "online text utility expertise",
  ],
  alternates: {
    canonical: "https://cleanformatter.com/about",
  },
};

const pathname = `/about`;

const page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://cleanformatter.com/about#webpage",
        "url": "https://cleanformatter.com/about",
        "name": "About Clean Formatter",
        "description": "Learn about the mission, technology, and people behind Clean Formatter.",
        "breadcrumb": { "@id": "https://cleanformatter.com/about#breadcrumb" }
      },
      {
        "@type": "Person",
        "@id": "https://cleanformatter.com/#founder",
        "name": "Sushil",
        "jobTitle": "Lead Developer & Founder",
        "url": "https://cleanformatter.com/about",
        "knowsAbout": ["Web Development", "Software Engineering", "SEO", "Text Processing Algorithms"],
        "description": "Founder of Clean Formatter, dedicated to building high-performance web utilities that prioritize user privacy."
      },
      {
        "@type": "Organization",
        "@id": "https://cleanformatter.com/#organization",
        "name": "Clean Formatter",
        "url": "https://cleanformatter.com/",
        "logo": "https://cleanformatter.com/logo-dark.png",
        "founder": { "@id": "https://cleanformatter.com/#founder" }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbAuto pathname={pathname} />
      <main className="flex-1 pt-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Hero Section */}
        <section className="space-y-4">
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            Our Mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Clean Tools for a <span className="text-primary">Clutter-Free</span> Web.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Clean Formatter was built to bridge the gap between powerful developer utilities and 
            simple, privacy-focused user experiences.
          </p>
        </section>

        <div className="grid gap-8">
          {/* The Vision */}
          <Card className="p-8 space-y-4 bg-gradient-to-br from-card to-muted/30 border-border">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" /> Why Clean Formatter?
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Most online formatters are bloated with trackers, confusing layouts, or engines that break 
              critical text (like turning &quot;NASA&quot; into &quot;Nasa&quot;). We solved this by creating a 
              <strong> Smart Formatting Engine</strong> that understands context, preserving technical acronyms 
              and brand names while delivering perfectly formatted output.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-background border border-border shadow-sm">
                <p className="font-semibold text-foreground">Advanced Parsing</p>
                <p className="text-sm text-muted-foreground mt-1">Context-aware logic for 15+ editorial and programming cases.</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border shadow-sm">
                <p className="font-semibold text-foreground">Zero-Data Policy</p>
                <p className="text-sm text-muted-foreground mt-1">We don&apos;t store what you format. Processing stays in your browser.</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border shadow-sm">
                <p className="font-semibold text-foreground">Developer-First</p>
                <p className="text-sm text-muted-foreground mt-1">Optimized for Snake Case, Pascal Case, and API debugging workflows.</p>
              </div>
            </div>
          </Card>
          </div>

          {/* The Founder - E-E-A-T Signal */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4 border-border">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <User className="w-6 h-6 text-primary" /> Behind the Code
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Hi, I&apos;m <strong>Sushil</strong>. As a developer and content writer, I found myself constantly 
                switching between tabs to clean up text and code snippets. I built Clean Formatter to create 
                the tool I wanted to use: one that is fast, accessible via keyboard shortcuts, and free of intrusive ads.
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" /> Our Trust Guarantee
              </h2>
              <ul className="space-y-3">
                <li className="flex gap-2 text-sm text-muted-foreground leading-snug">
                  <Globe className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Global Accessibility:</strong> Lightweight design for users on any connection.</span>
                </li>
                <li className="flex gap-2 text-sm text-muted-foreground leading-snug">
                  <Code className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Modern Stack:</strong> Built on Next.js 16 for industry-leading speed.</span>
                </li>
                <li className="flex gap-2 text-sm text-muted-foreground leading-snug">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Local Execution:</strong> Your sensitive data never hits our servers.</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Contact - High Trust Signal */}
          <Card className="p-8 space-y-6 bg-primary/5 border-primary/20 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Mail className="w-6 h-6 text-primary" /> Open for Feedback
              </h2>
              <p className="text-muted-foreground">
                Clean Formatter evolves based on your needs. If you have a feature request or found a bug, 
                reach out directly. I personally respond to all developer and user queries.
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">Message the Team</Link>
              </Button>
            </div>
          </Card>

          {/* Outro */}
          <footer className="pt-12 border-t border-muted text-center">
          <p className="text-muted-foreground text-sm italic">
            Part of the Clean Formatter mission to simplify text and code transformation for the modern web.
          </p>
        </footer>
        </div>
      </main>
    </div>
  );
};

export default page;
