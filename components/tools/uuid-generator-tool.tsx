"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AboutSection } from "@/components/tools/about-section";
import { generateUUID, validateUUID, UUIDOptions } from "@/lib/utils/uuid";
import { Copy, RefreshCw, Key } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
// import AdUnit from "../ad-unit";

export function UUIDGeneratorTool() {
  const [uuid, setUUID] = React.useState("");
  const [options, setOptions] = React.useState<UUIDOptions>({
    version: "v4",
    format: "standard",
    namespace: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // URL namespace
    name: "",
  });
  const [isValid, setIsValid] = React.useState(true);
  const { toast } = useToast();

  const generateNewUUID = React.useCallback(() => {
    try {
      const newUUID = generateUUID(options);
      setUUID(newUUID);
      setIsValid(validateUUID(newUUID));
    } catch (error) {
      toast({
        title: "Failed to generate UUID",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  }, [options, toast]);

  React.useEffect(() => {
    generateNewUUID();
  }, [options, generateNewUUID]);

  const handleCopy = async () => {
    if (!uuid) return;

    try {
      await navigator.clipboard.writeText(uuid);
      toast({
        title: "Copied to clipboard",
        description: "UUID has been copied to your clipboard",
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
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Key className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-bold tracking-tight">UUID Generator</h1>
            <p className="text-muted-foreground mt-2">
              Generate RFC 4122 compliant UUIDs
            </p>
          </div>
        </div>
        {/* <AdUnit slot="9721370550" format="horizontal" className="mt-2" /> */}

        <Card>
          <CardContent className="p-6">
            <div id="toolArea" className="space-y-8">
              {/* UUID Output Section */}
              <div className="flex flex-col items-center gap-2 w-full">
                <motion.div
                  className="flex flex-col sm:flex-row flex-grow w-full items-center justify-center gap-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.2 }}
                  key={uuid}
                >
                  <Textarea
                    readOnly
                    value={uuid}
                    className={`pr-24 font-mono text-xl h-14 text-center tracking-wider ${
                      !isValid ? "border-red-500" : ""
                    }`}
                  />
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-12"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={generateNewUUID}
                      className="h-12"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Options Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 space-y-4">
                  <h3 className="font-medium">UUID Version</h3>
                  <Select
                    value={options.version}
                    onValueChange={(value: UUIDOptions["version"]) =>
                      setOptions((prev) => ({ ...prev, version: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v4">Version 4 (Random)</SelectItem>
                      <SelectItem value="v5">Version 5 (Name-based)</SelectItem>
                    </SelectContent>
                  </Select>

                  {options.version === "v5" && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Name (required for v5)"
                        value={options.name}
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </Card>

                <Card className="p-4 space-y-4">
                  <h3 className="font-medium">Format Options</h3>
                  <Select
                    value={options.format}
                    onValueChange={(value: UUIDOptions["format"]) =>
                      setOptions((prev) => ({ ...prev, format: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="uppercase">Uppercase</SelectItem>
                      <SelectItem value="no-dashes">No Dashes</SelectItem>
                    </SelectContent>
                  </Select>
                </Card>
              </div>

              {/* Info Section */}
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Format:</span>{" "}
                    {options.format === "standard" &&
                      "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
                    {options.format === "uppercase" &&
                      "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}
                    {options.format === "no-dashes" &&
                      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
                  </div>
                  <div>
                    <span className="font-medium">Version:</span>{" "}
                    {options.version === "v4"
                      ? "Random UUID (v4)"
                      : "Name-based SHA-1 (v5)"}
                  </div>
                  <div>
                    <span className="font-medium">RFC:</span> 4122 Compliant
                  </div>
                  <div>
                    <span className="font-medium">Bits:</span> 128
                  </div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
