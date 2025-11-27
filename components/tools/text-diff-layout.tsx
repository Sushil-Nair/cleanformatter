"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { diffChars, diffWords, diffLines } from "diff";
import { AboutSection } from "@/components/tools/about-section";
// import AdUnit from "../ad-unit";

interface TextDiffLayoutProps {
  title: string;
  description?: string;
}

type DiffMode = "chars" | "words" | "lines";

interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export function TextDiffLayout({ title, description }: TextDiffLayoutProps) {
  const [originalText, setOriginalText] = React.useState("");
  const [modifiedText, setModifiedText] = React.useState("");
  const [diffMode, setDiffMode] = React.useState<DiffMode>("words");
  const [showLineNumbers, setShowLineNumbers] = React.useState(false);
  const { toast } = useToast();

  const getDiff = (text1: string, text2: string, mode: DiffMode) => {
    switch (mode) {
      case "chars":
        return diffChars(text1, text2);
      case "words":
        return diffWords(text1, text2);
      case "lines":
        return diffLines(text1, text2);
      default:
        return diffWords(text1, text2);
    }
  };

  const renderDiff = (parts: DiffPart[]) => {
    let lineNumber = 1;

    return parts.map((part, i) => {
      const className = part.added
        ? "bg-green-500/20 dark:bg-green-500/30"
        : part.removed
        ? "bg-red-500/20 dark:bg-red-500/30"
        : "";

      const lines = part.value.split("\n");

      return (
        <React.Fragment key={i}>
          {lines.map((line, idx) => {
            const currentLineNumber = lineNumber;
            lineNumber++;
            return (
              <div
                key={`${i}-${idx}`}
                className={`flex ${
                  showLineNumbers ? "gap-2" : ""
                } whitespace-pre-wrap font-mono`}
              >
                {showLineNumbers && (
                  <span className="select-none text-muted-foreground w-8 text-right tabular-nums">
                    {currentLineNumber}
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

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard",
        duration: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleClear = () => {
    setOriginalText("");
    setModifiedText("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
          {/* <AdUnit slot="9721370550" format="horizontal" /> */}
        </div>

        <Card>
          <CardContent className="p-6">
            <div id="toolArea" className="space-y-6">
              <div className="flex items-center flex-wrap justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDiffMode("chars")}
                  className={
                    diffMode === "chars"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Character
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDiffMode("words")}
                  className={
                    diffMode === "words"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Word
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDiffMode("lines")}
                  className={
                    diffMode === "lines"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Line
                </Button>
                <Button
                  variant={showLineNumbers ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowLineNumbers(!showLineNumbers)}
                >
                  {showLineNumbers ? "Hide Line Numbers" : "Show Line Numbers"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    placeholder="Enter original text..."
                    className="min-h-[200px] font-mono"
                  />
                </div>

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
                    value={modifiedText}
                    onChange={(e) => setModifiedText(e.target.value)}
                    placeholder="Enter modified text..."
                    className="min-h-[200px] font-mono"
                  />
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h3 className="text-sm font-medium mb-2">Diff Result</h3>
                    <div className="font-mono whitespace-pre-wrap">
                      {renderDiff(
                        getDiff(originalText, modifiedText, diffMode)
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button variant="outline" onClick={handleClear}>
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
