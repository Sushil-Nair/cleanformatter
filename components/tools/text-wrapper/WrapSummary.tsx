"use client";

import type { WrapOptions, TextStats } from "@/lib/utils/text-wrapper";

interface WrapSummaryProps {
  options: WrapOptions;
  stats: TextStats;
}

export function WrapSummary({ options, stats }: WrapSummaryProps) {
  const modeLabel = {
    word: "Word Wrap",
    char: "Character Wrap",
    smart: "Smart Wrap",
    code: "Code Wrap",
  }[options.mode];

  return (
    <div className="w-full flex-wrap p-3 rounded-md bg-muted border text-sm flex items-center gap-2">
      <span className="font-medium">Summary:</span>

      <span>
        Wrapped to <span className="font-semibold">{options.width}</span>{" "}
        columns
      </span>

      <span className="text-muted-foreground">•</span>

      <span>
        Mode: <span className="font-semibold">{modeLabel}</span>
      </span>

      <span className="text-muted-foreground">•</span>

      <span>
        Lines: <span className="font-semibold">{stats.lines}</span>
      </span>
    </div>
  );
}
