"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AboutSection } from "@/components/tools/about-section";
import { formatters } from "@/lib/utils/formatters";
import { Copy, Download, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Formatter API type */
type FormatterApi = {
  format: (
    code: string,
    opts?: { indent?: number }
  ) => Promise<string> | string;
  minify?: (code: string) => string;
};

/**
 * Try to auto-fix common JSON issues:
 * - remove JS comments
 * - remove trailing commas
 * - convert single-quoted strings -> double quotes (conservative)
 * - quote simple unquoted object keys
 *
 * Returns fixed string plus warnings (so UI can inform the user).
 *
 * NOTE: This is a best-effort helper. It may be aggressive in some edge cases,
 * so we expose an "Auto-fix JSON" toggle in the UI (default: true).
 */
function tryFixJson(input: string): { fixed: string; warnings: string[] } {
  const warnings: string[] = [];
  let s = input;

  // 1) Remove JS-style comments (// ... and /* ... */)
  const beforeComments = s;
  s = s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
  if (s !== beforeComments) warnings.push("Removed JS-style comments.");

  // 2) Convert common JS tokens that break JSON to null
  //    (undefined, NaN, Infinity, -Infinity)
  const beforeTokens = s;
  s = s.replace(/\b(undefined|NaN|Infinity|-Infinity)\b/g, "null");
  if (s !== beforeTokens)
    warnings.push("Replaced undefined/NaN/Infinity with null.");

  // 3) Remove consecutive commas (e.g. [1,,2] or {a:1,,b:2} -> single commas)
  //    Reduce any run of multiple commas to a single comma.
  const beforeMultiCommas = s;
  s = s.replace(/,+/g, (m) => (m.length > 1 ? "," : m));
  if (s !== beforeMultiCommas) warnings.push("Collapsed consecutive commas.");

  // 4) Remove leading commas after [ or {  e.g. [ ,1,2] -> [1,2]
  const beforeLeading = s;
  s = s.replace(/([\[\{])\s*,\s*/g, "$1");
  if (s !== beforeLeading)
    warnings.push("Removed leading commas inside arrays/objects.");

  // 5) Remove trailing commas before ] or }  e.g. [1,2,] -> [1,2]
  const beforeTrailing = s;
  s = s.replace(/,\s*([\]\}])/g, "$1");
  if (s !== beforeTrailing)
    warnings.push("Removed trailing commas inside arrays/objects.");

  // 6) Convert single-quoted strings -> double quotes (conservative)
  const beforeSingle = s;
  s = s.replace(/'((?:\\.|[^'\\])*)'/g, (_m, inner) => {
    const escaped = inner.replace(/"/g, '\\"');
    return `"${escaped}"`;
  });
  if (s !== beforeSingle)
    warnings.push(
      "Converted single quotes to double quotes for string literals."
    );

  // 7) Quote unquoted object keys: { key: 1 } -> { "key": 1 }
  //    Match simple identifier-like keys only to avoid touching expressions
  const beforeKeys = s;
  s = s.replace(/([{,]\s*)([A-Za-z0-9_\-$]+)\s*:/g, (_m, lead, key) => {
    return `${lead}"${key}":`;
  });
  if (s !== beforeKeys) warnings.push("Quoted simple unquoted object keys.");

  // 8) Trim whitespace
  s = s.trim();

  // Final: if it still looks empty-ish, leave as-is (parse will fail later)
  return { fixed: s, warnings };
}

