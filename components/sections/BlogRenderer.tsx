import Image from "next/image";
import { cn } from "@/lib/utils";
import { BlogSection } from "@/types/blog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface BlogRendererProps {
  content: BlogSection[];
}

export default function BlogRenderer({ content }: BlogRendererProps) {
  return (
    <div className="space-y-8">
      {content.map((block, i) => (
        <SectionBlock key={i} block={block} />
      ))}
    </div>
  );
}

function SectionBlock({ block }: { block: BlogSection }) {
  switch (block.type) {
    case "heading":
      return (
        <h1
          className={cn("font-bold tracking-tight", headingSize(block.level))}
        >
          {block.content}
        </h1>
      );

    case "subheading":
      return (
        <h2
          className={cn(
            "font-semibold tracking-tight",
            headingSize(block.level)
          )}
        >
          {block.content}
        </h2>
      );

    case "paragraph":
      return (
        <p className="leading-relaxed text-muted-foreground">{block.content}</p>
      );

    case "list":
      return block.style === "ordered" ? (
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          {block.items?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          {block.items?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );

    case "blockquote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          {block.content}
        </blockquote>
      );

    case "image":
      return (
        <div className="w-full flex justify-center">
          <Image
            src={block.src!}
            alt={block.alt || ""}
            width={900}
            height={500}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      );

    case "code":
      return (
        <pre className="bg-muted text-foreground p-4 rounded-lg text-sm overflow-auto">
          <code>{block.content}</code>
        </pre>
      );

    case "callout":
    case "tip":
    case "warning":
    case "info":
      return (
        <Alert variant={alertVariant(block.variant)}>
          <AlertTitle className="capitalize">{block.variant}</AlertTitle>
          <AlertDescription>{block.content}</AlertDescription>
        </Alert>
      );

    case "table":
      return (
        <Card className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="font-semibold">
              <tr>
                {block.headers?.map((h, idx) => (
                  <th key={idx} className="border-b p-2 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="border-b p-2 text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      );

    case "divider":
      return <Separator className="my-6" />;

    case "tool-link":
      return (
        <a
          href={block.href}
          target="_blank"
          className="inline-block text-primary hover:underline font-medium"
        >
          {block.label}
        </a>
      );

    case "html":
      return <div dangerouslySetInnerHTML={{ __html: block.content || "" }} />;

    default:
      return null;
  }
}

function headingSize(level?: number) {
  switch (level) {
    case 1:
      return "text-4xl";
    case 2:
      return "text-3xl";
    case 3:
      return "text-2xl";
    default:
      return "text-xl";
  }
}

function alertVariant(type: string = "info") {
  switch (type) {
    case "success":
      return "default";
    case "warning":
      return "destructive";
    case "danger":
      return "destructive";
    case "info":
    default:
      return "default";
  }
}
