// lib/utils/text-wrapper/unwrapEngine.ts

/**
 * unwrapEngine
 * ------------
 * Safely removes existing hard wraps while preserving paragraph structure
 * and (optionally) indentation. This prepares text for fresh wrapping.
 *
 * Goals:
 * - Keep blank lines (paragraph boundaries)
 * - Combine lines that are artificially wrapped
 * - Preserve indentation if user opts in
 */

interface UnwrapOptions {
  preserveIndentation: boolean;
}

export function unwrapText(input: string, opts: UnwrapOptions): string {
  if (!input.trim()) return input;

  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  const result: string[] = [];

  let buffer: string[] = [];

  const flushBuffer = () => {
    if (buffer.length === 0) return;

    // Combine the buffered lines into one paragraph
    const combined = buffer.join(" ").replace(/\s+/g, " ").trim();
    result.push(combined);
    buffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine;

    const isBlank = line.trim().length === 0;

    if (isBlank) {
      // End of a paragraph → flush existing buffer
      flushBuffer();
      result.push(""); // keep the blank line
      continue;
    }

    // If preserving indentation, keep the indentation ONLY for the first line
    if (opts.preserveIndentation) {
      if (buffer.length === 0) {
        buffer.push(line);
      } else {
        buffer.push(line.trim());
      }
    } else {
      buffer.push(line.trim());
    }
  }

  // Flush leftover buffer
  flushBuffer();

  // Join paragraphs with single newlines (preserving blanks where needed)
  return result.join("\n");
}

/**
 * detectIfAlreadyWrapped
 * ----------------------
 * Optional helper for future versions.
 * Used to detect whether unwrapping is recommended.
 * Not used in pipeline by default.
 */
export function detectIfAlreadyWrapped(
  text: string,
  widthThreshold = 50
): boolean {
  const lines = text.split("\n");
  let shortCount = 0;

  for (const line of lines) {
    if (line.trim().length > 0 && line.length < widthThreshold) {
      shortCount++;
    }
  }

  // If a large number of lines are below threshold → possibly wrapped
  return shortCount > lines.length * 0.4;
}
