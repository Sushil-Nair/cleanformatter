"use client";

import Link from "next/link";
import { BlogPost } from "@/types/blog";
import Image from "next/image";
import { CardContent } from "./ui/card";
import { Clock } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <CardContent>
        <article className="rounded-xl shadow-md overflow-hidden hover:shadow-xl dark:shadow-accent transition-shadow h-full flex flex-col">
          {post.image && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={500}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="text-primary/70 px-2 py-1 rounded text-xs font-medium">
                {post.category}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary/60 transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {post.description}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t">
              {post.readTime && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min
                </span>
              )}
            </div>
          </div>
        </article>
      </CardContent>
    </Link>
  );
}
