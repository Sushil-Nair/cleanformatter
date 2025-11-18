import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolsPage } from "@/components/tools/tools-page";
import { toolCategories } from "@/lib/tool-categories";

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
  return toolCategories.map((category) => ({
    category:
      (category.slug && String(category.slug)) ?? getSlug(category.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = toolCategories.find((cat) => {
    const canonical = (cat.slug && String(cat.slug)) ?? getSlug(cat.name);
    return canonical === categoryParam;
  });

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

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryParam } = await params;
  const category = toolCategories.find((cat) => {
    const canonical = (cat.slug && String(cat.slug)) ?? getSlug(cat.name);
    return canonical === categoryParam;
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <AdUnit slot="9721370550" format="horizontal" className="" /> */}
      <main className="flex-1 pt-16">
        <ToolsPage category={category} />
      </main>
      {/* <AdUnit
        slot="8328397831"
        format="horizontal"
        className="sticky bottom-0 "
        closeable
      /> */}
    </div>
  );
}
