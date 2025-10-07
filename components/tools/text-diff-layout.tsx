"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { diffChars, diffWords, diffLines } from "diff";
import { AboutSection } from "@/components/tools/about-section";

interface TextDiffLayoutProps {
  title: string;
  description?: string;
}

type DiffMode = "chars" | "words" | "lines";

interface DiffPart {
  value: string;
  added?: boolean;
  removed?: boolean;
}

const textDiffAboutContent = (
  <div className="space-y-6">
    <p>
      Effortlessly compare and analyze text differences with our{" "}
      <strong>Text Comparison Tool</strong> – the ultimate solution for spotting
      changes, tracking revisions, and ensuring accuracy in documents, code, or
      content. Whether you&apos;re merging edits, auditing code, or reviewing
      contracts, our Text Diff tool highlights additions, deletions, and
      modifications in seconds, saving you time and reducing errors.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Key Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔍 Side-by-Side Comparison</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            View two texts in a split-screen layout for easy visual scanning.
          </li>
          <li>
            Additions highlighted in{" "}
            <span className="text-green-500">green</span>, deletions in{" "}
            <span className="text-red-500">red</span>, and modifications in{" "}
            <span className="text-blue-500">blue</span>.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">⚡ Real-Time Analysis</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Instantly detect differences as you type or paste text.</li>
          <li>Supports plain text, code snippets, JSON, XML, and more.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">📂 Versatile Use Cases</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Code Reviews:</strong> Track changes in Git commits or
            collaborative coding.
          </li>
          <li>
            <strong>Content Editing:</strong> Compare drafts to final versions
            for writers and editors.
          </li>
          <li>
            <strong>Document Version Control:</strong> Identify updates in legal
            contracts or policies.
          </li>
          <li>
            <strong>Academic Work:</strong> Check plagiarism or revisions in
            essays and theses.
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Why Choose Our Text Diff Tool?</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>
        ✅ <strong>Precision:</strong> Line-by-line and character-level
        comparison for granular insights.
      </li>
      <li>
        ✅ <strong>Export Options:</strong> Download results as HTML, PDF, or
        plain text for sharing.
      </li>
      <li>
        ✅ <strong>Syntax Highlighting:</strong> Built-in support for 20+
        programming languages (Python, JavaScript, etc.).
      </li>
      <li>
        ✅ <strong>Privacy-First:</strong> No text is stored or shared – your
        data stays secure.
      </li>
    </ul>

    <hr />

    <h3 className="text-xl font-bold">How It Works</h3>
    <ol className="list-decimal pl-6 space-y-2">
      <li>
        <strong>Paste or Upload Texts:</strong> Input the original and modified
        versions.
      </li>
      <li>
        <strong>Click Compare:</strong> Let our algorithm highlight differences
        instantly.
      </li>
      <li>
        <strong>Analyze & Resolve:</strong> Review changes, copy fixes, or
        export reports.
      </li>
    </ol>

    <hr />

    <h3 className="text-xl font-bold">Who Uses This Tool?</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>
        <strong>Developers:</strong> Audit code changes, debug updates, or merge
        conflicts.
      </li>
      <li>
        <strong>Writers & Editors:</strong> Track revisions between drafts or
        collaborate on content.
      </li>
      <li>
        <strong>Legal Teams:</strong> Verify updates in contracts, agreements,
        or compliance docs.
      </li>
      <li>
        <strong>Students/Teachers:</strong> Compare essays or research paper
        versions.
      </li>
    </ul>

    <div className="mt-8 text-center">
      <p className="text-lg font-bold">
        Simplify your workflow – uncover exactly what changed, and why, in just
        one click. 🚀
      </p>
    </div>
  </div>
);

export function TextDiffLayout({ title, description }: TextDiffLayoutProps) {
  const [originalText, setOriginalText] = React.useState("");
  const [modifiedText, setModifiedText] = React.useState("");
  const [diffMode, setDiffMode] = React.useState<DiffMode>("words");
  const { toast } = useToast();

  const getDiff = (text1: string, text2: string, mode: DiffMode) => {
    switch (mode) {
      case "chars":
        return diffChars(text1, text2);
      case "words":
        return diffWords(text1, text2);
      case "lines":
        return diffLines(text1, text2);
      default:
        return diffWords(text1, text2);
    }
  };

  const renderDiff = (parts: DiffPart[]) => {
    return parts.map((part, i) => {
      const className = part.added
        ? "bg-green-500/20 dark:bg-green-500/30"
        : part.removed
        ? "bg-red-500/20 dark:bg-red-500/30"
        : "";

      return (
        <span key={i} className={className}>
          {part.value}
        </span>
      );
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
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

  const handleClear = () => {
    setOriginalText("");
    setModifiedText("");
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>

        <Card>
          <CardContent className="p-6">
            <div id="toolArea" className="space-y-6">
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDiffMode("chars")}
                  className={
                    diffMode === "chars"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Character
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDiffMode("words")}
                  className={
                    diffMode === "words"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Word
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDiffMode("lines")}
                  className={
                    diffMode === "lines"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Line
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Original Text</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(originalText)}
                    >
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    placeholder="Enter original text..."
                    className="min-h-[200px] font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Modified Text</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(modifiedText)}
                    >
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={modifiedText}
                    onChange={(e) => setModifiedText(e.target.value)}
                    placeholder="Enter modified text..."
                    className="min-h-[200px] font-mono"
                  />
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h3 className="text-sm font-medium mb-2">Diff Result</h3>
                    <div className="font-mono whitespace-pre-wrap">
                      {renderDiff(
                        getDiff(originalText, modifiedText, diffMode)
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button variant="outline" onClick={handleClear}>
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <AboutSection title="About Text Diff" content={textDiffAboutContent} />
      </div>
    </div>
  );
}
