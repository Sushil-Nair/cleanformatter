"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  encodeHTMLEntities,
  decodeHTMLEntities,
  HTMLEntitiesOptions,
} from "@/lib/utils/html-entities";
import AdUnit from "../ad-unit";
import { MidSectionAd } from "../sections/ad-midsection";

const aboutContent = (
  <div className="space-y-6">
    <p>
      Convert text to and from HTML entities with our{" "}
      <strong>HTML Entities Encoder/Decoder Tool</strong>. Handle special
      characters, symbols, and international text safely in HTML documents.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔄 Conversion Options</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Named Entities:</strong> Use standard HTML entity names
            (&amp;lt;, &amp;gt;)
          </li>
          <li>
            <strong>Numeric Entities:</strong> Use decimal references
            (&#38;#60;)
          </li>
          <li>
            <strong>Hexadecimal:</strong> Use hex references (&#38;#x3C;)
          </li>
          <li>
            <strong>Smart Encoding:</strong> Skip already encoded text
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">⚡ Advanced Features</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Full Encoding:</strong> Convert all characters to entities
          </li>
          <li>
            <strong>Quote Handling:</strong> Special handling for quotes
          </li>
          <li>
            <strong>Bulk Processing:</strong> Handle large text blocks
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
          <li>Prepare text for HTML documents</li>
          <li>Handle special characters safely</li>
          <li>Process user input for web pages</li>
          <li>Create email templates</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">🔒 Security</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Prevent XSS attacks</li>
          <li>Sanitize user input</li>
          <li>Escape special characters</li>
          <li>Handle international text</li>
        </ul>
      </div>
    </div>
  </div>
);

export function HTMLEntitiesTool() {
  const [inputText, setInputText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [mode, setMode] = React.useState<"encode" | "decode">("encode");
  const [options, setOptions] = React.useState<HTMLEntitiesOptions>({
    mode: "named",
    encodeAll: false,
    encodeQuotes: true,
    skipEncoded: true,
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
        const result =
          mode === "encode"
            ? encodeHTMLEntities(text, options)
            : decodeHTMLEntities(text);
        setOutputText(result);
      } catch (error) {
        toast({
          title: `Failed to ${mode} text`,
          description:
            error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      }
    },
    [mode, options, toast]
  );

  React.useEffect(() => {
    processText(inputText);
  }, [inputText, mode, options, processText]);

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
    a.download = `${mode}d-html-entities.txt`;
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
    setMode("encode");
    setOptions({
      mode: "named",
      encodeAll: false,
      encodeQuotes: true,
      skipEncoded: true,
    });
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
            HTML Entities Encoder/Decoder
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to and from HTML entities with various encoding options
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
                <div className="flex items-center justify-between">
                  <Select
                    value={mode}
                    onValueChange={(value: "encode" | "decode") =>
                      setMode(value)
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encode">Encode Entities</SelectItem>
                      <SelectItem value="decode">Decode Entities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder={
                    mode === "encode"
                      ? "Enter text to encode..."
                      : "Enter HTML entities to decode..."
                  }
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[400px] font-mono"
                />
                <TextStatsDisplay stats={textStats} />
              </div>

              <div className="space-y-4">
                {mode === "encode" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={options.mode}
                      onValueChange={(value: HTMLEntitiesOptions["mode"]) =>
                        setOptions((prev) => ({ ...prev, mode: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select encoding" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="named">Named Entities</SelectItem>
                        <SelectItem value="numeric">
                          Numeric Entities
                        </SelectItem>
                        <SelectItem value="hex">
                          Hexadecimal Entities
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="encode-all"
                        checked={options.encodeAll}
                        onCheckedChange={(checked) =>
                          setOptions((prev) => ({
                            ...prev,
                            encodeAll: checked,
                          }))
                        }
                      />
                      <Label htmlFor="encode-all">Encode All Characters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="encode-quotes"
                        checked={options.encodeQuotes}
                        onCheckedChange={(checked) =>
                          setOptions((prev) => ({
                            ...prev,
                            encodeQuotes: checked,
                          }))
                        }
                      />
                      <Label htmlFor="encode-quotes">Encode Quotes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="skip-encoded"
                        checked={options.skipEncoded}
                        onCheckedChange={(checked) =>
                          setOptions((prev) => ({
                            ...prev,
                            skipEncoded: checked,
                          }))
                        }
                      />
                      <Label htmlFor="skip-encoded">Skip Encoded Parts</Label>
                    </div>
                  </div>
                )}

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

                <Textarea
                  readOnly
                  value={outputText}
                  className="min-h-[400px] font-mono bg-secondary/20"
                  placeholder={
                    mode === "encode"
                      ? "Encoded HTML entities will appear here..."
                      : "Decoded text will appear here..."
                  }
                />
              </div>
            </div>
          </CardContent>
          <MidSectionAd />
        </Card>

        <AboutSection
          title="About HTML Entities Encoder/Decoder"
          content={aboutContent}
        />
      </div>
    </div>
  );
}
