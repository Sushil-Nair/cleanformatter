import Link from "next/link";
import { toolCategories } from "@/lib/tool-categories";
import { blogPosts } from "@/data/blog-posts";
import { getSlug } from "@/lib/utils/slugify";

export default function BreadcrumbAuto({ pathname }: { pathname: string }) {
  const baseUrl = "https://cleanformatter.com";

  const segments = pathname.split("/").filter(Boolean);

  const items: { name: string; href: string }[] = [{ name: "Home", href: "/" }];

  // ---- BLOG ----
  if (segments[0] === "blog") {
    items.push({ name: "Blog", href: "/blog" });

    if (segments[1]) {
      const post = blogPosts.find((p) => p.slug === segments[1]);
      if (post) {
        items.push({ name: post.title, href: `/blog/${post.slug}` });
      }
    }
  }

  // ---- TOOLS ----
  if (segments[0] === "tools") {
    items.push({ name: "Tools", href: "/tools" });

    const categorySlug = segments[1];
    const toolSlug = segments[2];

    if (categorySlug) {
      const category = toolCategories.find(
        (c) => getSlug(c.name) === categorySlug
      );

      if (category) {
        items.push({
          name: category.name,
          href: `/tools/${categorySlug}`,
        });

        if (toolSlug) {
          const tool = category.tools.find((t) => getSlug(t.name) === toolSlug);

          if (tool) {
            items.push({
              name: tool.name,
              href: `/tools/${categorySlug}/${toolSlug}`,
            });
          }
        }
      }
    }
  }

  // ---- STATIC PAGES ----
  const staticPages: Record<string, string> = {
    faq: "FAQ",
    about: "About",
    contact: "Contact",
    "feature-guide": "Feature Guide",
    "privacy-policy": "Privacy Policy",
    "terms-of-service": "Terms of Service",
  };

  if (segments[0] in staticPages) {
    items.push({
      name: staticPages[segments[0]],
      href: `/${segments[0]}`,
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: baseUrl + item.href,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav className="text-sm text-gray-400 mb-6">
        {items.map((item, idx) => (
          <span key={item.href}>
            <Link href={item.href} className="hover:underline text-gray-300">
              {item.name}
            </Link>
            {idx < items.length - 1 && <span className="mx-2">/</span>}
          </span>
        ))}
      </nav>
    </>
  );
}
