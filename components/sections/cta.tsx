"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Clean Formatter",
        text: "Check out this powerful text case conversion tool!",
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
    <section className="py-16 md:py-24 bg-primary-foreground dark:bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Supercharge Your Productivity
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Optimize text, code, and documents with Clean Formatter—your
              all-in-one tool for smarter writing, coding, and content
              management.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 sm:animate-none animate-cta-pulse"
            >
              <Link href="/tools">Explore Tools</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
              onClick={handleShare}
            >
              Share with Friends
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
