import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

export default function FontSizeDropdown({
  fontSize,
  setFontSize,
}: {
  fontSize: number;
  setFontSize: (size: number) => void;
}) {
  const handleReset = () => {
    setFontSize(16); // Reset to default font size
  };
  return (
    <div className="w-24 py-4 flex flex-col gap-4">
      <Label htmlFor="font-size-select mb-4">Font Size</Label>
      <div className="flex items-center-safe w-full gap-4">
        <Select
          value={fontSize.toString()}
          onValueChange={(val) => setFontSize(Number(val))}
        >
          <SelectTrigger id="font-size-select" className="w-full">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {[
              5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44,
              48, 52, 56, 60, 64, 72,
            ].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full mb-1.5"
          onClick={handleReset}
        >
          <RotateCcw size={16} />
        </Button>
      </div>
    </div>
  );
}
