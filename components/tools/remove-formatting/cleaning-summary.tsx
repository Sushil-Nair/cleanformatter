"use client";

import * as React from "react";
import { RemoveFormattingResult } from "@/lib/utils/remove-formatting/types";

interface CleaningSummaryProps {
  result: RemoveFormattingResult | null;
}

export function CleaningSummary({ result }: CleaningSummaryProps) {
  if (!result) return null;

  const { stats } = result;

  const totalRemoved =
    stats.removedHtmlTags +
    stats.removedScriptsAndStyles +
    stats.removedInlineStyles +
    stats.removedTrackingAttributes +
    stats.removedHyperlinks +
    stats.removedMarkdownTokens +
    stats.removedZeroWidthChars +
    stats.removedSpecialCharacters +
    stats.removedIndentationChars +
    stats.normalizedWhitespaceChars;

  return (
    <div className="mt-3 rounded-md border bg-muted/40 p-3 text-xs space-y-1">
      <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground">
        Cleaning Summary
      </p>
      <p>
        Characters:{" "}
        <span className="font-mono">
          {stats.originalLength} → {stats.cleanedLength}
        </span>
      </p>
      <p>Total formatting-related changes: {totalRemoved}</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
        <SummaryRow label="HTML tags removed" value={stats.removedHtmlTags} />
        <SummaryRow
          label="Scripts/styles removed"
          value={stats.removedScriptsAndStyles}
        />
        <SummaryRow
          label="Inline styles removed"
          value={stats.removedInlineStyles}
        />
        <SummaryRow
          label="Tracking attrs removed"
          value={stats.removedTrackingAttributes}
        />
        <SummaryRow label="Links cleaned" value={stats.removedHyperlinks} />
        <SummaryRow
          label="Markdown tokens removed"
          value={stats.removedMarkdownTokens}
        />
        <SummaryRow
          label="Entities normalized"
          value={stats.normalizedEntities}
        />
        <SummaryRow
          label="Invisible chars removed"
          value={stats.removedZeroWidthChars}
        />
        <SummaryRow
          label="Special chars removed"
          value={stats.removedSpecialCharacters}
        />
        <SummaryRow
          label="Indentation chars removed"
          value={stats.removedIndentationChars}
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  if (!value) return null;
  return (
    <p className="flex justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono">{value}</span>
    </p>
  );
}
