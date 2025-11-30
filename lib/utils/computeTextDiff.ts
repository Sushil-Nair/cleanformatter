import { diffChars, diffWords, diffLines } from "diff";

export type DiffMode = "chars" | "words" | "lines";

export interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export interface DiffStats {
  charsAdded: number;
  charsRemoved: number;
  wordsAdded: number;
  wordsRemoved: number;
  linesAdded: number;
  linesRemoved: number;
  totalChangedCharacters: number;
  totalChangedWords: number;
}

export interface TextDiffResult {
  parts: DiffPart[];
  stats: DiffStats;
}

function normalizeText(text: string): string {
  return text.replace(/\r\n/g, "\n");
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countNewlineBreaks(text: string): number {
  if (!text.includes("\n")) return 0;
  return text.split("\n").length - 1;
}

export function computeTextDiff(
  original: string,
  modified: string,
  mode: DiffMode
): TextDiffResult {
  const text1 = normalizeText(original);
  const text2 = normalizeText(modified);

  let parts: DiffPart[] = [];

  switch (mode) {
    case "chars":
      parts = diffChars(text1, text2);
      break;
    case "words":
      parts = diffWords(text1, text2);
      break;
    case "lines":
      parts = diffLines(text1, text2);
      break;
  }

  // STATS
  let charsAdded = 0;
  let charsRemoved = 0;
  let wordsAdded = 0;
  let wordsRemoved = 0;
  let linesAdded = 0;
  let linesRemoved = 0;

  for (const part of parts) {
    if (part.added) {
      // Characters
      charsAdded += part.value.length;

      // Words
      wordsAdded += countWords(part.value);

      // Real line additions (based on newline count)
      linesAdded += countNewlineBreaks(part.value);
    } else if (part.removed) {
      // Characters
      charsRemoved += part.value.length;

      // Words
      wordsRemoved += countWords(part.value);

      // Real line removals (based on newline count)
      linesRemoved += countNewlineBreaks(part.value);
    }
  }

  // Meaningful totals (humans understand this better)
  const totalChangedCharacters = charsAdded + charsRemoved;
  const totalChangedWords = wordsAdded + wordsRemoved;

  const stats: DiffStats = {
    charsAdded,
    charsRemoved,
    wordsAdded,
    wordsRemoved,
    linesAdded,
    linesRemoved,
    totalChangedCharacters,
    totalChangedWords,
  };

  return { parts, stats };
}
