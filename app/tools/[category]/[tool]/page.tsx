import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ToolsPage } from "@/components/tools/tools-page";
import { toolCategories } from "@/lib/tool-categories";
// import AdUnit from "@/components/ad-unit";
import ToolSearch from "@/components/toolSearch";
import { FAQSectionCompact } from "@/components/sections/FAQSection";

// Slugify function to convert names to URL-friendly slugs
function getSlug(input?: string) {
  if (!input) return "";
  try {
    input = decodeURIComponent(String(input));
  } catch {}
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // groups of non-alphanumerics -> hyphen
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

export async function generateStaticParams() {
  return toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      category:
        (category.slug && String(category.slug)) ?? getSlug(category.name),
      tool: (tool.slug && String(tool.slug)) ?? getSlug(tool.name),
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
  const category = toolCategories.find((cat) => {
    const canonical = (cat.slug && String(cat.slug)) ?? getSlug(cat.name);
    return canonical === categoryParam;
  });

  const tool = category?.tools.find((t) => {
    const canonical = (t.slug && String(t.slug)) ?? getSlug(t.name);
    return canonical === toolParam;
  });

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
      ...(tool.popularTools ?? []),
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

  const categories = toolCategories.find((cat) => {
    const canonical = (cat.slug && String(cat.slug)) ?? getSlug(cat.name);
    return canonical === categoryParam;
  });

  if (!categories) {
    notFound();
  }

  const tools = categories.tools.find((t) => {
    const canonical = (t.slug && String(t.slug)) ?? getSlug(t.name);
    return canonical === toolParam;
  });

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
      <main className="flex-1 pt-10 mx-auto max-w-[1440px] px-4 w-full">
        <div className="grid grid-cols-1 gap-8 container">
          <div className="flex flex-col gap-8 tools-title">
            <ToolsPage category={toolCategory} />
            {toolFAQ && (
              <FAQSectionCompact
                faqs={toolFAQ.faq}
                className="container mx-auto px-4 py-8"
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
          {/* <AdUnit
            slot="2684656083"
            format="vertical"
            className="sticky top-20 self-start hidden md:block"
          /> */}
        </div>
      </main>
      {/* <AdUnit
        slot="8328397831"
        format="horizontal"
        className="sticky bottom-0 mt-10"
        closeable
      /> */}
    </div>
  );
}
