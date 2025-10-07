"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

interface Tool {
  name: string;
  description: string;
  popularTools: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  functions?: any;
}

interface ToolCategory {
  name: string;
  description: string;
  icon: React.ReactNode;
  tools: Tool[];
}

interface ToolSearchProps {
  toolCategories: ToolCategory[];
  placeholder?: string;
  className?: string;
  getToolHref?: (toolName: string, categoryName: string) => string;
}

export default function ToolSearch({
  toolCategories,
  placeholder = "Search tools...",
  className = "",
  getToolHref = (toolName, categoryName) => {
    // Default URL generator - converts to "/tools/text-editing/case-converter"
    const categorySlug = categoryName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const toolSlug = toolName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return `/tools/${categorySlug}/${toolSlug}`;
  },
}: ToolSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState<
    Array<Tool & { categoryName: string; href: string }>
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTools([]);
      setIsOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: Array<Tool & { categoryName: string; href: string }> = [];

    toolCategories.forEach((category) => {
      category.tools.forEach((tool) => {
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesDescription = tool.description
          .toLowerCase()
          .includes(query);
        const matchesCategory = category.name.toLowerCase().includes(query);
        const matchesCategoryDesc = category.description
          .toLowerCase()
          .includes(query);
        const matchesPopularTools = tool.popularTools.some((pt) =>
          pt.toLowerCase().includes(query)
        );

        if (
          matchesName ||
          matchesDescription ||
          matchesCategory ||
          matchesCategoryDesc ||
          matchesPopularTools
        ) {
          results.push({
            ...tool,
            categoryName: category.name,
            href: getToolHref(tool.name, category.name),
          });
        }
      });
    });

    setFilteredTools(results);
    setIsOpen(results.length > 0);
  }, [searchQuery, toolCategories]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    setSearchQuery("");
    setFilteredTools([]);
    setIsOpen(false);
  };

  const handleToolClick = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={index}
          className="bg-yellow-200 text-gray-900 font-medium rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      ref={searchRef}
      className={`relative pt-24 pb-16 md:pt-32 md:pb-24 mx-auto w-full max-w-2xl ${className}`}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => filteredTools.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-24 py-3 border border-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {isOpen && filteredTools.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-background border border-gray-200 rounded-lg shadow-xl max-h-[28rem] overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-3 py-2 font-semibold uppercase tracking-wide">
              {filteredTools.length}{" "}
              {filteredTools.length === 1 ? "Tool" : "Tools"} Found
            </div>
            {filteredTools.map((tool, index) => (
              <Link
                key={`${tool.categoryName}-${tool.name}-${index}`}
                href={tool.href}
                onClick={handleToolClick}
                className="block px-3 py-3 hover:bg-accent/50 rounded-lg transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                      {highlightMatch(tool.name, searchQuery)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {highlightMatch(tool.description, searchQuery)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-medium text-primary/80 bg-accent/50 px-2 py-1 rounded">
                        {highlightMatch(tool.categoryName, searchQuery)}
                      </span>
                      {tool.popularTools.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {tool.popularTools.slice(0, 3).map((pt, i) => (
                            <span
                              key={i}
                              className="text-xs text-foreground bg-accent px-2 py-1 rounded"
                            >
                              {highlightMatch(pt, searchQuery)}
                            </span>
                          ))}
                          {tool.popularTools.length > 3 && (
                            <span className="text-xs text-muted-foreground px-1">
                              +{tool.popularTools.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isOpen && searchQuery && filteredTools.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-background border border-gray-200 rounded-lg shadow-xl p-8 text-center">
          <div className="text-muted-foreground mb-3">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <div className="text-muted-foreground font-semibold text-lg mb-1">
            No tools found
          </div>
          <div className="text-sm text-muted-foreground">
            Try searching with different keywords or browse all categories
          </div>
        </div>
      )}
    </div>
  );
}
