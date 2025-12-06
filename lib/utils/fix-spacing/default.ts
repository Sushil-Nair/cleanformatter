// lib/utils/fix-spacing/defaults.ts

import { FixSpacingMode, FixSpacingOptions } from "./types";

export const DEFAULT_TAB_SIZE = 4;

/**
 * Base defaults applied to all modes.
 */
export const BASE_DEFAULTS: FixSpacingOptions = {
  mode: "soft",

  // Core spacing normalization
  collapseMultipleSpaces: true,
  removeLeadingSpaces: true,
  removeTrailingSpaces: true,
  normalizeLineBreaks: true,
  removeExtraBlankLines: true,

  // Tabs & indentation
  convertTabsToSpaces: true,
  tabSize: DEFAULT_TAB_SIZE,
  removeIndentation: false, // soft mode keeps indentation

  // Advanced spacing fixes
  fixPunctuationSpacing: false,
  fixBracketSpacing: false,
  normalizeUnicodeSpaces: false,
  fixPdfSpacing: false,
  sentenceSpacingMode: "preserve",

  // Safety
  preserveCodeLikeBlocks: false,
};

/**
 * PRESETS
 */
export const SOFT_PRESET: FixSpacingOptions = {
  ...BASE_DEFAULTS,
  mode: "soft",
  collapseMultipleSpaces: true,
  removeExtraBlankLines: true,
  removeIndentation: false,
  convertTabsToSpaces: true,
  fixPunctuationSpacing: false,
  fixBracketSpacing: false,
  normalizeUnicodeSpaces: false,
  fixPdfSpacing: false,
};

export const STRONG_PRESET: FixSpacingOptions = {
  ...BASE_DEFAULTS,
  mode: "strong",
  collapseMultipleSpaces: true,
  removeLeadingSpaces: true,
  removeTrailingSpaces: true,
  convertTabsToSpaces: true,
  tabSize: 4,

  removeExtraBlankLines: true,
  normalizeLineBreaks: true,
  removeIndentation: true,

  fixPunctuationSpacing: true,
  fixBracketSpacing: true,
  normalizeUnicodeSpaces: true,
  fixPdfSpacing: true,

  sentenceSpacingMode: "single",
  preserveCodeLikeBlocks: true,
};

export const ULTRA_PRESET: FixSpacingOptions = {
  ...BASE_DEFAULTS,
  mode: "ultra",
  collapseMultipleSpaces: true,
  removeLeadingSpaces: true,
  removeTrailingSpaces: true,
  convertTabsToSpaces: true,
  tabSize: 1, // aggressive tab flattening

  removeExtraBlankLines: true,
  normalizeLineBreaks: true,
  removeIndentation: true,

  fixPunctuationSpacing: true,
  fixBracketSpacing: true,
  normalizeUnicodeSpaces: true,
  fixPdfSpacing: true,

  sentenceSpacingMode: "single",
  preserveCodeLikeBlocks: false,
};

/**
 * PRESET MAP
 */
export const PRESET_MAP: Record<FixSpacingMode, FixSpacingOptions> = {
  soft: SOFT_PRESET,
  strong: STRONG_PRESET,
  ultra: ULTRA_PRESET,
  custom: BASE_DEFAULTS,
};

/**
 * Resolve user-specified options into a complete options object.
 */
export function resolveFixSpacingOptions(
  mode: FixSpacingMode,
  userOptions: Partial<FixSpacingOptions> = {}
): FixSpacingOptions {
  const preset = PRESET_MAP[mode] ?? BASE_DEFAULTS;
  return {
    ...preset,
    ...userOptions,
    mode,
  };
}
