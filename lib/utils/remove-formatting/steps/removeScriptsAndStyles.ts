import { StepResult } from "../types";

export function removeScriptsAndStylesStep(input: string): StepResult {
  let text = input;
  let removedCount = 0;

  const scriptMatches = text.match(/<script[\s\S]*?<\/script>/gi);
  const styleMatches = text.match(/<style[\s\S]*?<\/style>/gi);

  removedCount += scriptMatches?.length ?? 0;
  removedCount += styleMatches?.length ?? 0;

  text = text.replace(/<script[\s\S]*?<\/script>/gi, "");
  text = text.replace(/<style[\s\S]*?<\/style>/gi, "");

  return {
    text,
    statsDelta: {
      removedScriptsAndStyles: removedCount,
    },
  };
}
