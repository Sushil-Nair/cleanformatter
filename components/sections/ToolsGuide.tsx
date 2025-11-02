"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, X, ChevronRight } from "lucide-react";
import { Tool, ToolCategory } from "@/lib/tool-categories";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface TroubleshootingItem {
  issue: string;
  solution: string;
}

interface ToolsGuidePageProps {
  categories: ToolCategory[];
}

const ToolsGuidePage: React.FC<ToolsGuidePageProps> = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filter categories and tools based on search and selected categories
  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((cat) =>
        selectedCategories.includes(cat.name)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered
        .map((category) => ({
          ...category,
          tools: category.tools.filter(
            (tool) =>
              tool.name.toLowerCase().includes(query) ||
              tool.description.toLowerCase().includes(query) ||
              tool.detailedDescription.toLowerCase().includes(query) ||
              tool.primaryUseCases.some((useCase) =>
                useCase.toLowerCase().includes(query)
              ) ||
              tool.popularTools?.some((pt) => pt.toLowerCase().includes(query))
          ),
        }))
        .filter((category) => category.tools.length > 0);
    }

    return filtered;
  }, [categories, searchQuery, selectedCategories]);

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  const hasActiveFilters = searchQuery.trim() || selectedCategories.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Complete Tools Guide
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive collection of online tools designed to
          enhance your productivity, creativity, and digital presence. Find the
          perfect tool for your needs with detailed guides, use cases, and
          expert tips.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto py-16">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools by name, description, or use case..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12 text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <span className="text-sm text-muted-foreground font-medium">
            Filter by category:
          </span>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={
                selectedCategories.includes(category.name)
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => toggleCategory(category.name)}
              className="gap-2"
            >
              <span className="scale-75">{category.icon}</span>
              {category.name}
            </Button>
          ))}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Results count */}
        {hasActiveFilters && (
          <p className="text-center text-sm text-muted-foreground">
            Showing{" "}
            {filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0)}{" "}
            tools
            {selectedCategories.length > 0 &&
              ` in ${filteredCategories.length} ${
                filteredCategories.length === 1 ? "category" : "categories"
              }`}
          </p>
        )}
      </div>

      <Separator className="mb-12" />

      {/* No Results */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-4">
            No tools found matching your criteria
          </p>
          <Button onClick={clearFilters} variant="outline">
            Clear all filters
          </Button>
        </div>
      )}

      {/* Categories and Tools Section */}
      <div className="space-y-16">
        <ScrollArea className="h-[600px] pr-4">
          {filteredCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              id={category.name.toLowerCase().replace(/\s+/g, "-")}
            >
              {/* Category Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="text-primary mt-1">{category.icon}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground text-lg">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Tools List */}
              <div className="space-y-8">
                {category.tools.map((tool, toolIndex) => (
                  <Card
                    key={toolIndex}
                    className="border-border overflow-hidden"
                  >
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">
                            <Link
                              href={tool.link}
                              className="hover:text-primary transition-colors inline-flex items-center gap-2 group"
                            >
                              {tool.name}
                              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-base">
                            {tool.description}
                          </CardDescription>
                        </div>
                      </div>

                      {/* Popular Tools/Platforms */}
                      {tool.popularTools && tool.popularTools.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {tool.popularTools.map((platform, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="pt-6 space-y-6">
                      {/* Detailed Description */}
                      <div>
                        <p className="text-muted-foreground leading-relaxed">
                          {tool.detailedDescription}
                        </p>
                      </div>

                      {/* Primary Use Cases */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          Primary Use Cases
                        </h3>
                        <ul className="space-y-2 ml-4">
                          {tool.primaryUseCases.map((useCase, idx) => (
                            <li
                              key={idx}
                              className="text-muted-foreground leading-relaxed"
                            >
                              <span className="text-primary mr-2">•</span>
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* How to Use */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          How to Use
                        </h3>
                        <ol className="space-y-2 ml-4">
                          {tool.howToUse.map((step, idx) => (
                            <li
                              key={idx}
                              className="text-muted-foreground leading-relaxed"
                            >
                              <span className="text-primary font-semibold mr-2">
                                {idx + 1}.
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Accordion for Secondary Content */}
                      <Accordion type="multiple" className="w-full">
                        {/* Advanced Tips */}
                        <AccordionItem value="tips">
                          <AccordionTrigger className="text-base font-semibold">
                            Advanced Tips & Best Practices
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 ml-4 mt-2">
                              {tool.advancedTips.map((tip, idx) => (
                                <li
                                  key={idx}
                                  className="text-muted-foreground leading-relaxed"
                                >
                                  {typeof tip === "string" ? (
                                    tip
                                  ) : (
                                    // For React elements like fragments, wrap in a React.Fragment with key
                                    <React.Fragment>{tip}</React.Fragment>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Troubleshooting */}
                        <AccordionItem value="troubleshooting">
                          <AccordionTrigger className="text-base font-semibold">
                            Troubleshooting Common Issues
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 mt-2">
                              {tool.troubleshooting.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="border-l-2 border-primary pl-4"
                                >
                                  <h4 className="font-semibold mb-1 text-foreground">
                                    Issue: {item.issue}
                                  </h4>
                                  <p className="text-muted-foreground leading-relaxed">
                                    <span className="font-medium text-primary">
                                      Solution:
                                    </span>{" "}
                                    {item.solution}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Detailed Examples */}
                        <AccordionItem value="examples">
                          <AccordionTrigger className="text-base font-semibold">
                            Real-World Examples
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 mt-2">
                              {tool.detailedExamples.map((example, idx) => (
                                <div
                                  key={idx}
                                  className="bg-muted/50 p-4 rounded-lg"
                                >
                                  <p className="text-muted-foreground leading-relaxed">
                                    <span className="font-semibold text-primary">
                                      Example {idx + 1}:
                                    </span>{" "}
                                    {example}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <Link href={tool.link}>
                          <Button className="w-full sm:w-auto" size="lg">
                            Try {tool.name} Now
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Separator between categories */}
              {categoryIndex < filteredCategories.length - 1 && (
                <Separator className="mt-16" />
              )}
            </div>
          ))}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center space-y-4 p-8 bg-muted rounded-lg">
        <h3 className="text-2xl font-semibold">
          Can't find what you're looking for?
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're constantly adding new tools to help you work smarter. Check back
          soon for updates, or use the search above to find specific
          functionality.
        </p>
      </div>

      {/* Back to Top Button */}
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </Button>
      </div>
    </div>
  );
};

export default ToolsGuidePage;
