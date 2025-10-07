"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AboutSection } from "@/components/tools/about-section";
import { useToast } from "@/hooks/use-toast";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { TextStats } from "@/types/tools";
import { Copy, Download, RotateCcw } from "lucide-react";
import { fixSpacing } from "@/lib/utils/spacing";

interface SpacingOptions {
  removeExtraWhitespace: boolean;
  normalizePunctuation: boolean;
  convertTabsToSpaces: boolean;
  normalizeLineEndings: boolean;
  trimLines: boolean;
  removeEmptyLines: boolean;
}

const aboutContent = (
  <div className="space-y-6">
    <p>
      Perfect your text formatting with our <strong>Fix Spacing Tool</strong>.
      Normalize whitespace, indentation, and line endings for clean, consistent
      text.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔧 Spacing Options</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Remove Extra Whitespace:</strong> Collapse multiple spaces
            into single spaces
          </li>
          <li>
            <strong>Normalize Punctuation:</strong> Fix spacing around
            punctuation marks
          </li>
          <li>
            <strong>Convert Tabs:</strong> Transform tabs to spaces or vice
            versa
          </li>
          <li>
            <strong>Line Endings:</strong> Standardize line endings (CRLF/LF)
          </li>
          <li>
            <strong>Trim Lines:</strong> Remove leading/trailing whitespace from
            each line
          </li>
          <li>
            <strong>Empty Lines:</strong> Remove or normalize empty lines
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">💡 Use Cases</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clean up copied text from various sources</li>
          <li>Format code for consistent indentation</li>
          <li>Prepare text for data processing</li>
          <li>Standardize document formatting</li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Tips</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🎯 Best Practices</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Use &quot;Remove Extra Whitespace&quot; for general text cleanup
          </li>
          <li>
            Enable &quot;Normalize Punctuation&quot; for professional documents
          </li>
          <li>Convert tabs to spaces for consistent code formatting</li>
          <li>Trim lines to remove unwanted spacing</li>
        </ul>
      </div>
    </div>
  </div>
);

export function FixSpacingTool() {
  const [inputText, setInputText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [spacingOptions, setSpacingOptions] = React.useState<SpacingOptions>({
    removeExtraWhitespace: true,
    normalizePunctuation: false,
    convertTabsToSpaces: false,
    normalizeLineEndings: false,
    trimLines: false,
    removeEmptyLines: false,
  });
  const [textStatsInput, setTextStatsInput] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });
  const [textStatsOutput, setTextStatsOutput] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });
  const { toast } = useToast();

  const calculateStats = (text: string): TextStats => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const characters = text.length;
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;

    return {
      words,
      sentences,
      characters,
      paragraphs,
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setTextStatsInput(calculateStats(newText));
    processText(newText, spacingOptions);
  };

  const processText = React.useCallback(
    (text: string, options: SpacingOptions) => {
      const processedText = fixSpacing(text, options);
      setOutputText(processedText);
      setTextStatsOutput(calculateStats(processedText));
    },
    []
  );

  React.useEffect(() => {
    processText(inputText, spacingOptions);
  }, [inputText, spacingOptions, processText]);

  const handleOptionChange = (option: keyof SpacingOptions) => {
    setSpacingOptions((prev) => {
      const newOptions = { ...prev, [option]: !prev[option] };
      processText(inputText, newOptions);
      return newOptions;
    });
  };

  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
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

  const handleDownload = () => {
    if (!outputText) return;

    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded successfully",
      description: "Your text has been downloaded",
      duration: 2000,
    });
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setSpacingOptions({
      removeExtraWhitespace: true,
      normalizePunctuation: false,
      convertTabsToSpaces: false,
      normalizeLineEndings: false,
      trimLines: false,
      removeEmptyLines: false,
    });
    setTextStatsInput({
      words: 0,
      sentences: 0,
      characters: 0,
      paragraphs: 0,
    });
    setTextStatsOutput({
      words: 0,
      sentences: 0,
      characters: 0,
      paragraphs: 0,
    });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fix Spacing</h1>
          <p className="text-muted-foreground mt-2">
            Clean up and normalize text spacing, indentation, and line endings.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div
              id="toolArea"
              className="grid grid-cols-1 lg:grid-cols-5 gap-6"
            >
              <div className="lg:col-span-2 space-y-4">
                <Textarea
                  placeholder="Enter text here..."
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[400px] font-mono"
                />
                <TextStatsDisplay stats={textStatsInput} />
              </div>

              <div className="lg:col-span-3 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="extra-whitespace"
                      checked={spacingOptions.removeExtraWhitespace}
                      onCheckedChange={() =>
                        handleOptionChange("removeExtraWhitespace")
                      }
                    />
                    <Label htmlFor="extra-whitespace">
                      Remove Extra Whitespace
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="normalize-punctuation"
                      checked={spacingOptions.normalizePunctuation}
                      onCheckedChange={() =>
                        handleOptionChange("normalizePunctuation")
                      }
                    />
                    <Label htmlFor="normalize-punctuation">
                      Normalize Punctuation
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="convert-tabs"
                      checked={spacingOptions.convertTabsToSpaces}
                      onCheckedChange={() =>
                        handleOptionChange("convertTabsToSpaces")
                      }
                    />
                    <Label htmlFor="convert-tabs">Convert Tabs to Spaces</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="normalize-endings"
                      checked={spacingOptions.normalizeLineEndings}
                      onCheckedChange={() =>
                        handleOptionChange("normalizeLineEndings")
                      }
                    />
                    <Label htmlFor="normalize-endings">
                      Normalize Line Endings
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="trim-lines"
                      checked={spacingOptions.trimLines}
                      onCheckedChange={() => handleOptionChange("trimLines")}
                    />
                    <Label htmlFor="trim-lines">Trim Lines</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="empty-lines"
                      checked={spacingOptions.removeEmptyLines}
                      onCheckedChange={() =>
                        handleOptionChange("removeEmptyLines")
                      }
                    />
                    <Label htmlFor="empty-lines">Remove Empty Lines</Label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopy}
                      disabled={!outputText}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDownload}
                      disabled={!outputText}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>

                <Textarea
                  readOnly
                  value={outputText}
                  className="min-h-[400px] font-mono bg-secondary/20"
                  placeholder="Output will appear here..."
                />
                <TextStatsDisplay stats={textStatsOutput} />
              </div>
            </div>
          </CardContent>
        </Card>

        <AboutSection title="About Fix Spacing Tool" content={aboutContent} />
      </div>
    </div>
  );
}
