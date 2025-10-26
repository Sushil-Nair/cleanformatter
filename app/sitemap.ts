import { MetadataRoute } from "next";
import { toolCategories } from "@/lib/tool-categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cleanformatter.com";

  // Helper function to convert names to slugs
  const getSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = toolCategories.map(
    (category) => ({
      url: `${baseUrl}/tools/${getSlug(category.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Individual tool pages
  const toolPages: MetadataRoute.Sitemap = toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      url: `${baseUrl}/tools/${getSlug(category.name)}/${getSlug(tool.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...categoryPages, ...toolPages];
}
