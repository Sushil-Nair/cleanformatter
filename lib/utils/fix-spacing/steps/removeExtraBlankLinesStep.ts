// lib/utils/fix-spacing/steps/removeExtraBlankLinesStep.ts

import { SpacingStepResult } from "../types";

/**
 * Collapses multiple blank lines into a single blank line.
 *
 * Behavior:
 * - "line\n\n\ntext"  → "line\n\ntext"
 * - A line containing only spaces/tabs counts as blank.
 * - Trailing blank lines are reduced but not fully removed.
 *
 * This is important for:
 * - PDF text cleanup
 * - Email/WhatsApp cleanup
 * - AI-generated text with messy blank lines
 * - Log/file cleanup
 *
 * Code-safe mode is handled in the pipeline.
 */
export function removeExtraBlankLinesStep(input: string): SpacingStepResult {
  const lines = input.split("\n");

  let newLines: string[] = [];
  let blankStreak = 0;
  let removed = 0;

  for (const line of lines) {
    const isBlank = /^[ \t]*$/.test(line); // blank or whitespace-only line

    if (isBlank) {
      blankStreak++;

      if (blankStreak > 1) {
        removed++; // removed extra blank line
        continue; // skip adding this line
      }
    } else {
      blankStreak = 0; // reset streak when encountering non-blank line
    }

    newLines.push(line);
  }

  const text = newLines.join("\n");

  if (removed === 0) {
    return { text: input };
  }

  return {
    text,
    statsDelta: {
      blankLinesRemoved: removed,
      // Other stats
      spacesRemoved: 0,
      spacesCollapsed: 0,
      unicodeSpacesReplaced: 0,
      indentationCharsRemoved: 0,
      tabsReplaced: 0,
      pdfSpacingFixes: 0,
      punctuationSpacingFixes: 0,
      bracketSpacingFixes: 0,
      linesProcessed: newLines.length,
    },
  };
}
