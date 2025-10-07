"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toolCategories } from "@/lib/tool-categories";
import Link from "next/link";

export function ToolGrid() {
  return (
    <Link href="/tools">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto p-4">
        {toolCategories.map((category) => (
          <Card
            key={category.name}
            className="group hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  {category.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold leading-none tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-[200px]">
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-4">
                    {category.tools.map((tool) => (
                      <div key={tool.name} className="space-y-2">
                        <div className="text-sm font-medium">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {tool.description}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tool.popularTools.map((popularTool) => (
                            <span
                              key={popularTool}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                              {popularTool}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Link>
  );
}
