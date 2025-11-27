"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { AboutSection } from "@/components/tools/about-section";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { TextStats } from "@/types/tools";
import { Copy, Download, RotateCcw, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateText, TextGeneratorOptions } from "@/lib/utils/text-generator";
// import AdUnit from "../ad-unit";

export function TextGeneratorTool() {
  const [outputText, setOutputText] = React.useState("");
  const [options, setOptions] = React.useState<TextGeneratorOptions>({
    type: "lorem",
    language: "english",
    wordsPerParagraph: 100,
    format: "plain",
  });
  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });
  const { toast } = useToast();

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

  const generateNewText = React.useCallback(() => {
    try {
      const text = generateText(options);
      setOutputText(text);
      calculateStats(text);
    } catch (error) {
      toast({
        title: "Failed to generate text",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  }, [options, toast]);

  React.useEffect(() => {
    generateNewText();
  }, [options, generateNewText]);

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
    a.download = "generated-text.txt";
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
    setOptions({
      type: "lorem",
      language: "english",
      wordsPerParagraph: 100,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">Text Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate random text in multiple languages and formats
          </p>
          {/* <AdUnit slot="9721370550" format="horizontal" /> */}
        </div>

        <Card>
          <CardContent className="p-6">
            <div
              id="toolArea"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={options.type}
                    onValueChange={(value: TextGeneratorOptions["type"]) =>
                      setOptions((prev) => ({ ...prev, type: value }))
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
                    onValueChange={(value: TextGeneratorOptions["language"]) =>
                      setOptions((prev) => ({ ...prev, language: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Word Count ({options.wordsPerParagraph})</Label>
                  <Slider
                    value={[options.wordsPerParagraph]}
                    min={10}
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

                <div className="flex items-center space-x-2">
                  <Switch
                    id="html-format"
                    checked={options.format === "html"}
                    onCheckedChange={(checked) =>
                      setOptions((prev) => ({
                        ...prev,
                        format: checked ? "html" : "plain",
                      }))
                    }
                  />
                  <Label htmlFor="html-format">HTML Format</Label>
                </div>

                <div className="flex justify-between">
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
