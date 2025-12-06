// lib/engines/remove-formatting/steps/removeZeroWidthChars.ts
import { StepResult } from "../types";

// Covers: ZWSP, ZWJ, ZWNJ, BOM, soft hyphen, etc.
const zeroWidthRegex = /[\u200B-\u200D\uFEFF\u00AD]/g;

export function removeZeroWidthCharsStep(input: string): StepResult {
  const matches = input.match(zeroWidthRegex);
  const count = matches?.length ?? 0;

  const text = input.replace(zeroWidthRegex, "");

  return {
    text,
    statsDelta: {
      removedZeroWidthChars: count,
    },
  };
}
