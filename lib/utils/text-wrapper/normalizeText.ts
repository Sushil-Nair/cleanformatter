// lib/utils/text-wrapper/normalizeText.ts

/**
 * normalizeLineEndings
 * --------------------
 * Converts all CRLF or CR → LF.
 * Safe and essential for predictable wrapping behavior.
 */
export function normalizeLineEndings(text: string): string {
  if (!text) return "";
  return text.replace(/\r\n?/g, "\n");
}

/**
 * trimTrailingWhitespacePerLine
 * -----------------------------
 * Removes trailing spaces/tabs from each line.
 * Does NOT touch indentation at the start of the line.
 * Does NOT collapse internal spacing.
 */
export function trimTrailingWhitespacePerLine(text: string): string {
  if (!text) return "";
  return text
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n");
}

/**
 * collapseExcessBlankLines
 * ------------------------
 * Reduces multiple blank lines down to a max consecutive count.
 * Defaults to allowing up to 2 blank lines.
 *
 * This is *optional* in the wrapping pipeline.
 */
export function collapseExcessBlankLines(
  text: string,
  maxConsecutive: number = 2
): string {
  if (!text) return "";

  const lines = text.split("\n");
  const result: string[] = [];
  let blankCount = 0;

  for (const line of lines) {
    const isBlank = line.trim().length === 0;

    if (isBlank) {
      blankCount++;
      if (blankCount <= maxConsecutive) {
        result.push(line);
      }
    } else {
      blankCount = 0;
      result.push(line);
    }
  }

  return result.join("\n");
}

/**
 * safeNormalizeForWrapping
 * ------------------------
 * A high-level safe normalization routine used throughout the engine.
 * Normalizes line endings and trims trailing whitespace.
 * *Does not* collapse blank lines automatically.
 */
export function safeNormalizeForWrapping(text: string): string {
  const normalized = normalizeLineEndings(text);
  const trimmed = trimTrailingWhitespacePerLine(normalized);
  return trimmed;
}