/** About content (kept concise here; you can reuse your previous aboutContent) */
const aboutContent = (
  <div className="space-y-6">
    <p>
      Transform your code with our <strong>Code Formatter Tool</strong>. Format
      and beautify code in multiple languages with customizable options.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔧 Supported Languages</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Python:</strong> Format using Black code formatter
          </li>
          <li>
            <strong>JavaScript/TypeScript:</strong> Format modern JS/TS code
          </li>
          <li>
            <strong>HTML:</strong> Clean and organize HTML markup
          </li>
          <li>
            <strong>CSS:</strong> Format stylesheets with proper indentation
          </li>
          <li>
            <strong>JSON:</strong> Pretty print and validate JSON data (with
            optional auto-fix)
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export function CodeFormatterTool() {
  const [inputCode, setInputCode] = React.useState("");
  const [outputCode, setOutputCode] = React.useState("");
  const [language, setLanguage] = React.useState("javascript");
  const [minifyMode, setMinifyMode] = React.useState(false);
  const [isFormatting, setIsFormatting] = React.useState(false);
  const [indent, setIndent] = React.useState(2);

  // NEW: Auto-fix toggle for JSON
  const [autoFixJson, setAutoFixJson] = React.useState(true);

  const { toast } = useToast();

  // Debounce to avoid formatting on every keystroke
  const debounceRef = React.useRef<number | null>(null);

  const getFormatter = (lang: string): FormatterApi | undefined =>
    (formatters as Record<string, FormatterApi | undefined>)[lang];

  const formatCode = React.useCallback(
    async (code: string, lang: string, minify: boolean, indentSize = 2) => {
      if (!code) {
        setOutputCode("");
        return;
      }

      const formatter = getFormatter(lang);
      // Special-case: JSON formatting uses built-in JSON parse/stringify with optional auto-fix
      if (lang === "json") {
        try {
          setIsFormatting(true);

          // Fast path: try parse as-is
          try {
            const parsed = JSON.parse(code);
            const result = minify
              ? JSON.stringify(parsed)
              : JSON.stringify(parsed, null, indentSize);
            setOutputCode(result);
            return;
          } catch (parseErr) {
            // if auto-fix is enabled, attempt fixes
            if (autoFixJson) {
              const { fixed, warnings } = tryFixJson(code);
              try {
                const parsed = JSON.parse(fixed);
                const result = minify
                  ? JSON.stringify(parsed)
                  : JSON.stringify(parsed, null, indentSize);
                setOutputCode(result);

                if (warnings.length > 0) {
                  toast({
                    title: "Auto-fixed JSON issues",
                    description: warnings.join(" • "),
                    duration: 4000,
                  });
                } else {
                  toast({
                    title: "Auto-fix applied",
                    description: "Minor fixes applied to make JSON valid.",
                    duration: 3000,
                  });
                }

                return;
              } catch (errAfterFix) {
                // Fallthrough to throw user-friendly error below
                const msgBefore =
                  parseErr instanceof Error
                    ? parseErr.message
                    : String(parseErr);
                const msgAfter =
                  errAfterFix instanceof Error
                    ? errAfterFix.message
                    : String(errAfterFix);
                throw new Error(
                  `Invalid JSON.\nInitial parse error: ${msgBefore}\nAfter auto-fix attempt: ${msgAfter}\nTips: check trailing commas, comments, single quotes, unquoted keys.`
                );
              }
            } else {
              // auto-fix disabled -> show parse error
              const msg =
                parseErr instanceof Error ? parseErr.message : String(parseErr);
              throw new Error(
                `Invalid JSON: ${msg}. Enable "Auto-fix JSON" to attempt automated corrections.`
              );
            }
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          toast({
            title: "Format Error",
            description: message,
            variant: "destructive",
          });
        } finally {
          setIsFormatting(false);
        }

        return;
      }

      // Non-JSON languages - use configured formatter if available
      if (!formatter) {
        toast({
          title: "Formatter missing",
          description: `No formatter configured for "${lang}"`,
          variant: "destructive",
        });
        return;
      }

      try {
        setIsFormatting(true);

        if (minify) {
          if (!formatter.minify) {
            toast({
              title: "Not Supported",
              description: "Minification is not supported for this language",
              variant: "destructive",
            });
            return;
          }
          const result = formatter.minify(code);
          setOutputCode(result);
        } else {
          const maybePromise = formatter.format(code, { indent: indentSize });
          const result =
            typeof maybePromise === "string"
              ? maybePromise
              : await maybePromise;
          setOutputCode(result);
        }
      } catch (error) {
        toast({
          title: "Format Error",
          description:
            error instanceof Error ? error.message : "Failed to format code",
          variant: "destructive",
        });
      } finally {
        setIsFormatting(false);
      }
    },
    [toast, autoFixJson]
  );

  // Run formatting with debounce
  React.useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      formatCode(inputCode, language, minifyMode, indent);
    }, 300);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [inputCode, language, minifyMode, indent, formatCode]);

  const handleCopy = async () => {
    if (!outputCode) return;

    if (!("clipboard" in navigator)) {
      toast({
        title: "Clipboard unavailable",
        description:
          "Your browser doesn't support the clipboard API. Copy manually.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(outputCode);
      toast({
        title: "Copied to clipboard",
        description: "Code has been copied to your clipboard",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const extMap: Record<string, string> = {
    python: "py",
    javascript: "js",
    typescript: "ts",
    html: "html",
    css: "css",
    json: "json",
  };

  const handleDownload = () => {
    if (!outputCode) return;

    const ext = extMap[language] ?? "txt";
    const filename = `${language}-formatted.${ext}`;

    const blob = new Blob([outputCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: `Saved as ${filename}`,
      duration: 2000,
    });
  };

  const handleReset = () => {
    setInputCode("");
    setOutputCode("");
    setLanguage("javascript");
    setMinifyMode(false);
    setIndent(2);
    setAutoFixJson(true);
  };

  const formatter = getFormatter(language);
  const minifySupported = Boolean(formatter && formatter.minify);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">Code Formatter</h1>
          <p className="text-muted-foreground mt-2">
            Format and beautify code in multiple programming languages
          </p>
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
                    value={language}
                    onValueChange={(v) => setLanguage(v)}
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Indent control using shadcn Select */}
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="indent-size">Indent</Label>

                    <Select
                      value={String(indent)}
                      onValueChange={(v) => setIndent(Number(v))}
                    >
                      <SelectTrigger id="indent-size" className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Textarea
                  placeholder="Enter code here..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[400px] font-mono"
                  aria-busy={isFormatting}
                  disabled={isFormatting}
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="minify-mode"
                        checked={minifyMode}
                        onCheckedChange={(v) => setMinifyMode(Boolean(v))}
                        disabled={!minifySupported || isFormatting}
                        title={
                          minifySupported
                            ? "Toggle minify"
                            : "Minify not supported for this language"
                        }
                      />
                      <Label htmlFor="minify-mode">Minify Mode</Label>
                    </div>

                    {/* NEW: Auto-fix JSON toggle - only enabled when JSON is selected */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-fix-json"
                        checked={autoFixJson}
                        onCheckedChange={(v) => setAutoFixJson(Boolean(v))}
                        disabled={language !== "json" || isFormatting}
                        title={
                          language === "json"
                            ? "Auto-fix common JSON issues"
                            : "Select JSON to enable"
                        }
                      />
                      <Label htmlFor="auto-fix-json">Auto-fix JSON</Label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopy}
                      disabled={!outputCode || isFormatting}
                      aria-label="Copy formatted code"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDownload}
                      disabled={!outputCode || isFormatting}
                      aria-label="Download formatted code"
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleReset}
                      disabled={isFormatting}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                <Textarea
                  readOnly
                  value={isFormatting ? "Formatting..." : outputCode}
                  className="min-h-[400px] font-mono bg-secondary/20"
                  placeholder="Formatted code will appear here..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <AboutSection title="About Code Formatter" content={aboutContent} />
      </div>
    </div>
  );
}
