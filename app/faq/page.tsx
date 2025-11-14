// app/faq/page.tsx
// import AdUnit from "@/components/ad-unit";
import GeneralFAQ, { FAQStructuredData } from "@/components/GeneralFAQ";
import ToolSearch from "@/components/toolSearch";
import { toolCategories } from "@/lib/tool-categories";

export const metadata = {
  title: "FAQ - Frequently Asked Questions | Your Site",
  description:
    "Find answers to common questions about our free text editing, formatting, and generation tools.",
};

export default function FAQPage() {
  return (
    <div>
      <ToolSearch toolCategories={toolCategories} />
      <FAQStructuredData />
      <main className="w-full relative min-h-screen mx-auto px-4 py-8 flex flex-col gap-4">
        <GeneralFAQ className="flex-3" />
      </main>
    </div>
  );
}
