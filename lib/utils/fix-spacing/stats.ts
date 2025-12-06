// lib/utils/fix-spacing/stats.ts

import { FixSpacingStats } from "./types";

/**
 * Create a fresh FixSpacingStats object based on the original input.
 */
export function createInitialFixSpacingStats(input: string): FixSpacingStats {
  return {
    originalLength: input.length,
    cleanedLength: input.length,

    spacesRemoved: 0,
    spacesCollapsed: 0,
    tabsReplaced: 0,
    indentationCharsRemoved: 0,

    blankLinesRemoved: 0,
    unicodeSpacesReplaced: 0,
    pdfSpacingFixes: 0,
    punctuationSpacingFixes: 0,
    bracketSpacingFixes: 0,

    linesProcessed: 0,
  };
}

/**
 * Mutate the main stats object by merging deltas returned from a step.
 */
export function applyFixSpacingStatsDelta(
  stats: FixSpacingStats,
  delta?: Partial<FixSpacingStats>
) {
  if (!delta) return;

  for (const key of Object.keys(delta) as (keyof FixSpacingStats)[]) {
    const value = delta[key];
    if (typeof value === "number") {
      stats[key] += value;
    }
  }
}

/**
 * Update final text length at end of pipeline.
 */
export function finalizeFixSpacingStats(
  stats: FixSpacingStats,
  cleanedText: string
) {
  stats.cleanedLength = cleanedText.length;
}
