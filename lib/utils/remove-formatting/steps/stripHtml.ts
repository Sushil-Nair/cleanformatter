import { StepResult } from "../types";

export function stripHtmlStep(input: string): StepResult {
  // Fallback: if there are no tags, short-circuit
  if (!/<[a-zA-Z!/][^>]*>/.test(input)) {
    return { text: input, statsDelta: { removedHtmlTags: 0 } };
  }

  // Browser environment with DOMParser
  if (typeof window !== "undefined" && "DOMParser" in window) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/html");
      const body = doc.body;

      const allElements = body.getElementsByTagName("*");
      const tagCount = allElements.length;

      const textContent = body.textContent ?? "";

      return {
        text: textContent,
        statsDelta: {
          removedHtmlTags: tagCount,
        },
      };
    } catch {
      // If DOMParser fails, fall back
    }
  }

  // Node or failure fallback: naive tag strip
  const matches = input.match(/<[^>]+>/g);
  const removedTags = matches?.length ?? 0;
  const text = input.replace(/<[^>]+>/g, "");

  return {
    text,
    statsDelta: {
      removedHtmlTags: removedTags,
    },
  };
}
