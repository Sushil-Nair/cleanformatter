"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { AboutSection } from "@/components/tools/about-section";
import {
  generatePassword,
  calculatePasswordStrength,
  PasswordOptions,
} from "@/lib/utils/password";
import { Copy, RefreshCw, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import AdUnit from "../ad-unit";
import { MidSectionAd } from "../sections/ad-midsection";

const aboutContent = (
  <div className="space-y-6">
    <p>
      Create secure passwords with our <strong>Password Generator Tool</strong>.
      Generate strong, random passwords with customizable options for maximum
      security.
    </p>

    <hr />

    <h3 className="text-xl font-bold">Features</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🔒 Password Options</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Character Types:</strong> Uppercase, lowercase, numbers,
            symbols
          </li>
          <li>
            <strong>Length Control:</strong> Choose password length (8-128
            characters)
          </li>
          <li>
            <strong>Exclusions:</strong> Avoid similar/ambiguous characters
          </li>
          <li>
            <strong>Memorable Mode:</strong> Generate pronounceable passwords
          </li>
          <li>
            <strong>Pattern Mode:</strong> Create passwords matching specific
            patterns
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">⚡ Advanced Features</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Strength Meter:</strong> Real-time password strength
            analysis
          </li>
          <li>
            <strong>One-Click Copy:</strong> Copy passwords to clipboard
          </li>
          <li>
            <strong>Secure Generation:</strong> Cryptographically secure random
            numbers
          </li>
          <li>
            <strong>Multiple Formats:</strong> Various password styles and
            patterns
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <h3 className="text-xl font-bold">Security Tips</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">🛡️ Best Practices</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use unique passwords for each account</li>
          <li>Enable two-factor authentication when possible</li>
          <li>Store passwords securely in a password manager</li>
          <li>Regularly update critical passwords</li>
          <li>Never share passwords via unsecured channels</li>
        </ul>
      </div>
    </div>
  </div>
);

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
  });
  const [strength, setStrength] = React.useState(0);
  const { toast } = useToast();

  const getStrengthLabel = (strength: number) => {
    if (strength < 25) return "Weak";
    if (strength < 50) return "Fair";
    if (strength < 75) return "Strong";
    return "Very Strong";
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-yellow-500";
    if (strength < 75) return "bg-green-500";
    return "bg-emerald-500";
  };

  const generateNewPassword = React.useCallback(() => {
    try {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setStrength(calculatePasswordStrength(newPassword));
    } catch (error) {
      toast({
        title: "Failed to generate password",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  }, [options, toast]);

  const regenerateDebounced = React.useCallback(() => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(generateNewPassword, 200);
    };
  }, [generateNewPassword]);

  React.useEffect(() => {
    generateNewPassword();
  }, [options, generateNewPassword]);

  const handleCopy = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copied to clipboard",
        description: "Password has been copied to your clipboard",
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

  const handleLengthPreset = (length: number) => {
    setOptions((prev) => ({ ...prev, length }));
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Password Generator
            </h1>
            <p className="text-muted-foreground mt-2">
              Generate secure, random passwords with customizable options
            </p>
            <AdUnit slot="9721370550" format="horizontal" />
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div id="toolArea" className="space-y-8">
              {/* Password Output Section */}
              <div className="space-y-4">
                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.2 }}
                  key={password}
                >
                  <Input
                    readOnly
                    value={password}
                    className="pr-24 font-mono text-xl h-14 text-center tracking-wider"
                  />
                  <div className="absolute right-1 top-1 flex gap-1">
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
                      onClick={regenerateDebounced()}
                      className="h-12"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      Password Strength: {getStrengthLabel(strength)}
                    </span>
                    <span>{strength}%</span>
                  </div>
                  <Progress
                    value={strength}
                    className={`h-2 ${getStrengthColor(strength)}`}
                  />
                </div>
              </div>

              {/* Core Controls Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">
                      Password Length: {options.length} characters
                    </Label>
                    <div className="flex gap-2">
                      {[8, 16, 32].map((preset) => (
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 space-y-4">
                    <h3 className="font-medium">Character Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                        <Switch
                          id="uppercase"
                          checked={options.uppercase}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              uppercase: checked,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                        <Switch
                          id="lowercase"
                          checked={options.lowercase}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              lowercase: checked,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="numbers">Numbers (0-9)</Label>
                        <Switch
                          id="numbers"
                          checked={options.numbers}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              numbers: checked,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                        <Switch
                          id="symbols"
                          checked={options.symbols}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              symbols: checked,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 space-y-4">
                    <h3 className="font-medium">Advanced Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="memorable">Memorable Password</Label>
                        <Switch
                          id="memorable"
                          checked={options.memorable}
                          onCheckedChange={(checked) =>
                            setOptions((prev) => ({
                              ...prev,
                              memorable: checked,
                              pattern: "",
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="similar">
                          Allow Similar Characters
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
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ambiguous">
                          Allow Ambiguous Characters
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
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

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
                      options.symbols ? "text-green-500" : "text-red-500"
                    }
                  >
                    {options.symbols ? "✓" : "✗"} Includes symbols
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
              </Card>
            </div>
          </CardContent>
          <MidSectionAd />
        </Card>

        <AboutSection title="About Password Generator" content={aboutContent} />
      </div>
    </div>
  );
}
