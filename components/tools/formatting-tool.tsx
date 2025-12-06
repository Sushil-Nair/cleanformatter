"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { useRemoveFormattingTool } from "@/hooks/use-remove-formatting-tool";
import { PresetSelector } from "@/components/tools/remove-formatting/preset-selector";
import { RemoveFormattingOptionsPanel } from "@/components/tools/remove-formatting/options-panel";
import { CleaningSummary } from "@/components/tools/remove-formatting/cleaning-summary";
import { FormattingToolbar } from "@/components/tools/remove-formatting/formatting-toolbar";
import { TextStats } from "@/lib/utils/computeTextStats";

export function FormattingTool() {
  const {
    inputText,
    outputText,
    inputStats,
    outputStats,
    options,
    mode,
    cleaningResult,
    isProcessing,
    setInputText,
    setMode,
    updateOption,
    resetAll,
    swapInputOutput,
  } = useRemoveFormattingTool();

  // Preserve scroll position of output textarea when text changes
  const outputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const outputScrollTopRef = React.useRef(0);

  const handleOutputScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    outputScrollTopRef.current = e.currentTarget.scrollTop;
  };

  React.useEffect(() => {
    const el = outputRef.current;
    if (!el) return;

    // Restore scroll after React paints new content
    requestAnimationFrame(() => {
      el.scrollTop = outputScrollTopRef.current;
    });
  }, [outputText]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="font-bold tracking-tight">Remove Formatting</h1>
          <p className="text-muted-foreground mt-2">
            Strip HTML, Markdown, links, and hidden formatting to get clean,
            ready-to-use text.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* MAIN WORK AREA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* INPUT COLUMN */}
              <div className="flex flex-col">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  Input
                </p>
                <Textarea
                  placeholder="Paste your formatted text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[400px] font-mono"
                />
                <CompactStatsRow stats={inputStats} />
              </div>

              {/* OUTPUT COLUMN */}
              <div className="flex flex-col">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  Output
                </p>
                <Textarea
                  ref={outputRef}
                  readOnly
                  onScroll={handleOutputScroll}
                  value={outputText}
                  className="min-h-[400px] font-mono bg-secondary/20"
                  placeholder={
                    isProcessing
                      ? "Cleaning your text..."
                      : "Cleaned text will appear here..."
                  }
                />
                <CompactStatsRow stats={outputStats} />
              </div>
            </div>

            {/* TOOLBAR - below output, right aligned on desktop, 2x2 grid on mobile */}
            <div className="flex justify-end">
              <div className="w-full sm:w-auto">
                <ToolbarResponsiveWrapper
                  outputText={outputText}
                  onReset={resetAll}
                  onSwap={swapInputOutput}
                />
              </div>
            </div>

            {/* OPTIONS PANEL - horizontal mini-cards on desktop, stacked on mobile */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Presets card */}
                <MiniCard title="Presets">
                  <PresetSelector mode={mode} onChange={setMode} />
                </MiniCard>

                {/* HTML Cleaning card */}
                <MiniCard title="HTML Cleaning">
                  <RemoveFormattingOptionsPanel
                    options={options}
                    onOptionChange={updateOption}
                  />
                </MiniCard>
              </div>

              {/* Cleaning summary under options */}
              <CleaningSummary result={cleaningResult} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Compact stats row showing only:
 * - Words
 * - Characters (with spaces)
 * - Sentences
 * - Paragraphs
 */
function CompactStatsRow({ stats }: { stats: TextStats }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <span>
        Words: <span className="font-mono">{stats.words}</span>
      </span>
      <span>
        Characters:{" "}
        <span className="font-mono">{stats.charactersWithSpaces}</span>
      </span>
      <span>
        Sentences: <span className="font-mono">{stats.sentences}</span>
      </span>
      <span>
        Paragraphs: <span className="font-mono">{stats.paragraphs}</span>
      </span>
    </div>
  );
}

/**
 * Wrapper that makes the toolbar:
 * - 2x2 grid on small screens
 * - Right-aligned row on desktop
 */
function ToolbarResponsiveWrapper(props: {
  outputText: string;
  onReset: () => void;
  onSwap: () => void;
}) {
  // We'll reuse your existing FormattingToolbar but control layout around it
  // The toolbar itself already has Copy / Download / Swap / Reset
  return (
    <div className="w-full">
      {/* Mobile: 2x2 grid */}
      <div className="block md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {/* We re-use FormattingToolbar and let its internal flex handle button order.
              If you want stricter control, you can split buttons into separate props. */}
          <FormattingToolbar
            outputText={props.outputText}
            onReset={props.onReset}
            onSwap={props.onSwap}
          />
        </div>
      </div>

      {/* Desktop: right-aligned horizontal toolbar */}
      <div className="hidden md:block">
        <FormattingToolbar
          outputText={props.outputText}
          onReset={props.onReset}
          onSwap={props.onSwap}
        />
      </div>
    </div>
  );
}

/**
 * Simple mini-card wrapper for options / presets
 */
function MiniCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-[220px] rounded-md border px-3 py-3 space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}
