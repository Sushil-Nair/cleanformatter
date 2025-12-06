"use client";

import * as React from "react";
import { FixSpacingStats } from "@/lib/utils/fix-spacing";
import { cn } from "@/lib/utils";

interface SummaryProps {
  stats: FixSpacingStats | null;
  isProcessing?: boolean;
}

export function FixSpacingSummary({ stats, isProcessing }: SummaryProps) {
  if (!stats) return null;

  const {
    spacesCollapsed,
    spacesRemoved,
    tabsReplaced,
    indentationCharsRemoved,
    blankLinesRemoved,
    unicodeSpacesReplaced,
    pdfSpacingFixes,
    punctuationSpacingFixes,
    bracketSpacingFixes,
  } = stats;

  const totalAdjustments =
    spacesCollapsed +
    spacesRemoved +
    tabsReplaced +
    indentationCharsRemoved +
    blankLinesRemoved +
    unicodeSpacesReplaced +
    pdfSpacingFixes +
    punctuationSpacingFixes +
    bracketSpacingFixes;

  return (
    <div
      className={cn(
        "mt-6 rounded-lg border bg-background p-4 shadow-sm",
        "transition-opacity",
        isProcessing ? "opacity-50" : ""
      )}
    >
      <h3 className="font-semibold text-sm mb-3">Spacing Summary</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm">
        <SummaryItem label="Spaces collapsed" value={spacesCollapsed} />
        <SummaryItem label="Spaces removed" value={spacesRemoved} />
        <SummaryItem label="Tabs replaced" value={tabsReplaced} />
        <SummaryItem
          label="Indentation removed"
          value={indentationCharsRemoved}
        />
        <SummaryItem label="Blank lines removed" value={blankLinesRemoved} />
        <SummaryItem
          label="Unicode spaces normalized"
          value={unicodeSpacesReplaced}
        />
        <SummaryItem label="PDF spacing fixes" value={pdfSpacingFixes} />
        <SummaryItem
          label="Punctuation fixes"
          value={punctuationSpacingFixes}
        />
        <SummaryItem label="Bracket fixes" value={bracketSpacingFixes} />
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        Total adjustments: {totalAdjustments}
      </div>
    </div>
  );
}

/* ---------------- Summary Item ---------------- */

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
