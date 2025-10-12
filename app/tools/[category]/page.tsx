import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ToolsPage } from "@/components/tools/tools-page";
import { toolCategories } from "@/lib/tool-categories";
import { Footer } from "@/components/sections/footer";
import AdUnit from "@/components/ad-unit";

export async function generateStaticParams() {
  return toolCategories.map((category) => ({
    category: category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = toolCategories.find(
    (cat) =>
      cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === params.category
  );

  if (!category) {
    return {
      title: "Category Not Found - Clean Formatter",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} - Free Online Text & Code Tools | Clean Formatter`,
    description: `${category.description}. Boost productivity with fast online tools for text conversion, code formatting, word counting, and more`,
    keywords: [
      category.name.toLowerCase(),
      `${category.name.toLowerCase()} tools`,
      `${category.name.toLowerCase()} online`,
      "text tools",
      "online tools",
      "free tools",
      "developer tools",
      "content creator tools",
      "productivity tools",
      "developer utilities",
      ...category.tools.map((tool) => tool.name.toLowerCase()),
    ].filter(Boolean),
    openGraph: {
      title: `${category.name} - Free Online Text & Code Tools`,
      description: category.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - Free Online Text & Code Tools`,
      description: category.description,
    },
  };
}

export default function Page({ params }: { params: { category: string } }) {
  const category = toolCategories.find(
    (cat) =>
      cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === params.category
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <ToolsPage category={category} />
      </main>
      <AdUnit
        slot="footer-ad"
        format="horizontal"
        closeable
        className="sticky bottom-0"
      />
      <Footer />
    </div>
  );
}
