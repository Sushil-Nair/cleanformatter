"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import {
  encodeHTMLEntitiesDebounced,
  decodeHTMLEntitiesDebounced,
  encodeHTMLEntities,
  decodeHTMLEntities,
  HTMLEntitiesOptions,
} from "@/lib/utils/html-entities";

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

  /* ------------------------------------------
   * Calculate text stats
   * ------------------------------------------ */
  const calculateStats = (text: string) => {
    setTextStats({
      words: text.trim().split(/\s+/).filter(Boolean).length,
      sentences: text.split(/[.!?]+/).filter(Boolean).length,
      characters: text.length,
      paragraphs: text.split(/\n\s*\n/).filter(Boolean).length,
    });
  };

  /* ------------------------------------------
   * Auto-detect decode mode if user pastes entities
   * ------------------------------------------ */
  const detectEntities = (value: string) =>
    /&(?:[A-Za-z]+|#[0-9]+|#x[0-9A-Fa-f]+);/.test(value);

  /* ------------------------------------------
   * Input Handler
   * ------------------------------------------ */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    calculateStats(val);

    // Auto-switch to decode mode if needed
    if (val && detectEntities(val) && mode === "encode") {
      setMode("decode");
    }

    processText(val);
  };

  /* ------------------------------------------
   * Core Processing Logic
   * ------------------------------------------ */
  const processText = React.useCallback(
    (value: string) => {
      if (!value) {
        setOutputText("");
        return;
      }

      try {
        if (mode === "encode") {
          encodeHTMLEntitiesDebounced.cancel();
          const result = encodeHTMLEntities(value, options);
          setOutputText(result);
        } else {
          decodeHTMLEntitiesDebounced.cancel();
          const result = decodeHTMLEntities(value);
          setOutputText(result);
        }
      } catch (err) {
        toast({
          title: `Failed to ${mode} text`,
          description: err instanceof Error ? err.message : "An error occurred",
          variant: "destructive",
        });
      }
    },
    [mode, options, toast]
  );

  React.useEffect(() => {
    processText(inputText);
  }, [inputText, mode, options, processText]);

  /* ------------------------------------------
   * Copy / Download / Reset Handlers
   * ------------------------------------------ */
  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied",
        description: "Output copied to clipboard",
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
    a.download = `${mode}-html-entities.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Output file saved",
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
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">
            HTML Entities Encoder/Decoder
          </h1>
          <p className="text-muted-foreground mt-2">
            Convert text to named, numeric, or hexadecimal HTML entities — or
            decode them back.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div
              id="toolArea"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* LEFT SIDE */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Select
                    value={mode}
                    onValueChange={(val: "encode" | "decode") => setMode(val)}
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
                      ? "Enter text to convert into HTML entities..."
                      : "Enter HTML entities to decode back into text..."
                  }
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[400px] font-mono"
                />

                <TextStatsDisplay stats={textStats} />
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-4">
                {mode === "encode" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={options.mode}
                      onValueChange={(v: HTMLEntitiesOptions["mode"]) =>
                        setOptions((o) => ({ ...o, mode: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select encoding type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="named">Named Entities</SelectItem>
                        <SelectItem value="numeric">
                          Numeric Entities
                        </SelectItem>
                        <SelectItem value="hex">Hex Entities</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={options.encodeAll}
                        onCheckedChange={(checked) =>
                          setOptions((o) => ({ ...o, encodeAll: checked }))
                        }
                      />
                      <Label>Encode All Characters</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={options.encodeQuotes}
                        onCheckedChange={(checked) =>
                          setOptions((o) => ({ ...o, encodeQuotes: checked }))
                        }
                      />
                      <Label>Encode Quotes</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={options.skipEncoded}
                        onCheckedChange={(checked) =>
                          setOptions((o) => ({ ...o, skipEncoded: checked }))
                        }
                      />
                      <Label>Skip Already Encoded</Label>
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
        </Card>
      </div>
    </div>
  );
}
