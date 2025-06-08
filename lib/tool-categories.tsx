import { 
  Code2, 
  FileText, 
  TextSelect, 
  FileCode, 
  Binary, 
  KeyRound, 
  Shuffle 
} from "lucide-react"
import { ToolFunction } from "@/types/tools"

const caseFunctions: ToolFunction[] = [
  { name: "UPPERCASE", description: "Convert text to uppercase" },
  { name: "lowercase", description: "Convert text to lowercase" },
  { name: "Sentence case", description: "Capitalize first letter of each sentence" },
  { name: "Title Case", description: "Capitalize first letter of each word" },
  { name: "camelCase", description: "Convert to camelCase" },
  { name: "PascalCase", description: "Convert to PascalCase" },
  { name: "snake_case", description: "Convert to snake_case" },
  { name: "SCREAMING_SNAKE_CASE", description: "Convert to SCREAMING_SNAKE_CASE" },
  { name: "kebab-case", description: "Convert to kebab-case" },
  { name: "dot.case", description: "Convert to dot.case" },
  { name: "path/case", description: "Convert to path/case" },
  { name: "tOGGLE cASE", description: "Toggle character case" },
  { name: "RaNdOm CaSe", description: "Randomize character case" },
  { name: "Trim Whitespace", description: "Remove extra whitespace" },
  { name: "Remove Duplicate Lines", description: "Remove duplicate lines" },
  { name: "Remove Empty Lines", description: "Remove empty lines" },
  { name: "Sort Lines (A-Z)", description: "Sort lines alphabetically" },
  { name: "Sort Lines (Z-A)", description: "Sort lines in reverse" }
]

export const toolCategories = [
  {
    name: "Text Editing",
    description: "Essential text editing and manipulation tools",
    icon: <TextSelect className="h-8 w-8" />,
    tools: [
      {
        name: "Find & Replace",
        description: "Search and replace text patterns",
        popularTools: ["Simple Replace", "Regex Replace", "Batch Replace"]
      },
      {
        name: "Case Converter",
        description: "Convert text between different cases",
        popularTools: ["UPPERCASE", "lowercase", "Title Case"],
        functions: caseFunctions
      },
      {
        name: "Text Counter",
        description: "Count characters, words, and lines",
        popularTools: ["Word Count", "Character Count", "Line Count"]
      },
      {
        name: "Text Diff",
        description: "Compare two texts and find differences",
        popularTools: ["Side by Side", "Inline Diff", "Word Diff"]
      }
    ]
  },
  {
    name: "Clean & Format",
    description: "Clean and format text for various purposes",
    icon: <Code2 className="h-8 w-8" />,
    tools: [
      {
        name: "Remove Formatting",
        description: "Strip HTML and formatting",
        popularTools: ["Strip HTML", "Strip Markdown", "Plain Text"]
      },
      {
        name: "Fix Spacing",
        description: "Fix inconsistent spacing and indentation",
        popularTools: ["Fix Whitespace", "Fix Indentation", "Remove Tabs"]
      },
      {
        name: "Text Wrapper",
        description: "Wrap text to specific width",
        popularTools: ["Word Wrap", "Character Wrap", "Smart Wrap"]
      }
    ]
  },
  {
    name: "Code Format",
    description: "Format text for different programming languages",
    icon: <FileCode className="h-8 w-8" />,
    tools: [
      {
        name: "Code Formatter",
        description: "Format code in various languages",
        popularTools: ["JavaScript", "HTML", "CSS", "JSON"]
      }
    ]
  },
  {
    name: "Unicode",
    description: "Work with Unicode text and special characters",
    icon: <Binary className="h-8 w-8" />,
    tools: [
      {
        name: "Unicode Converter",
        description: "Convert text to and from Unicode",
        popularTools: ["Code Points", "UTF-8", "UTF-16", "UTF-32"]
      },
      {
        name: "Character Finder",
        description: "Find and insert special characters",
        popularTools: ["Symbols", "Emojis", "Math Symbols"]
      },
      {
        name: "Text Analysis",
        description: "Analyze Unicode text properties",
        popularTools: ["Character Info", "Encoding Info", "Script Info"]
      }
    ]
  },
  {
    name: "Encode & Decode",
    description: "Encode and decode text in various formats",
    icon: <KeyRound className="h-8 w-8" />,
    tools: [
      {
        name: "Base64",
        description: "Encode/decode Base64",
        popularTools: ["Standard Base64", "URL-safe Base64", "File Upload"]
      },
      {
        name: "URL Encoding",
        description: "Encode/decode URLs",
        popularTools: ["URI Encoding", "Component Encoding", "Bulk Processing"]
      },
      {
        name: "HTML Entities",
        description: "Convert HTML entities",
        popularTools: ["Named Entities", "Numeric Entities", "Hex Entities"]
      }
    ]
  },
  {
    name: "Random Generator",
    description: "Generate random text and data",
    icon: <Shuffle className="h-8 w-8" />,
    tools: [
      {
        name: "Text Generator",
        description: "Generate random text",
        popularTools: ["Lorem Ipsum", "Words", "Sentences"]
      },
      {
        name: "Password Generator",
        description: "Generate secure passwords",
        popularTools: ["Strong", "Memorable", "PIN"]
      },
      {
        name: "UUID Generator",
        description: "Generate UUIDs/GUIDs",
        popularTools: ["v4", "v5", "Custom"]
      }
    ]
  }
]