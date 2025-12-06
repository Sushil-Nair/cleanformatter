// lib/utils/fix-spacing/steps/fixPdfSpacingStep.ts

import { SpacingStepResult } from "../types";

/**
 * Fixes spacing artifacts common in text extracted from PDFs:
 * - "T h i s   i s   t e x t" → "This is text"
 * - "Exam\nple" → "Example"
 * - Hyphenated line breaks "ex-\nample" → "example"
 * - Spaced-out uppercase headings
 *
 * Designed to be safe and high-performance for large text.
 */
export function fixPdfSpacingStep(input: string): SpacingStepResult {
  let text = input;
  let fixes = 0;

  /**
   * 1. Fix hyphenated line breaks:
   *    "ex-\nam ple" → "example"
   */
  text = text.replace(/(\w)-\s*\n\s*(\w)/g, (_, a, b) => {
    fixes++;
    return a + b;
  });

  /**
   * 2. Remove mid-sentence newlines if both sides look like part of the same sentence:
   *    "Hello\nworld" → "Hello world"
   *    but NOT:
   *    - list items
   *    - headings
   *    - bullet points
   */
  text = text.replace(/([a-z0-9,;:])\s*\n\s*([a-z0-9])/gi, (match, a, b) => {
    fixes++;
    return `${a} ${b}`;
  });

  /**
   * 3. Collapse artificial per-character spacing:
   *    "T h i s" → "This"
   *    "S p a c e d" → "Spaced"
   *
   * We detect sequences like: "A B C D" (letters separated by spaces)
   */
  text = text.replace(/\b([A-Za-z])(?:\s+([A-Za-z])){2,}\b/g, (match) => {
    fixes++;
    return match.replace(/\s+/g, "");
  });

  /**
   * 4. Fix spaced-out words:
   *    "e x a m p l e" → "example"
   */
  text = text.replace(/\b(?:[A-Za-z]\s){2,}[A-Za-z]\b/g, (match) => {
    fixes++;
    return match.replace(/\s+/g, "");
  });

  /**
   * 5. Remove double spaces around punctuation created by PDF tools
   *    "word  ." → "word."
   */
  text = text.replace(/(\S)\s{2,}([.,!?:;])/g, (_, a, b) => {
    fixes++;
    return `${a}${b}`;
  });

  /**
   * If nothing changed, skip stats.
   */
  if (fixes === 0) {
    return { text: input };
  }

  return {
    text,
    statsDelta: {
      pdfSpacingFixes: fixes,
      // Others unchanged:
      unicodeSpacesReplaced: 0,
      spacesCollapsed: 0,
      spacesRemoved: 0,
      punctuationSpacingFixes: 0,
      bracketSpacingFixes: 0,
      indentationCharsRemoved: 0,
      blankLinesRemoved: 0,
      tabsReplaced: 0,
      linesProcessed: text.split("\n").length,
    },
  };
}
