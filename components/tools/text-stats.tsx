"use client";

import { TextStats } from "@/types/tools";

interface TextStatsProps {
  stats: TextStats;
}

export function TextStatsDisplay({ stats }: TextStatsProps) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
      <div className="flex items-center gap-4">
        <div>
          <span className="font-medium">{stats.words}</span> words
        </div>
        <div>
          <span className="font-medium">{stats.characters}</span> characters
        </div>
        <div>
          <span className="font-medium">{stats.sentences}</span> sentences
        </div>
        <div>
          <span className="font-medium">{stats.paragraphs}</span> paragraphs
        </div>
      </div>
    </div>
  );
}
