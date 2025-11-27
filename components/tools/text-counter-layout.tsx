"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { AboutSection } from "@/components/tools/about-section";
import { TextStats } from "@/types/tools";
// import AdUnit from "../ad-unit";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";

interface TextCounterLayoutProps {
  title: string;
  description?: string;
}

export function TextCounterLayout({
  title,
  description,
}: TextCounterLayoutProps) {
  const [inputText, setInputText] = React.useState("");
  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });
  const [countSpaces, setCountSpaces] = React.useState(true);

  const handleToggleCountSpaces = () => {
    setCountSpaces((prev) => {
      const newValue = !prev;
      calculateStats(inputText, newValue); // pass newValue explicitly to calculateStats
      return newValue;
    });
  };

  const calculateStats = (text: string, countSpacesOption = countSpaces) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;
    const characters = countSpacesOption
      ? charactersWithSpaces
      : charactersWithoutSpaces;
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
  };

  const handleReset = () => {
    setInputText("");
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
          <h1 className="font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
          {/* <AdUnit slot="9721370550" format="horizontal" /> */}
        </div>

        <Card>
          <CardContent className="p-6">
            <div id="toolArea" className="space-y-4">
              <Textarea
                placeholder="Enter text here..."
                value={inputText}
                onChange={handleInputChange}
                className="min-h-[300px] font-mono"
              />
              <div className="flex flex-col sm:flex-row gap-4 md:items-center sm:justify-between">
                <div className="flex items-center space-x-2 py-3">
                  <Switch
                    id="count-spaces-switch"
                    checked={countSpaces}
                    onCheckedChange={handleToggleCountSpaces}
                  />
                  <Label htmlFor="count-spaces-switch" className="select-none">
                    Count Characters Including Spaces
                  </Label>
                </div>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              <TextStatsDisplay stats={textStats} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
