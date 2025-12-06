"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface FixSpacingToolbarProps {
  inputText: string;
  outputText: string;
  setInputText: (val: string) => void;
  resetAll: () => void;
  swapInputOutput: () => void;
}

export function FixSpacingToolbar({
  inputText,
  outputText,
  setInputText,
  resetAll,
  swapInputOutput,
}: FixSpacingToolbarProps) {
  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
  };

  const handleDownload = () => {
    if (!outputText) return;

    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned-text.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleClearInput = () => {
    setInputText("");
  };

  return (
    <div className="w-full flex justify-end mt-4 gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleClearInput}
        disabled={!inputText}
      >
        Clear Input
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={swapInputOutput}
        disabled={!outputText}
      >
        Swap
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        disabled={!outputText}
      >
        Copy Output
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={!outputText}
      >
        Download Output
      </Button>

      <Button variant="destructive" size="sm" onClick={resetAll}>
        Reset
      </Button>
    </div>
  );
}
