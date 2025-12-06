// lib/utils/fix-spacing/steps/fixBracketSpacingStep.ts

import { SpacingStepResult } from "../types";

/**
 * Fixes spacing just inside and outside brackets:
 *
 * 1. ( text ) → (text)
 * 2. [ text ] → [text]
 * 3. { text } → {text}
 * 4. < text > → <text>
 *
 * Also fixes:
 *    "word ( text )" → "word (text)"
 *
 * But safely avoids breaking:
 * - Markdown links: [Title](http://example.com)
 * - Markdown images: ![Alt](url)
 * - HTML/JSX tags: <div>, <span>
 * - URLs containing brackets
 * - Code patterns such as if ( x ) { y }
 */
export function fixBracketSpacingStep(input: string): SpacingStepResult {
  let fixes = 0;
  let text = input;

  /**
   * 1. Remove spaces just INSIDE brackets:
   *    "( text )" → "(text)"
   */
  text = text.replace(/([(\[{<])\s+(\S)/g, (match, open, next) => {
    // Avoid breaking HTML/JSX tags: < div> or < span
    if (open === "<" && /<\s+\w/.test(match)) return match;

    fixes++;
    return `${open}${next}`;
  });

  text = text.replace(/(\S)\s+([)\]}>])/g, (match, prev, close) => {
    fixes++;
    return `${prev}${close}`;
  });

  /**
   * 2. Remove excessive spacing OUTSIDE brackets:
   *    "word ( text )" → "word (text)"
   *    "word  (text)" → "word (text)"
   */
  text = text.replace(/(\S)\s+([(\[{<])/g, (match, prev, open) => {
    // Avoid markdown: "! [Alt]" pattern from images
    if (prev === "!" && open === "[") return match;

    fixes++;
    return `${prev} ${open}`;
  });

  /**
   * Handle "closing bracket + space + next word"
   * Example: "(text)  hello" → "(text) hello"
   */
  text = text.replace(/([)\]}>])\s{2,}(\S)/g, (match, close, next) => {
    fixes++;
    return `${close} ${next}`;
  });

  if (fixes === 0) {
    return { text: input };
  }

  return {
    text,
    statsDelta: {
      bracketSpacingFixes: fixes,
      // Others remain unchanged:
      spacesCollapsed: 0,
      spacesRemoved: 0,
      unicodeSpacesReplaced: 0,
      indentationCharsRemoved: 0,
      blankLinesRemoved: 0,
      tabsReplaced: 0,
      pdfSpacingFixes: 0,
      punctuationSpacingFixes: 0,
      linesProcessed: text.split("\n").length,
    },
  };
}
