// lib/engines/remove-formatting/pipeline.ts
import {
  RemoveFormattingOptions,
  RemoveFormattingResult,
  RemoveFormattingStats,
  StepResult,
} from "./types";
import { resolveOptions } from "./default";
import { stripHtmlStep } from "./steps/stripHtml";
import { removeScriptsAndStylesStep } from "./steps/removeScriptsAndStyles";
import { removeInlineStylesStep } from "./steps/removeInlineStyles";
import { removeTrackingAttributesStep } from "./steps/removeTrackingAttributes";
import { cleanHyperlinksStep } from "./steps/cleanHyperlinks";
import { removeMarkdownStep } from "./steps/removeMarkdown";
import { normalizeEntitiesStep } from "./steps/normalizeEntities";
import { removeZeroWidthCharsStep } from "./steps/removeZeroWidthChars";
import { removeIndentationStep } from "./steps/removeIndentation";
import { normalizeWhitespaceStep } from "./steps/normalizeWhitespace";
import { filterSpecialCharactersStep } from "./steps/filterSpecialCharacters";
import { convertToPlainTextStep } from "./steps/convertToPlainText";

function createInitialStats(originalText: string): RemoveFormattingStats {
  return {
    originalLength: originalText.length,
    cleanedLength: originalText.length,

    removedHtmlTags: 0,
    removedScriptsAndStyles: 0,
    removedInlineStyles: 0,
    removedTrackingAttributes: 0,
    removedHyperlinks: 0,

    removedMarkdownTokens: 0,

    normalizedEntities: 0,
    removedZeroWidthChars: 0,
    removedSpecialCharacters: 0,
    removedIndentationChars: 0,
    normalizedWhitespaceChars: 0,
  };
}

function applyStep(
  text: string,
  stats: RemoveFormattingStats,
  stepFn: () => StepResult
): string {
  const result = stepFn();

  if (result.statsDelta) {
    for (const [key, value] of Object.entries(result.statsDelta)) {
      if (typeof value === "number") {
        // @ts-expect-error dynamic key
        stats[key] = (stats[key] ?? 0) + value;
      }
    }
  }

  return result.text;
}

/**
 * Main entry point: removeFormatting
 */
export function removeFormatting(
  input: string,
  userOptions: Partial<RemoveFormattingOptions> = {}
): RemoveFormattingResult {
  const options = resolveOptions(userOptions);

  let text = input;
  let stats: RemoveFormattingStats = createInitialStats(input);

  // 1. remove scripts & styles
  if (options.removeScriptsAndStyles) {
    text = applyStep(text, stats, () => removeScriptsAndStylesStep(text));
  }

  // 2. remove tracking attributes
  if (options.removeTrackingAttributes) {
    text = applyStep(text, stats, () => removeTrackingAttributesStep(text));
  }

  // 3. remove inline styles
  if (options.removeInlineStyles) {
    text = applyStep(text, stats, () => removeInlineStylesStep(text));
  }

  // 4. clean hyperlinks
  if (options.cleanHyperlinks) {
    text = applyStep(text, stats, () => cleanHyperlinksStep(text));
  }

  // 5. strip HTML tags
  if (options.stripHtml) {
    text = applyStep(text, stats, () => stripHtmlStep(text));
  }

  // 6. remove Markdown syntax
  if (options.removeMarkdown) {
    text = applyStep(text, stats, () => removeMarkdownStep(text));
  }

  // 7. normalize HTML entities
  if (options.normalizeEntities) {
    text = applyStep(text, stats, () => normalizeEntitiesStep(text));
  }

  // 8. remove zero-width characters
  if (options.removeZeroWidthChars) {
    text = applyStep(text, stats, () => removeZeroWidthCharsStep(text));
  }

  // 9. indentation removal
  if (options.removeIndentation) {
    text = applyStep(text, stats, () => removeIndentationStep(text));
  }

  // 10. whitespace normalization
  if (options.normalizeWhitespace) {
    text = applyStep(text, stats, () => normalizeWhitespaceStep(text));
  }

  // 11. special character filtering
  if (options.filterSpecialCharacters) {
    text = applyStep(text, stats, () => filterSpecialCharactersStep(text));
  }

  // 12. final plain text conversion
  if (options.convertToPlainText) {
    text = applyStep(text, stats, () => convertToPlainTextStep(text));
  }

  stats.cleanedLength = text.length;

  return {
    cleanedText: text,
    stats,
  };
}
