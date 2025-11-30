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
import {
  Copy,
  Download,
  RotateCcw,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { encodeURL, decodeURL, URLEncoderOptions } from "@/lib/utils/url";

type Mode = "encode" | "decode";
type OutputView = "raw" | "prettyQuery" | "urlBreakdown";
type SpaceEncoding = "percent20" | "plus" | "space";

type ValidationStatus =
  | "empty"
  | "validUrl"
  | "validQuery"
  | "multiLine"
  | "invalid";

interface ValidationInfo {
  status: ValidationStatus;
  message: string;
}

interface Diagnostic {
  type: "warning" | "error";
  message: string;
}

interface AdvancedOptions {
  batchMode: boolean;
  queryValuesOnly: boolean;
  rfc3986Strict: boolean;
}

interface UseURLEncoderResult {
  outputText: string;
  prettyQueryText: string;
  urlBreakdownText: string;
  diagnostics: Diagnostic[];
  validation: ValidationInfo;
}

/**
 * Apply RFC3986 strict encoding on top of an already-encoded string.
 * Encodes characters: ! ' ( ) *
 */
function applyRfc3986Strict(encoded: string): string {
  return encoded.replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

/**
 * Try to validate and classify the input as a URL / query / multi-line / invalid.
 */
function analyzeInputForValidation(input: string): ValidationInfo {
  const trimmed = input.trim();
  if (!trimmed) {
    return { status: "empty", message: "Waiting for input." };
  }

  const lines = trimmed.split(/\r?\n/);
  if (lines.length > 1) {
    return {
      status: "multiLine",
      message: "Multiple lines detected (batch mode friendly).",
    };
  }

  const single = lines[0];

  // Looks like just a query string
  if (/^[?]?[A-Za-z0-9_\-]+=.*&?/.test(single)) {
    return {
      status: "validQuery",
      message: "Looks like a query string with parameters.",
    };
  }

  // Try URL parsing
  try {
    // If no scheme, try adding a dummy scheme
    const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(single);
    // eslint-disable-next-line no-new
    new URL(hasScheme ? single : `http://${single}`);
    return {
      status: "validUrl",
      message: hasScheme
        ? "Valid URL detected."
        : "Valid host/path detected (scheme inferred).",
    };
  } catch {
    return {
      status: "invalid",
      message: "Input is not a valid URL or query string.",
    };
  }
}

/**
 * Extract a query string and base URL for pretty views.
 */
function extractUrlParts(text: string): {
  base?: string;
  query?: string;
  hash?: string;
} {
  const trimmed = text.trim();
  if (!trimmed) return {};

  try {
    const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed);
    const url = new URL(hasScheme ? trimmed : `http://${trimmed}`);
    const base = hasScheme
      ? `${url.protocol}//${url.host}${url.pathname}`
      : `${url.host}${url.pathname}`;
    const query = url.search ? url.search.replace(/^\?/, "") : "";
    const hash = url.hash ? url.hash.replace(/^#/, "") : "";
    return { base, query, hash };
  } catch {
    // Fallback: treat as pure query
    const q = trimmed.startsWith("?") ? trimmed.slice(1) : trimmed;
    if (q.includes("=")) {
      return { base: undefined, query: q, hash: undefined };
    }
    return {};
  }
}

/**
 * Pretty-print query string into "key = value" lines.
 */
function formatQueryPretty(query: string | undefined): string {
  if (!query) return "No query parameters found.";
  const parts = query.split("&").filter(Boolean);
  if (parts.length === 0) return "No query parameters found.";
  const lines = parts.map((part) => {
    const [k, v] = part.split("=");
    return `${k || "(no key)"} = ${v ?? ""}`;
  });
  return lines.join("\n");
}

/**
 * URL breakdown view: base URLs, parameters, hash.
 */
function buildUrlBreakdown(text: string): string {
  const parts = extractUrlParts(text);
  if (!parts.base && !parts.query && !parts.hash) {
    return "Unable to parse URL or query string for breakdown.";
  }

  const lines: string[] = [];
  if (parts.base) {
    lines.push(`Base URL: ${parts.base}`);
  }
  if (parts.query) {
    lines.push("", "Query Parameters:");
    lines.push(formatQueryPretty(parts.query));
  }
  if (parts.hash) {
    lines.push("", `Hash Fragment: #${parts.hash}`);
  }

  return lines.join("\n");
}

/**
 * Detect invalid percent-encoding in a string (e.g. %ZZ, trailing %).
 */
function findPercentDiagnostics(text: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "%") {
      const hex = text.slice(i + 1, i + 3);
      if (hex.length < 2 || !/^[0-9A-Fa-f]{2}$/.test(hex)) {
        diagnostics.push({
          type: "error",
          message: `Invalid percent-encoding at position ${i}: "${text.slice(
            i,
            i + 3
          )}"`,
        });
      }
    }
  }
  return diagnostics;
}

