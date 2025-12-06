// lib/hooks/useTextWrapperEngine.ts

import { useEffect, useMemo, useState } from "react";
import {
  wrapText,
  type WrapOptions,
  type WrapResult,
  type TextStats,
} from "@/lib/utils/text-wrapper";

const DEFAULT_WRAP_OPTIONS: WrapOptions = {
  mode: "word",
  width: 80,
  hyphenate: false,
  preserveLines: false,
  unwrapFirst: false,
  preserveIndentation: false,
  forceBreakLongWords: true,
};

interface UseTextWrapperEngineResult {
  inputText: string;
  setInputText: (value: string) => void;
  wrappedText: string;
  options: WrapOptions;
  updateOptions: (patch: Partial<WrapOptions>) => void;
  statsInput: TextStats;
  statsOutput: TextStats;
  isProcessing: boolean;
}

/**
 * useTextWrapperEngine
 * --------------------
 * Central hook that connects the UI to the text-wrapper engine.
 * Handles:
 * - input text state
 * - wrap options
 * - debounced processing
 * - stats for input + output
 */
export function useTextWrapperEngine(
  initialText: string = "",
  initialOptions?: Partial<WrapOptions>
): UseTextWrapperEngineResult {
  const [inputText, setInputText] = useState<string>(initialText);

  const [options, setOptions] = useState<WrapOptions>({
    ...DEFAULT_WRAP_OPTIONS,
    ...(initialOptions ?? {}),
  });

  const [wrappedText, setWrappedText] = useState<string>("");
  const [statsInput, setStatsInput] = useState<TextStats>({
    chars: 0,
    charsNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    avgLineLength: 0,
  });
  const [statsOutput, setStatsOutput] = useState<TextStats>({
    chars: 0,
    charsNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    avgLineLength: 0,
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const stableOptions = useMemo(() => options, [options]);

  const updateOptions = (patch: Partial<WrapOptions>) => {
    setOptions((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  useEffect(() => {
    if (!inputText) {
      setWrappedText("");
      // reset stats for empty state
      setStatsInput({
        chars: 0,
        charsNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        avgLineLength: 0,
      });
      setStatsOutput({
        chars: 0,
        charsNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        avgLineLength: 0,
      });
      return;
    }

    setIsProcessing(true);

    // Lightweight debounce to avoid hammering the engine on every keystroke
    const timer = setTimeout(() => {
      let result: WrapResult;

      try {
        result = wrapText(inputText, stableOptions);
      } catch (err) {
        // In case the engine somehow throws, fail safely
        console.error("[TextWrapper] Engine error:", err);
        setIsProcessing(false);
        return;
      }

      setWrappedText(result.wrapped);
      setStatsInput(result.statsInput);
      setStatsOutput(result.statsOutput);
      setIsProcessing(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [inputText, stableOptions]);

  return {
    inputText,
    setInputText,
    wrappedText,
    options,
    updateOptions,
    statsInput,
    statsOutput,
    isProcessing,
  };
}
