// lib/utils/fix-spacing/steps/normalizeLineBreaksStep.ts

import { SpacingStepResult } from "../types";

/**
 * Normalizes CRLF (\r\n) and CR (\r) into LF (\n)
 * This step improves consistency for the rest of the spacing pipeline.
 */
export function normalizeLineBreaksStep(input: string): SpacingStepResult {
  // If no CR characters exist, avoid unnecessary work
  if (!input.includes("\r")) {
    return { text: input };
  }

  const before = input.length;

  // Normalize CRLF and lone CR to LF
  const text = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const after = text.length;

  return {
    text,
    statsDelta: {
      // You may want to track how many characters were removed/converted
      // For now we simply count removed CR chars
      spacesRemoved: 0, // unchanged
      linesProcessed: text.split("\n").length,
      // difference between before and after gives count of CR removed
      unicodeSpacesReplaced: 0,
      pdfSpacingFixes: 0,
      punctuationSpacingFixes: 0,
      bracketSpacingFixes: 0,
      tabsReplaced: 0,
      indentationCharsRemoved: 0,
      blankLinesRemoved: 0,
      spacesCollapsed: 0,
      cleanedLength: after,
    },
  };
}
