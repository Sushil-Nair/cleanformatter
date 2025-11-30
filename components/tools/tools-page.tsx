"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { toolCategories } from "@/lib/tool-categories";
import { ToolCategory } from "@/types/tools";
import TextCounterLayout from "@/components/tools/text-counter-layout";
import { TextDiffLayout } from "@/components/tools/text-diff-layout";
import { CaseConverterTool } from "@/components/tools/case-converter-tool";
import { FormattingTool } from "@/components/tools/formatting-tool";
import { FixSpacingTool } from "@/components/tools/fix-spacing-tool";
import { TextWrapperTool } from "@/components/tools/text-wrapper-tool";
import { CodeFormatterTool } from "@/components/tools/code-formatter-tool";
import { UnicodeConverterTool } from "@/components/tools/unicode-converter-tool";
import { CharacterFinderTool } from "@/components/tools/character-finder-tool";
import { TextAnalysisTool } from "@/components/tools/text-analysis-tool";
import { Base64Tool } from "@/components/tools/base64-tool";
import { URLEncoderTool } from "@/components/tools/url-encoder-tool";
import { HTMLEntitiesTool } from "@/components/tools/html-entities-tool";
import { TextGeneratorTool } from "@/components/tools/text-generator-tool";
import { PasswordGeneratorTool } from "@/components/tools/password-generator-tool";
import { UUIDGeneratorTool } from "@/components/tools/uuid-generator-tool";
import FontGenerator from "@/components/tools/font-generators";

import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ToolsPageProps {
  category?: ToolCategory;
}

function ToolsPageContent() {
  const getSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
                        className="block h-full mt-4"
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
                                  ?.slice(0, 3)
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
    </div>
  );
}

export default function ToolsPage({ category }: ToolsPageProps) {
  if (!category) {
    return <ToolsPageContent />;
  }

  const currentTool = category.tools[0];

  if (!category.tools?.length) {
    return (
      <div className="container mx-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No tools are currently available in this category.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  switch (currentTool.name) {
    case "Text Counter":
      return (
        <TextCounterLayout
          title={currentTool.name}
          description={currentTool.description}
        />
      );
    case "Text Diff":
      return (
        <TextDiffLayout
          title={currentTool.name}
          description={currentTool.description}
        />
      );
    // case "Find & Replace":
    //   return (
    //     <FindReplaceLayout
    //       title={currentTool.name}
    //       description={currentTool.description}
    //     />
    //   );
    case "Case Converter":
      return (
        <CaseConverterTool
          title={currentTool.name}
          description={currentTool.description}
          functions={currentTool.functions || []}
        />
      );
    case "Remove Formatting":
      return <FormattingTool />;
    case "Fix Spacing":
      return <FixSpacingTool />;
    case "Text Wrapper":
      return <TextWrapperTool />;
    case "Code Formatter":
      return <CodeFormatterTool />;
    case "Unicode Converter":
      return <UnicodeConverterTool />;
    case "Character Finder":
      return <CharacterFinderTool />;
    case "Text Analysis":
      return <TextAnalysisTool />;
    case "Base64":
      return <Base64Tool />;
    case "URL Encoding":
      return <URLEncoderTool />;
    case "HTML Entities":
      return <HTMLEntitiesTool />;
    case "Text Generator":
      return <TextGeneratorTool />;
    case "Password Generator":
      return <PasswordGeneratorTool />;
    case "UUID Generator":
      return <UUIDGeneratorTool />;
    case "Font Generators":
      return <FontGenerator />;
  }
}

export { ToolsPage };
