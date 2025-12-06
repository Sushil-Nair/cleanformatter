// lib/utils/fix-spacing/steps/finalTrimStep.ts

import { SpacingStepResult } from "../types";

/**
 * Performs a final trim on the full text:
 *
 * - Removes leading whitespace before the first visible character
 * - Removes trailing whitespace after the last visible character
 *
 * Does NOT:
 * - Collapse internal lines
 * - Modify internal spacing
 * - Touch indentation or line-specific structure
 *
 * This is the final polish step in the pipeline.
 */
export function finalTrimStep(input: string): SpacingStepResult {
  const leadingMatch = input.match(/^\s+/);
  const trailingMatch = input.match(/\s+$/);

  const leadingRemoved = leadingMatch ? leadingMatch[0].length : 0;
  const trailingRemoved = trailingMatch ? trailingMatch[0].length : 0;

  const totalRemoved = leadingRemoved + trailingRemoved;

  if (totalRemoved === 0) {
    return { text: input };
  }

  const text = input.trim();

  return {
    text,
    statsDelta: {
      spacesRemoved: totalRemoved,
      // Other stats unchanged:
      spacesCollapsed: 0,
      unicodeSpacesReplaced: 0,
      blankLinesRemoved: 0,
      indentationCharsRemoved: 0,
      tabsReplaced: 0,
      pdfSpacingFixes: 0,
      punctuationSpacingFixes: 0,
      bracketSpacingFixes: 0,
      linesProcessed: text.split("\n").length,
    },
  };
}
