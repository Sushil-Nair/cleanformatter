"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DiffMode } from "@/lib/utils/computeTextDiff";
import {
  ArrowLeftRight,
  Copy,
  Trash2,
  TextQuote,
  TextCursorInput,
} from "lucide-react";

interface DiffToolbarProps {
  diffMode: DiffMode;
  setDiffMode: (mode: DiffMode) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (val: boolean) => void;
  onSwapTexts: () => void;
  onClearAll: () => void;
  onCopyOriginal: () => void;
  onCopyModified: () => void;
  onCopyDiff: () => void;
}

export default function DiffToolbar({
  diffMode,
  setDiffMode,
  showLineNumbers,
  setShowLineNumbers,
  onSwapTexts,
  onClearAll,
  onCopyOriginal,
  onCopyModified,
  onCopyDiff,
}: DiffToolbarProps) {
  const modeButtonClass = (mode: DiffMode) =>
    diffMode === mode ? "bg-primary text-primary-foreground" : "bg-secondary";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
      {/* LEFT — DIFF MODE BUTTONS */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className={modeButtonClass("chars")}
          onClick={() => setDiffMode("chars")}
        >
          Character
        </Button>

        <Button
          variant="outline"
          size="sm"
          className={modeButtonClass("words")}
          onClick={() => setDiffMode("words")}
        >
          Word
        </Button>

        <Button
          variant="outline"
          size="sm"
          className={modeButtonClass("lines")}
          onClick={() => setDiffMode("lines")}
        >
          Line
        </Button>

        {/* Line Numbers Toggle */}
        <Button
          size="sm"
          variant={showLineNumbers ? "default" : "outline"}
          onClick={() => setShowLineNumbers(!showLineNumbers)}
        >
          {showLineNumbers ? "Hide Line Numbers" : "Show Line Numbers"}
        </Button>
      </div>

      {/* RIGHT — UTILITY BUTTONS */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Swap Texts */}
        <Button variant="outline" size="sm" onClick={onSwapTexts}>
          <ArrowLeftRight className="h-4 w-4 mr-1" />
          Swap
        </Button>

        {/* Copy Original */}
        <Button variant="outline" size="sm" onClick={onCopyOriginal}>
          <TextCursorInput className="h-4 w-4 mr-1" />
          Copy Original
        </Button>

        {/* Copy Modified */}
        <Button variant="outline" size="sm" onClick={onCopyModified}>
          <Copy className="h-4 w-4 mr-1" />
          Copy Modified
        </Button>

        {/* Copy Diff Output */}
        <Button variant="outline" size="sm" onClick={onCopyDiff}>
          <TextQuote className="h-4 w-4 mr-1" />
          Copy Diff
        </Button>

        {/* Clear All */}
        <Button variant="destructive" size="sm" onClick={onClearAll}>
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>
    </div>
  );
}
