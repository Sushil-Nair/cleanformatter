"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FixSpacingMode } from "@/lib/utils/fix-spacing";

interface FixSpacingPresetSelectorProps {
  mode: FixSpacingMode;
  onChange: (mode: FixSpacingMode) => void;
}

const PRESETS = [
  {
    label: "Soft Fix",
    value: "soft" as FixSpacingMode,
    description: "Basic spacing cleanup, minimal structural changes.",
  },
  {
    label: "Strong Fix",
    value: "strong" as FixSpacingMode,
    description: "Advanced spacing, punctuation fixes, indentation cleanup.",
  },
  {
    label: "Ultra Fix",
    value: "ultra" as FixSpacingMode,
    description:
      "Aggressive cleanup including PDF spacing, unicode, and deep normalization.",
  },
  {
    label: "Custom",
    value: "custom" as FixSpacingMode,
    description: "Use your own toggle configuration.",
  },
];

export function FixSpacingPresetSelector({
  mode,
  onChange,
}: FixSpacingPresetSelectorProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 py-2 min-w-max">
        {PRESETS.map((preset) => {
          const isActive = preset.value === mode;

          return (
            <Button
              key={preset.value}
              type="button"
              size="sm"
              variant={isActive ? "default" : "outline"}
              className={cn(
                "flex flex-col items-start text-left gap-0.5 px-3 py-2 min-w-[150px] h-auto",
                "transition-all whitespace-normal"
              )}
              onClick={() => onChange(preset.value)}
            >
              <span className="font-medium">{preset.label}</span>
              <span className="text-xs leading-tight">
                {preset.description}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
