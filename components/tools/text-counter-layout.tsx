"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { AboutSection } from "@/components/tools/about-section";
import { TextStats } from "@/types/tools";
import AdUnit from "../ad-unit";
import { MidSectionAd } from "../sections/ad-midsection";

interface TextCounterLayoutProps {
  title: string;
  description?: string;
}

const textCounterAboutContent = (
  <div className="space-y-6">
    <p>
      Accurately analyze any text in seconds with our{" "}
      <strong>Free Online Text Counter</strong> – the ultimate word counter,
      character counter, line counter, and paragraph counter for writers,
      students, SEO experts, and professionals. Whether you&apos;re crafting
      essays, optimizing web content, or tracking social media limits, our tool
      delivers real-time, precise metrics to streamline your workflow.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Key Features & Benefits</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">📊 Instant Text Analysis</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Word Counter:</strong> Track total words for essays,
            articles, or SEO content (ideal for hitting word limits).
          </li>
          <li>
            <strong>Character Counter:</strong> Count characters (with/without
            spaces) for SMS, tweets, or meta descriptions.
          </li>
          <li>
            <strong>Line Counter:</strong> Measure lines of code, poetry, or
            data logs.
          </li>
          <li>
            <strong>Paragraph Counter:</strong> Identify paragraph breaks for
            structured writing or editing.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">🚀 Why Use Our Text Counter?</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>SEO-Optimized:</strong> Analyze keyword density, content
            length, and readability for higher search rankings.
          </li>
          <li>
            <strong>Real-Time Updates:</strong> See results instantly as you
            type or paste text.
          </li>
          <li>
            <strong>Multi-Platform Support:</strong> Perfect for blogs, academic
            papers, code, spreadsheets, and social media.
          </li>
          <li>
            <strong>Export Ready:</strong> Copy or download results for reports,
            presentations, or client reviews.
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Who Needs a Text Counter?</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>
        <strong>Writers & Editors:</strong> Stay within word limits for
        publishers, clients, or platforms like Medium.
      </li>
      <li>
        <strong>Students:</strong> Format essays, theses, or research papers to
        meet academic guidelines.
      </li>
      <li>
        <strong>SEO Specialists:</strong> Optimize meta titles, descriptions,
        and content for Google&apos;s algorithms.
      </li>
      <li>
        <strong>Developers:</strong> Validate input lengths for forms, APIs, or
        database entries.
      </li>
      <li>
        <strong>Social Media Managers:</strong> Craft posts within platform
        limits (Twitter/X, Instagram, LinkedIn).
      </li>
    </ul>

    <hr />

    <h3 className="text-xl font-bold">How It Works</h3>
    <ol className="list-decimal pl-6 space-y-2">
      <li>
        <strong>Paste or Type Text:</strong> Input your content into the text
        box.
      </li>
      <li>
        <strong>Auto-Calculate:</strong> Metrics update instantly—no clicks
        needed.
      </li>
      <li>
        <strong>Refine & Export:</strong> Use data to edit, trim, or enhance
        your text.
      </li>
    </ol>

    <hr />

    <h3 className="text-xl font-bold">Why Choose Us?</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>
        ✅ <strong>100% Free & Secure:</strong> No ads, sign-ups, or data
        tracking.
      </li>
      <li>
        ✅ <strong>Mobile-Friendly:</strong> Works flawlessly on phones,
        tablets, and desktops.
      </li>
      <li>
        ✅ <strong>Advanced Insights:</strong> Track readability scores, average
        word length, and keyword frequency.
      </li>
    </ul>

    <div className="mt-8 text-center">
      <p className="text-lg font-bold">
        Boost your productivity – try the web&apos;s most versatile text
        analysis tool today! ✨
      </p>
    </div>
  </div>
);

export function TextCounterLayout({
  title,
  description,
}: TextCounterLayoutProps) {
  const [inputText, setInputText] = React.useState("");
  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });

  const calculateStats = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const characters = text.length;
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;

    setTextStats({
      words,
      sentences,
      characters,
      paragraphs,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    calculateStats(newText);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
          <AdUnit slot="tool-header" format="horizontal" />
        </div>

        <Card>
          <CardContent className="p-6">
            <div id="toolArea" className="space-y-4">
              <Textarea
                placeholder="Enter text here..."
                value={inputText}
                onChange={handleInputChange}
                className="min-h-[300px] font-mono"
              />
              <TextStatsDisplay stats={textStats} />
            </div>
          </CardContent>
          <MidSectionAd />
        </Card>

        <AboutSection
          title="About Text Counter"
          content={textCounterAboutContent}
        />
      </div>
    </div>
  );
}
