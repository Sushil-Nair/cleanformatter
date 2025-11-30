export interface TextStats {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  avgWordLength: number;
  longestWord: string | null;
  readingTimeSeconds: number;
  speakingTimeSeconds: number;
}

export interface ComputeTextStatsOptions {
  countSpaces?: boolean; // UI toggle selects which character count to show as primary
}

export function computeTextStats(
  text: string,
  options: ComputeTextStatsOptions = {}
): TextStats {
  const normalized = text.replace(/\r\n/g, "\n"); // normalize line endings

  // Character counts
  const charactersWithSpaces = normalized.length;
  const charactersWithoutSpaces = normalized.replace(/\s/g, "").length;

  // Words
  const rawWords = normalized.trim().split(/\s+/).filter(Boolean);

  const words = rawWords.length;

  // Sentences (very simplified heuristic, but works well for general English text)
  const sentences = normalized
    .split(/[\.\!\?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0).length;

  // Paragraphs: split by ANY number of blank lines
  const paragraphs = normalized
    .split(/\n{2,}/) // 2+ consecutive newlines = new paragraph
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // Line count: even empty lines count as lines
  const lines = normalized.split("\n").length;

  // Avg word length
  const avgWordLength =
    words > 0 ? rawWords.reduce((sum, w) => sum + w.length, 0) / words : 0;

  // Longest word
  const longestWord =
    words > 0
      ? rawWords.reduce((longest, w) =>
          w.length > longest.length ? w : longest
        )
      : null;

  // Time estimates
  // Avg reading speed: ~230 wpm
  // Avg speaking speed: ~150 wpm
  const readingTimeSeconds = Math.round((words / 230) * 60);
  const speakingTimeSeconds = Math.round((words / 150) * 60);

  return {
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    sentences,
    paragraphs,
    lines,
    avgWordLength,
    longestWord,
    readingTimeSeconds,
    speakingTimeSeconds,
  };
}
