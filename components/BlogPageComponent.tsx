"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  blogPosts,
  blogCategories,
  getPostsByCategory,
} from "@/data/blog-posts";
import { Search } from "lucide-react";

export default function BlogPageComponent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = getPostsByCategory(selectedCategory).filter((post) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-accent pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-foreground font-bold mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, tutorials, and tips to help you make the most of our
              tools
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-center">
            {/* Search */}
            <div className="relative w-full max-w-4xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === "all"
              ? "All Articles"
              : blogCategories.find((c) => c.slug === selectedCategory)?.name}
          </h2>
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </section>
      </div>
      {/* <AdUnit
        slot="8328397831"
        format="horizontal"
        className="sticky bottom-0 "
        closeable
      /> */}
    </div>
  );
}
