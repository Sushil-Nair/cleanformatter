import ToolsGuidePage from "@/components/sections/ToolsGuide";
import { toolCategories } from "@/lib/tool-categories";

export default function GuidePage() {
  return <ToolsGuidePage categories={toolCategories} />;
}
