"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AboutSection } from "@/components/tools/about-section";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { TextStats } from "@/types/tools";
import { analyzeText } from "@/lib/utils/unicode";
import { Copy, Download, RotateCcw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import AdUnit from "../ad-unit";

export function TextAnalysisTool() {
  const [inputText, setInputText] = React.useState("");
  const [analysis, setAnalysis] = React.useState<ReturnType<
    typeof analyzeText
  > | null>(null);
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

    if (newText) {
      const result = analyzeText(newText);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  };

  const handleCopy = async () => {
    if (!analysis) return;

    try {
      const report = [
        "Text Analysis Report",
        "===================",
        "",
        `Total Characters: ${analysis.totalCharacters}`,
        `Unique Characters: ${analysis.uniqueCharacters}`,
        `Surrogate Pairs: ${analysis.surrogatePairs}`,
        `Non-Characters: ${analysis.nonCharacters}`,
        `Private Use: ${analysis.privateUse}`,
        "",
        "Scripts Used:",
        "------------",
        ...Object.entries(analysis.scripts).map(
          ([script, count]) => `${script}: ${count} characters`
        ),
        "",
        "Unicode Blocks:",
        "--------------",
        ...Object.entries(analysis.blocks).map(
          ([block, count]) => `${block}: ${count} characters`
        ),
        "",
        "Categories:",
        "-----------",
        ...Object.entries(analysis.categories).map(
          ([category, count]) => `${category}: ${count} characters`
        ),
      ].join("\n");

      await navigator.clipboard.writeText(report);
      toast({
        title: "Copied to clipboard",
        description: "Analysis report has been copied to your clipboard",
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
    if (!analysis) return;

    const report = [
      "Text Analysis Report",
      "===================",
      "",
      `Total Characters: ${analysis.totalCharacters}`,
      `Unique Characters: ${analysis.uniqueCharacters}`,
      `Surrogate Pairs: ${analysis.surrogatePairs}`,
      `Non-Characters: ${analysis.nonCharacters}`,
      `Private Use: ${analysis.privateUse}`,
      "",
      "Scripts Used:",
      "------------",
      ...Object.entries(analysis.scripts).map(
        ([script, count]) => `${script}: ${count} characters`
      ),
      "",
      "Unicode Blocks:",
      "--------------",
      ...Object.entries(analysis.blocks).map(
        ([block, count]) => `${block}: ${count} characters`
      ),
      "",
      "Categories:",
      "-----------",
      ...Object.entries(analysis.categories).map(
        ([category, count]) => `${category}: ${count} characters`
      ),
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text-analysis.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded successfully",
      description: "Analysis report has been downloaded",
      duration: 2000,
    });
  };

  const handleReset = () => {
    setInputText("");
    setAnalysis(null);
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
          <h1 className="font-bold tracking-tight">Text Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Analyze text properties, scripts, and Unicode characteristics
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
                <Textarea
                  placeholder="Enter text to analyze..."
                  value={inputText}
                  onChange={handleInputChange}
                  className="min-h-[400px] font-mono"
                />
                <TextStatsDisplay stats={textStats} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    disabled={!analysis}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDownload}
                    disabled={!analysis}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {analysis ? (
                  <div className="space-y-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={2}>General Statistics</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Total Characters
                          </TableCell>
                          <TableCell>{analysis.totalCharacters}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Unique Characters
                          </TableCell>
                          <TableCell>{analysis.uniqueCharacters}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Surrogate Pairs
                          </TableCell>
                          <TableCell>{analysis.surrogatePairs}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Non-Characters
                          </TableCell>
                          <TableCell>{analysis.nonCharacters}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Private Use
                          </TableCell>
                          <TableCell>{analysis.privateUse}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={2}>Scripts Used</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(analysis.scripts).map(
                          ([script, count]) => (
                            <TableRow key={script}>
                              <TableCell className="font-medium">
                                {script}
                              </TableCell>
                              <TableCell>{count} characters</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={2}>Unicode Categories</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(analysis.categories).map(
                          ([category, count]) => (
                            <TableRow key={category}>
                              <TableCell className="font-medium">
                                {category}
                              </TableCell>
                              <TableCell>{count} characters</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                    Enter text to see analysis
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
