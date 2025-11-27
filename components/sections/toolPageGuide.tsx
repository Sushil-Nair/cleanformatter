"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface Tool {
  name: string;
  slug?: string;
  link: string;
  description: string;
  detailedDescription: string;
  primaryUseCases: string[];
  howToUse: string[];
  popularTools?: string[];
  advancedTips: (string | React.ReactNode)[];
  troubleshooting: { issue: string; solution: string | React.ReactNode }[];
  detailedExamples: string[];
  faq?: { question: string; answer: string }[];
}

interface Category {
  name: string;
  slug?: string;
  tools: Tool[];
}

interface ToolPageGuideProps {
  category: Category;
}

export function ToolPageGuide({ category }: ToolPageGuideProps) {
  return (
    <div className="space-y-8">
      {category.tools.map((tool, toolIndex) => (
        <Card
          key={toolIndex}
          id={tool.slug ?? tool.name.toLowerCase().replace(/\s+/g, "-")}
          className="border-border overflow-hidden"
        >
          <CardHeader className="bg-muted/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">
                  <Link
                    href={tool.link}
                    className="hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    About {tool.name}
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </div>
            </div>

            {/* Popular Tools */}
            {tool.popularTools?.length ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {tool.popularTools.map((platform, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {platform}
                  </Badge>
                ))}
              </div>
            ) : null}
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

            {/* Accordion — extra sections */}
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
                        {typeof tip === "string" ? tip : <>{tip}</>}
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
                      <div key={idx} className="border-l-2 border-primary pl-4">
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
                      <div key={idx} className="bg-muted/50 p-4 rounded-lg">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
