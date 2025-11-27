"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TextStatsDisplay } from "@/components/tools/text-stats";
import { TextStats } from "@/types/tools";
import { Copy, Download, RotateCcw, Upload, QrCode, Info } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import QRCode from "qrcode";

type Mode = "encode" | "decode";
type EscapeMode = "none" | "json" | "url" | "html";
type ViewTab = "text" | "hex" | "binary" | "preview";

interface FileMeta {
  mimeType: string;
  sizeBytes: number;
  fileName: string;
  extension: string;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");

// ---- Base64 helpers ----

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function toBase64URL(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64URL(str: string) {
  return str.replace(/-/g, "+").replace(/_/g, "/");
}

function normalizeBase64ForDecode(str: string, urlSafe: boolean): string {
  let s = str.replace(/[\r\n\s]/g, "");
  if (urlSafe) {
    s = fromBase64URL(s);
  }
  const mod = s.length % 4;
  if (mod === 1) {
    throw new Error("Invalid Base64 length (mod 4 = 1).");
  } else if (mod === 2) {
    s += "==";
  } else if (mod === 3) {
    s += "=";
  }
  return s;
}

// ---- MIME detection ----

function detectMime(bytes: Uint8Array): string {
  // PNG
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }

  // JPEG
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return "image/jpeg";
  }

  // GIF
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return "image/gif";
  }

  // WEBP
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }

  // BMP
  if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
    return "image/bmp";
  }

  // PDF
  if (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  ) {
    return "application/pdf";
  }

  // MP3
  if (bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) {
    return "audio/mpeg";
  }

  // ZIP (includes DOCX, XLSX, PPTX)
  if (bytes[0] === 0x50 && bytes[1] === 0x4b) {
    return "application/zip";
  }

  return "application/octet-stream"; // fallback
}

function extensionFromMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/gif") return "gif";
  if (mime === "image/webp") return "webp";
  if (mime === "image/bmp") return "bmp";
  if (mime === "application/pdf") return "pdf";
  if (mime === "audio/mpeg") return "mp3";
  if (mime === "application/zip") return "zip";
  return "bin";
}

// ---- Formatting helpers ----

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}

function toBinary(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, "0"))
    .join(" ");
}

function applyLineWrap(str: string, lineLength: number): string {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += lineLength) {
    chunks.push(str.slice(i, i + lineLength));
  }
  return chunks.join("\n");
}

function escapeOutput(text: string, mode: EscapeMode): string {
  if (mode === "none") return text;
  if (mode === "json") return JSON.stringify(text);
  if (mode === "url") return encodeURIComponent(text);
  if (mode === "html")
    return text
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  return text;
}

// ---- Main Component ----

function forceArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.length);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export function Base64Tool() {
  const [mode, setMode] = React.useState<Mode>("encode");
  const [inputText, setInputText] = React.useState("");
  const [debouncedInput, setDebouncedInput] = React.useState("");
  const [outputText, setOutputText] = React.useState("");
  const [viewTab, setViewTab] = React.useState<ViewTab>("text");
  const [escapeMode, setEscapeMode] = React.useState<EscapeMode>("none");
  const [binaryData, setBinaryData] = React.useState<Uint8Array | null>(null);
  const [fileMeta, setFileMeta] = React.useState<FileMeta | null>(null);
  const [diagnostics, setDiagnostics] = React.useState<string[]>([]);
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);

  const [options, setOptions] = React.useState({
    urlSafe: false,
    padding: true,
    lineWrap: false,
    lineLength: 76,
  });

  const [textStats, setTextStats] = React.useState<TextStats>({
    words: 0,
    sentences: 0,
    characters: 0,
    paragraphs: 0,
  });

  const [sizeInfo, setSizeInfo] = React.useState({
    inputBytes: 0,
    outputBytes: 0,
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Debounce input for processing
  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedInput(inputText), 200);
    return () => clearTimeout(t);
  }, [inputText]);

  const calculateStats = (text: string) => {
    setTextStats({
      words: text.trim().split(/\s+/).filter(Boolean).length,
      sentences: text.split(/[.!?]+/).filter(Boolean).length,
      characters: text.length,
      paragraphs: text.split(/\n\s*\n/).filter(Boolean).length,
    });
  };

  // Generate diagnostics for decode mode
  const buildDiagnostics = (raw: string, urlSafe: boolean): string[] => {
    const issues: string[] = [];
    const cleaned = raw.replace(/[\r\n\s]/g, "");

    if (/[^A-Za-z0-9+/=_\-]/.test(cleaned)) {
      issues.push("Input contains characters that are not valid in Base64.");
    }

    if (!urlSafe && /[-_]/.test(cleaned)) {
      issues.push(
        "Input contains URL-safe Base64 characters (- or _) but URL-safe mode is disabled."
      );
    }

    if (cleaned.length % 4 === 1) {
      issues.push(
        "Base64 length is invalid (mod 4 = 1). This cannot be fixed with padding."
      );
    }

    return issues;
  };

  // Core processing logic
  React.useEffect(() => {
    if (!debouncedInput) {
      setOutputText("");
      setBinaryData(null);
      setDiagnostics([]);
      setSizeInfo({ inputBytes: 0, outputBytes: 0 });
      setFileMeta(null);
      return;
    }

    try {
      if (mode === "encode") {
        const inputBytes = textEncoder.encode(debouncedInput);
        let base64 = bytesToBase64(inputBytes);

        if (options.urlSafe) {
          base64 = toBase64URL(base64);
        } else if (!options.padding) {
          base64 = base64.replace(/=+$/g, "");
        }

        if (options.lineWrap) {
          base64 = applyLineWrap(base64, options.lineLength);
        }

        const escaped = escapeOutput(base64, escapeMode);

        setBinaryData(inputBytes);
        setOutputText(escaped);
        setDiagnostics([]);
        setSizeInfo({
          inputBytes: inputBytes.length,
          outputBytes: base64.length,
        });
        setFileMeta(null);
      } else {
        const diags = buildDiagnostics(debouncedInput, options.urlSafe);
        setDiagnostics(diags);

        const cleaned = debouncedInput
          .replace(/^data:[^;]+;base64,/i, "")
          .replace(/[\r\n\s]/g, "");

        // Normalize for URL-safe and padding
        const normalized = normalizeBase64ForDecode(cleaned, options.urlSafe);

        // Decode into bytes
        const bytes = base64ToBytes(normalized);

        let decodedText: string;
        try {
          decodedText = textDecoder.decode(bytes);
        } catch {
          decodedText = "[Decoded binary data]";
        }

        const escaped = escapeOutput(decodedText, escapeMode);

        const mime = detectMime(bytes);
        const meta: FileMeta = {
          mimeType: mime,
          sizeBytes: bytes.length,
          fileName: "decoded." + extensionFromMime(mime),
          extension: extensionFromMime(mime),
        };

        setBinaryData(bytes);
        setOutputText(escaped);
        setFileMeta(meta);
        setSizeInfo({
          inputBytes: debouncedInput.replace(/[\r\n\s]/g, "").length,
          outputBytes: bytes.length,
        });
      }
    } catch (err) {
      setBinaryData(null);
      setOutputText("");
      setFileMeta(null);

      toast({
        title: `Failed to ${mode}`,
        description:
          err instanceof Error
            ? err.message
            : "An error occurred while processing the input.",
        variant: "destructive",
      });
    }
  }, [debouncedInput, mode, options, escapeMode, toast]);

  // QR Code generation based on outputText (limit length)
  React.useEffect(() => {
    if (!outputText || outputText.length > 3000) {
      setQrDataUrl(null);
      return;
    }
    QRCode.toDataURL(outputText)
      .then((url: string) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(null));
  }, [outputText]);

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied to clipboard",
        description: "Output has been copied.",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Your browser blocked clipboard access. Copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadText = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${mode}-base64.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Download complete",
      description: "Text file has been saved.",
    });
  };

  const handleDecodeToFile = () => {
    if (!binaryData || mode !== "decode" || !fileMeta) return;
    // Convert to Blob-safe Uint8Array
    const safeBuffer = forceArrayBuffer(binaryData);
    const blob = new Blob([safeBuffer], { type: fileMeta.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileMeta.fileName;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "File decoded",
      description: `Saved as ${fileMeta.fileName}.`,
    });
  };

  const handleCopyDataUrl = async () => {
    if (!binaryData || mode !== "decode" || !fileMeta) return;
    const base64 = bytesToBase64(binaryData);
    const dataUrl = `data:${fileMeta.mimeType};base64,${base64}`;
    try {
      await navigator.clipboard.writeText(dataUrl);
      toast({
        title: "Copied Data URL",
        description: "Data URL copied to clipboard.",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Copy manually if clipboard is blocked.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setMode("encode");
    setInputText("");
    setDebouncedInput("");
    setOutputText("");
    setBinaryData(null);
    setViewTab("text");
    setEscapeMode("none");
    setDiagnostics([]);
    setFileMeta(null);
    setSizeInfo({ inputBytes: 0, outputBytes: 0 });
    setOptions({
      urlSafe: false,
      padding: true,
      lineWrap: false,
      lineLength: 76,
    });
    setTextStats({
      words: 0,
      sentences: 0,
      characters: 0,
      paragraphs: 0,
    });
    setQrDataUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files?.length) return;
    const file = files[0];

    if (file.size > 200 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 200 MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;

      if (mode === "encode") {
        if (file.type.startsWith("text/") && typeof result === "string") {
          setInputText(result);
          calculateStats(result);
          setFileMeta({
            mimeType: file.type,
            sizeBytes: file.size,
            fileName: file.name,
            extension: file.name.split(".").pop() || "txt",
          });
        } else if (result instanceof ArrayBuffer) {
          const bytes = new Uint8Array(result);
          const base64 = bytesToBase64(bytes);

          // Instead of setting input text
          setInputText("");

          // Set OUTPUT DIRECTLY
          setOutputText(base64);
          setBinaryData(bytes);
        }
      } else {
        if (typeof result === "string") {
          setInputText(result);
          calculateStats(result);
        }
      }
    };

    if (mode === "encode") {
      if (file.type.startsWith("text/")) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    } else {
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData("text");
    const cleaned = text.replace(/[\r\n\s]/g, "");
    if (/^[A-Za-z0-9+/=_-]+$/.test(cleaned) && cleaned.length > 8) {
      setMode("decode");
    }
  };

  const inputPlaceholder =
    mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode...";

  const renderPreview = () => {
    if (!binaryData || !fileMeta) {
      return (
        <div className="text-sm text-muted-foreground">
          No preview available.
        </div>
      );
    }

    const base64 = bytesToBase64(binaryData);
    const src = `data:${fileMeta.mimeType};base64,${base64}`;

    if (fileMeta.mimeType.startsWith("image/")) {
      return (
        <div className="flex flex-col items-start space-y-2">
          <img
            src={src}
            alt="Decoded preview"
            className="max-h-64 rounded border"
          />
          <span className="text-xs text-muted-foreground">
            Image preview ({fileMeta.mimeType})
          </span>
        </div>
      );
    }

    if (fileMeta.mimeType === "application/pdf") {
      return (
        <div className="space-y-2">
          <iframe src={src} className="w-full h-64 border rounded" />
          <span className="text-xs text-muted-foreground">PDF preview</span>
        </div>
      );
    }

    if (fileMeta.mimeType.startsWith("audio/")) {
      return (
        <div className="space-y-2">
          <audio controls src={src} className="w-full" />
          <span className="text-xs text-muted-foreground">
            Audio preview ({fileMeta.mimeType})
          </span>
        </div>
      );
    }

    return (
      <div className="text-sm text-muted-foreground">
        Preview is not available for this MIME type ({fileMeta.mimeType}). You
        can still decode to file and open it locally.
      </div>
    );
  };

  const renderedOutput = (() => {
    if (viewTab === "text") {
      return outputText;
    }
    if (viewTab === "hex") {
      if (!binaryData) return "No binary data available.";
      return toHex(binaryData);
    }
    if (viewTab === "binary") {
      if (!binaryData) return "No binary data available.";
      return toBinary(binaryData);
    }
    return "";
  })();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">
            Advanced Base64 Encoder/Decoder
          </h1>
          <p className="text-muted-foreground mt-2">
            Encode and decode text or files with Base64, inspect binary and hex
            output, preview decoded files, and generate Data URLs and QR codes.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              id="toolArea"
            >
              {/* Left: Input & file handling */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <Select
                    value={mode}
                    onValueChange={(v) => setMode(v as Mode)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="encode">Encode to Base64</SelectItem>
                      <SelectItem value="decode">Decode from Base64</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </div>

                <div
                  className="border border-dashed rounded-md p-3 text-xs text-muted-foreground cursor-pointer hover:bg-muted/40 transition"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Drag and drop a file here, or click to browse. Text files are
                  read as text, other files are encoded as binary.
                </div>

                {fileMeta && (
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Info className="h-3 w-3" />
                    <span>
                      Current file: {fileMeta.fileName} ({fileMeta.sizeBytes}{" "}
                      bytes, {fileMeta.mimeType})
                    </span>
                  </div>
                )}

                <Textarea
                  placeholder={inputPlaceholder}
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    calculateStats(e.target.value);
                  }}
                  onPaste={handlePaste}
                  className="min-h-[260px] font-mono"
                />

                <TextStatsDisplay stats={textStats} />
              </div>

              {/* Right: Options, output, views */}
              <div className="space-y-4">
                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={options.urlSafe}
                      onCheckedChange={(checked) =>
                        setOptions((o) => ({ ...o, urlSafe: checked }))
                      }
                    />
                    <Label>URL-safe mode</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={options.padding}
                      onCheckedChange={(checked) =>
                        setOptions((o) => ({ ...o, padding: checked }))
                      }
                    />
                    <Label>Keep padding</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={options.lineWrap}
                      onCheckedChange={(checked) =>
                        setOptions((o) => ({ ...o, lineWrap: checked }))
                      }
                    />
                    <Label>Line wrap</Label>
                  </div>

                  <Select
                    value={escapeMode}
                    onValueChange={(v) => setEscapeMode(v as EscapeMode)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Escape mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No escaping</SelectItem>
                      <SelectItem value="json">JSON string</SelectItem>
                      <SelectItem value="url">URL encoded</SelectItem>
                      <SelectItem value="html">HTML attribute safe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {options.lineWrap && (
                  <div className="space-y-2">
                    <Label>Line length ({options.lineLength} chars)</Label>
                    <Slider
                      value={[options.lineLength]}
                      min={20}
                      max={200}
                      step={4}
                      onValueChange={([v]) =>
                        setOptions((o) => ({ ...o, lineLength: v }))
                      }
                    />
                  </div>
                )}

                {/* Size info & diagnostics */}
                <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="border rounded-md p-2">
                    <div className="font-semibold text-xs mb-1">Size Info</div>
                    <div>Input: {sizeInfo.inputBytes} bytes</div>
                    <div>Output: {sizeInfo.outputBytes} bytes</div>
                    {sizeInfo.inputBytes > 0 && sizeInfo.outputBytes > 0 && (
                      <div>
                        Expansion:{" "}
                        {(
                          (sizeInfo.outputBytes / sizeInfo.inputBytes - 1) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>

                  <div className="border rounded-md p-2">
                    <div className="font-semibold text-xs mb-1">
                      Diagnostics
                    </div>
                    {diagnostics.length === 0 ? (
                      <div>No issues detected.</div>
                    ) : (
                      <ul className="list-disc pl-4 space-y-1">
                        {diagnostics.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* View Tabs */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 text-xs">
                    <Button
                      variant={viewTab === "text" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewTab("text")}
                    >
                      Text
                    </Button>
                    <Button
                      variant={viewTab === "hex" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewTab("hex")}
                    >
                      Hex
                    </Button>
                    <Button
                      variant={viewTab === "binary" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewTab("binary")}
                    >
                      Binary
                    </Button>
                    <Button
                      variant={viewTab === "preview" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewTab("preview")}
                    >
                      Preview
                    </Button>
                  </div>

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
                      onClick={handleDownloadText}
                      disabled={!outputText}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Output / Preview */}
                {viewTab === "preview" ? (
                  <div className="min-h-[260px] border rounded-md p-3 bg-secondary/20">
                    {renderPreview()}
                    {mode === "decode" && binaryData && fileMeta && (
                      <div className="flex flex-wrap gap-2 mt-3 text-xs">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleDecodeToFile}
                        >
                          Decode to file
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCopyDataUrl}
                        >
                          Copy as Data URL
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Textarea
                    readOnly
                    value={renderedOutput}
                    className="min-h-[260px] font-mono bg-secondary/20"
                    placeholder={
                      mode === "encode"
                        ? "Encoded Base64 will appear here..."
                        : "Decoded text / binary view will appear here..."
                    }
                  />
                )}

                {/* Base64URL tools & QR */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!outputText}
                      onClick={() => {
                        if (!outputText) return;
                        const cleaned = outputText.replace(/[\r\n\s]/g, "");
                        setOutputText(toBase64URL(cleaned));
                      }}
                    >
                      To Base64URL
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!outputText}
                      onClick={() => {
                        if (!outputText) return;
                        const cleaned = outputText.replace(/[\r\n\s]/g, "");
                        setOutputText(fromBase64URL(cleaned));
                      }}
                    >
                      To standard Base64
                    </Button>
                  </div>

                  {qrDataUrl && (
                    <div className="flex items-center gap-2 text-xs">
                      <QrCode className="h-4 w-4" />
                      <img
                        src={qrDataUrl}
                        alt="QR Code"
                        className="h-12 w-12 border rounded bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
