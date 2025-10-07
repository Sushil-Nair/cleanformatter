"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AboutSectionProps {
  title: string;
  content: React.ReactNode;
}

export function AboutSection({ title, content }: AboutSectionProps) {
  return (
    <Card id="aboutSection" className="mt-8">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <ScrollArea className="h-[600px] pr-4">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {content}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
