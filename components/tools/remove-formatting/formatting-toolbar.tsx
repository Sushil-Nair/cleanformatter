"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, RotateCcw, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormattingToolbarProps {
  outputText: string;
  onReset: () => void;
  onSwap: () => void;
}

export function FormattingToolbar({
  outputText,
  onReset,
  onSwap,
}: FormattingToolbarProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied to clipboard",
        description: "Cleaned text has been copied.",
        duration: 2000,
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
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
      title: "Downloaded",
      description: "Your cleaned text has been downloaded.",
      duration: 2000,
    });
  };

  return (
    <div className="flex items-center justify-between gap-3">
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
        <Button
          variant="outline"
          size="icon"
          onClick={onSwap}
          disabled={!outputText}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="outline" size="sm" onClick={onReset}>
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>
    </div>
  );
}
