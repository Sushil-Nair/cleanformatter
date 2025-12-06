"use client";

import * as React from "react";
import {
  fixSpacing,
  resolveFixSpacingOptions,
  FixSpacingMode,
  FixSpacingOptions,
  FixSpacingResult,
} from "@/lib/utils/fix-spacing";
import { computeTextStats, TextStats } from "@/lib/utils/computeTextStats";

type UseFixSpacingToolState = {
  inputText: string;
  outputText: string;
  mode: FixSpacingMode;
  options: FixSpacingOptions;
  inputStats: TextStats;
  outputStats: TextStats;
  result: FixSpacingResult | null;
  isProcessing: boolean;
};

type UseFixSpacingToolReturn = UseFixSpacingToolState & {
  setInputText: (value: string) => void;
  setMode: (mode: FixSpacingMode) => void;
  updateOption: (key: keyof FixSpacingOptions, value: boolean | number) => void;
  resetAll: () => void;
  swapInputOutput: () => void;
};

const emptyStats: TextStats = computeTextStats("");

export function useFixSpacingTool(): UseFixSpacingToolReturn {
  const [inputText, setInputTextState] = React.useState<string>("");
  const [outputText, setOutputText] = React.useState<string>("");
  const [mode, setModeState] = React.useState<FixSpacingMode>("soft");
  const [options, setOptions] = React.useState<FixSpacingOptions>(
    resolveFixSpacingOptions("soft")
  );

  const [inputStats, setInputStats] = React.useState<TextStats>(emptyStats);
  const [outputStats, setOutputStats] = React.useState<TextStats>(emptyStats);

  const [result, setResult] = React.useState<FixSpacingResult | null>(null);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  // Debounced input to avoid processing on every keystroke
  const [debouncedInput, setDebouncedInput] = React.useState<string>("");

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedInput(inputText);
    }, 250);

    return () => clearTimeout(handle);
  }, [inputText]);

  // Update input stats on raw input change
  React.useEffect(() => {
    setInputStats(computeTextStats(inputText));
  }, [inputText]);

  // Run spacing engine when debounced input or options/mode change
  React.useEffect(() => {
    if (!debouncedInput) {
      setOutputText("");
      setOutputStats(emptyStats);
      setResult(null);
      return;
    }

    setIsProcessing(true);
    try {
      // We treat `options` as the effective config here.
      // fixSpacing internally resolves presets again, but since the hook
      // always keeps options in sync with mode, this is safe.
      const spacingResult = fixSpacing(debouncedInput, mode, options);
      setResult(spacingResult);
      setOutputText(spacingResult.cleanedText);
      setOutputStats(computeTextStats(spacingResult.cleanedText));
    } finally {
      setIsProcessing(false);
    }
  }, [debouncedInput, mode, options]);

  const setInputText = (value: string) => {
    setInputTextState(value);
  };

  const setMode = (newMode: FixSpacingMode) => {
    setModeState(newMode);

    // ALWAYS load preset defaults when selecting a preset
    const resolved = resolveFixSpacingOptions(newMode);
    setOptions(resolved);
  };

  const updateOption = (key: keyof FixSpacingOptions, value: any) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModeState("custom");
  };

  const resetAll = () => {
    setInputTextState("");
    setOutputText("");
    const resetOptions = resolveFixSpacingOptions("soft");
    setOptions(resetOptions);
    setModeState("soft");
    setInputStats(emptyStats);
    setOutputStats(emptyStats);
    setResult(null);
  };

  const swapInputOutput = () => {
    if (!outputText) return;
    setInputTextState(outputText);
  };

  return {
    inputText,
    outputText,
    mode,
    options,
    inputStats,
    outputStats,
    result,
    isProcessing,
    setInputText,
    setMode,
    updateOption,
    resetAll,
    swapInputOutput,
  };
}
