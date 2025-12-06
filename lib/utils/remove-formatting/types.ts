export type RemoveFormattingMode = "custom" | "soft" | "deep" | "ultra";

export interface RemoveFormattingOptions {
  // High-level mode
  mode: RemoveFormattingMode;

  // HTML / Rich-text cleanup
  stripHtml: boolean;
  removeScriptsAndStyles: boolean;
  removeInlineStyles: boolean;
  removeTrackingAttributes: boolean;
  cleanHyperlinks: boolean;

  // Markdown cleanup
  removeMarkdown: boolean;

  // Text normalization
  convertToPlainText: boolean;
  removeIndentation: boolean;
  normalizeWhitespace: boolean;
  normalizeEntities: boolean;
  removeZeroWidthChars: boolean;
  filterSpecialCharacters: boolean;

  // Structure / safety
  preserveCodeBlocks: boolean;
  preserveListsAndHeadings: boolean;
}

export interface RemoveFormattingStats {
  originalLength: number;
  cleanedLength: number;

  removedHtmlTags: number;
  removedScriptsAndStyles: number;
  removedInlineStyles: number;
  removedTrackingAttributes: number;
  removedHyperlinks: number;

  removedMarkdownTokens: number;

  normalizedEntities: number;
  removedZeroWidthChars: number;
  removedSpecialCharacters: number;
  removedIndentationChars: number;
  normalizedWhitespaceChars: number;
}

export interface RemoveFormattingResult {
  cleanedText: string;
  stats: RemoveFormattingStats;
}

export interface StepResult {
  text: string;
  statsDelta?: Partial<RemoveFormattingStats>;
}

export type FormattingStep = (input: string) => StepResult;
