"use client";

import { ModernTextStats } from "@/types/text-stats-modern";

export function ModernTextStatsDisplay({ stats }: { stats: ModernTextStats }) {
  return (
    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-2">
      <p>Words: {stats.words}</p>
      <p>Chars (with spaces): {stats.charactersWithSpaces}</p>
      <p>Chars (no spaces): {stats.charactersWithoutSpaces}</p>
      <p>Sentences: {stats.sentences}</p>
      <p>Paragraphs: {stats.paragraphs}</p>
      <p>Lines: {stats.lines}</p>
      <p>Average word length: {stats.avgWordLength}</p>
      <p>Longest word: {stats.longestWord ?? "-"}</p>
      <p>Reading time: {stats.readingTimeSeconds}s</p>
      <p>Speaking time: {stats.speakingTimeSeconds}s</p>
    </div>
  );
}
