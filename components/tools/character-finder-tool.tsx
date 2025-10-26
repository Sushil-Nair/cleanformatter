"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AboutSection } from "@/components/tools/about-section";
import { getCharacterInfo } from "@/lib/utils/unicode/character-info";
import { getEncodingInfo } from "@/lib/utils/unicode/encoding-info";
import { getScriptInfo } from "@/lib/utils/unicode/script-info";
import { Copy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdUnit from "../ad-unit";
import { MidSectionAd } from "../sections/ad-midsection";

const aboutContent = (
  <div className="space-y-6">
    <p>
      Explore Unicode characters with our <strong>Character Finder Tool</strong>
      . Get detailed information about any character including its properties,
      encoding, and script details.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔍 Character Information</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Unicode Properties:</strong> Code point, name, category
          </li>
          <li>
            <strong>Script Details:</strong> Writing system, direction
          </li>
          <li>
            <strong>Encoding:</strong> UTF-8, UTF-16, UTF-32 representations
          </li>
          <li>
            <strong>Special Properties:</strong> Emoji, math, symbols
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">⚡ Quick Access</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Search:</strong> Find characters by name or code point
          </li>
          <li>
            <strong>Copy:</strong> One-click character copying
          </li>
          <li>
            <strong>Details:</strong> Comprehensive character analysis
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Use Cases</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">💻 Development</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Debug Unicode-related issues</li>
          <li>Find special characters</li>
          <li>Analyze character properties</li>
          <li>Check encoding details</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">📝 Content Creation</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Find symbols and emojis</li>
          <li>Check character compatibility</li>
          <li>Verify text directionality</li>
        </ul>
      </div>
    </div>
  </div>
);

interface CharacterDetails {
  char: string;
  info: ReturnType<typeof getCharacterInfo>;
  encoding: ReturnType<typeof getEncodingInfo>;
  script: ReturnType<typeof getScriptInfo>;
}

export function CharacterFinderTool() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedChar, setSelectedChar] =
    React.useState<CharacterDetails | null>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery) return;

    try {
      let char: string;
      let codePoint: number;

      if (searchQuery.startsWith("U+") || searchQuery.startsWith("u+")) {
        codePoint = parseInt(searchQuery.slice(2), 16);
        char = String.fromCodePoint(codePoint);
      } else if (searchQuery.length === 1) {
        char = searchQuery;
        codePoint = char.codePointAt(0) || 0;
      } else {
        toast({
          title: "Invalid Input",
          description:
            "Please enter a single character or Unicode code point (U+XXXX)",
          variant: "destructive",
        });
        return;
      }

      const info = getCharacterInfo(codePoint);
      const encoding = getEncodingInfo(codePoint);
      const script = getScriptInfo(codePoint);

      setSelectedChar({ char, info, encoding, script });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get character information",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Character has been copied to your clipboard",
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

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Character Finder
          </h1>
          <p className="text-muted-foreground mt-2">
            Find and analyze Unicode characters and their properties
          </p>
          <AdUnit slot="9721370550" format="horizontal" />
        </div>

        <Card>
          <CardContent className="p-6">
            <div id="toolArea" className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter a character or code point (U+XXXX)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>

              {selectedChar && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl min-w-[4rem] h-16 flex items-center justify-center border rounded-lg">
                      {selectedChar.char}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(selectedChar.char)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Character
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={2}>
                            Character Properties
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Code Point
                          </TableCell>
                          <TableCell>
                            U+
                            {selectedChar.info.codePoint
                              .toString(16)
                              .toUpperCase()
                              .padStart(4, "0")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Name</TableCell>
                          <TableCell>
                            {selectedChar.info.name || "Unknown"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Category
                          </TableCell>
                          <TableCell>{selectedChar.info.category}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Script</TableCell>
                          <TableCell>{selectedChar.info.script}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Block</TableCell>
                          <TableCell>{selectedChar.info.block}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Bidirectional
                          </TableCell>
                          <TableCell>{selectedChar.info.bidiClass}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Properties
                          </TableCell>
                          <TableCell>
                            {[
                              selectedChar.info.isEmoji && "Emoji",
                              selectedChar.info.isMath && "Math",
                              selectedChar.info.isSymbol && "Symbol",
                            ]
                              .filter(Boolean)
                              .join(", ") || "None"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={2}>
                            Encoding Information
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">UTF-8</TableCell>
                          <TableCell>
                            {selectedChar.encoding.utf8
                              .map((b) =>
                                b.toString(16).toUpperCase().padStart(2, "0")
                              )
                              .join(" ")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">UTF-16</TableCell>
                          <TableCell>
                            {selectedChar.encoding.utf16
                              .map((b) =>
                                b.toString(16).toUpperCase().padStart(4, "0")
                              )
                              .join(" ")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">UTF-32</TableCell>
                          <TableCell>
                            {selectedChar.encoding.utf32
                              .map((b) =>
                                b.toString(16).toUpperCase().padStart(8, "0")
                              )
                              .join(" ")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Special</TableCell>
                          <TableCell>
                            {[
                              selectedChar.encoding.isSurrogate && "Surrogate",
                              selectedChar.encoding.isNonCharacter &&
                                "Non-Character",
                              selectedChar.encoding.isPrivateUse &&
                                "Private Use",
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
            </div>
          </CardContent>
          <MidSectionAd />
        </Card>

        <AboutSection title="About Character Finder" content={aboutContent} />
      </div>
    </div>
  );
}
