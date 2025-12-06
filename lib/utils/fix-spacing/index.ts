// lib/utils/fix-spacing/index.ts

export { fixSpacing } from "./pipeline";

export {
  resolveFixSpacingOptions,
  PRESET_MAP,
  SOFT_PRESET,
  STRONG_PRESET,
  ULTRA_PRESET,
  BASE_DEFAULTS,
} from "./default";

export type {
  FixSpacingMode,
  FixSpacingOptions,
  FixSpacingStats,
  FixSpacingResult,
  SpacingStepResult,
  SentenceSpacingMode,
} from "./types";

export {
  createInitialFixSpacingStats,
  applyFixSpacingStatsDelta,
  finalizeFixSpacingStats,
} from "./stats";

// STEP EXPORTS (optional but useful for testing or tree-shaking)
export { normalizeLineBreaksStep } from "./steps/normalizeLineBreaksStep";
export { normalizeUnicodeSpacesStep } from "./steps/normalizeUnicodeSpacesStep";
export { fixPdfSpacingStep } from "./steps/fixPdfSpacingStep";
export { convertTabsStep } from "./steps/convertTabsStep";
export { collapseSpacesStep } from "./steps/collapseSpacesStep";
export { trimLinesStep } from "./steps/trimLinesStep";
export { fixPunctuationSpacingStep } from "./steps/fixPunctuationSpacingStep";
export { fixBracketSpacingStep } from "./steps/fixBracketSpacingStep";
export { removeIndentationStep } from "./steps/removeIndentationStep";
export { removeExtraBlankLinesStep } from "./steps/removeExtraBlankLinesStep";
export { applySentenceSpacingStep } from "./steps/applySentenceSpacingStep";
export { finalTrimStep } from "./steps/finalTrimStep";
