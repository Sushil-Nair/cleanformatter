import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ToolsPage } from "@/components/tools/tools-page";
import { toolCategories } from "@/lib/tool-categories";
import AdUnit from "@/components/ad-unit";
import ToolSearch from "@/components/toolSearch";
import { FAQSectionCompact } from "@/components/sections/FAQSection";

export async function generateStaticParams() {
  return toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      category: category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tool: tool.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    category: string;
    tool: string;
  }>;
}): Promise<Metadata> {
  const { category: categoryParam, tool: toolParam } = await params;
  const category = toolCategories.find(
    (cat) =>
      cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categoryParam
  );

  const tool = category?.tools.find(
    (t) => t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === toolParam
  );

  if (!category || !tool) {
    return {
      title: "Tool Not Found - Clean Formatter",
      description: "The requested tool could not be found.",
    };
  }

  return {
    title: `${tool.name} - Free Online Text & Code Tools | Clean Formatter`,
    description: `${tool.description}. Boost productivity with fast online tools for text conversion, code formatting, word counting, and more.`,
    keywords: [
      tool.name.toLowerCase(),
      `${tool.name.toLowerCase()} tools`,
      `${tool.name.toLowerCase()} online`,
      "text tools",
      "online tools",
      "free tools",
      "developer tools",
      "content creator tools",
      "productivity tools",
      "developer utilities",
      ...tool.popularTools,
      category.name.toLowerCase(),
    ].filter(Boolean),
    openGraph: {
      title: `${tool.name} - Free Online Text & Code Tools`,
      description: tool.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - Free Online Text & Code Tools`,
      description: tool.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    category: string;
    tool: string;
  }>;
}) {
  const { category: categoryParam, tool: toolParam } = await params;
  if (!categoryParam || !toolParam) {
    redirect("/tools");
  }

  const categories = toolCategories.find(
    (cat) =>
      cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categoryParam
  );

  if (!categories) {
    notFound();
  }

  const tools = categories.tools.find(
    (t) => t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === toolParam
  );

  if (!tools) {
    notFound();
  }

  const toolFAQ = toolCategories
    .flatMap((cat) => cat.tools)
    .find((t) => t.name.toLowerCase().replace(/\s+/g, "-") === toolParam);

  const toolCategory = {
    ...categories,
    tools: [tools],
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <ToolSearch toolCategories={toolCategories} />
      <main className="flex-1 pt-32 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 container">
          <div className="lg:col-span-3">
            <ToolsPage category={toolCategory} />
            {toolFAQ && (
              <FAQSectionCompact
                faqs={toolFAQ.faq}
                className="container max-w-6xl mx-auto px-4 py-8"
              />
            )}
            {toolFAQ && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: toolFAQ.faq.map((item) => ({
                      "@type": "Question",
                      name: item.question,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: item.answer,
                      },
                    })),
                  }),
                }}
              />
            )}
          </div>
          <AdUnit
            slot="2684656083"
            format="vertical"
            className="sticky top-20 self-start hidden md:block"
          />
        </div>
      </main>
      <AdUnit
        slot="8328397831"
        format="horizontal"
        className="sticky bottom-0 mt-10"
        closeable
      />
    </div>
  );
}
