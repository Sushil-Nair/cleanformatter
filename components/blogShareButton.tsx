"use client";

import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import { getBlogPost } from "@/data/blog-posts";

interface BlogShareButtonProps {
  slug: string;
}

export default function BlogShareButton({ slug }: BlogShareButtonProps) {
  const post = getBlogPost(slug);
  const { toast } = useToast();

  if (!post) {
    // Handle the case where post is not found, e.g., no button or a disabled button
    return null; // or return some fallback UI
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Clean Formatter",
        text: `Check out our blog on ${post.title}!`,
        url: window.location.href,
      });

      toast({
        title: "Shared successfully",
        description: "Thanks for sharing Clean Formatter with your friends!",
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast({
          title: "Couldn't share",
          description:
            "Your browser might not support sharing. Try copying the URL instead.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 hover:bg-accent rounded-lg transition-colors"
    >
      <Share2 className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
