// lib/utils/fix-spacing/steps/trimLinesStep.ts

import { SpacingStepResult } from "../types";

/**
 * Trims leading and/or trailing spaces on each line, depending on options.
 *
 * - Leading spaces → indentation cleanup
 * - Trailing spaces → removes useless padding before newline
 *
 * Newlines and blank lines are preserved exactly.
 */
export function trimLinesStep(
  input: string,
  removeLeading: boolean,
  removeTrailing: boolean
): SpacingStepResult {
  if (!removeLeading && !removeTrailing) {
    return { text: input };
  }

  const lines = input.split("\n");
  let indentationRemoved = 0;
  let trailingRemoved = 0;

  const processed = lines.map((line) => {
    let updated = line;

    // Remove leading spaces/tabs
    if (removeLeading) {
      const match = updated.match(/^[ \t]+/);
      if (match) {
        indentationRemoved += match[0].length;
        updated = updated.replace(/^[ \t]+/, "");
      }
    }

    // Remove trailing spaces/tabs
    if (removeTrailing) {
      const match = updated.match(/[ \t]+$/);
      if (match) {
        trailingRemoved += match[0].length;
        updated = updated.replace(/[ \t]+$/, "");
      }
    }

    return updated;
  });

  const text = processed.join("\n");
  const totalRemoved = indentationRemoved + trailingRemoved;

  if (totalRemoved === 0) {
    return { text: input };
  }

  return {
    text,
    statsDelta: {
      indentationCharsRemoved: indentationRemoved,
      spacesRemoved: trailingRemoved,
      // Others unchanged:
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
