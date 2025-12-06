"use client";

import * as React from "react";
import { removeFormatting } from "@/lib/utils/remove-formatting/pipeline";
import {
  RemoveFormattingOptions,
  RemoveFormattingMode,
  RemoveFormattingResult,
} from "@/lib/utils/remove-formatting/types";
import { resolveOptions } from "@/lib/utils/remove-formatting/default";
import { computeTextStats, TextStats } from "@/lib/utils/computeTextStats";

type RemoveFormattingState = {
  inputText: string;
  outputText: string;
  options: RemoveFormattingOptions;
  mode: RemoveFormattingMode;
  inputStats: TextStats;
  outputStats: TextStats;
  cleaningResult: RemoveFormattingResult | null;
  isProcessing: boolean;
};

type UseRemoveFormattingToolReturn = RemoveFormattingState & {
  setInputText: (value: string) => void;
  setMode: (mode: RemoveFormattingMode) => void;
  updateOption: (key: keyof RemoveFormattingOptions, value: boolean) => void;
  resetAll: () => void;
  swapInputOutput: () => void;
};

const defaultResolvedOptions = resolveOptions({ mode: "soft" });

export function useRemoveFormattingTool(): UseRemoveFormattingToolReturn {
  const [inputText, setInputTextState] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [mode, setModeState] = React.useState<RemoveFormattingMode>("soft");
  const [options, setOptions] = React.useState<RemoveFormattingOptions>(
    defaultResolvedOptions
  );
  const emptyStats = computeTextStats("");

  const [inputStats, setInputStats] = React.useState<TextStats>(emptyStats);
  const [outputStats, setOutputStats] = React.useState<TextStats>(emptyStats);
  const [cleaningResult, setCleaningResult] =
    React.useState<RemoveFormattingResult | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Debounce input to avoid processing on every keystroke
  const [debouncedInput, setDebouncedInput] = React.useState("");

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedInput(inputText);
    }, 250);

    return () => clearTimeout(handle);
  }, [inputText]);

  // Recompute input stats on raw input change
  React.useEffect(() => {
    setInputStats(computeTextStats(inputText));
  }, [inputText]);

  // Run engine when debounced input or options change
  React.useEffect(() => {
    if (!debouncedInput) {
      setOutputText("");
      setOutputStats(emptyStats);
      setCleaningResult(null);
      return;
    }

    setIsProcessing(true);
    try {
      const result = removeFormatting(debouncedInput, options);
      setCleaningResult(result);
      setOutputText(result.cleanedText);
      setOutputStats(computeTextStats(result.cleanedText));
    } finally {
      setIsProcessing(false);
    }
  }, [debouncedInput, options]);

  const setInputText = (value: string) => {
    setInputTextState(value);
  };

  const setMode = (newMode: RemoveFormattingMode) => {
    setModeState(newMode);

    // This applies a clean preset — NOT influenced by old options
    const resolved = resolveOptions({ mode: newMode });

    setOptions(resolved);
  };

  const updateOption = (key: keyof RemoveFormattingOptions, value: boolean) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
      mode: "custom", // any manual change switches to custom mode
    }));
    setModeState("custom");
  };

  const resetAll = () => {
    setInputTextState("");
    setOutputText("");
    const resetOptions = resolveOptions({ mode: "soft" });
    setOptions(resetOptions);
    setModeState("soft");
    setInputStats(emptyStats);
    setOutputStats(emptyStats);
    setCleaningResult(null);
  };

  const swapInputOutput = () => {
    if (!outputText) return;
    setInputTextState(outputText);
  };

  return {
    inputText,
    outputText,
    options,
    mode,
    inputStats,
    outputStats,
    cleaningResult,
    isProcessing,
    setInputText,
    setMode,
    updateOption,
    resetAll,
    swapInputOutput,
  };
}
