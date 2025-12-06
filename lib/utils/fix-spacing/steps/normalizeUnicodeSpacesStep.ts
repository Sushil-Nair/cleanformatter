// lib/utils/fix-spacing/steps/normalizeUnicodeSpacesStep.ts

import { SpacingStepResult } from "../types";

/**
 * Converts all uncommon Unicode whitespace characters into normal spaces.
 * Removes zero-width chars entirely.
 *
 * Why this is important:
 * - NBSP (U+00A0) appears when copying from websites or PDFs.
 * - Narrow NBSP (U+202F) appears in French typography.
 * - Thin spaces / en spaces / em spaces appear in PDFs & books.
 * - Zero-width spaces cause broken word wrapping.
 *
 * This step ensures consistent spacing for the rest of the pipeline.
 */
export function normalizeUnicodeSpacesStep(input: string): SpacingStepResult {
  const unicodeSpaceRegex = /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g; // all major unicode spaces
  const zeroWidthRegex = /[\u200B\u200C\u200D\uFEFF]/g; // ZWSP, ZWNJ, ZWJ, BOM

  let text = input;
  let unicodeSpaceCount = 0;
  let zeroWidthCount = 0;

  // Replace Unicode spaces with normal space
  text = text.replace(unicodeSpaceRegex, () => {
    unicodeSpaceCount++;
    return " ";
  });

  // Remove zero-width characters
  text = text.replace(zeroWidthRegex, () => {
    zeroWidthCount++;
    return "";
  });

  if (unicodeSpaceCount === 0 && zeroWidthCount === 0) {
    return { text: input }; // nothing changed → skip stats
  }

  return {
    text,
    statsDelta: {
      unicodeSpacesReplaced: unicodeSpaceCount,
      spacesRemoved: zeroWidthCount,
      // These fields remain unaffected
      spacesCollapsed: 0,
      punctuationSpacingFixes: 0,
      bracketSpacingFixes: 0,
      pdfSpacingFixes: 0,
      indentationCharsRemoved: 0,
      blankLinesRemoved: 0,
      tabsReplaced: 0,
      linesProcessed: text.split("\n").length,
    },
  };
}
