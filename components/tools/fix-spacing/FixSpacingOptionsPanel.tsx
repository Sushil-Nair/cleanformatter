"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  FixSpacingOptions,
  SentenceSpacingMode,
} from "@/lib/utils/fix-spacing";

interface PanelProps {
  options: FixSpacingOptions;
  updateOption: (key: keyof FixSpacingOptions, value: any) => void;
}

export function FixSpacingOptionsPanel({ options, updateOption }: PanelProps) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* --- GROUP A: SPACING CLEANUP --- */}
      <MiniCard title="Spacing Cleanup">
        <OptionRow
          label="Collapse multiple spaces"
          checked={options.collapseMultipleSpaces}
          onChange={(v) => updateOption("collapseMultipleSpaces", v)}
        />

        <OptionRow
          label="Remove leading spaces"
          checked={options.removeLeadingSpaces}
          onChange={(v) => updateOption("removeLeadingSpaces", v)}
        />

        <OptionRow
          label="Remove trailing spaces"
          checked={options.removeTrailingSpaces}
          onChange={(v) => updateOption("removeTrailingSpaces", v)}
        />

        <OptionRow
          label="Convert tabs to spaces"
          checked={options.convertTabsToSpaces}
          onChange={(v) => updateOption("convertTabsToSpaces", v)}
        />

        {/* Tab size input */}
        {options.convertTabsToSpaces && (
          <div className="flex items-center justify-between">
            <Label className="text-sm">Tab size</Label>
            <input
              type="number"
              min={1}
              max={12}
              className="w-20 rounded-md border border-input bg-background text-sm px-2 py-1"
              value={options.tabSize}
              onChange={(e) => updateOption("tabSize", Number(e.target.value))}
            />
          </div>
        )}
      </MiniCard>

      {/* --- GROUP B: LINE CLEANUP --- */}
      <MiniCard title="Line Cleanup">
        <OptionRow
          label="Remove extra blank lines"
          checked={options.removeExtraBlankLines}
          onChange={(v) => updateOption("removeExtraBlankLines", v)}
        />

        <OptionRow
          label="Normalize line breaks"
          checked={options.normalizeLineBreaks}
          onChange={(v) => updateOption("normalizeLineBreaks", v)}
        />

        <OptionRow
          label="Remove indentation"
          checked={options.removeIndentation}
          onChange={(v) => updateOption("removeIndentation", v)}
        />
      </MiniCard>

      {/* --- GROUP C: ADVANCED CLEANUP --- */}
      <MiniCard title="Advanced Fixes">
        <OptionRow
          label="Fix punctuation spacing"
          checked={options.fixPunctuationSpacing}
          onChange={(v) => updateOption("fixPunctuationSpacing", v)}
        />

        <OptionRow
          label="Fix bracket spacing"
          checked={options.fixBracketSpacing}
          onChange={(v) => updateOption("fixBracketSpacing", v)}
        />

        <OptionRow
          label="Normalize Unicode spaces"
          checked={options.normalizeUnicodeSpaces}
          onChange={(v) => updateOption("normalizeUnicodeSpaces", v)}
        />

        <OptionRow
          label="PDF spacing fixer"
          checked={options.fixPdfSpacing}
          onChange={(v) => updateOption("fixPdfSpacing", v)}
        />

        {/* Sentence spacing selector */}
        <div className="flex items-center justify-between">
          <Label className="text-sm">Sentence spacing</Label>
          <select
            className="w-28 rounded-md border border-input bg-background text-sm px-2 py-1"
            value={options.sentenceSpacingMode}
            onChange={(e) =>
              updateOption(
                "sentenceSpacingMode",
                e.target.value as SentenceSpacingMode
              )
            }
          >
            <option value="preserve">Preserve</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
          </select>
        </div>
      </MiniCard>

      {/* --- GROUP D: CODE SAFE MODE --- */}
      <MiniCard title="Code-Safe Mode">
        <OptionRow
          label="Preserve code-like blocks"
          checked={options.preserveCodeLikeBlocks}
          onChange={(v) => updateOption("preserveCodeLikeBlocks", v)}
        />
      </MiniCard>
    </div>
  );
}

/* ---------------- MiniCard Wrapper ---------------- */

function MiniCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 bg-background shadow-sm",
        "flex flex-col gap-3"
      )}
    >
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

/* ---------------- Option Row ---------------- */

function OptionRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm">{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
