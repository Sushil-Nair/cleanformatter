import { StepResult } from "../types";

export function removeInlineStylesStep(input: string): StepResult {
  const styleAttrRegex = /\sstyle="[^"]*"/gi;
  const matches = input.match(styleAttrRegex);
  const count = matches?.length ?? 0;

  const text = input.replace(styleAttrRegex, "");

  return {
    text,
    statsDelta: {
      removedInlineStyles: count,
    },
  };
}
