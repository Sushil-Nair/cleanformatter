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
import {
  cleanHTML,
  removeMarkdown,
  convertToPlainText,
  removeInlineStyles,
  removeHyperlinks,
  removeIndentation,
  filterSpecialCharacters,
} from "@/lib/utils/formatting";

interface FormatOptions {
  stripHtml: boolean;
  removeMarkdown: boolean;
  plainText: boolean;
  inlineStyles: boolean;
  hyperlinks: boolean;
  indentation: boolean;
  specialChars: boolean;
}

const aboutContent = (
  <div className="space-y-6">
    <p>
      Clean and format your text with our powerful{" "}
      <strong>Remove Formatting Tool</strong>. Strip away unwanted formatting
      while preserving the content you need.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🧹 Cleaning Options</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Strip HTML:</strong> Remove HTML tags while keeping content
          </li>
          <li>
            <strong>Remove Markdown:</strong> Clean Markdown syntax
          </li>
          <li>
            <strong>Plain Text:</strong> Convert to clean, readable text
          </li>
          <li>
            <strong>Remove Styles:</strong> Strip inline formatting
          </li>
          <li>
            <strong>Clean Links:</strong> Remove hyperlinks, keep text
          </li>
          <li>
            <strong>Fix Spacing:</strong> Normalize whitespace and indentation
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">💡 Use Cases</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clean text copied from web pages</li>
          <li>Convert formatted documents to plain text</li>
          <li>Prepare content for different platforms</li>
          <li>Remove unwanted formatting from code</li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Tips</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🎯 Best Practices</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Preview changes before copying</li>
          <li>Use specific options for targeted cleaning</li>
          <li>Combine options for thorough formatting removal</li>
        </ul>
      </div>
    </div>
  </div>
);

export function FormattingTool() {
  const [inputText, setInputText] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [formatOptions, setFormatOptions] = React.useState<FormatOptions>({
    stripHtml: false,
    removeMarkdown: false,
    plainText: false,
    inlineStyles: false,
    hyperlinks: false,
    indentation: false,
    specialChars: false,
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
    processText(newText, formatOptions);
  };

  const processText = React.useCallback(
    (text: string, options: FormatOptions) => {
      let processedText = text;

      if (options.stripHtml) {
        processedText = cleanHTML(processedText);
      }
      if (options.removeMarkdown) {
        processedText = removeMarkdown(processedText);
      }
      if (options.inlineStyles) {
        processedText = removeInlineStyles(processedText);
      }
      if (options.hyperlinks) {
        processedText = removeHyperlinks(processedText);
      }
      if (options.indentation) {
        processedText = removeIndentation(processedText);
      }
      if (options.specialChars) {
        processedText = filterSpecialCharacters(processedText);
      }
      if (options.plainText) {
        processedText = convertToPlainText(processedText);
      }

      setOutputText(processedText);
      setTextStatsOutput(calculateStats(processedText));
    },
    []
  );

  React.useEffect(() => {
    processText(inputText, formatOptions);
  }, [inputText, formatOptions, processText]);

  const handleOptionChange = (option: keyof FormatOptions) => {
    setFormatOptions((prev) => {
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
    a.download = "cleaned-text.txt";
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
    setFormatOptions({
      stripHtml: false,
      removeMarkdown: false,
      plainText: false,
      inlineStyles: false,
      hyperlinks: false,
      indentation: false,
      specialChars: false,
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
          <h1 className="text-3xl font-bold tracking-tight">
            Remove Formatting
          </h1>
          <p className="text-muted-foreground mt-2">
            Clean and format text by removing unwanted formatting elements.
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
                      id="strip-html"
                      checked={formatOptions.stripHtml}
                      onCheckedChange={() => handleOptionChange("stripHtml")}
                    />
                    <Label htmlFor="strip-html">Strip HTML</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="remove-markdown"
                      checked={formatOptions.removeMarkdown}
                      onCheckedChange={() =>
                        handleOptionChange("removeMarkdown")
                      }
                    />
                    <Label htmlFor="remove-markdown">Remove Markdown</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="plain-text"
                      checked={formatOptions.plainText}
                      onCheckedChange={() => handleOptionChange("plainText")}
                    />
                    <Label htmlFor="plain-text">Plain Text</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="inline-styles"
                      checked={formatOptions.inlineStyles}
                      onCheckedChange={() => handleOptionChange("inlineStyles")}
                    />
                    <Label htmlFor="inline-styles">Remove Styles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hyperlinks"
                      checked={formatOptions.hyperlinks}
                      onCheckedChange={() => handleOptionChange("hyperlinks")}
                    />
                    <Label htmlFor="hyperlinks">Clean Links</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="indentation"
                      checked={formatOptions.indentation}
                      onCheckedChange={() => handleOptionChange("indentation")}
                    />
                    <Label htmlFor="indentation">Fix Spacing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="special-chars"
                      checked={formatOptions.specialChars}
                      onCheckedChange={() => handleOptionChange("specialChars")}
                    />
                    <Label htmlFor="special-chars">Filter Special Chars</Label>
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

        <AboutSection
          title="About Formatting Remover Tool"
          content={aboutContent}
        />
      </div>
    </div>
  );
}
