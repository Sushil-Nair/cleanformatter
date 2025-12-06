import { StepResult } from "../types";

export function cleanHyperlinksStep(input: string): StepResult {
  let text = input;
  let removed = 0;

  // HTML links: <a ...>text</a> -> text
  // Using [\s\S]*? instead of the "s" regex flag for compatibility
  const htmlLinkRegex = /<a[^>]*>([\s\S]*?)<\/a>/gi;
  const htmlMatches = [...text.matchAll(htmlLinkRegex)];
  removed += htmlMatches.length;
  text = text.replace(htmlLinkRegex, (_m, inner) => inner ?? "");

  // Markdown links: [text](url) -> text
  const mdLinkRegex = /\[([^\]]+)]\(([^)]+)\)/g;
  const mdMatches = [...text.matchAll(mdLinkRegex)];
  removed += mdMatches.length;
  text = text.replace(mdLinkRegex, (_m, label) => String(label));

  return {
    text,
    statsDelta: {
      removedHyperlinks: removed,
    },
  };
}
