// lib/utils/fix-spacing/types.ts

export type FixSpacingMode = "soft" | "strong" | "ultra" | "custom";

export type SentenceSpacingMode = "preserve" | "single" | "double";

export interface FixSpacingOptions {
  // High-level mode
  mode: FixSpacingMode;

  // Core spacing behaviors
  collapseMultipleSpaces: boolean; // turn multiple spaces into a single space
  removeLeadingSpaces: boolean; // trim leading spaces on each line
  removeTrailingSpaces: boolean; // trim trailing spaces on each line
  normalizeLineBreaks: boolean; // normalize \r\n / \r to \n
  removeExtraBlankLines: boolean; // collapse 3+ blank lines to max 1 or 2

  // Tabs & indentation
  convertTabsToSpaces: boolean; // convert tabs to spaces
  tabSize: number; // spaces per tab when converting
  removeIndentation: boolean; // remove indentation at line start (spaces/tabs)

  // Advanced spacing fixes
  fixPunctuationSpacing: boolean; // fix spaces before/after punctuation
  fixBracketSpacing: boolean; // fix spaces just inside/outside brackets
  normalizeUnicodeSpaces: boolean; // convert unicode spaces/NBSP to regular space
  fixPdfSpacing: boolean; // fix common PDF spacing issues
  sentenceSpacingMode: SentenceSpacingMode; // control spaces after .?!

  // Safety / context
  preserveCodeLikeBlocks: boolean; // try not to break code-style text (indent, blank lines)
}

export interface FixSpacingStats {
  originalLength: number;
  cleanedLength: number;

  spacesRemoved: number;
  spacesCollapsed: number;
  tabsReplaced: number;
  indentationCharsRemoved: number;

  blankLinesRemoved: number;
  unicodeSpacesReplaced: number;
  pdfSpacingFixes: number;
  punctuationSpacingFixes: number;
  bracketSpacingFixes: number;

  linesProcessed: number;
}

export interface FixSpacingResult {
  cleanedText: string;
  stats: FixSpacingStats;
}

export interface SpacingStepResult {
  text: string;
  statsDelta?: Partial<FixSpacingStats>;
}

export type SpacingStep = (input: string) => SpacingStepResult;
