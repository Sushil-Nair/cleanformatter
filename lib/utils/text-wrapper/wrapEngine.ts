// lib/utils/text-wrapper/wrapEngine.ts

import type { WrapOptions, WrapResult } from "./types";
import { safeNormalizeForWrapping } from "./normalizeText";
import { unwrapText } from "./unwrapEngine";
import { computeWrapStats } from "./computeWrapStats";

import {
  wrapWordMode,
  wrapCharMode,
  wrapSmartMode,
  wrapCodeMode,
} from "./wrapModes";

/**
 * Core pipeline for applying wrapping based on selected mode.
 */
function applyWrapMode(text: string, options: WrapOptions): string {
  switch (options.mode) {
    case "word":
      return wrapWordMode(text, options);
    case "char":
      return wrapCharMode(text, options);
    case "smart":
      return wrapSmartMode(text, options);
    case "code":
      return wrapCodeMode(text, options);
    default:
      return text;
  }
}

/**
 * The main entry point for the text-wrapper engine.
 * Clean, deterministic, and suitable for both client and server execution.
 */
export function wrapText(input: string, options: WrapOptions): WrapResult {
  // STEP 1 — Normalize input for consistency (LF-only, no trailing garbage)
  const normalized = safeNormalizeForWrapping(input);

  // STEP 2 — Optional unwrap phase
  const unwrapped = options.unwrapFirst
    ? unwrapText(normalized, {
        preserveIndentation: options.preserveIndentation,
      })
    : normalized;

  // STEP 3 — Apply selected wrapping strategy
  const wrapped = applyWrapMode(unwrapped, options);

  // STEP 4 — Compute stats
  const statsInput = computeWrapStats(input);
  const statsOutput = computeWrapStats(wrapped);

  // STEP 5 — Return structured result
  return {
    original: input,
    wrapped,
    options,
    statsInput,
    statsOutput,
  };
}
