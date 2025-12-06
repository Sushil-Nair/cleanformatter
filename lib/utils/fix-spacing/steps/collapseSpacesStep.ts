// lib/utils/fix-spacing/steps/collapseSpacesStep.ts

import { SpacingStepResult } from "../types";

/**
 * Collapse multiple consecutive spaces into a single space.
 * Example:
 *   "Hello   world" → "Hello world"
 *
 * This step does NOT affect:
 * - Newlines
 * - Tabs (they are already converted earlier)
 *
 * This is one of the most common spacing cleanup operations.
 */
export function collapseSpacesStep(input: string): SpacingStepResult {
  // Quick check to skip unnecessary work
  if (!/\s{2,}/.test(input)) {
    return { text: input };
  }

  let removed = 0;

  // Replace runs of 2+ spaces with a single space
  const text = input.replace(/ {2,}/g, (match) => {
    removed += match.length - 1;
    return " ";
  });

  return {
    text,
    statsDelta: {
      spacesCollapsed: removed,
      // No other stats changed:
      spacesRemoved: 0,
      unicodeSpacesReplaced: 0,
      tabsReplaced: 0,
      indentationCharsRemoved: 0,
      blankLinesRemoved: 0,
      pdfSpacingFixes: 0,
      punctuationSpacingFixes: 0,
      bracketSpacingFixes: 0,
      linesProcessed: text.split("\n").length,
    },
  };
}
