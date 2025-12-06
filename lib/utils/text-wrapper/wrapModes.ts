// lib/utils/text-wrapper/wrapModes.ts

import type { WrapOptions } from "./types";

//
// TYPES
//
interface IndentResult {
  indent: string;
  content: string;
}

//
// HELPERS
//

/**
 * Split a line into indentation + content.
 */
function splitIndent(line: string): IndentResult {
  const match = line.match(/^(\s*)(.*)$/);
  return {
    indent: match?.[1] ?? "",
    content: match?.[2] ?? "",
  };
}

/**
 * Break a long word (URL/token) into width-sized chunks.
 */
function forceBreakWord(word: string, width: number): string[] {
  const out: string[] = [];
  let pos = 0;
  while (pos < word.length) {
    out.push(word.slice(pos, pos + width));
    pos += width;
  }
  return out;
}

/**
 * Wrap a paragraph into multiple lines (word-based).
 * Does NOT apply indentation — caller decides indentation.
 */
function wrapWordsToLines(
  text: string,
  width: number,
  forceBreakLongWords: boolean
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    // Hard break long words when enabled
    if (word.length > width && forceBreakLongWords) {
      if (current.length > 0) {
        lines.push(current);
        current = "";
      }
      const chunks = forceBreakWord(word, width);
      lines.push(...chunks);
      continue;
    }

    const candidate = current.length === 0 ? word : current + " " + word;
    if (candidate.length > width) {
      if (current.length > 0) lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current.length > 0) lines.push(current);
  return lines;
}

//
// WORD MODE
//
export function wrapWordMode(text: string, opts: WrapOptions): string {
  const { width, preserveLines, preserveIndentation, forceBreakLongWords } =
    opts;

  // Case 1: preserve each line individually
  if (preserveLines) {
    return text
      .split("\n")
      .map((line) => {
        if (line.trim().length === 0) return "";

        const { indent, content } = preserveIndentation
          ? splitIndent(line)
          : { indent: "", content: line.trim() };

        const wrapped = wrapWordsToLines(content, width, forceBreakLongWords);

        return wrapped.map((l) => indent + l).join("\n");
      })
      .join("\n");
  }

  // Case 2: paragraph-aware (blank lines split paragraphs)
  const paragraphs = text.split(/\n{2,}/);
  const wrappedParas = paragraphs.map((para) => {
    if (para.trim().length === 0) return "";

    const rawLines = para.split("\n").filter((l) => l.trim().length > 0);

    let indent = "";
    const contentParts: string[] = [];

    for (const raw of rawLines) {
      const { indent: i, content } = preserveIndentation
        ? splitIndent(raw)
        : { indent: "", content: raw.trim() };

      if (indent === "") indent = i;
      contentParts.push(content.trim());
    }

    const joined = contentParts.join(" ");
    const wrapped = wrapWordsToLines(joined, width, forceBreakLongWords);
    return wrapped.map((l) => indent + l).join("\n");
  });

  return wrappedParas.join("\n\n");
}

//
// CHARACTER MODE
//
export function wrapCharMode(text: string, opts: WrapOptions): string {
  const { width } = opts;

  const out: string[] = [];
  for (const line of text.split("\n")) {
    if (line.length === 0) {
      out.push("");
      continue;
    }
    let pos = 0;
    while (pos < line.length) {
      out.push(line.slice(pos, pos + width));
      pos += width;
    }
  }
  return out.join("\n");
}

//
// SMART MODE
//
function smartBreakLine(
  content: string,
  indent: string,
  width: number,
  forceBreakLongWords: boolean
): string[] {
  const out: string[] = [];
  let line = content;

  while (line.length > width) {
    let breakPos = -1;
    const windowStart = Math.max(0, width - 10);
    const windowEnd = Math.min(line.length, width + 10);

    // Look for best natural break
    for (let i = windowEnd; i >= windowStart; i--) {
      if (line[i] === " ") {
        const prev = line[i - 1];
        if (!"([{'\"".includes(prev)) {
          breakPos = i;
          break;
        }
      }
    }

    if (breakPos === -1) {
      if (forceBreakLongWords) breakPos = width;
      else {
        const nextSpace = line.indexOf(" ", width);
        breakPos = nextSpace !== -1 ? nextSpace : line.length;
      }
    }

    const chunk = line.slice(0, breakPos).trim();
    out.push(indent + chunk);
    line = line.slice(breakPos).trim();
  }

  if (line.length > 0) out.push(indent + line);
  return out;
}

export function wrapSmartMode(text: string, opts: WrapOptions): string {
  const { width, preserveLines, preserveIndentation, forceBreakLongWords } =
    opts;

  // Case 1: wrap each line independently
  if (preserveLines) {
    return text
      .split("\n")
      .map((raw) => {
        if (raw.trim().length === 0) return "";

        const { indent, content } = preserveIndentation
          ? splitIndent(raw)
          : { indent: "", content: raw.trim() };

        return smartBreakLine(content, indent, width, forceBreakLongWords).join(
          "\n"
        );
      })
      .join("\n");
  }

  // Case 2: paragraph mode
  const paragraphs = text.split(/\n{2,}/);
  const wrappedParas = paragraphs.map((block) => {
    if (block.trim().length === 0) return "";

    const lines = block.split("\n").filter((l) => l.trim().length > 0);
    let indent = "";

    const contentParts: string[] = [];
    lines.forEach((l, idx) => {
      if (preserveIndentation) {
        const parsed = splitIndent(l);
        if (idx === 0) indent = parsed.indent;
        contentParts.push(parsed.content.trim());
      } else {
        contentParts.push(l.trim());
      }
    });

    const joined = contentParts.join(" ");
    return smartBreakLine(joined, indent, width, forceBreakLongWords).join(
      "\n"
    );
  });

  return wrappedParas.join("\n\n");
}

//
// CODE MODE
//
export function wrapCodeMode(text: string, opts: WrapOptions): string {
  const { width, forceBreakLongWords } = opts;

  const out: string[] = [];
  for (const raw of text.split("\n")) {
    if (raw.trim().length === 0) {
      out.push("");
      continue;
    }

    const { indent, content } = splitIndent(raw);
    let line = content;

    while (line.length > width) {
      const breakPos = findCodeBreakPos(line, width);

      if (breakPos === -1) {
        if (forceBreakLongWords) {
          out.push(indent + line.slice(0, width));
          line = line.slice(width);
        } else {
          out.push(indent + line);
          line = "";
        }
      } else {
        const chunk = line.slice(0, breakPos).trimEnd();
        out.push(indent + chunk);
        line = line.slice(breakPos).trimStart();
      }
    }

    if (line.length > 0) out.push(indent + line);
  }

  return out.join("\n");
}

/**
 * Pick best code break location (whitespace/punctuation).
 */
function findCodeBreakPos(line: string, width: number): number {
  const fav = [" ", ",", ";", ")", "]", "}"];
  for (let i = width; i >= width - 15 && i >= 0; i--) {
    if (fav.includes(line[i])) return i + 1;
  }
  return -1;
}
