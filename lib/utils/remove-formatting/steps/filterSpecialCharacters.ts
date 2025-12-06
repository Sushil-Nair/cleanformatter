import { StepResult } from "../types";

/**
 * WARNING:
 * This aggressively removes non-ASCII characters and may not be
 * appropriate for non-English content. Use only when user explicitly selects it.
 */
export function filterSpecialCharactersStep(input: string): StepResult {
  const specialRegex = /[^\x09\x0A\x0D\x20-\x7E]/g;
  const matches = input.match(specialRegex);
  const count = matches?.length ?? 0;

  const text = input.replace(specialRegex, "");

  return {
    text,
    statsDelta: {
      removedSpecialCharacters: count,
    },
  };
}
