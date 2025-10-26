"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { toolCategories } from "@/lib/tool-categories";
import { Footer } from "@/components/sections/footer";
import Link from "next/link";
import ToolSearch from "@/components/toolSearch";
import AdUnit from "@/components/ad-unit";

export default function ToolsPage() {
  const getSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ToolSearch toolCategories={toolCategories} />
      <AdUnit slot="9721370550" format="horizontal" />
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6">
          <div className="space-y-16">
            {toolCategories.map((category, categoryIndex) => (
              <section key={category.name} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="text-primary">{category.icon}</div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    {category.name}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-3xl">
                  {category.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay:
                          (categoryIndex * category.tools.length + toolIndex) *
                          0.1,
                      }}
                    >
                      <Link
                        href={`/tools/${getSlug(category.name)}/${getSlug(
                          tool.name
                        )}`}
                        className="block h-full"
                      >
                        <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                  {category.icon}
                                </div>
                                <h3 className="font-semibold">{tool.name}</h3>
                              </div>

                              <p className="text-sm text-muted-foreground">
                                {tool.description}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {tool.popularTools
                                  .slice(0, 3)
                                  .map((popularTool) => (
                                    <span
                                      key={popularTool}
                                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors group-hover:border-primary/30"
                                    >
                                      {popularTool}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <AdUnit
        slot="8328397831"
        format="horizontal"
        className="sticky bottom-0 mt-12"
        closeable
      />
      <Footer />
    </div>
  );
}
