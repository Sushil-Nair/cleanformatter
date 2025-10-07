import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/header";
import { ToolsPage } from "@/components/tools/tools-page";
import { toolCategories } from "@/lib/tool-categories";
import { Footer } from "@/components/sections/footer";
import AdUnit from "@/components/ad-unit";

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
  params: {
    category: string;
    tool: string;
  };
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
    title: `${tool.name} - Free Online Text Tool | Clean Formatter`,
    description: `${tool.description}. Free online tool for text manipulation and formatting. No registration required.`,
    keywords: [
      tool.name.toLowerCase(),
      "text tool",
      "online tool",
      "free tool",
      ...tool.popularTools,
      category.name.toLowerCase(),
    ].filter(Boolean),
    openGraph: {
      title: `${tool.name} - Free Online Text Tool`,
      description: tool.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - Free Online Text Tool`,
      description: tool.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: {
    category: string;
    tool: string;
  };
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

  const toolCategory = {
    ...categories,
    tools: [tools],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ToolsPage category={toolCategory} />
          </div>
          <div className="lg:col-span-1">
            <AdUnit
              slot="sidebar"
              format="vertical"
              className="sticky top-40"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
