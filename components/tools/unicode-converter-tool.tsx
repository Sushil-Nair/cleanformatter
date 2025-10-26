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
import AdUnit from "../ad-unit";
import { MidSectionAd } from "../sections/ad-midsection";

const aboutContent = (
  <div className="space-y-6">
    <p>
      Convert and analyze Unicode text with our{" "}
      <strong>Unicode Converter Tool</strong>. Transform text between different
      Unicode formats and explore character properties.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔧 Conversion Options</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Code Points:</strong> Convert to/from U+XXXX format
          </li>
          <li>
            <strong>UTF-8:</strong> View byte sequences
          </li>
          <li>
            <strong>UTF-16:</strong> See code units
          </li>
          <li>
            <strong>UTF-32:</strong> Display full code points
          </li>
          <li>
            <strong>Normalization:</strong> NFC, NFD, NFKC, NFKD forms
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">📊 Analysis Features</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Character Info:</strong> View Unicode properties
          </li>
          <li>
            <strong>Script Detection:</strong> Identify writing systems
          </li>
          <li>
            <strong>Statistics:</strong> Count characters and scripts
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Use Cases</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">💻 Development</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Debug Unicode-related issues</li>
          <li>Validate text encodings</li>
          <li>Generate escaped strings</li>
          <li>Analyze text properties</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">📝 Text Processing</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Convert between formats</li>
          <li>Normalize text forms</li>
          <li>Analyze character usage</li>
        </ul>
      </div>
    </div>
  </div>
);

export function UnicodeConverterTool() {
  const [inputText, setInputText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [conversionType, setConversionType] = React.useState("codepoints");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    calculateStats(newText);
    processText(newText);
  };

  const processText = React.useCallback(
    (text: string) => {
      if (!text) {
        setOutputText("");
        return;
      }

      try {
        let result = "";

        switch (conversionType) {
          case "codepoints":
            result = convertToCodePoints(text);
            break;
          case "utf8":
            result = encodeUTF8(text).join(" ");
            break;
          case "utf16":
            result = encodeUTF16(text).join(" ");
            break;
          case "utf32":
            result = encodeUTF32(text).join(" ");
            break;
          case "normalize":
            result = normalizeText(text, "NFC");
            break;
          default:
            result = text;
        }

        setOutputText(result);
      } catch (error) {
        toast({
          title: "Conversion Error",
          description:
            error instanceof Error ? error.message : "Failed to convert text",
          variant: "destructive",
        });
      }
    },
    [conversionType, toast]
  );

  React.useEffect(() => {
    processText(inputText);
  }, [inputText, conversionType, processText]);

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
    a.download = "converted-text.txt";
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
    setConversionType("codepoints");
    setTextStats({
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
          <h1 className="text-3xl font-bold tracking-tight">
            Unicode Converter
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text between different Unicode formats and analyze character
            properties
          </p>
          <AdUnit slot="9721370550" format="horizontal" />
        </div>

        <Card>
          <CardContent className="p-6">
            <div
              id="toolArea"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter text here..."
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[400px] font-mono"
                />
                <TextStatsDisplay stats={textStats} />
              </div>

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
                      <SelectItem value="codepoints">
                        Code Points (U+XXXX)
                      </SelectItem>
                      <SelectItem value="utf8">UTF-8 Bytes</SelectItem>
                      <SelectItem value="utf16">UTF-16 Code Units</SelectItem>
                      <SelectItem value="utf32">UTF-32 Code Points</SelectItem>
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

                <Textarea
                  readOnly
                  value={outputText}
                  className="min-h-[400px] font-mono bg-secondary/20"
                  placeholder="Converted text will appear here..."
                />
              </div>
            </div>
          </CardContent>
          <MidSectionAd />
        </Card>

        <AboutSection title="About Unicode Converter" content={aboutContent} />
      </div>
    </div>
  );
}
