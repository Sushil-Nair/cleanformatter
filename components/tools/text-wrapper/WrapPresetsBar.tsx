"use client";

import type { WrapOptions } from "@/lib/utils/text-wrapper";
import { cn } from "@/lib/utils"; // If you have a cn utility; otherwise remove
import { Button } from "@/components/ui/button";

interface WrapPresetsBarProps {
  onSelect: (patch: Partial<WrapOptions>) => void;
  currentWidth: number;
}

const PRESETS = [
  { label: "Email", width: 72 },
  { label: "Markdown", width: 80 },
  { label: "Blog", width: 100 },
  { label: "Narrow", width: 50 },
  { label: "Wide", width: 120 },
];

export function WrapPresetsBar({
  onSelect,
  currentWidth,
}: WrapPresetsBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((preset) => {
        const isActive = currentWidth === preset.width;

        return (
          <Button
            key={preset.label}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium",
              isActive && "shadow-md"
            )}
            onClick={() => onSelect({ width: preset.width })}
          >
            {preset.label} ({preset.width})
          </Button>
        );
      })}
    </div>
  );
}
