"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import TextStatDisplay from "@/components/tools/text-counter/text-stats";
import TextActions from "@/components/tools/text-counter/text-actions";
import { computeTextStats, TextStats } from "@/lib/utils/computeTextStats";

interface TextCounterLayoutProps {
  title: string;
  description: string;
}
export default function TextCounterLayout({
  title,
  description,
}: TextCounterLayoutProps) {
  const [inputText, setInputText] = useState("");
  const [countSpaces, setCountSpaces] = useState(true);
  const [stats, setStats] = useState<TextStats>({
    words: 0,
    charactersWithSpaces: 0,
    charactersWithoutSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    avgWordLength: 0,
    longestWord: null,
    readingTimeSeconds: 0,
    speakingTimeSeconds: 0,
  });

  // ─────────────────────────────────────
  // Recalculate stats whenever text/toggle changes
  // ─────────────────────────────────────
  useEffect(() => {
    const nextStats = computeTextStats(inputText, {
      countSpaces,
    });
    setStats(nextStats);
  }, [inputText, countSpaces]);

  // ─────────────────────────────────────
  // Reset the tool
  // ─────────────────────────────────────
  const handleReset = () => {
    setInputText("");
    setStats(computeTextStats("", { countSpaces }));
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {/* TEXT INPUT */}
      <div>
        <Label htmlFor="text-input" className="text-base font-medium">
          Enter text below
        </Label>
        <Textarea
          id="text-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste your content here..."
          className="mt-2 min-h-[260px] resize-none font-mono text-[15px]"
        />
      </div>

      {/* ACTION BUTTONS */}
      <TextActions
        text={inputText}
        setText={setInputText}
        onReset={handleReset}
      />

      {/* CHARACTER MODE TOGGLE */}
      <div className="flex items-center gap-3 pt-4">
        <Switch
          id="count-spaces"
          checked={countSpaces}
          onCheckedChange={(checked) => setCountSpaces(checked)}
        />
        <Label htmlFor="count-spaces" className="text-sm cursor-pointer">
          {countSpaces
            ? "Characters mode: With spaces"
            : "Characters mode: Without spaces"}
        </Label>
      </div>

      {/* STATISTICS */}
      <TextStatDisplay stats={stats} countSpaces={countSpaces} />
    </Card>
  );
}
