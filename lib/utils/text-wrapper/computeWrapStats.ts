// lib/utils/text-wrapper/computeWrapStats.ts

import type { TextStats } from "./types";

/**
 * computeWrapStats
 * -----------------
 * A wrapping-focused statistics engine.
 * Computes structural metrics such as line count and average line length,
 * which are essential for validating wrap output.
 *
 * This runs fast even on large text blocks.
 */
export function computeWrapStats(text: string): TextStats {
  if (!text || text.trim().length === 0) {
    return {
      chars: 0,
      charsNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      avgLineLength: 0,
    };
  }

  // Normalize line endings first (CRLF → LF)
  const normalized = text.replace(/\r\n?/g, "\n");

  // Character counts
  const chars = normalized.length;
  const charsNoSpaces = normalized.replace(/\s+/g, "").length;

  // Word count
  const wordMatches = normalized.match(/\S+/g);
  const words = wordMatches ? wordMatches.length : 0;

  // Sentence count (basic heuristic, light & fast)
  const sentenceMatches = normalized.match(/[^.!?]+[.!?]+/g);
  const sentences =
    sentenceMatches && sentenceMatches.length > 0
      ? sentenceMatches.length
      : normalized.trim().length > 0
      ? 1
      : 0;

  // Paragraphs = split by blank lines (LF-based)
  const paragraphBlocks = normalized.split(/\n{2,}/);
  const paragraphs = paragraphBlocks.filter((p) => p.trim().length > 0).length;

  // Wrapping-relevant metrics
  const linesArray = normalized.split("\n");
  const lines =
    linesArray.length === 1 && linesArray[0].trim().length === 0
      ? 0
      : linesArray.length;

  const avgLineLength = lines > 0 ? Math.round(chars / lines) : 0;

  return {
    chars,
    charsNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    avgLineLength,
  };
}
