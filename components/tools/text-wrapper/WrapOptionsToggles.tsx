"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { WrapOptions } from "@/lib/utils/text-wrapper";

interface WrapOptionsTogglesProps {
  options: WrapOptions;
  onChange: (patch: Partial<WrapOptions>) => void;
}

export function WrapOptionsToggles({
  options,
  onChange,
}: WrapOptionsTogglesProps) {
  return (
    <div className="p-4 rounded-lg border bg-card shadow-sm flex flex-col gap-4">
      {/* Hyphenate */}
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Hyphenate</Label>
          <p className="text-xs text-muted-foreground">
            Break words using hyphens if needed
          </p>
        </div>
        <Switch
          checked={options.hyphenate}
          onCheckedChange={(checked) => onChange({ hyphenate: checked })}
        />
      </div>

      {/* Preserve Lines */}
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Preserve Lines</Label>
          <p className="text-xs text-muted-foreground">
            Keep existing line breaks untouched
          </p>
        </div>
        <Switch
          checked={options.preserveLines}
          onCheckedChange={(checked) => onChange({ preserveLines: checked })}
        />
      </div>

      {/* Unwrap First */}
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Unwrap First</Label>
          <p className="text-xs text-muted-foreground">
            Remove hard wraps before rewrapping
          </p>
        </div>
        <Switch
          checked={options.unwrapFirst}
          onCheckedChange={(checked) => onChange({ unwrapFirst: checked })}
        />
      </div>

      {/* Preserve Indentation */}
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Preserve Indentation</Label>
          <p className="text-xs text-muted-foreground">
            Keep leading whitespace at the start of lines
          </p>
        </div>
        <Switch
          checked={options.preserveIndentation}
          onCheckedChange={(checked) =>
            onChange({ preserveIndentation: checked })
          }
        />
      </div>

      {/* Force Break Long Words */}
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Force Break Long Words</Label>
          <p className="text-xs text-muted-foreground">
            Break extremely long words or URLs when necessary
          </p>
        </div>
        <Switch
          checked={options.forceBreakLongWords}
          onCheckedChange={(checked) =>
            onChange({ forceBreakLongWords: checked })
          }
        />
      </div>
    </div>
  );
}
