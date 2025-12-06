import { StepResult } from "../types";

export function convertToPlainTextStep(input: string): StepResult {
  let text = input;

  // Normalize all line endings
  text = text.replace(/\r\n?/g, "\n");

  // Trim trailing spaces on each line
  text = text.replace(/[ \t]+$/gm, "");

  // Trim overall leading/trailing whitespace
  text = text.trim();

  return {
    text,
  };
}
