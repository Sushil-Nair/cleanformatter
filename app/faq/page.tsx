// app/faq/page.tsx
import AdUnit from "@/components/ad-unit";
import GeneralFAQ, { FAQStructuredData } from "@/components/GeneralFAQ";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";
import ToolSearch from "@/components/toolSearch";
import { toolCategories } from "@/lib/tool-categories";

export const metadata = {
  title: "FAQ - Frequently Asked Questions | Your Site",
  description:
    "Find answers to common questions about our free text editing, formatting, and generation tools.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <ToolSearch toolCategories={toolCategories} />
      <FAQStructuredData />
      <main className="w-full relative mx-auto px-4 py-8 flex flex-col md:flex-row gap-4">
        <AdUnit
          slot="2684656083"
          format="vertical"
          className="sticky top-40 flex-1"
        />
        <GeneralFAQ className="flex-3" />
        <AdUnit
          slot="4272343576"
          format="vertical"
          className="sticky top-40 flex-1"
        />
      </main>
      <AdUnit
        slot="8328397831"
        format="horizontal"
        className="sticky bottom-0 "
        closeable
      />
      <Footer />
    </>
  );
}
