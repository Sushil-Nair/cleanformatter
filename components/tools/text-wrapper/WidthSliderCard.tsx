"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface WidthSliderCardProps {
  value: number;
  onChange: (value: number) => void;
}

export function WidthSliderCard({ value, onChange }: WidthSliderCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border bg-card shadow-sm">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Wrap Width</Label>
        <span className="text-sm font-semibold">{value} cols</span>
      </div>

      <Slider
        value={[value]}
        min={10}
        max={120}
        step={1}
        onValueChange={(v) => onChange(v[0])}
        className="cursor-pointer"
      />
    </div>
  );
}
