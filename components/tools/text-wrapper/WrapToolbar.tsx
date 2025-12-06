"use client";

import { Button } from "@/components/ui/button";

interface WrapToolbarProps {
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
  disabled?: boolean;
}

export function WrapToolbar({
  onCopy,
  onDownload,
  onReset,
  disabled = false,
}: WrapToolbarProps) {
  return (
    <div className="flex items-center justify-end gap-2 mt-3">
      <Button variant="outline" size="sm" disabled={disabled} onClick={onCopy}>
        Copy
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={onDownload}
      >
        Download
      </Button>

      <Button
        variant="destructive"
        size="sm"
        disabled={disabled}
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
}
