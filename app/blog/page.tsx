import { generatePageMetadata } from "@/lib/seo-metadata";
import BlogPageComponent from "@/components/BlogPageComponent";
// import AdUnit from "@/components/ad-unit";

export const metadata = generatePageMetadata({
  title: "Blog | Clean Formatter – Guides, Tutorials & Formatting Tips",
  description:
    "Explore detailed guides, tutorials, and insights about text formatting, code tools, encoding, productivity, and best practices. Learn how to use Clean Formatter tools effectively.",
  keywords: [
    "clean formatter blog",
    "text formatting blog",
    "code formatting guides",
    "developer productivity tips",
    "online text tools tutorials",
    "encoding guides",
    "clean formatter tutorials",
  ],
  canonical: "https://cleanformatter.com/blog",
  type: "website",
});

export default function BlogPage() {
  return <BlogPageComponent />;
}
