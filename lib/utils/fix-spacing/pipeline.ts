// lib/utils/fix-spacing/pipeline.ts

import {
  FixSpacingOptions,
  FixSpacingResult,
  SpacingStepResult,
} from "./types";

import {
  createInitialFixSpacingStats,
  applyFixSpacingStatsDelta,
  finalizeFixSpacingStats,
} from "./stats";

import { resolveFixSpacingOptions } from "./default";

// --- Import steps (we will create these soon) ---
import { normalizeLineBreaksStep } from "./steps/normalizeLineBreaksStep";
import { normalizeUnicodeSpacesStep } from "./steps/normalizeUnicodeSpacesStep";
import { fixPdfSpacingStep } from "./steps/fixPdfSpacingStep";
import { convertTabsStep } from "./steps/convertTabsStep";
import { collapseSpacesStep } from "./steps/collapseSpacesStep";
import { trimLinesStep } from "./steps/trimLinesStep";
import { fixPunctuationSpacingStep } from "./steps/fixPunctuationSpacingStep";
import { fixBracketSpacingStep } from "./steps/fixBracketSpacingStep";
import { removeIndentationStep } from "./steps/removeIndentationStep";
import { removeExtraBlankLinesStep } from "./steps/removeExtraBlankLinesStep";
import { applySentenceSpacingStep } from "./steps/applySentenceSpacingStep";
import { finalTrimStep } from "./steps/finalTrimStep";

/**
 * Apply a single step, update stats, and return new text.
 */
function applyStep(
  text: string,
  stats: any,
  stepFn: (input: string) => SpacingStepResult | null
): string {
  const result = stepFn(text);
  if (!result) return text;

  if (result.statsDelta) {
    applyFixSpacingStatsDelta(stats, result.statsDelta);
  }

  return result.text;
}

/**
 * Main pipeline entry point.
 */
export function fixSpacing(
  input: string,
  mode: FixSpacingOptions["mode"],
  userOptions: Partial<FixSpacingOptions> = {}
): FixSpacingResult {
  // 1. Resolve full options (preset + custom overrides)
  const options = resolveFixSpacingOptions(mode, userOptions);

  // 2. Prepare working text + stats
  let text = input;
  const stats = createInitialFixSpacingStats(input);

  // 3. Step order — carefully structured for performance & correctness

  // Normalize line breaks first
  if (options.normalizeLineBreaks) {
    text = applyStep(text, stats, normalizeLineBreaksStep);
  }

  // Replace Unicode spaces early to reduce edge-case behavior
  if (options.normalizeUnicodeSpaces) {
    text = applyStep(text, stats, normalizeUnicodeSpacesStep);
  }

  // Fix PDF spacing before other spacing logic
  if (options.fixPdfSpacing) {
    text = applyStep(text, stats, fixPdfSpacingStep);
  }

  // Tabs to spaces (before collapsing spacing)
  if (options.convertTabsToSpaces) {
    text = applyStep(text, stats, (txt) =>
      convertTabsStep(txt, options.tabSize)
    );
  }

  // Collapse multiple spaces
  if (options.collapseMultipleSpaces) {
    text = applyStep(text, stats, collapseSpacesStep);
  }

  // Trim leading + trailing whitespace on lines
  if (options.removeLeadingSpaces || options.removeTrailingSpaces) {
    text = applyStep(text, stats, (txt) =>
      trimLinesStep(
        txt,
        options.removeLeadingSpaces,
        options.removeTrailingSpaces
      )
    );
  }

  // Fix spacing around punctuation
  if (options.fixPunctuationSpacing) {
    text = applyStep(text, stats, fixPunctuationSpacingStep);
  }

  // Fix spacing around brackets
  if (options.fixBracketSpacing) {
    text = applyStep(text, stats, fixBracketSpacingStep);
  }

  // Remove indentation (if not preserving code blocks)
  if (options.removeIndentation && !options.preserveCodeLikeBlocks) {
    text = applyStep(text, stats, removeIndentationStep);
  }

  // Remove extra blank lines
  if (options.removeExtraBlankLines) {
    text = applyStep(text, stats, removeExtraBlankLinesStep);
  }

  // Adjust spaces after punctuation (single/double)
  if (options.sentenceSpacingMode !== "preserve") {
    text = applyStep(text, stats, (txt) =>
      applySentenceSpacingStep(txt, options.sentenceSpacingMode)
    );
  }

  // Final trim
  text = applyStep(text, stats, finalTrimStep);

  // 4. Finalize stats
  finalizeFixSpacingStats(stats, text);

  // 5. Return result
  return {
    cleanedText: text,
    stats,
  };
}
