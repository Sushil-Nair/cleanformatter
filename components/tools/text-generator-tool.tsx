"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { TextStats } from "@/types/tools";
import { Copy, Download, RotateCcw, RefreshCw } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  generateText,
  TextGeneratorOptions,
  wordLists,
} from "@/lib/utils/text-generator";

export function TextGeneratorTool() {
  const { toast } = useToast();

  const [outputText, setOutputText] = React.useState("");
  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });

  // ⭐ NEW: Multi-paragraph support
  const [options, setOptions] = React.useState<
    TextGeneratorOptions & { paragraphs: number }
  >({
    type: "lorem",
    language: "english",
    wordsPerParagraph: 100,
    paragraphs: 1,
    format: "plain",
  });

  // ---------------------------------------
  // TEXT STATS CALCULATION
  // ---------------------------------------
  const calculateStats = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const characters = text.length;
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;

    setTextStats({
      words,
      sentences,
      characters,
      paragraphs,
    });
  };

  // ---------------------------------------
  // GENERATE TEXT
  // ---------------------------------------
  const generateNewText = React.useCallback(() => {
    try {
      let finalOutput = "";

      // Generate multiple paragraphs using backend engine
      const items: string[] = [];
      for (let i = 0; i < options.paragraphs; i++) {
        items.push(generateText(options));
      }

      // Join paragraphs correctly depending on format
      finalOutput =
        options.format === "html"
          ? items.join("\n") // already wrapped by <p> inside TS generator
          : items.join("\n\n");

      setOutputText(finalOutput);
      calculateStats(finalOutput);
    } catch (error) {
      toast({
        title: "Failed to generate text",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  }, [options, toast]);

  React.useEffect(() => {
    generateNewText();
  }, [options, generateNewText]);

  // ---------------------------------------
  // Copy
  // ---------------------------------------
  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied to clipboard",
        description: "Generated text has been copied.",
        duration: 2000,
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  // ---------------------------------------
  // Download
  // ---------------------------------------
  const handleDownload = () => {
    if (!outputText) return;

    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-text.txt";
    a.click();

    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded successfully",
      description: "Your text file has been saved.",
      duration: 2000,
    });
  };

  // ---------------------------------------
  // Reset
  // ---------------------------------------
  const handleReset = () => {
    setOptions({
      type: "lorem",
      language: "english",
      wordsPerParagraph: 100,
      paragraphs: 1,
      format: "plain",
    });

    setOutputText("");
    setTextStats({
      words: 0,
      sentences: 0,
      characters: 0,
      paragraphs: 0,
    });
  };

  // ---------------------------------------
  // UI RENDER
  // ---------------------------------------
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">Text Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate random text in multiple languages, formats, and paragraph
            counts.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div
              id="toolArea"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* LEFT SIDE — OPTIONS */}
              <div className="space-y-4 flex flex-col gap-1">
                {/* Type + Language */}
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={options.type}
                    onValueChange={(value) =>
                      setOptions((prev) => ({
                        ...prev,
                        type: value as TextGeneratorOptions["type"],
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lorem">Lorem Ipsum</SelectItem>
                      <SelectItem value="words">Random Words</SelectItem>
                      <SelectItem value="sentences">
                        Random Sentences
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={options.language}
                    disabled={options.type === "lorem"}
                    onValueChange={(value) =>
                      setOptions((prev) => ({
                        ...prev,
                        language: value as TextGeneratorOptions["language"],
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>

                    <SelectContent>
                      {Object.keys(wordLists).map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Words per paragraph */}
                <div className="flex flex-col gap-1 space-y-2">
                  <Label>
                    Words per Paragraph ({options.wordsPerParagraph})
                  </Label>
                  <Slider
                    value={[options.wordsPerParagraph]}
                    min={20}
                    max={500}
                    step={10}
                    onValueChange={([value]) =>
                      setOptions((prev) => ({
                        ...prev,
                        wordsPerParagraph: value,
                      }))
                    }
                  />
                </div>

                {/* NEW: Number of paragraphs */}
                <div className="flex flex-col gap-1 space-y-2">
                  <Label>Paragraphs ({options.paragraphs})</Label>
                  <Slider
                    value={[options.paragraphs]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={([value]) =>
                      setOptions((prev) => ({
                        ...prev,
                        paragraphs: value,
                      }))
                    }
                  />
                </div>

                {/* HTML Format */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="html-format"
                    checked={options.format === "html"}
                    onCheckedChange={(checked: boolean) =>
                      setOptions((prev) => ({
                        ...prev,
                        format: checked ? "html" : "plain",
                      }))
                    }
                  />
                  <Label htmlFor="html-format">HTML Format</Label>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-between gap-2">
                  <Button variant="outline" onClick={generateNewText}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>

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
                    <Button variant="outline" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE — OUTPUT */}
              <div className="space-y-4">
                <Textarea
                  readOnly
                  value={outputText}
                  className="min-h-[400px] font-mono bg-secondary/20"
                  placeholder="Generated text will appear here..."
                />
                <TextStatsDisplay stats={textStats} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
