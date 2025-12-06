// lib/utils/text-wrapper/index.ts

// Main Engine
export { wrapText } from "./wrapEngine";

// Types
export type { WrapMode, WrapOptions, TextStats, WrapResult } from "./types";

// Stats Engine
export { computeWrapStats } from "./computeWrapStats";

// Normalizers
export {
  normalizeLineEndings,
  trimTrailingWhitespacePerLine,
  collapseExcessBlankLines,
  safeNormalizeForWrapping,
} from "./normalizeText";

// Unwrap Engine
export { unwrapText, detectIfAlreadyWrapped } from "./unwrapEngine";

// Wrapping Modes
export {
  wrapWordMode,
  wrapCharMode,
  wrapSmartMode,
  wrapCodeMode,
} from "./wrapModes";
