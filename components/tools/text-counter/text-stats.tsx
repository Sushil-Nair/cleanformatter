import { TextStats } from "@/lib/utils/computeTextStats";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TextStatsDisplayProps {
  stats: TextStats;
  countSpaces: boolean; // Controls which character count is primary
}

export default function TextStatDisplay({
  stats,
  countSpaces,
}: TextStatsDisplayProps) {
  const primaryCharacters = countSpaces
    ? stats.charactersWithSpaces
    : stats.charactersWithoutSpaces;

  return (
    <TooltipProvider>
      <div className="border-t pt-4 mt-4">
        {/* PRIMARY STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <StatBlock label="Words" value={stats.words} />

          <Tooltip>
            <TooltipTrigger>
              <StatBlock
                label={
                  countSpaces
                    ? "Characters (with spaces)"
                    : "Characters (without spaces)"
                }
                value={primaryCharacters}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                With spaces: {stats.charactersWithSpaces}
                <br />
                Without spaces: {stats.charactersWithoutSpaces}
              </p>
            </TooltipContent>
          </Tooltip>

          <StatBlock
            label="Reading Time"
            value={`${Math.max(
              1,
              Math.round(stats.readingTimeSeconds / 60)
            )} min`}
          />
        </div>

        {/* ADVANCED STATS */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <StatBlock label="Sentences" value={stats.sentences} />
          <StatBlock label="Paragraphs" value={stats.paragraphs} />
          <StatBlock label="Lines" value={stats.lines} />
          <StatBlock
            label="Avg Word Length"
            value={stats.avgWordLength.toFixed(2)}
          />
          <StatBlock label="Longest Word" value={stats.longestWord ?? "-"} />
          <StatBlock
            label="Speaking Time"
            value={`${Math.max(
              1,
              Math.round(stats.speakingTimeSeconds / 60)
            )} min`}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}

function StatBlock({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="font-semibold text-base">{value}</span>
    </div>
  );
}
