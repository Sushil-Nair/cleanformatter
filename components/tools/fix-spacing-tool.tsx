"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { useFixSpacingTool } from "@/hooks/use-fix-spacing-tool";

import { FixSpacingPresetSelector } from "./fix-spacing/FixSpacingPresetSelector";
import { FixSpacingOptionsPanel } from "./fix-spacing/FixSpacingOptionsPanel";
import { FixSpacingSummary } from "./fix-spacing/FixSpacingSummary";
import { FixSpacingToolbar } from "./fix-spacing/FixSpacingToolbar";

export function FixSpacingTool() {
  const {
    inputText,
    outputText,
    inputStats,
    outputStats,
    mode,
    options,
    result,
    isProcessing,
    setInputText,
    setMode,
    updateOption,
    resetAll,
    swapInputOutput,
  } = useFixSpacingTool();

  return (
    <div className="w-full flex flex-col gap-8">
      {/* ---------------- TOP SECTION: Text Areas ---------------- */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* INPUT AREA */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Input Text</label>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text with messy spacing…"
            className="min-h-[300px] resize-none text-sm"
          />

          {/* mini-stats */}
          <MiniStats stats={inputStats} />
        </div>

        {/* OUTPUT AREA */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Output Text</label>

          <Textarea
            value={outputText}
            readOnly
            placeholder="Your cleaned text will appear here…"
            className={cn(
              "min-h-[300px] resize-none text-sm bg-muted/50",
              isProcessing && "opacity-50"
            )}
          />

          {/* mini-stats */}
          <MiniStats stats={outputStats} />

          {/* Toolbar below output area */}
          <FixSpacingToolbar
            inputText={inputText}
            outputText={outputText}
            setInputText={setInputText}
            resetAll={resetAll}
            swapInputOutput={swapInputOutput}
          />
        </div>
      </div>

      {/* ---------------- SECOND SECTION: Options + Presets ---------------- */}

      <div className="flex flex-col gap-6">
        {/* Preset Selector (horizontal) */}
        <FixSpacingPresetSelector mode={mode} onChange={setMode} />

        {/* Options Panel (Mini-cards) */}
        <FixSpacingOptionsPanel options={options} updateOption={updateOption} />
      </div>

      {/* ---------------- THIRD SECTION: Summary ---------------- */}

      <FixSpacingSummary
        stats={result?.stats ?? null}
        isProcessing={isProcessing}
      />
    </div>
  );
}

/* ---------------- Mini Stats UI ---------------- */

function MiniStats({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground">
      <Stat label="Characters" value={stats.charactersWithoutSpaces ?? 0} />
      <Stat label="Words" value={stats.words ?? 0} />
      <Stat label="Sentences" value={stats.sentences ?? 0} />
      <Stat label="Paragraphs" value={stats.paragraphs ?? 0} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
