import { StepResult } from "../types";

export function removeTrackingAttributesStep(input: string): StepResult {
  const attrRegex =
    /\s(?:data-[a-z0-9_-]+|aria-[a-z0-9_-]+|on[a-z]+)="[^"]*"/gi;

  const matches = input.match(attrRegex);
  const count = matches?.length ?? 0;

  const text = input.replace(attrRegex, "");

  return {
    text,
    statsDelta: {
      removedTrackingAttributes: count,
    },
  };
}
