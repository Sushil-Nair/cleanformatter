import { StepResult } from "../types";

export function normalizeWhitespaceStep(input: string): StepResult {
  const beforeLength = input.length;

  let text = input;

  // Convert multiple spaces/tabs to single space
  text = text.replace(/[ \t]+/g, " ");

  // Normalize line endings to \n
  text = text.replace(/\r\n?/g, "\n");

  // Collapse 3+ blank lines into max 2
  text = text.replace(/\n{3,}/g, "\n\n");

  const afterLength = text.length;

  const diff = beforeLength - afterLength;

  return {
    text,
    statsDelta: {
      normalizedWhitespaceChars: diff > 0 ? diff : 0,
    },
  };
}