/**
 * Core URL encoder/decoder hook with debounced processing and analysis.
 */
function useURLEncoder(
  inputText: string,
  mode: Mode,
  options: URLEncoderOptions,
  advanced: AdvancedOptions
): UseURLEncoderResult {
  const [outputText, setOutputText] = React.useState("");
  const [prettyQueryText, setPrettyQueryText] = React.useState("");
  const [urlBreakdownText, setUrlBreakdownText] = React.useState("");
  const [diagnostics, setDiagnostics] = React.useState<Diagnostic[]>([]);
  const [validation, setValidation] = React.useState<ValidationInfo>({
    status: "empty",
    message: "Waiting for input.",
  });

  const processCore = React.useCallback(
    (raw: string) => {
      const trimmed = raw;
      if (!trimmed) {
        setOutputText("");
        setPrettyQueryText("");
        setUrlBreakdownText("");
        setDiagnostics([]);
        setValidation({ status: "empty", message: "Waiting for input." });
        return;
      }

      setValidation(analyzeInputForValidation(trimmed));

      const lines = advanced.batchMode ? trimmed.split(/\r?\n/) : [trimmed];

      const processedLines = lines.map((line) => {
        const lineTrimmed = line;
        if (!lineTrimmed) return "";

        try {
          if (mode === "encode") {
            // Query-values-only mode
            if (advanced.queryValuesOnly) {
              const parts = lineTrimmed.split("&");
              const encodedParts = parts.map((part) => {
                if (!part) return "";
                const [key, value] = part.split("=");
                if (typeof value === "undefined") {
                  // No '=' present, treat entire part as value
                  const encodedVal = encodeURL(key, options);
                  return encodedVal;
                }
                const encodedVal = encodeURL(value, options);
                return `${key}=${encodedVal}`;
              });
              let encoded = encodedParts.join("&");
              if (advanced.rfc3986Strict) {
                encoded = applyRfc3986Strict(encoded);
              }
              return encoded;
            }

            // Normal encode
            let encoded = encodeURL(lineTrimmed, options);
            if (advanced.rfc3986Strict) {
              encoded = applyRfc3986Strict(encoded);
            }
            return encoded;
          } else {
            // decode
            return decodeURL(lineTrimmed, options);
          }
        } catch (err) {
          // In core hook we swallow individual line errors,
          // diagnostics at UI level will handle severe issues.
          return lineTrimmed;
        }
      });

      const joined = advanced.batchMode
        ? processedLines.join("\n")
        : processedLines[0] ?? "";

      setOutputText(joined);
      setDiagnostics(findPercentDiagnostics(joined));
      setPrettyQueryText(formatQueryPretty(extractUrlParts(joined).query));
      setUrlBreakdownText(buildUrlBreakdown(joined));
    },
    [mode, options, advanced]
  );

  // Debounced processing on input/options changes
  React.useEffect(() => {
    const handle = setTimeout(() => {
      processCore(inputText);
    }, 200);

    return () => clearTimeout(handle);
  }, [inputText, processCore]);

  return {
    outputText,
    prettyQueryText,
    urlBreakdownText,
    diagnostics,
    validation,
  };
}

