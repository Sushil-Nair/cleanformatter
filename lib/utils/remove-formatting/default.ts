import { RemoveFormattingMode, RemoveFormattingOptions } from "./types";

export const defaultRemoveFormattingOptions: RemoveFormattingOptions = {
  mode: "soft",

  stripHtml: true,
  removeScriptsAndStyles: true,
  removeInlineStyles: true,
  removeTrackingAttributes: true,
  cleanHyperlinks: true,

  removeMarkdown: true,

  convertToPlainText: true,
  removeIndentation: false,
  normalizeWhitespace: false,
  normalizeEntities: true,
  removeZeroWidthChars: true,
  filterSpecialCharacters: false,

  preserveCodeBlocks: true,
  preserveListsAndHeadings: true,
};

const softPreset: Partial<RemoveFormattingOptions> = {
  stripHtml: true,
  removeScriptsAndStyles: true,
  removeInlineStyles: true,
  removeTrackingAttributes: true,
  cleanHyperlinks: true,
  removeMarkdown: false,
  normalizeWhitespace: false,
  filterSpecialCharacters: false,
};

const deepPreset: Partial<RemoveFormattingOptions> = {
  stripHtml: true,
  removeScriptsAndStyles: true,
  removeInlineStyles: true,
  removeTrackingAttributes: true,
  cleanHyperlinks: true,
  removeMarkdown: true,
  convertToPlainText: true,
  removeIndentation: true,
  normalizeWhitespace: true,
  normalizeEntities: true,
  removeZeroWidthChars: true,
  filterSpecialCharacters: false,
  preserveCodeBlocks: true,
  preserveListsAndHeadings: true,
};

const ultraPreset: Partial<RemoveFormattingOptions> = {
  ...deepPreset,
  filterSpecialCharacters: true,
  preserveCodeBlocks: false,
  preserveListsAndHeadings: false,
};

export function resolveOptions(
  userOptions: Partial<RemoveFormattingOptions> = {}
): RemoveFormattingOptions {
  const mode: RemoveFormattingMode = userOptions.mode ?? "soft";

  let modePreset: Partial<RemoveFormattingOptions> = {};
  if (mode === "soft") modePreset = softPreset;
  if (mode === "deep") modePreset = deepPreset;
  if (mode === "ultra") modePreset = ultraPreset;

  // Merge order: defaults → modePreset → userOptions
  return {
    ...defaultRemoveFormattingOptions,
    ...modePreset,
    ...userOptions,
    mode,
  };
}
