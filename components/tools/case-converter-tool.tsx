"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { TextStats, ToolFunction } from "@/types/tools";
import { Copy, Download, RotateCcw } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  transformText,
  CaseEngineOptions,
  defaultIgnoreWords,
  CaseMode,
} from "@/lib/utils/case-engine";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface CaseConverterToolProps {
  title: string;
  description?: string;
  functions: ToolFunction[];
}

export function CaseConverterTool({
  title,
  description,
  functions,
}: CaseConverterToolProps) {
  const { toast } = useToast();

  const [inputText, setInputText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [ignoreWordsInput, setIgnoreWordsInput] = React.useState("");

  const [selectedFunction, setSelectedFunction] = React.useState<CaseMode>(
    functions[0]?.name as CaseMode
  );

  // NEW — Smart Engine Options
  const [ignoreWords, setIgnoreWords] = React.useState(defaultIgnoreWords);
  const [trimWhitespace, setTrimWhitespace] = React.useState(false);
  const [removeEmptyLines, setremoveEmptyLine] = React.useState(false);
  const [removeDuplicateLines, setremoveDuplicateLine] = React.useState(false);

  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });

  // ------------------------------------------
  // CALCULATE TEXT STATS
  // ------------------------------------------
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

  // ------------------------------------------
  // PROCESS TEXT USING NEW CASE ENGINE
  // ------------------------------------------
  const processText = React.useCallback(
    (text: string) => {
      if (!text || !selectedFunction) {
        setOutputText("");
        return;
      }

      const options: CaseEngineOptions = {
        mode: selectedFunction,
        ignoreWords,
        trimWhitespace,
        removeDuplicateLines,
        removeEmptyLines,
      };

      try {
        const transformed = transformText(text, options);
        setOutputText(transformed);
      } catch (err) {
        toast({
          title: "Processing Error",
          description: "Unable to convert text. Check formatting.",
          variant: "destructive",
        });
      }
    },
    [
      selectedFunction,
      ignoreWords,
      trimWhitespace,
      removeDuplicateLines,
      removeEmptyLines,
      toast,
    ]
  );

  React.useEffect(() => {
    processText(inputText);
  }, [
    inputText,
    selectedFunction,
    ignoreWords,
    trimWhitespace,
    removeDuplicateLines,
    removeEmptyLines,
    processText,
  ]);

  // ------------------------------------------
  // INPUT HANDLER
  // ------------------------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const txt = e.target.value;
    setInputText(txt);
    calculateStats(txt);
  };

  // ------------------------------------------
  // COPY & DOWNLOAD
  // ------------------------------------------
  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied",
        description: "Text copied successfully.",
      });
    } catch {
      toast({
        title: "Copy failed",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!outputText) return;

    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedFunction.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();

    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Your text file is ready.",
    });
  };

  // ------------------------------------------
  // RENDER UI
  // ------------------------------------------
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <header>
          <h1 className="font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </header>

        <Card>
          <CardContent className="p-6">
            <div
              id="toolArea"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* LEFT SIDE */}
              <div className="space-y-4">
                {/* Case Function Selector */}
                <Select
                  value={selectedFunction}
                  onValueChange={(value) =>
                    setSelectedFunction(value as CaseMode)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select function" />
                  </SelectTrigger>
                  <SelectContent>
                    {functions.map((func) => (
                      <SelectItem key={func.name} value={func.name}>
                        {func.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Input Area */}
                <Textarea
                  placeholder="Enter text here..."
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[260px] font-mono"
                />

                <TextStatsDisplay stats={textStats} />

                {/* NEW — Ignore Words */}
                <div className=" flex flex-col gap-3 space-y-2">
                  <label className="font-medium">Ignore Words</label>
                  <Textarea
                    placeholder="Enter comma-separated words (FBI, NASA, HTTP...)"
                    value={ignoreWordsInput}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setIgnoreWordsInput(raw);

                      const words = raw
                        .split(/[,;\n]+/)
                        .map((w) => w.trim())
                        .filter(Boolean);

                      setIgnoreWords(words);
                    }}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {/* NEW — Trim Whitespace Toggle */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="trim-whitespace"
                      checked={trimWhitespace}
                      onCheckedChange={(checked) => setTrimWhitespace(checked)}
                    />
                    <Label htmlFor="trim-whitespace">Trim Whitespace</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="remove-empty-line"
                      checked={removeEmptyLines}
                      onCheckedChange={(checked) => setremoveEmptyLine(checked)}
                    />
                    <Label htmlFor="remove-empty-line">
                      Remove Empty Lines
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="remove-Duplicate-line"
                      checked={removeDuplicateLines}
                      onCheckedChange={(checked) =>
                        setremoveDuplicateLine(checked)
                      }
                    />
                    <Label htmlFor="remove-Duplicate-line">
                      Remove Duplicate Lines
                    </Label>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-4">
                <div className="flex justify-end gap-2">
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
                    onClick={() => {
                      setSelectedFunction("UPPERCASE");
                      setIgnoreWords(defaultIgnoreWords);
                      setTrimWhitespace(false);
                      setremoveEmptyLine(false);
                      setremoveDuplicateLine(false);
                      setIgnoreWordsInput("");
                      setInputText("");
                      setOutputText("");
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
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

                <Textarea
                  readOnly
                  value={outputText}
                  className="min-h-[260px] font-mono bg-secondary/20"
                  placeholder="Output will appear here..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
