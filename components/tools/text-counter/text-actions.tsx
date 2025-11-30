import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Clipboard,
  ClipboardCheck,
  ClipboardPaste,
  RotateCcw,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface TextActionsProps {
  text: string;
  setText: (val: string) => void;
  onReset: () => void;
  onPaste?: (val: string) => void; // optional override
}

export default function TextActions({
  text,
  setText,
  onReset,
}: TextActionsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // ──────────────────────────── COPY TEXT ────────────────────────────
  const handleCopy = async () => {
    if (!text.trim()) return;

    await navigator.clipboard.writeText(text);
    setCopied(true);

    toast({
      title: "Copied!",
      description: "Your text has been copied to clipboard.",
    });

    setTimeout(() => setCopied(false), 1500);
  };

  // ──────────────────────────── COPY STATS ────────────────────────────
  const handleCopyStats = async () => {
    const statsBlob = `
Words: ${text.trim().split(/\s+/).filter(Boolean).length}
Characters (with spaces): ${text.length}
Characters (without spaces): ${text.replace(/\s/g, "").length}
`;

    await navigator.clipboard.writeText(statsBlob.trim());

    toast({
      title: "Stats Copied!",
      description: "Text statistics copied to clipboard.",
    });
  };

  // ──────────────────────────── PASTE FROM CLIPBOARD ────────────────────────────
  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (!clip) {
        toast({
          variant: "destructive",
          title: "Nothing to paste",
          description: "Your clipboard is empty.",
        });
        return;
      }
      setText(clip);

      toast({
        title: "Text pasted!",
        description: "Content inserted from clipboard.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Paste not allowed",
        description: "Your browser blocked clipboard permission.",
      });
    }
  };

  // ──────────────────────────── SAMPLE TEXT ────────────────────────────
  const handleSample = () => {
    const sample = `CleanFormatter is a powerful online toolkit built for writers, marketers, students, and developers. It provides instant text statistics, formatting utilities, case converters, and intelligent cleanup tools.

This sample paragraph is here to help you quickly test the Text Counter.`;

    setText(sample);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      {/* Copy Text */}
      <Button variant="secondary" size="sm" onClick={handleCopy}>
        {copied ? (
          <>
            <ClipboardCheck className="h-4 w-4 mr-2" /> Copied
          </>
        ) : (
          <>
            <Clipboard className="h-4 w-4 mr-2" /> Copy Text
          </>
        )}
      </Button>

      {/* Copy Stats */}
      <Button variant="secondary" size="sm" onClick={handleCopyStats}>
        <FileText className="h-4 w-4 mr-2" /> Copy Stats
      </Button>

      {/* Paste */}
      <Button variant="secondary" size="sm" onClick={handlePaste}>
        <ClipboardPaste className="h-4 w-4 mr-2" /> Paste
      </Button>

      {/* Sample Text */}
      <Button variant="outline" size="sm" onClick={handleSample}>
        Sample Text
      </Button>

      {/* Reset */}
      <Button variant="destructive" size="sm" onClick={onReset}>
        <RotateCcw className="h-4 w-4 mr-2" /> Reset
      </Button>
    </div>
  );
}
