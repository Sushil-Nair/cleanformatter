// lib/utils/text-wrapper/types.ts

export type WrapMode = "word" | "char" | "smart" | "code";

export interface WrapOptions {
  mode: WrapMode;
  width: number; // Max characters per line
  hyphenate: boolean; // Allow breaking inside long words
  preserveLines: boolean; // Keep existing line breaks
  unwrapFirst: boolean; // Remove hard wraps before rewrapping
  preserveIndentation: boolean; // Keep leading whitespace on each line
  forceBreakLongWords: boolean; // Break URLs / super-long tokens when needed
}

export interface TextStats {
  chars: number;
  charsNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  avgLineLength: number;
}

export interface WrapResult {
  original: string;
  wrapped: string;
  options: WrapOptions;
  statsInput: TextStats;
  statsOutput: TextStats;
}
