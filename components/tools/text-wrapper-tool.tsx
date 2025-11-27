"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AboutSection } from "@/components/tools/about-section";
import { useToast } from "@/hooks/use-toast";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { TextStats } from "@/types/tools";
import { Copy, Download, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { wrapText } from "@/lib/utils/text-wrapper";
// import AdUnit from "../ad-unit";

interface WrapOptions {
  mode: "word" | "char" | "smart" | "code";
  width: number;
  hyphenate: boolean;
  preserveLines: boolean;
}

export function TextWrapperTool() {
  const [inputText, setInputText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [wrapOptions, setWrapOptions] = React.useState<WrapOptions>({
    mode: "word",
    width: 80,
    hyphenate: false,
    preserveLines: true,
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
    processText(newText, wrapOptions);
  };

  const processText = React.useCallback(
    (text: string, options: WrapOptions) => {
      const processedText = wrapText(text, options);
      setOutputText(processedText);
      setTextStatsOutput(calculateStats(processedText));
    },
    []
  );

  React.useEffect(() => {
    processText(inputText, wrapOptions);
  }, [inputText, wrapOptions, processText]);

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
    a.download = "wrapped-text.txt";
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
    setWrapOptions({
      mode: "word",
      width: 80,
      hyphenate: false,
      preserveLines: true,
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
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">Text Wrapper</h1>
          <p className="text-muted-foreground mt-2">
            Format text with precise line wrapping and advanced options.
          </p>
          {/* <AdUnit slot="9721370550" format="horizontal" /> */}
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
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Wrap Mode</Label>
                    <Select
                      value={wrapOptions.mode}
                      onValueChange={(value: WrapOptions["mode"]) =>
                        setWrapOptions((prev) => ({ ...prev, mode: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select wrap mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="word">Word Wrap</SelectItem>
                        <SelectItem value="char">Character Wrap</SelectItem>
                        <SelectItem value="smart">Smart Wrap</SelectItem>
                        <SelectItem value="code">Code Wrap</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Line Width ({wrapOptions.width} characters)</Label>
                    </div>
                    <Slider
                      value={[wrapOptions.width]}
                      min={20}
                      max={200}
                      step={5}
                      onValueChange={([value]) =>
                        setWrapOptions((prev) => ({ ...prev, width: value }))
                      }
                    />
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="hyphenate"
                        checked={wrapOptions.hyphenate}
                        onCheckedChange={(checked) =>
                          setWrapOptions((prev) => ({
                            ...prev,
                            hyphenate: checked,
                          }))
                        }
                      />
                      <Label htmlFor="hyphenate">Enable Hyphenation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="preserve-lines"
                        checked={wrapOptions.preserveLines}
                        onCheckedChange={(checked) =>
                          setWrapOptions((prev) => ({
                            ...prev,
                            preserveLines: checked,
                          }))
                        }
                      />
                      <Label htmlFor="preserve-lines">
                        Preserve Line Breaks
                      </Label>
                    </div>
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
      </div>
    </div>
  );
}
