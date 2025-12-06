import { StepResult } from "../types";

export function removeIndentationStep(input: string): StepResult {
  let removedChars = 0;

  const text = input.replace(/^[ \t]+/gm, (match) => {
    removedChars += match.length;
    return "";
  });

  return {
    text,
    statsDelta: {
      removedIndentationChars: removedChars,
    },
  };
}
