"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // --- Handle preview text ---
  // Priority 1: description field
  // Priority 2: first paragraph section
  const previewText =
    post.description ||
    post.content?.find((c) => c.type === "paragraph")?.content ||
    "";

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-card border-border flex flex-col h-full">
        {/* Hero Image */}
        {post.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={350}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />

            {/* Featured Badge */}
            {post.featured && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-md flex items-center gap-1">
                <Star className="w-3 h-3" /> Featured
              </Badge>
            )}
          </div>
        )}

        <CardContent className="p-6 flex flex-col flex-grow">
          {/* Category */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="text-xs px-2">
              {post.category}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Preview Text */}
          <p className="text-muted-foreground line-clamp-2 mb-4 flex-grow">
            {previewText}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
            {/* Read Time */}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>

            {/* Published Date */}
            {post.publishedAt && (
              <span className="text-xs">
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
