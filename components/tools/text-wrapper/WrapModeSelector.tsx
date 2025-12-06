"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { WrapMode } from "@/lib/utils/text-wrapper";

interface WrapModeSelectorProps {
  value: WrapMode;
  onChange: (mode: WrapMode) => void;
}

export function WrapModeSelector({ value, onChange }: WrapModeSelectorProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-sm font-medium">Wrap Mode</Label>

      <Select value={value} onValueChange={(v) => onChange(v as WrapMode)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select wrap mode" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="word">Word Wrap</SelectItem>
          <SelectItem value="char">Character Wrap</SelectItem>
          <SelectItem value="smart">Smart Wrap</SelectItem>
          <SelectItem value="code">Code Wrap</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
