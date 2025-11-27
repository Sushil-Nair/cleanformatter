"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AboutSection } from "@/components/tools/about-section";
import { Copy } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getCharacterInfo } from "@/lib/utils/unicode/character-info";
import { getEncodingInfo } from "@/lib/utils/unicode/encoding-info";
import { getScriptInfo } from "@/lib/utils/unicode/script-info";

/* -------------------------------------------------------------------------- */
/*  Utility Helpers                                                           */
/* -------------------------------------------------------------------------- */

// debounce hook
const useDebounce = (value: string, delay = 300) => {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

// hex formatter
const hex = (num: number, size = 4) =>
  num.toString(16).toUpperCase().padStart(size, "0");

// parse user input ("A", "😊", "U+1F600", "1F600")
function parseCharInput(query: string): string | null {
  const q = query.trim();

  // U+XXXX format
  if (/^U\+[0-9A-F]{1,6}$/i.test(q)) {
    const codePoint = parseInt(q.slice(2), 16);
    if (codePoint >= 0xd800 && codePoint <= 0xdfff) return null; // invalid surrogate
    return String.fromCodePoint(codePoint);
  }

  // pure hex code point
  if (/^[0-9A-F]{2,6}$/i.test(q)) {
    const codePoint = parseInt(q, 16);
    if (codePoint >= 0xd800 && codePoint <= 0xdfff) return null;
    return String.fromCodePoint(codePoint);
  }

  // single character (including surrogate pair)
  const chars = [...q];
  if (chars.length === 1) {
    return chars[0];
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */

export function CharacterFinderTool() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [charInput, setCharInput] = React.useState<string | null>(null);
  const debouncedQuery = useDebounce(searchQuery, 250);

  const { toast } = useToast();

  /* -------------------------------------------------------------------------- */
  /*  Search Logic                                                              */
  /* -------------------------------------------------------------------------- */

  React.useEffect(() => {
    if (!debouncedQuery) {
      setCharInput(null);
      return;
    }

    const parsed = parseCharInput(debouncedQuery);

    if (!parsed) {
      setCharInput(null);
      toast({
        title: "Invalid Input",
        description:
          "Enter a single character or a valid Unicode code point (U+XXXX)",
        variant: "destructive",
      });
      return;
    }

    setCharInput(parsed);
  }, [debouncedQuery, toast]);

  /* -------------------------------------------------------------------------- */
  /*  Heavy Unicode Info Computation                                            */
  /* -------------------------------------------------------------------------- */

  const details = React.useMemo(() => {
    if (!charInput) return null;

    const codePoint = charInput.codePointAt(0);
    if (!codePoint) return null;

    try {
      return {
        char: charInput,
        info: getCharacterInfo(codePoint),
        encoding: getEncodingInfo(codePoint),
        script: getScriptInfo(codePoint),
      };
    } catch {
      toast({
        title: "Error",
        description: "Failed to compute Unicode details.",
        variant: "destructive",
      });
      return null;
    }
  }, [charInput, toast]);

  /* -------------------------------------------------------------------------- */
  /*  Copy Handler                                                              */
  /* -------------------------------------------------------------------------- */
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Copied to clipboard.",
        duration: 2000,
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Clipboard blocked. Try manually.",
        variant: "destructive",
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*  UI                                                                        */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold tracking-tight">Character Finder</h1>
          <p className="text-muted-foreground mt-2">
            Analyze Unicode characters and inspect their full properties.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Search Bar */}
            <div className="flex gap-4">
              <Input
                placeholder="Enter a character or U+XXXX"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setSearchQuery(e.currentTarget.value)
                }
                className="max-w-md"
              />
            </div>

            {/* Output Section */}
            {details && (
              <div className="space-y-6">
                {/* Character Display */}
                <div className="flex items-center gap-4">
                  <div className="text-7xl min-w-[4rem] h-20 flex items-center justify-center border rounded-lg">
                    {details.char}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(details.char)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Character
                  </Button>
                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Character Properties */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead colSpan={2}>Character Properties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Code Point
                        </TableCell>
                        <TableCell>
                          U+{hex(details.info.codePoint, 4)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Name</TableCell>
                        <TableCell>{details.info.name || "Unknown"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Category</TableCell>
                        <TableCell>{details.info.category}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Script</TableCell>
                        <TableCell>{details.info.script}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Block</TableCell>
                        <TableCell>{details.info.block}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Bidi Class
                        </TableCell>
                        <TableCell>{details.info.bidiClass}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Properties
                        </TableCell>
                        <TableCell>
                          {[
                            details.info.isEmoji && "Emoji",
                            details.info.isMath && "Math",
                            details.info.isSymbol && "Symbol",
                          ]
                            .filter(Boolean)
                            .join(", ") || "None"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  {/* Encodings */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead colSpan={2}>Encoding Information</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">UTF-8</TableCell>
                        <TableCell>
                          {details.encoding.utf8
                            .map((b) => hex(b, 2))
                            .join(" ")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">UTF-16</TableCell>
                        <TableCell>
                          {details.encoding.utf16
                            .map((b) => hex(b, 4))
                            .join(" ")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">UTF-32</TableCell>
                        <TableCell>
                          {details.encoding.utf32
                            .map((b) => hex(b, 8))
                            .join(" ")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Special</TableCell>
                        <TableCell>
                          {[
                            details.encoding.isSurrogate && "Surrogate",
                            details.encoding.isNonCharacter && "Non-Character",
                            details.encoding.isPrivateUse && "Private Use",
                          ]
                            .filter(Boolean)
                            .join(", ") || "None"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
