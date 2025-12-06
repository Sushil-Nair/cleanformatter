import { StepResult } from "../types";

const basicEntities: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

export function normalizeEntitiesStep(input: string): StepResult {
  let text = input;
  let normalized = 0;

  for (const [entity, replacement] of Object.entries(basicEntities)) {
    const regex = new RegExp(entity, "g");
    const matches = text.match(regex);
    const count = matches?.length ?? 0;

    if (count > 0) {
      normalized += count;
      text = text.replace(regex, replacement);
    }
  }

  return {
    text,
    statsDelta: {
      normalizedEntities: normalized,
    },
  };
}
