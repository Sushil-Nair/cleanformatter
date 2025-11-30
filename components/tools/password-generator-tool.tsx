"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  generatePassword,
  calculatePasswordStrength,
  estimatePasswordEntropy,
  PasswordOptions,
} from "@/lib/utils/password";
import { Copy, RefreshCw, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function PasswordGeneratorTool() {
  const [password, setPassword] = React.useState("");
  const [options, setOptions] = React.useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    similar: false,
    ambiguous: false,
    memorable: false,
    pattern: "",
    customSymbols: "",
  });
  const [strength, setStrength] = React.useState(0);
  const [entropy, setEntropy] = React.useState(0);
  const { toast } = useToast();

  // ---------- Strength Helpers ----------

  const getStrengthLabel = (value: number) => {
    if (value < 25) return "Very Weak";
    if (value < 50) return "Weak";
    if (value < 75) return "Strong";
    return "Very Strong";
  };

  const getStrengthColor = (value: number) => {
    if (value < 25) return "bg-red-500";
    if (value < 50) return "bg-yellow-500";
    if (value < 75) return "bg-green-500";
    return "bg-emerald-500";
  };

  // ---------- Generation Logic ----------

  const generateNewPassword = React.useCallback(() => {
    try {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setStrength(calculatePasswordStrength(newPassword));
      setEntropy(estimatePasswordEntropy(newPassword));
    } catch (error) {
      toast({
        title: "Failed to generate password",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  }, [options, toast]);

  React.useEffect(() => {
    generateNewPassword();
  }, [options, generateNewPassword]);

  // ---------- Actions ----------

  const handleCopy = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copied to clipboard",
        description: "Password has been copied to your clipboard",
        duration: 2000,
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleLengthPreset = (length: number) => {
    setOptions((prev) => ({ ...prev, length }));
  };

  const handleReset = () => {
    setOptions({
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      similar: false,
      ambiguous: false,
      memorable: false,
      pattern: "",
      customSymbols: "",
    });
    setPassword("");
    setStrength(0);
    setEntropy(0);
  };

  const patternModeActive = options.pattern.trim().length > 0;
  const memorableModeActive = options.memorable;

  // ---------- UI ----------

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-bold tracking-tight">Password Generator</h1>
            <p className="text-muted-foreground mt-2">
              Generate secure, random passwords with advanced control over
              length, character sets, patterns, and memorability.
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div id="toolArea" className="space-y-8">
              {/* Output Section */}
              <div className="flex flex-col items-center gap-3 w-full">
                <motion.div
                  className="flex flex-col sm:flex-row flex-grow w-full items-center justify-center gap-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.2 }}
                  key={password}
                >
                  <Textarea
                    readOnly
                    value={password}
                    className="font-mono text-lg sm:text-xl h-14 text-center tracking-wider"
                    aria-label="Generated Password"
                  />
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-12 flex items-center"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={generateNewPassword}
                      className="h-12 flex items-center"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </div>
                </motion.div>

                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium">
                      Strength: {getStrengthLabel(strength)}
                    </span>
                    <span>
                      {strength}% · {entropy} bits entropy
                    </span>
                  </div>
                  <Progress
                    value={strength}
                    className={`h-2 ${getStrengthColor(strength)}`}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                {/* Length + presets */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Label className="text-base">
                      Password Length: {options.length} characters
                    </Label>
                    <div className="flex gap-2">
                      {[8, 12, 16, 24, 32].map((preset) => (
                        <Button
                          key={preset}
                          variant={
                            options.length === preset ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handleLengthPreset(preset)}
                          className="w-12"
                        >
                          {preset}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Slider
                    value={[options.length]}
                    min={6}
                    max={64}
                    step={1}
                    onValueChange={([value]) =>
                      setOptions((prev) => ({ ...prev, length: value }))
                    }
                    className="mt-2"
                  />
                </div>

                {/* Character Types + Advanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Character Types */}
                  <Card className="p-4 space-y-4">
                    <h3 className="font-medium">Character Types</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="uppercase">Uppercase (A–Z)</Label>
                        <Switch
                          id="uppercase"
                          checked={options.uppercase}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              uppercase: checked,
                            }))
                          }
                          disabled={memorableModeActive}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lowercase">Lowercase (a–z)</Label>
                        <Switch
                          id="lowercase"
                          checked={options.lowercase}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              lowercase: checked,
                            }))
                          }
                          disabled={memorableModeActive}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="numbers">Numbers (0–9)</Label>
                        <Switch
                          id="numbers"
                          checked={options.numbers}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              numbers: checked,
                            }))
                          }
                          disabled={memorableModeActive}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="symbols">Symbols (!@#$…)</Label>
                        <Switch
                          id="symbols"
                          checked={options.symbols}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              symbols: checked,
                            }))
                          }
                          disabled={memorableModeActive}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Advanced Options */}
                  <Card className="p-4 space-y-4">
                    <h3 className="font-medium">Advanced Options</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="memorable">Memorable password</Label>
                        <Switch
                          id="memorable"
                          checked={options.memorable}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              memorable: checked,
                              // pattern off when memorable on
                              pattern: checked ? "" : prev.pattern,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="similar">
                          Allow similar characters (i, l, 1, o, 0)
                        </Label>
                        <Switch
                          id="similar"
                          checked={options.similar}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              similar: checked,
                            }))
                          }
                          disabled={memorableModeActive}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ambiguous">
                          Allow ambiguous characters (
                          {`{ } [ ] ( ) / ' " ~ , ; : . < >`})
                        </Label>
                        <Switch
                          id="ambiguous"
                          checked={options.ambiguous}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              ambiguous: checked,
                            }))
                          }
                          disabled={memorableModeActive}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="customSymbols">Custom symbols</Label>
                        <Input
                          id="customSymbols"
                          placeholder="e.g. _-#@"
                          value={options.customSymbols || ""}
                          onChange={(e) =>
                            setOptions((prev) => ({
                              ...prev,
                              customSymbols: e.target.value,
                            }))
                          }
                          disabled={memorableModeActive}
                        />
                        <p className="text-xs text-muted-foreground">
                          These characters will be added to the symbol pool.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Pattern Mode */}
                <Card className="p-4 space-y-3">
                  <h3 className="font-medium">Pattern Mode</h3>
                  <div className="space-y-2">
                    <Input
                      placeholder='Example: "Aa0!-Aa0!"'
                      value={options.pattern}
                      onChange={(e) =>
                        setOptions((prev) => ({
                          ...prev,
                          pattern: e.target.value,
                          // turning on pattern implicitly disables memorable
                          memorable:
                            e.target.value.trim().length > 0
                              ? false
                              : prev.memorable,
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Tokens: <strong>A</strong> = uppercase, <strong>a</strong>{" "}
                      = lowercase, <strong>0</strong> = digit,{" "}
                      <strong>!</strong> = symbol/custom, <strong>x</strong> =
                      any from selected character pool. Any other character is
                      used as-is.
                    </p>
                    {patternModeActive && (
                      <p className="text-xs text-amber-600">
                        Pattern overrides all other options except character
                        pools. Make sure at least one character type is enabled
                        if you use <code>x</code>.
                      </p>
                    )}
                  </div>
                </Card>

                {/* Requirements Checklist */}
                <Card className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div
                      className={
                        options.uppercase ? "text-green-500" : "text-red-500"
                      }
                    >
                      {options.uppercase ? "✓" : "✗"} Includes uppercase letters
                    </div>
                    <div
                      className={
                        options.lowercase ? "text-green-500" : "text-red-500"
                      }
                    >
                      {options.lowercase ? "✓" : "✗"} Includes lowercase letters
                    </div>
                    <div
                      className={
                        options.numbers ? "text-green-500" : "text-red-500"
                      }
                    >
                      {options.numbers ? "✓" : "✗"} Includes numbers
                    </div>
                    <div
                      className={
                        options.symbols || (options.customSymbols || "").length
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {options.symbols || (options.customSymbols || "").length
                        ? "✓"
                        : "✗"}{" "}
                      Includes symbols
                    </div>
                    <div
                      className={
                        options.length >= 12 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {options.length >= 12 ? "✓" : "✗"} Length ≥ 12 characters
                    </div>
                    <div
                      className={
                        !options.ambiguous ? "text-green-500" : "text-red-500"
                      }
                    >
                      {!options.ambiguous ? "✓" : "✗"} No ambiguous characters
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 justify-between text-xs text-muted-foreground">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                    >
                      Reset options
                    </Button>
                    <span>
                      Tip: For serious accounts, aim for{" "}
                      <strong>≥ 16 chars</strong> and{" "}
                      <strong>≥ 70 strength</strong>.
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
