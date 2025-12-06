// lib/utils/fix-spacing/steps/convertTabsStep.ts

import { SpacingStepResult } from "../types";

/**
 * Converts tab characters into N spaces.
 * N = tabSize (default 4, customizable)
 *
 * This step greatly improves consistency because tabs create
 * unpredictable indentation depending on editor/viewer.
 *
 * Important: This step only converts — it does NOT remove indentation.
 */
export function convertTabsStep(
  input: string,
  tabSize: number = 4
): SpacingStepResult {
  if (!input.includes("\t")) {
    return { text: input }; // No tabs → skip work + skip stats
  }

  const spaces = " ".repeat(tabSize);
  let tabCount = 0;

  // Replace all tabs while counting them
  const text = input.replace(/\t/g, () => {
    tabCount++;
    return spaces;
  });

  return {
    text,
    statsDelta: {
      tabsReplaced: tabCount,
      // Others unchanged:
      spacesRemoved: 0,
      spacesCollapsed: 0,
      unicodeSpacesReplaced: 0,
      indentationCharsRemoved: 0,
      blankLinesRemoved: 0,
      pdfSpacingFixes: 0,
      punctuationSpacingFixes: 0,
      bracketSpacingFixes: 0,
      linesProcessed: text.split("\n").length,
    },
  };
}
