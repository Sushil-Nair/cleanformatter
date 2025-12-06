// lib/utils/fix-spacing/steps/removeIndentationStep.ts

import { SpacingStepResult } from "../types";

/**
 * Removes ALL leading indentation (spaces or tabs) from every line.
 *
 * Example:
 *   "    Hello" → "Hello"
 *   "\t\tText" → "Text"
 *
 * This step:
 * - Does NOT remove blank lines
 * - Does NOT modify trailing spaces
 * - Does NOT collapse internal spacing
 * - Runs ONLY when indentation removal is enabled
 *
 * Code-like blocks are already handled at the pipeline level via:
 *   if (options.removeIndentation && !options.preserveCodeLikeBlocks)
 */
export function removeIndentationStep(input: string): SpacingStepResult {
  // If there are no leading spaces or tabs, skip
  if (!/^[ \t]/m.test(input)) {
    return { text: input };
  }

  const lines = input.split("\n");
  let removed = 0;

  const processed = lines.map((line) => {
    const match = line.match(/^[ \t]+/);
    if (match) {
      removed += match[0].length;
      return line.replace(/^[ \t]+/, "");
    }
    return line;
  });

  const text = processed.join("\n");

  if (removed === 0) {
    return { text: input };
  }

  return {
    text,
    statsDelta: {
      indentationCharsRemoved: removed,
      // Other stats do not change here:
      spacesRemoved: 0,
      spacesCollapsed: 0,
      unicodeSpacesReplaced: 0,
      blankLinesRemoved: 0,
      tabsReplaced: 0,
      pdfSpacingFixes: 0,
      punctuationSpacingFixes: 0,
      bracketSpacingFixes: 0,
      linesProcessed: lines.length,
    },
  };
}
