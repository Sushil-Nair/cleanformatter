"use client";

import React from "react";
import { DiffStats } from "@/lib/utils/computeTextDiff";

interface DiffStatsDisplayProps {
  stats: DiffStats;
}

export default function DiffStatsDisplay({ stats }: DiffStatsDisplayProps) {
  return (
    <div className="border-t pt-5 mt-6 text-sm">
      <h3 className="font-semibold mb-4">Diff Summary</h3>

      {/* CHARACTER STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatBlock
          label="Characters Added"
          value={stats.charsAdded}
          color="text-green-600 dark:text-green-400"
        />

        <StatBlock
          label="Characters Removed"
          value={stats.charsRemoved}
          color="text-red-600 dark:text-red-400"
        />

        <StatBlock
          label="Total Character Changes"
          value={stats.totalChangedCharacters}
          color="text-primary"
        />
      </div>

      {/* WORD STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatBlock
          label="Words Added"
          value={stats.wordsAdded}
          color="text-green-600 dark:text-green-400"
        />

        <StatBlock
          label="Words Removed"
          value={stats.wordsRemoved}
          color="text-red-600 dark:text-red-400"
        />

        <StatBlock
          label="Total Word Changes"
          value={stats.totalChangedWords}
          color="text-primary"
        />
      </div>

      {/* LINE STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatBlock
          label="Lines Added"
          value={stats.linesAdded}
          color="text-green-600 dark:text-green-400"
        />

        <StatBlock
          label="Lines Removed"
          value={stats.linesRemoved}
          color="text-red-600 dark:text-red-400"
        />

        <StatBlock
          label="Total Line Changes"
          value={stats.linesAdded + stats.linesRemoved}
        />
      </div>
    </div>
  );
}

function StatBlock({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-base font-semibold ${color || ""}`}>{value}</span>
    </div>
  );
}