export function URLEncoderTool() {
  const [inputText, setInputText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("encode");
  const [autoDetectMode, setAutoDetectMode] = React.useState(true);

  const [options, setOptions] = React.useState<URLEncoderOptions>({
    mode: "uri",
    spaceAsPlus: false,
    encodeAll: false,
    skipEncoded: true,
  });

  const [spaceEncoding, setSpaceEncoding] =
    React.useState<SpaceEncoding>("percent20");

  const [advanced, setAdvanced] = React.useState<AdvancedOptions>({
    batchMode: false,
    queryValuesOnly: false,
    rfc3986Strict: false,
  });

  const [outputView, setOutputView] = React.useState<OutputView>("raw");

  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });

  const { toast } = useToast();

  // Derive effective URLEncoderOptions from base options + spaceEncoding
  const effectiveOptions = React.useMemo<URLEncoderOptions>(() => {
    let spaceAsPlus = options.spaceAsPlus;
    if (spaceEncoding === "plus") {
      spaceAsPlus = true;
    } else if (spaceEncoding === "percent20") {
      spaceAsPlus = false;
    } else {
      // "space" – keep the underlying toggle but we'll post-process separately if needed
      spaceAsPlus = false;
    }
    return {
      ...options,
      spaceAsPlus,
    };
  }, [options, spaceEncoding]);

  // Core encoding/decoding & analysis
  const {
    outputText,
    prettyQueryText,
    urlBreakdownText,
    diagnostics,
    validation,
  } = useURLEncoder(inputText, mode, effectiveOptions, advanced);

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

  const detectModeFromInput = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // Very simple heuristic: if we see valid %XX patterns or lots of + and few spaces, treat as encoded.
    const hasEncodedPattern = /%[0-9A-Fa-f]{2}/.test(trimmed);
    const plusCount = (trimmed.match(/\+/g) || []).length;
    const spaceCount = (trimmed.match(/ /g) || []).length;

    if (hasEncodedPattern || (plusCount > 0 && spaceCount === 0)) {
      setMode("decode");
    } else {
      setMode("encode");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    calculateStats(newText);
    if (autoDetectMode) {
      detectModeFromInput(newText);
    }
  };

  const handleCopy = async () => {
    const current =
      outputView === "raw"
        ? outputText
        : outputView === "prettyQuery"
        ? prettyQueryText
        : urlBreakdownText;

    if (!current) return;

    try {
      await navigator.clipboard.writeText(current);
      toast({
        title: "Copied to clipboard",
        description: "Output text has been copied.",
        duration: 1800,
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Your browser blocked clipboard access. Copy manually.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDownload = () => {
    const current =
      outputView === "raw"
        ? outputText
        : outputView === "prettyQuery"
        ? prettyQueryText
        : urlBreakdownText;

    if (!current) return;

    const blob = new Blob([current], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      outputView === "raw"
        ? `${mode}d-urls.txt`
        : outputView === "prettyQuery"
        ? "query-parameters.txt"
        : "url-breakdown.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded successfully",
      description: "Your text has been downloaded.",
      duration: 2000,
    });
  };

  const handleReset = () => {
    setInputText("");
    setMode("encode");
    setAutoDetectMode(true);
    setOptions({
      mode: "uri",
      spaceAsPlus: false,
      encodeAll: false,
      skipEncoded: true,
    });
    setSpaceEncoding("percent20");
    setAdvanced({
      batchMode: false,
      queryValuesOnly: false,
      rfc3986Strict: false,
    });
    setOutputView("raw");
    setTextStats({
      words: 0,
      sentences: 0,
      characters: 0,
      paragraphs: 0,
    });
  };

  const handleClearInput = () => {
    setInputText("");
    setTextStats({
      words: 0,
      sentences: 0,
      characters: 0,
      paragraphs: 0,
    });
  };

  const renderValidationBadge = () => {
    if (validation.status === "empty") return null;

    const baseClasses =
      "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs border";
    if (
      validation.status === "validUrl" ||
      validation.status === "validQuery"
    ) {
      return (
        <span
          className={`${baseClasses} border-emerald-500/40 text-emerald-600 bg-emerald-500/5`}
        >
          <CheckCircle2 className="w-3 h-3" />
          {validation.message}
        </span>
      );
    }

    if (validation.status === "multiLine") {
      return (
        <span
          className={`${baseClasses} border-blue-500/40 text-blue-600 bg-blue-500/5`}
        >
          <AlertTriangle className="w-3 h-3" />
          {validation.message}
        </span>
      );
    }

    return (
      <span
        className={`${baseClasses} border-amber-500/40 text-amber-600 bg-amber-500/5`}
      >
        <AlertTriangle className="w-3 h-3" />
        {validation.message}
      </span>
    );
  };

  const currentOutputForView =
    outputView === "raw"
      ? outputText
      : outputView === "prettyQuery"
      ? prettyQueryText
      : urlBreakdownText;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">URL Encoder/Decoder</h1>
          <p className="text-muted-foreground mt-2">
            Encode and decode URLs, query strings, and parameters with advanced
            options for debugging and analysis.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div
              id="toolArea"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Left: Input & mode controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Select
                      value={mode}
                      onValueChange={(value: Mode) => setMode(value)}
                      disabled={autoDetectMode}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="encode">Encode URL</SelectItem>
                        <SelectItem value="decode">Decode URL</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-detect-mode"
                        checked={autoDetectMode}
                        onCheckedChange={setAutoDetectMode}
                      />
                      <Label htmlFor="auto-detect-mode" className="text-xs">
                        Auto-detect mode
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {renderValidationBadge()}
                  </div>
                </div>

                <div className="relative">
                  <Textarea
                    placeholder={
                      mode === "encode"
                        ? "Enter URL, query string, or list of URLs to encode..."
                        : "Enter encoded URL or text to decode..."
                    }
                    value={inputText}
                    onChange={handleInputChange}
                    className="min-h-[280px] font-mono pr-10"
                  />
                  {inputText && (
                    <button
                      type="button"
                      onClick={handleClearInput}
                      className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted transition"
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  )}
                </div>

                <TextStatsDisplay stats={textStats} />
              </div>

              {/* Right: Options & output */}
              <div className="space-y-4">
                {/* Encoding options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Select
                    value={options.mode}
                    onValueChange={(value: URLEncoderOptions["mode"]) =>
                      setOptions((prev) => ({ ...prev, mode: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Encoding target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uri">Full URI encoding</SelectItem>
                      <SelectItem value="component">
                        Component encoding
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={spaceEncoding}
                    onValueChange={(value: SpaceEncoding) =>
                      setSpaceEncoding(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Spaces encoding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent20">
                        Encode spaces as %20
                      </SelectItem>
                      <SelectItem value="plus">Encode spaces as +</SelectItem>
                      <SelectItem value="space">
                        Keep spaces unencoded
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
                    <Label htmlFor="encode-all" className="text-xs">
                      Encode all non-ASCII characters
                    </Label>
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
                    <Label htmlFor="skip-encoded" className="text-xs">
                      Skip already encoded parts
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="batch-mode"
                      checked={advanced.batchMode}
                      onCheckedChange={(checked) =>
                        setAdvanced((prev) => ({
                          ...prev,
                          batchMode: checked,
                        }))
                      }
                    />
                    <Label htmlFor="batch-mode" className="text-xs">
                      Line-by-line mode
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="query-values-only"
                      checked={advanced.queryValuesOnly}
                      disabled={mode !== "encode"}
                      onCheckedChange={(checked) =>
                        setAdvanced((prev) => ({
                          ...prev,
                          queryValuesOnly: checked,
                        }))
                      }
                    />
                    <Label htmlFor="query-values-only" className="text-xs">
                      Encode query values only
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="rfc-strict"
                      checked={advanced.rfc3986Strict}
                      onCheckedChange={(checked) =>
                        setAdvanced((prev) => ({
                          ...prev,
                          rfc3986Strict: checked,
                        }))
                      }
                    />
                    <Label htmlFor="rfc-strict" className="text-xs">
                      RFC3986 strict encoding
                    </Label>
                  </div>
                </div>

                {/* Output view selector & actions */}
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-md border bg-muted/40 p-1 text-xs">
                    <Button
                      type="button"
                      size="sm"
                      variant={outputView === "raw" ? "default" : "ghost"}
                      onClick={() => setOutputView("raw")}
                      className="px-2"
                    >
                      Raw Output
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={
                        outputView === "prettyQuery" ? "default" : "ghost"
                      }
                      onClick={() => setOutputView("prettyQuery")}
                      className="px-2"
                    >
                      Pretty Query
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={
                        outputView === "urlBreakdown" ? "default" : "ghost"
                      }
                      onClick={() => setOutputView("urlBreakdown")}
                      className="px-2"
                    >
                      URL Breakdown
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopy}
                      disabled={!currentOutputForView}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDownload}
                      disabled={!currentOutputForView}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Output area */}
                <Textarea
                  readOnly
                  value={currentOutputForView}
                  className="min-h-[280px] font-mono bg-muted/40"
                  placeholder={
                    outputView === "raw"
                      ? mode === "encode"
                        ? "Encoded URL will appear here..."
                        : "Decoded URL will appear here..."
                      : outputView === "prettyQuery"
                      ? "Query parameters will be formatted here..."
                      : "URL breakdown will appear here..."
                  }
                />

                {/* Diagnostics */}
                {diagnostics.length > 0 && (
                  <div className="border rounded-md p-3 bg-amber-500/5 border-amber-500/40">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-semibold text-amber-700">
                        Percent-encoding issues detected
                      </span>
                    </div>
                    <ul className="text-xs text-amber-800 list-disc pl-4 space-y-1">
                      {diagnostics.map((d, idx) => (
                        <li key={idx}>{d.message}</li>
                      ))}
                    </ul>
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
