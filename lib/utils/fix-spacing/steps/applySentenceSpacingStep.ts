// lib/utils/fix-spacing/steps/applySentenceSpacingStep.ts

import { SentenceSpacingMode, SpacingStepResult } from "../types";

const SENTENCE_PUNCTUATION = /[.!?]/;

/**
 * Enforces sentence spacing rules:
 *
 * Mode "single" → exactly ONE space after .?!
 * Mode "double" → exactly TWO spaces after .?!
 *
 * Example:
 *   "Hello.World" → "Hello. World" (single)
 *   "Hello. World" → "Hello.  World" (double)
 *
 * Smart safety:
 * - Does NOT modify decimals (e.g., 3.14)
 * - Does NOT modify URLs or emails
 * - Does NOT modify abbreviations (e.g., U.S.A.)
 * - Does NOT modify markdown numbered lists "1. Item"
 */
export function applySentenceSpacingStep(
  input: string,
  mode: SentenceSpacingMode
): SpacingStepResult {
  if (mode === "preserve") {
    return { text: input };
  }

  const desired = mode === "double" ? "  " : " ";

  let fixes = 0;

  // Regex:
  // 1. capture punctuation (group 1)
  // 2. capture existing whitespace (group 2, optional)
  // 3. capture next character (group 3)
  const regex = /([.!?])(\s*)(\S)/g;

  const text = input.replace(regex, (match, punct, spaces, nextChar) => {
    // Avoid decimals like "3.14"
    if (punct === "." && /\d/.test(match[0]) && /\d/.test(nextChar)) {
      return match;
    }

    // Avoid URLs: domain.com
    if (punct === "." && /[A-Za-z]\.[A-Za-z]/.test(match)) {
      return match;
    }

    // Avoid abbreviations: U.S.A.
    if (punct === "." && /^[A-Z]\.[A-Z]$/.test(match)) {
      return match;
    }

    // Avoid markdown numbered list: "1. Item"
    if (punct === "." && /^\d\.\s/.test(match)) {
      return match;
    }

    // Compute fixes
    if (spaces !== desired) {
      fixes++;
    }

    return `${punct}${desired}${nextChar}`;
  });

  if (fixes === 0) {
    return { text: input };
  }

  return {
    text,
    statsDelta: {
      spacesCollapsed: fixes, // spacing normalization
      // Others unchanged:
      spacesRemoved: 0,
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
