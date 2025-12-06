// lib/engines/remove-formatting/steps/removeMarkdown.ts
import { StepResult } from "../types";

export function removeMarkdownStep(input: string): StepResult {
  let text = input;
  let tokensRemoved = 0;

  const removeStatic = (regex: RegExp, replacement: string) => {
    const matches = text.match(regex);
    tokensRemoved += matches?.length ?? 0;
    text = text.replace(regex, replacement);
  };

  const removeDynamic = (regex: RegExp, replacer: (m: string) => string) => {
    const matches = text.match(regex);
    tokensRemoved += matches?.length ?? 0;
    text = text.replace(regex, replacer);
  };

  // Images: ![alt](url) → ""
  removeStatic(/!\[[^\]]*]\([^)]*\)/g, "");

  // Markdown links already handled elsewhere but keep fallback
  removeStatic(/\[([^\]]+)]\(([^)]+)\)/g, "$1");

  // Headings
  removeStatic(/^#{1,6}\s*/gm, "");

  // Blockquotes
  removeStatic(/^>\s?/gm, "");

  // Emphasis/bold/italics
  removeStatic(/(\*{1,3}|_{1,3})([^*_]+)\1/g, "$2");

  // Inline code
  removeStatic(/`([^`]+)`/g, "$1");

  // Code fences using the dynamic replacer
  removeDynamic(/```[\s\S]*?```/g, (match) => {
    const inner = match.replace(/```/g, "");
    return inner.trim();
  });

  // Lists
  removeStatic(/^\s*([-*+]|\d+\.)\s+/gm, "");

  return {
    text,
    statsDelta: {
      removedMarkdownTokens: tokensRemoved,
    },
  };
}
