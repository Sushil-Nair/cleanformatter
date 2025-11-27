"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AboutSection } from "@/components/tools/about-section";
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
import {
  convertToCodePoints,
  encodeUTF8,
  encodeUTF16,
  encodeUTF32,
  normalizeText,
} from "@/lib/utils/unicode";

// Debounce hook
const useDebounce = (value: string, delay = 200) => {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};

export function UnicodeConverterTool() {
  const [inputText, setInputText] = React.useState("");
  const [conversionType, setConversionType] = React.useState("codepoints");
  const [outputText, setOutputText] = React.useState("");

  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });

  const { toast } = useToast();

  // Debounce heavy operations
  const debouncedText = useDebounce(inputText);

  // Convert text based on mode using function map (cleaner than switch)
  const converters: Record<string, (t: string) => string> = {
    codepoints: (t) => convertToCodePoints(t),
    utf8: (t) => encodeUTF8(t).join(" "),
    utf16: (t) => encodeUTF16(t).join(" "),
    utf32: (t) => encodeUTF32(t).join(" "),
    normalize: (t) => normalizeText(t, "NFC"),
  };

  // Calculate stats with improved sentence detection
  const calculateStats = React.useCallback((text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length ?? 0;
    const characters = text.length;
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;

    setTextStats({ words, sentences, characters, paragraphs });
  }, []);

  // Process conversion + stats when debounced text / conversion type changes
  React.useEffect(() => {
    if (!debouncedText) {
      setOutputText("");
      setTextStats({ words: 0, sentences: 0, characters: 0, paragraphs: 0 });
      return;
    }

    calculateStats(debouncedText);

    try {
      const converter = converters[conversionType];
      const result = converter ? converter(debouncedText) : debouncedText;
      setOutputText(result);
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }, [debouncedText, conversionType, calculateStats, toast]);

  // Copy output
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({ title: "Copied!", description: "Output copied to clipboard." });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Clipboard access blocked. Copy manually.",
        variant: "destructive",
      });
    }
  };

  // Download output
  const handleDownload = () => {
    if (!outputText) return;

    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "converted-text.txt";
    a.click();

    URL.revokeObjectURL(url);

    toast({ title: "Downloaded", description: "Your file is ready." });
  };

  // Reset all state
  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setConversionType("codepoints");
    setTextStats({ words: 0, sentences: 0, characters: 0, paragraphs: 0 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <header>
          <h1 className="font-bold tracking-tight">Unicode Converter</h1>
          <p className="text-muted-foreground mt-2">
            Convert text between Unicode formats and inspect character data.
          </p>
        </header>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[400px] font-mono"
                />
                <TextStatsDisplay stats={textStats} />
              </div>

              {/* Output + Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Select
                    value={conversionType}
                    onValueChange={setConversionType}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select conversion" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="codepoints">Code Points</SelectItem>
                      <SelectItem value="utf8">UTF-8 Bytes</SelectItem>
                      <SelectItem value="utf16">UTF-16 Units</SelectItem>
                      <SelectItem value="utf32">UTF-32 Points</SelectItem>
                      <SelectItem value="normalize">Normalize (NFC)</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopy}
                      disabled={!outputText}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDownload}
                      disabled={!outputText}
                    >
                      <Download className="w-4 h-4" />
                    </Button>

                    <Button variant="outline" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4 mr-2" /> Reset
                    </Button>
                  </div>
                </div>

                <Textarea
                  readOnly
                  value={outputText}
                  placeholder="Converted text will appear here..."
                  className="min-h-[400px] font-mono bg-secondary/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
