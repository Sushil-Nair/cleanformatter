export interface ModernTextStats {
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

//Created separate ModernTextStats interface to avoid conflicts with existing TextStats interface in computeTextStats.ts for Remove Formatting Tool.
