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
  /**
   * Optional UI toggle:
   * If true → tools may display charactersWithSpaces as "primary"
   * If false → tools may display charactersWithoutSpaces as "primary"
   */
  countSpaces?: boolean;
}

export function computeTextStats(
  text: string,
  options: ComputeTextStatsOptions = {}
): TextStats {
  // Normalize line endings to \n
  const normalized = text.replace(/\r\n/g, "\n");

  // -------------------------------
  // CHARACTER COUNTS
  // -------------------------------
  const charactersWithSpaces = normalized.length;
  const charactersWithoutSpaces = normalized.replace(/\s/g, "").length;

  // -------------------------------
  // WORD SPLIT (Improved Unicode handling)
  // Using a more robust regex than /\s+/
  // -------------------------------

  // Match sequences of letters/numbers/apostrophes across languages
  const wordMatches = normalized.match(/[\p{L}\p{N}']+/gu) || [];
  const words = wordMatches.length;

  // -------------------------------
  // SENTENCE COUNT (More robust)
  // Handles ellipses, abbreviations, multiple punctuation
  // -------------------------------
  const sentenceMatches =
    normalized.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+(\s|$)/g) || [];

  const sentences = sentenceMatches.length;

  // -------------------------------
  // PARAGRAPHS — any 2+ newline-separated blocks
  // -------------------------------
  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;

  // -------------------------------
  // LINES — even empty lines count
  // -------------------------------
  const lines = normalized === "" ? 0 : normalized.split("\n").length;

  // -------------------------------
  // AVERAGE WORD LENGTH
  // -------------------------------
  const totalCharsInWords = wordMatches.reduce((sum, w) => sum + w.length, 0);
  const avgWordLength = words > 0 ? totalCharsInWords / words : 0;

  // -------------------------------
  // LONGEST WORD
  // -------------------------------
  const longestWord =
    words > 0
      ? wordMatches.reduce((longest, w) =>
          w.length > longest.length ? w : longest
        )
      : null;

  // -------------------------------
  // TIME ESTIMATES
  // -------------------------------
  const readingTimeSeconds = Math.round((words / 230) * 60); // ~230 WPM average reading speed
  const speakingTimeSeconds = Math.round((words / 150) * 60); // ~150 WPM average speaking speed

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
