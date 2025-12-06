"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RemoveFormattingOptions } from "@/lib/utils/remove-formatting/types";

interface OptionsPanelProps {
  options: RemoveFormattingOptions;
  onOptionChange: (key: keyof RemoveFormattingOptions, value: boolean) => void;
}

export function RemoveFormattingOptionsPanel({
  options,
  onOptionChange,
}: OptionsPanelProps) {
  const handleToggle =
    (key: keyof RemoveFormattingOptions) => (checked: boolean) =>
      onOptionChange(key, checked);

  return (
    <div className="space-y-5">
      {/* Section: HTML Cleaning */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          HTML & Rich Text
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <OptionRow
            id="strip-html"
            label="Strip HTML tags"
            checked={options.stripHtml}
            onCheckedChange={handleToggle("stripHtml")}
          />
          <OptionRow
            id="remove-inline-styles"
            label="Remove inline styles"
            checked={options.removeInlineStyles}
            onCheckedChange={handleToggle("removeInlineStyles")}
          />
          <OptionRow
            id="remove-scripts-styles"
            label="Remove scripts & style blocks"
            checked={options.removeScriptsAndStyles}
            onCheckedChange={handleToggle("removeScriptsAndStyles")}
          />
          <OptionRow
            id="remove-tracking-attrs"
            label="Remove tracking attributes"
            checked={options.removeTrackingAttributes}
            onCheckedChange={handleToggle("removeTrackingAttributes")}
          />
          <OptionRow
            id="clean-links"
            label="Clean links (keep text)"
            checked={options.cleanHyperlinks}
            onCheckedChange={handleToggle("cleanHyperlinks")}
          />
        </div>
      </div>

      {/* Section: Markdown */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Markdown
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <OptionRow
            id="remove-markdown"
            label="Remove Markdown syntax"
            checked={options.removeMarkdown}
            onCheckedChange={handleToggle("removeMarkdown")}
          />
        </div>
      </div>

      {/* Section: Normalization */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Text Normalization
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <OptionRow
            id="convert-plain-text"
            label="Convert to plain text"
            checked={options.convertToPlainText}
            onCheckedChange={handleToggle("convertToPlainText")}
          />
          <OptionRow
            id="remove-indentation"
            label="Remove indentation"
            checked={options.removeIndentation}
            onCheckedChange={handleToggle("removeIndentation")}
          />
          <OptionRow
            id="normalize-whitespace"
            label="Normalize whitespace"
            checked={options.normalizeWhitespace}
            onCheckedChange={handleToggle("normalizeWhitespace")}
          />
          <OptionRow
            id="normalize-entities"
            label="Normalize HTML entities"
            checked={options.normalizeEntities}
            onCheckedChange={handleToggle("normalizeEntities")}
          />
          <OptionRow
            id="remove-zero-width"
            label="Remove invisible characters"
            checked={options.removeZeroWidthChars}
            onCheckedChange={handleToggle("removeZeroWidthChars")}
          />
          <OptionRow
            id="filter-special-chars"
            label="Filter special characters (aggressive)"
            checked={options.filterSpecialCharacters}
            onCheckedChange={handleToggle("filterSpecialCharacters")}
          />
        </div>
      </div>
    </div>
  );
}

interface OptionRowProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function OptionRow({ id, label, checked, onCheckedChange }: OptionRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2">
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
