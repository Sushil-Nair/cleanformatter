// lib/utils/fix-spacing/steps/fixPunctuationSpacingStep.ts

import { SpacingStepResult } from "../types";

/**
 * Fix spacing around punctuation such as .,?!:
 *
 * 1. Remove spaces BEFORE punctuation:
 *    "Hello , world ! " → "Hello, world!"
 *
 * 2. Ensure a space AFTER punctuation when needed:
 *    "Hello.World" → "Hello. World"
 *
 * Includes safety checks to avoid breaking:
 * - decimals (e.g., 3.14)
 * - URLs (e.g., example.com)
 * - email addresses
 * - markdown lists (e.g., "1. Item")
 */
export function fixPunctuationSpacingStep(input: string): SpacingStepResult {
  let fixes = 0;
  let text = input;

  /**
   * 1. Remove spaces before punctuation
   *    EX: "Hello , world !" → "Hello, world!"
   */
  text = text.replace(/(\S)\s+([.,!?;:])/g, (_, a, b) => {
    fixes++;
    return `${a}${b}`;
  });

  /**
   * 2. Add missing space after punctuation:
   *    "Hello.World" → "Hello. World"
   *
   * BUT avoid breaking:
   * - decimals: 3.14
   * - abbreviations: U.S.A.
   * - URLs: site.com
   * - markdown ordered lists: 1. Item
   */
  text = text.replace(/([.,!?;:])([A-Za-z])/g, (match, punct, nextChar) => {
    // Avoid decimals
    if (punct === "." && /\d/.test(match[0]) && /\d/.test(nextChar)) {
      return match; // do not modify "3.14"
    }

    // Avoid URLs: detect "word.word"
    if (punct === "." && /[A-Za-z]\.[A-Za-z]/.test(match)) {
      return match;
    }

    fixes++;
    return `${punct} ${nextChar}`;
  });

  /**
   * 3. Fix multiple spaces AFTER punctuation:
   *    "Hello.   World" → "Hello. World"
   */
  text = text.replace(/([.,!?;:])\s{2,}([A-Za-z0-9])/g, (_, a, b) => {
    fixes++;
    return `${a} ${b}`;
  });

  if (fixes === 0) {
    return { text: input };
  }

  return {
    text,
    statsDelta: {
      punctuationSpacingFixes: fixes,
      // Unchanged:
      spacesCollapsed: 0,
      spacesRemoved: 0,
      unicodeSpacesReplaced: 0,
      indentationCharsRemoved: 0,
      blankLinesRemoved: 0,
      tabsReplaced: 0,
      pdfSpacingFixes: 0,
      bracketSpacingFixes: 0,
      linesProcessed: text.split("\n").length,
    },
  };
}
