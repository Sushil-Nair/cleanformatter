import ToolsGuidePage from "@/components/sections/ToolsGuide";
import { generatePageMetadata } from "@/lib/seo-metadata";
import { toolCategories } from "@/lib/tool-categories";

export const metadata = generatePageMetadata({
  title: "Feature Guide | Clean Formatter – Full Toolset Overview",
  description:
    "Explore the complete feature guide for Clean Formatter. Learn how each text and code tool works, including formatting, encoding, case conversion, cleanup tools, and more to boost your productivity.",
  keywords: [
    "clean formatter feature guide",
    "text formatting guide",
    "code formatting guide",
    "clean formatter tools",
    "developer tools guide",
    "encoding tools guide",
    "unicode tools guide",
    "text cleaner guide",
  ],
  canonical: "https://cleanformatter.com/feature-guide",
  type: "website",
});

export default function GuidePage() {
  return <ToolsGuidePage categories={toolCategories} />;
}
