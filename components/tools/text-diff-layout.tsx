"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { computeTextDiff, DiffMode } from "@/lib/utils/computeTextDiff";
import DiffStatsDisplay from "@/components/tools/text-diff/diff-stats-display";
import DiffToolbar from "@/components/tools/text-diff/diff-toolbar";

import { useScrollSync } from "@/hooks/useScrollSync";

interface TextDiffLayoutProps {
  title: string;
  description?: string;
}

export function TextDiffLayout({ title, description }: TextDiffLayoutProps) {
  const [originalText, setOriginalText] = React.useState("");
  const [modifiedText, setModifiedText] = React.useState("");
  const [diffMode, setDiffMode] = React.useState<DiffMode>("words");
  const [showLineNumbers, setShowLineNumbers] = React.useState(false);

  const originalRef = React.useRef<HTMLTextAreaElement | null>(null);
  const modifiedRef = React.useRef<HTMLTextAreaElement | null>(null);
  const diffRef = React.useRef<HTMLDivElement | null>(null);

  const { toast } = useToast();

  // 🔄 Enable tri-sync scrolling between all panels:
  // Original <--> Modified
  // Original <--> Diff
  // Modified <--> Diff
  useScrollSync(originalRef, modifiedRef);
  useScrollSync(originalRef, diffRef);
  useScrollSync(modifiedRef, diffRef);

  // compute diff
  const diff = computeTextDiff(originalText, modifiedText, diffMode);

  // convert diff to plain text for copy
  const diffOutputString = diff.parts
    .map((p) => {
      if (p.added) return `+ ${p.value}`;
      if (p.removed) return `- ${p.value}`;
      return `  ${p.value}`;
    })
    .join("");

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      });
    } catch {
      toast({
        title: "Failed",
        description: "Clipboard permission denied.",
        variant: "destructive",
      });
    }
  };

  const handleSwapTexts = () => {
    setOriginalText(modifiedText);
    setModifiedText(originalText);
  };

  const handleClearAll = () => {
    setOriginalText("");
    setModifiedText("");
  };

  const renderDiff = () => {
    let lineNumber = 1;

    return diff.parts.map((part, i) => {
      const className = part.added
        ? "bg-green-500/20 dark:bg-green-500/30"
        : part.removed
        ? "bg-red-500/20 dark:bg-red-500/30"
        : "";

      const lines = part.value.split("\n");

      return (
        <React.Fragment key={i}>
          {lines.map((line, idx) => {
            const currentLine = lineNumber++;
            return (
              <div
                key={`${i}-${idx}`}
                className={`flex ${
                  showLineNumbers ? "gap-2" : ""
                } font-mono whitespace-pre-wrap`}
              >
                {showLineNumbers && (
                  <span className="select-none w-8 text-right text-muted-foreground tabular-nums">
                    {currentLine}
                  </span>
                )}
                <span className={className}>{line}</span>
              </div>
            );
          })}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* MAIN TOOL CARD */}
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* TOOLBAR */}
            <DiffToolbar
              diffMode={diffMode}
              setDiffMode={setDiffMode}
              showLineNumbers={showLineNumbers}
              setShowLineNumbers={setShowLineNumbers}
              onSwapTexts={handleSwapTexts}
              onClearAll={handleClearAll}
              onCopyOriginal={() => handleCopy(originalText)}
              onCopyModified={() => handleCopy(modifiedText)}
              onCopyDiff={() => handleCopy(diffOutputString)}
            />

            {/* INPUT FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ORIGINAL */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Original Text</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(originalText)}
                  >
                    Copy
                  </Button>
                </div>
                <Textarea
                  ref={originalRef}
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="Enter original text..."
                  className="min-h-[220px] font-mono"
                />
              </div>

              {/* MODIFIED */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Modified Text</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(modifiedText)}
                  >
                    Copy
                  </Button>
                </div>
                <Textarea
                  ref={modifiedRef}
                  value={modifiedText}
                  onChange={(e) => setModifiedText(e.target.value)}
                  placeholder="Enter modified text..."
                  className="min-h-[220px] font-mono"
                />
              </div>
            </div>

            {/* NEW STATS UI */}
            <DiffStatsDisplay stats={diff.stats} />

            {/* DIFF RESULT */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Diff Result</h3>
                <div
                  ref={diffRef}
                  className="max-h-[350px] overflow-auto rounded border p-3 font-mono whitespace-pre-wrap"
                >
                  {renderDiff()}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
