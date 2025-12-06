"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { RemoveFormattingMode } from "@/lib/utils/remove-formatting/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PresetSelectorProps {
  mode: RemoveFormattingMode;
  onChange: (mode: RemoveFormattingMode) => void;
}

const PRESETS: {
  label: string;
  value: RemoveFormattingMode;
  description: string;
}[] = [
  {
    label: "Soft Clean",
    value: "soft",
    description: "Remove basic HTML & links, keep structure.",
  },
  {
    label: "Deep Clean",
    value: "deep",
    description: "Strip HTML + Markdown, normalize text.",
  },
  {
    label: "Ultra Clean",
    value: "ultra",
    description: "Aggressive cleaning, minimal formatting.",
  },
  {
    label: "Custom",
    value: "custom",
    description: "Use your own toggle configuration.",
  },
];

export function PresetSelector({ mode, onChange }: PresetSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-2 space-y-2">
      <div className="grid grid-cols-1 w-full p-6 gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.value}
            type="button"
            variant={mode === preset.value ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex flex-col items-start gap-0.5 px-3 py-2 h-full w-full text-left whitespace-normal",
              "min-w-[140px]"
            )}
            onClick={() => onChange(preset.value)}
          >
            <h3 className="font-semibold">{preset.label}</h3>
            <p className="text-foreground break-words whitespace-normal">
              {preset.description}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
}
