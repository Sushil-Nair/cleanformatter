import {
  Code2,
  TextSelect,
  FileCode,
  Binary,
  KeyRound,
  Shuffle,
  Palette,
} from "lucide-react";
import { ToolFunction } from "@/types/tools";

const caseFunctions: ToolFunction[] = [
  { name: "UPPERCASE", description: "Convert text to uppercase" },
  { name: "lowercase", description: "Convert text to lowercase" },
  {
    name: "Sentence case",
    description: "Capitalize first letter of each sentence",
  },
  { name: "Title Case", description: "Capitalize first letter of each word" },
  { name: "camelCase", description: "Convert to camelCase" },
  { name: "PascalCase", description: "Convert to PascalCase" },
  { name: "snake_case", description: "Convert to snake_case" },
  {
    name: "SCREAMING_SNAKE_CASE",
    description: "Convert to SCREAMING_SNAKE_CASE",
  },
  { name: "kebab-case", description: "Convert to kebab-case" },
  { name: "dot.case", description: "Convert to dot.case" },
  { name: "path/case", description: "Convert to path/case" },
  { name: "tOGGLE cASE", description: "Toggle character case" },
  { name: "RaNdOm CaSe", description: "Randomize character case" },
  { name: "Trim Whitespace", description: "Remove extra whitespace" },
  { name: "Remove Duplicate Lines", description: "Remove duplicate lines" },
  { name: "Remove Empty Lines", description: "Remove empty lines" },
  { name: "Sort Lines (A-Z)", description: "Sort lines alphabetically" },
  { name: "Sort Lines (Z-A)", description: "Sort lines in reverse" },
];

export const toolCategories = [
  {
    name: "Text Editing",
    description: "Essential text editing and manipulation tools",
    icon: <TextSelect className="h-8 w-8" />,
    tools: [
      // {
      //   name: "Find & Replace",
      //   description: "Search and replace text patterns",
      //   popularTools: ["Simple Replace", "Regex Replace", "Batch Replace"]
      // },
      {
        name: "Case Converter",
        description:
          "From UPPERCASE to camelCase to kebab-case — convert text instantly. Built for writers & devs. No sign-up, no drama.",
        popularTools: [
          "UPPERCASE",
          "lowercase",
          "Sentence case",
          "Title Case",
          "camelCase",
          "PascalCase",
          "snake_case",
          "SCREAMING_SNAKE_CASE",
          "kebab-case",
          "dot.case",
          "path/case",
          "tOGGLE cASE",
          "RaNdOm CaSe",
          "Trim Whitespace",
          "Remove Duplicate Lines",
          "Remove Empty Lines",
          "Sort Lines (A-Z)",
          "Sort Lines (Z-A)",
        ],
        functions: caseFunctions,
        faq: [
          {
            question: "What is a case converter tool?",
            answer:
              "A case converter tool automatically changes text between different letter cases such as uppercase, lowercase, title case, camelCase, snake_case, and more — useful for writers, developers, and designers.",
          },
          {
            question: "How do I use the case converter tool?",
            answer:
              "Simply paste or type your text into the input box, select your desired case style from the dropdown (like uppercase or snake_case), and the converted text will appear instantly in the output box.",
          },
          {
            question: "What are the different case styles supported?",
            answer:
              "The case converter supports UPPERCASE, lowercase, Sentence case, Title Case, camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case, dot.case, path/case, tOGGLE cASE, RaNdOm CaSe, Trim Whitespace, Remove Duplicate Lines, Remove Empty Lines, Sort Lines (A-Z), and Sort Lines (Z-A).",
          },
          {
            question: "Who can benefit from using a case converter?",
            answer:
              "Writers, developers, bloggers, editors, and students who frequently format text for documents, websites, or code can save time and improve consistency using this tool.",
          },
          {
            question: "Does the case converter work offline?",
            answer:
              "Yes. All conversions happen directly in your browser without sending any data to a server, ensuring privacy and fast results even offline.",
          },
          {
            question: "Is this tool free to use?",
            answer:
              "Yes, the case converter tool is completely free and doesn’t require any registration or login.",
          },
          {
            question: "Can I copy or download the converted text?",
            answer:
              "Yes. After conversion, you can easily copy the output with one click or download it as a text file.",
          },
          {
            question: "Is there a character limit for input?",
            answer:
              "No strict limit is enforced, but for extremely large inputs, performance may vary slightly depending on your browser and device.",
          },
          {
            question: "Can I convert multiple paragraphs or code blocks?",
            answer:
              "Yes. The tool processes multiline text and preserves formatting, making it suitable for articles, scripts, or code snippets.",
          },
          {
            question: "Is my text data stored or tracked?",
            answer:
              "No. The tool runs entirely client-side — meaning your text never leaves your browser or gets stored anywhere.",
          },
        ],
      },
      {
        name: "Text Counter",
        description: "Count characters, words, and lines",
        popularTools: ["Word Count", "Character Count", "Line Count"],
        faq: [
          {
            question: "What is a Text Counter tool?",
            answer:
              "A Text Counter tool counts the number of characters, words, sentences, and paragraphs in your text instantly. It’s useful for writers, students, developers, and anyone tracking content length.",
          },
          {
            question: "How do I use the Text Counter?",
            answer:
              "Simply paste or type your text into the input box. The tool will automatically calculate and display word count, character count (with and without spaces), sentence count, and paragraph count in real-time.",
          },
          {
            question: "What metrics does the Text Counter display?",
            answer:
              "It shows the total number of words, characters (with and without spaces), sentences, and paragraphs. Some advanced versions also show reading time and average word length.",
          },
          {
            question: "Why should I use a Text Counter tool?",
            answer:
              "Writers, editors, SEO professionals, and social media creators use a Text Counter to ensure content meets specific length limits — like tweet length, meta description limits, or essay word count requirements.",
          },
          {
            question: "Does this tool work offline?",
            answer:
              "Yes. The Text Counter runs directly in your browser, so no internet connection or data upload is required.",
          },
          {
            question: "Is the Text Counter tool free?",
            answer:
              "Yes, it’s 100% free and requires no login, signup, or installation.",
          },
          {
            question: "Can I count characters in code or special symbols?",
            answer:
              "Yes. The Text Counter recognizes all characters, including punctuation, symbols, and emojis, and includes them in the count.",
          },
          {
            question: "Does it support multilingual text?",
            answer:
              "Yes. It supports Unicode text, allowing accurate counting across multiple languages and character sets.",
          },
          {
            question: "Is my data saved or shared?",
            answer:
              "No. All processing happens on your device. Your text is never stored or transmitted, ensuring full privacy.",
          },
          {
            question: "Can I use it for SEO optimization?",
            answer:
              "Absolutely. The Text Counter helps SEO writers stay within Google’s ideal content length guidelines for titles, meta descriptions, and blog posts.",
          },
        ],
      },
      {
        name: "Text Diff",
        description: "Compare two texts and find differences",
        popularTools: ["Side by Side", "Inline Diff", "Word Diff"],
        faq: [
          {
            question: "What is a Text Diff tool?",
            answer:
              "A Text Diff tool compares two blocks of text and highlights the differences between them. It shows added, removed, or modified words, characters, or lines to help users quickly identify changes.",
          },
          {
            question: "How does a Text Diff tool work?",
            answer:
              "The Text Diff tool uses a line-by-line or character-by-character comparison algorithm to detect differences between two text inputs. It then marks the changes using colors or highlights for easy visualization.",
          },
          {
            question: "Can I use the Text Diff tool for code comparison?",
            answer:
              "Yes. The Text Diff tool works perfectly for comparing code snippets, configuration files, or any text-based content. It helps developers identify what has been changed between two versions of code.",
          },
          {
            question: "Is my data safe when using the Text Diff tool?",
            answer:
              "Yes. All comparisons happen locally in your browser. No text or file is uploaded to any server, ensuring complete privacy and data security.",
          },
          {
            question: "What file types can I compare using the Text Diff tool?",
            answer:
              "You can compare plain text, source code, or any text-based files such as .txt, .html, .css, .js, or .json. Simply copy and paste or upload the content to see the differences.",
          },
          {
            question: "Can I compare large text files?",
            answer:
              "Yes, the Text Diff tool can handle large files, but extremely large comparisons may slow down the browser depending on your device’s memory and performance.",
          },
          {
            question: "Why should I use a Text Diff tool?",
            answer:
              "It’s an efficient way to track revisions, detect plagiarism, review code changes, and ensure document consistency without manually checking every line.",
          },
        ],
      },
    ],
  },
  {
    name: "Clean & Format",
    description: "Clean and format text for various purposes",
    icon: <Code2 className="h-8 w-8" />,
    tools: [
      {
        name: "Remove Formatting",
        description: "Strip HTML and formatting",
        popularTools: ["Strip HTML", "Strip Markdown", "Plain Text"],
        faq: [
          {
            question: "What is the Remove Formatting tool?",
            answer:
              "The Remove Formatting tool quickly strips unwanted styles, HTML tags, and extra formatting from your text, leaving only clean and plain content.",
          },
          {
            question: "How does the Remove Formatting tool work?",
            answer:
              "It scans your text for HTML tags, inline styles, and non-text elements, then removes them while keeping the readable content intact. You get a plain text version ready for reuse.",
          },
          {
            question: "Why should I remove formatting from text?",
            answer:
              "Removing formatting helps when pasting text from Word, websites, or PDFs to ensure consistency and prevent broken styles or hidden HTML when publishing online.",
          },
          {
            question: "Can I use this tool to clean HTML code?",
            answer:
              "Yes. The tool removes HTML tags and converts formatted text into plain text, perfect for cleaning copy-pasted website content or WYSIWYG editor output.",
          },
          {
            question: "Is the Remove Formatting tool safe to use?",
            answer:
              "Absolutely. All processing happens locally in your browser—your data never leaves your device or gets stored on any server.",
          },
          {
            question: "Does it support batch or large text cleaning?",
            answer:
              "Yes. The tool can process large chunks of text efficiently, though performance may vary based on your browser and system memory.",
          },
          {
            question:
              "Can I paste the cleaned text directly into my website or document?",
            answer:
              "Yes. After removing formatting, you can safely copy and paste the cleaned text into CMS editors, emails, or documents without worrying about hidden code.",
          },
        ],
      },
      {
        name: "Fix Spacing",
        description: "Fix inconsistent spacing and indentation",
        popularTools: ["Fix Whitespace", "Fix Indentation", "Remove Tabs"],
        faq: [
          {
            question: "What is the Fix Spacing tool?",
            answer:
              "The Fix Spacing tool automatically corrects inconsistent spaces, indentation, and tabs in your text or code, making it clean and properly formatted. It works seamlessly with popular formatting utilities like Fix Whitespace, Fix Indentation, and Remove Tabs.",
          },
          {
            question: "How does the Fix Spacing tool work?",
            answer:
              "It scans your text or code for irregular spacing, tabs, and indentation, then adjusts them uniformly according to standard formatting rules. This ensures consistent, readable text and code.",
          },
          {
            question: "Who can benefit from using the Fix Spacing tool?",
            answer:
              "Developers, writers, content editors, and anyone working with structured text or code can use it to save time and ensure proper spacing and indentation. It complements related tools like Fix Whitespace and Remove Tabs for enhanced formatting control.",
          },
          {
            question:
              "Does the Fix Spacing tool fix tabs and extra spaces automatically?",
            answer:
              "Yes. It removes extra spaces, aligns indentation, and can convert tabs to spaces or vice versa. Popular tools like Fix Indentation and Fix Whitespace handle similar tasks to provide full formatting control.",
          },
          {
            question: "Can I use this tool for code formatting?",
            answer:
              "Absolutely. Fix Spacing works with programming code, scripts, and markup to ensure proper indentation and spacing without affecting code functionality.",
          },
          {
            question: "Is my data safe when using Fix Spacing?",
            answer:
              "Yes. All processing happens locally in your browser, and your text or code is never sent to any server, ensuring full privacy.",
          },
          {
            question: "Is the Fix Spacing tool free to use?",
            answer:
              "Yes, it’s completely free and requires no login, signup, or download.",
          },
          {
            question: "Does it support large text or code formatting?",
            answer:
              "Yes. You can format large text blocks or entire code snippets efficiently, though performance may vary depending on your device and browser.",
          },
          {
            question:
              "Can I copy or download the formatted text after using the tool?",
            answer:
              "Yes. After processing, you can easily copy or download the cleaned text for further use.",
          },
          {
            question: "What are the related or popular tools?",
            answer:
              "Popular tools included with Fix Spacing are Fix Whitespace, Fix Indentation, and Remove Tabs, which provide additional text and code formatting utilities.",
          },
        ],
      },
      {
        name: "Text Wrapper",
        description: "Wrap text to specific width",
        popularTools: ["Word Wrap", "Character Wrap", "Smart Wrap"],
        faq: [
          {
            question: "What is the Text Wrapper tool?",
            answer:
              "The Text Wrapper tool helps you wrap text to a specific width, ensuring your content fits neatly within designated boundaries for better readability.",
          },
          {
            question:
              "What popular features are included in the Text Wrapper tool?",
            answer:
              "The Text Wrapper tool includes popular options such as Word Wrap, Character Wrap, and Smart Wrap to give you flexible control over how your text is formatted.",
          },
          {
            question: "How does the Text Wrapper tool work?",
            answer:
              "It automatically adjusts the placement of words or characters by wrapping text lines to fit within the specified width, preventing overflow and improving layout.",
          },
          {
            question: "Why should I use the Text Wrapper tool?",
            answer:
              "Using Text Wrapper improves the presentation and readability of your content by preventing horizontal scrolling and ensuring text stays within viewable areas.",
          },
          {
            question: "Can the Text Wrapper tool handle different wrap styles?",
            answer:
              "Yes, the tool supports various wrapping styles including wrapping by words, characters, or smart algorithms that balance line lengths for better aesthetics.",
          },
          {
            question: "Is the Text Wrapper tool free to use?",
            answer:
              "Yes, the Text Wrapper tool is free and accessible online with no subscription required.",
          },
          {
            question: "Can I use the Text Wrapper tool offline?",
            answer:
              "Currently, the Text Wrapper tool works online and requires an internet connection to function.",
          },
        ],
      },
    ],
  },
  {
    name: "Code Format",
    description: "Format text for different programming languages",
    icon: <FileCode className="h-8 w-8" />,
    tools: [
      {
        name: "Code Formatter",
        description: "Format code in various languages",
        popularTools: ["JavaScript", "HTML", "CSS", "JSON"],
        faq: [
          {
            question: "What is the Code Formatter tool?",
            answer:
              "The Code Formatter tool automatically formats code in various programming languages, making it clean, consistent, and easier to read.",
          },
          {
            question:
              "Which programming languages does the Code Formatter support?",
            answer:
              "The Code Formatter supports popular languages such as JavaScript, HTML, CSS, and JSON, with plans to expand further.",
          },
          {
            question: "How does the Code Formatter improve code quality?",
            answer:
              "It enforces consistent style guidelines, correct indentation, spacing, and line breaks, reducing human errors and improving code readability.",
          },
          {
            question: "Why should developers use a Code Formatter?",
            answer:
              "Using a Code Formatter saves time, enhances collaboration, simplifies code reviews, and ensures code adheres to coding standards.",
          },
          {
            question:
              "Can I customize the formatting rules in the Code Formatter?",
            answer:
              "Yes, many formatters allow customization of style rules such as indentation size, line length, and specific syntax styles.",
          },
          {
            question: "Is the Code Formatter tool free to use?",
            answer:
              "Yes, the Code Formatter tool is free to use online without any subscription.",
          },
          {
            question:
              "Can the Code Formatter be integrated into development workflows?",
            answer:
              "Many Code Formatters support integration with code editors, CI pipelines, and version control systems for automated formatting.",
          },
        ],
      },
    ],
  },
  {
    name: "Unicode",
    description: "Work with Unicode text and special characters",
    icon: <Binary className="h-8 w-8" />,
    tools: [
      {
        name: "Unicode Converter",
        description: "Convert text to and from Unicode",
        popularTools: ["Code Points", "UTF-8", "UTF-16", "UTF-32"],
        faq: [
          {
            question: "What is the Unicode Converter tool?",
            answer:
              "The Unicode Converter tool allows you to convert text to and from various Unicode formats, such as Code Points, UTF-8, UTF-16, and UTF-32, ensuring compatibility across platforms.",
          },
          {
            question: "Which Unicode formats does the Converter support?",
            answer:
              "It supports popular Unicode formats including Code Points, UTF-8, UTF-16, and UTF-32, making it versatile for developers and content creators.",
          },
          {
            question:
              "How does the Unicode Converter improve text compatibility?",
            answer:
              "It converts plain text into Unicode codes and vice versa, ensuring your text displays correctly on different systems and devices, especially when handling symbols and special characters.",
          },
          {
            question: "Why use a Unicode Converter?",
            answer:
              "A Unicode Converter helps in encoding and decoding text, which is essential for programming, web development, and digital communication involving multiple languages and symbols.",
          },
          {
            question:
              "Can I convert text to Unicode for social media and gaming?",
            answer:
              "Yes, you can create stylish or fancy text compatible with social media bios, gaming chats, and creative content using the Unicode Converter.",
          },
          {
            question: "Is the Unicode Converter free?",
            answer:
              "Most online Unicode converters are free to use, allowing quick and easy text encoding and decoding without cost.",
          },
          {
            question: "Can I use the Unicode Converter offline?",
            answer:
              "Typically, these tools operate online, but some desktop applications or PWA versions support offline use for convenience.",
          },
        ],
      },
      {
        name: "Character Finder",
        description: "Find and insert special characters",
        popularTools: ["Symbols", "Emojis", "Math Symbols"],
        faq: [
          {
            question: "What is the Character Finder tool?",
            answer:
              "The Character Finder tool helps you find and insert special characters, symbols, emojis, and math symbols into your text quickly and easily.",
          },
          {
            question: "What popular character types can I find with this tool?",
            answer:
              "You can find a wide range of characters including symbols, emojis, and math symbols, making it useful for writing, programming, and creative projects.",
          },
          {
            question: "How does the Character Finder tool work?",
            answer:
              "You can search for characters by name, category, or browse through the lists, then click to copy and insert them into your text or document.",
          },
          {
            question: "Why should I use the Character Finder tool?",
            answer:
              "The tool saves time when searching for uncommon or special characters, helping ensure accurate and easy insertion without memorizing codes.",
          },
          {
            question: "Is the Character Finder tool free?",
            answer:
              "Yes, the Character Finder tool is free and accessible online without any subscription needed.",
          },
          {
            question: "Can I use the Character Finder tool on mobile devices?",
            answer:
              "Yes, the Character Finder tool is designed to be mobile-friendly and works well across desktop and mobile browsers.",
          },
        ],
      },
      {
        name: "Text Analysis",
        description: "Analyze Unicode text properties",
        popularTools: ["Character Info", "Encoding Info", "Script Info"],
        faq: [
          {
            question: "What is the Text Analysis tool?",
            answer:
              "The Text Analysis tool allows you to analyze Unicode text properties such as character details, encoding information, and script types for comprehensive text insights.",
          },
          {
            question:
              "What popular features are included in the Text Analysis tool?",
            answer:
              "The tool includes popular features like Character Info, Encoding Info, and Script Info to give you detailed understanding of your text content.",
          },
          {
            question: "How does the Text Analysis tool work?",
            answer:
              "It examines your Unicode text to reveal the underlying code points, character encodings, and the scripts or writing systems used, helping you interpret and troubleshoot text data.",
          },
          {
            question: "Why should I use the Text Analysis tool?",
            answer:
              "This tool helps developers, linguists, and content creators ensure proper text encoding, identify hidden characters, and understand the composition of complex Unicode text.",
          },
          {
            question:
              "Can the Text Analysis tool detect invisible or special Unicode characters?",
            answer:
              "Yes, it can detect invisible characters, control codes, and special Unicode symbols that might affect text processing or display.",
          },
          {
            question: "Is the Text Analysis tool free to use?",
            answer:
              "Yes, the Text Analysis tool is free and accessible online for quick Unicode text property analysis.",
          },
          {
            question:
              "Can I analyze text in multiple languages with the Text Analysis tool?",
            answer:
              "Yes, the tool supports multilingual Unicode text, making it effective for text analysis across diverse languages and scripts.",
          },
        ],
      },
    ],
  },
  {
    name: "Encode & Decode",
    description: "Encode and decode text in various formats",
    icon: <KeyRound className="h-8 w-8" />,
    tools: [
      {
        name: "Base64",
        description: "Encode/decode Base64",
        popularTools: ["Standard Base64", "URL-safe Base64", "File Upload"],
        faq: [
          {
            question: "What is Base64 encoding?",
            answer:
              "Base64 encoding is a way to convert binary or text data into ASCII characters so it can be safely transmitted or stored in systems that handle only text—like JSON, URLs, or HTML.",
          },
          {
            question: "Why do we use Base64 encoding?",
            answer:
              "It’s mainly used to encode data like images, files, or credentials into a text format that won’t break during data transmission. Think of it as a “safe packaging” for binary data.",
          },
          {
            question: "How do I use this Base64 Encoder/Decoder tool?",
            answer:
              "Simply paste your Base64 string into the “Decode” input box and hit Decode. The tool will instantly convert it back to readable text or file data.",
          },
          {
            question: "Is Base64 encryption secure?",
            answer:
              "Nope — Base64 is not encryption, it’s just encoding. It doesn’t protect data, it only changes how it looks. Anyone can decode Base64 easily.",
          },
          {
            question:
              "What’s the difference between Base64 encoding and hashing?",
            answer:
              "Encoding (like Base64) is reversible, hashing (like SHA-256) is not. Base64 is used for data representation, while hashing is used for data integrity or security.",
          },
          {
            question: "Can I encode images or files using this tool?",
            answer:
              "Yes! Just upload or paste the Base64 string of your image or file, and you’ll get the encoded or decoded result instantly.",
          },
          {
            question: "What are common use cases for Base64 encoding?",
            answer:
              "Base64 is commonly used for embedding images in HTML/CSS, email attachments, data URIs, and storing text safely in JSON or XML.",
          },
          {
            question: "Does Base64 increase the data size?",
            answer:
              "Yes — Base64 encoding expands data size by roughly 33%. It’s a tradeoff for safe text-based transport.",
          },
          {
            question: "Is my data private when using this tool?",
            answer:
              "Absolutely. The Base64 Encoder/Decoder tool runs completely in your browser, so no data leaves your device.",
          },
          {
            question: "Who can use this tool?",
            answer:
              "Developers, data analysts, and anyone dealing with encoded text, web APIs, or file conversions can benefit from it.",
          },
        ],
      },
      {
        name: "URL Encoding",
        description: "Encode/decode URLs",
        popularTools: ["URI Encoding", "Component Encoding", "Bulk Processing"],
        faq: [
          {
            question: "What is the URL Encoding tool?",
            answer:
              "The URL Encoding tool helps you encode and decode URLs, converting special characters into a format that can be safely transmitted over the internet.",
          },
          {
            question:
              "What is the difference between URI Encoding and Component Encoding?",
            answer:
              "URI Encoding encodes a complete URI, preserving characters used in the URL structure, while Component Encoding encodes individual URI components, including reserved characters that may cause issues in URLs.",
          },
          {
            question: "What popular encoding features does the tool support?",
            answer:
              "The tool supports URI Encoding, Component Encoding, and Bulk Processing for encoding or decoding multiple URLs at once.",
          },
          {
            question: "Why is URL Encoding important?",
            answer:
              "URL Encoding ensures special characters like spaces, punctuation, and control characters are correctly interpreted by browsers and web servers, preventing errors or misinterpretation.",
          },
          {
            question: "Can the tool handle bulk URL encoding or decoding?",
            answer:
              "Yes, the tool can process multiple URLs at once, making it efficient for batch operations in data preparation or development workflows.",
          },
          {
            question: "Is the URL Encoding tool free to use?",
            answer:
              "Yes, the URL Encoding tool is free and accessible online without any subscription or registration.",
          },
          {
            question: "Can I use the URL Encoding tool offline?",
            answer:
              "Currently, the URL Encoding tool requires an internet connection as it functions within your web browser.",
          },
        ],
      },
      {
        name: "HTML Entities",
        description: "Convert HTML entities",
        popularTools: ["Named Entities", "Numeric Entities", "Hex Entities"],
        faq: [
          {
            question: "What is the HTML Entities tool?",
            answer:
              "The HTML Entities tool converts characters to their corresponding HTML entity codes and vice versa, allowing special characters to display correctly on web pages.",
          },
          {
            question: "What types of HTML entities can I convert?",
            answer:
              "You can convert Named Entities (like &amp;copy;), Numeric Entities (decimal format), and Hex Entities (hexadecimal format) for maximum compatibility.",
          },
          {
            question: "Why are HTML entities important for web development?",
            answer:
              "HTML entities ensure that reserved or special characters in your content, such as <, >, &, and quotes, render correctly without being mistaken for HTML code.",
          },
          {
            question: "How does the HTML Entities tool work?",
            answer:
              "The tool encodes special characters into entity codes or decodes them back into normal characters, helping prevent display issues and XSS vulnerabilities.",
          },
          {
            question:
              "Can I use the tool to decode HTML entities back to readable text?",
            answer:
              "Yes, the tool supports decoding HTML entities into their readable character equivalents for easier editing and review.",
          },
          {
            question: "Is the HTML Entities tool free to use?",
            answer:
              "Yes, the HTML Entities tool is free and available online without requiring any subscription.",
          },
          {
            question: "Can this tool handle large blocks of text?",
            answer:
              "Yes, the tool efficiently handles large texts, making it suitable for web developers and content editors working on sizable documents.",
          },
        ],
      },
    ],
  },
  {
    name: "Random Generator",
    description: "Generate random text and data",
    icon: <Shuffle className="h-8 w-8" />,
    tools: [
      {
        name: "Text Generator",
        description: "Generate random text",
        popularTools: ["Lorem Ipsum", "Words", "Sentences"],
        faq: [
          {
            question: "What is the Text Generator tool?",
            answer:
              "The Text Generator tool allows you to generate random text for use as placeholder content, testing, or design mockups.",
          },
          {
            question:
              "What popular text generation options does this tool include?",
            answer:
              "Popular options include generating Lorem Ipsum text, random words, and complete sentences to fit different content needs.",
          },
          {
            question: "How does the Text Generator work?",
            answer:
              "It uses predefined word lists and sentence structures to create coherent placeholder text that mimics natural language.",
          },
          {
            question: "Why should I use a Text Generator tool?",
            answer:
              "This tool helps designers, developers, and writers quickly create sample content to test layouts, designs, or workflows without needing real text.",
          },
          {
            question: "Can I customize the length and type of generated text?",
            answer:
              "Yes, you can specify the amount of text, number of words, sentences, or paragraphs to generate according to your project requirements.",
          },
          {
            question: "Is the Text Generator free to use?",
            answer:
              "Yes, the Text Generator is free and accessible online without requiring any subscription.",
          },
          {
            question: "Can I use the Text Generator tool offline?",
            answer:
              "Currently, the Text Generator tool operates online and requires an internet connection to function.",
          },
        ],
      },
      {
        name: "Password Generator",
        description: "Generate secure passwords",
        popularTools: ["Strong", "Memorable", "PIN"],
        faq: [
          {
            question: "What is the Password Generator tool?",
            answer:
              "The Password Generator tool creates secure, random passwords to help protect your online accounts from hacking and unauthorized access.",
          },
          {
            question: "What types of passwords can I generate with this tool?",
            answer:
              "You can generate strong complex passwords, memorable passwords using phrases, and numeric PINs, catering to different security and usability needs.",
          },
          {
            question:
              "How does the Password Generator create strong passwords?",
            answer:
              "It uses randomization algorithms that include uppercase and lowercase letters, numbers, and special characters to produce unpredictable, unique passwords.",
          },
          {
            question:
              "Why should I use a Password Generator instead of creating my own passwords?",
            answer:
              "Randomly generated passwords are far more secure than user-created ones, reducing the risk of easy guessing, brute-force attacks, and password reuse.",
          },
          {
            question:
              "Can I customize the length and complexity of passwords generated?",
            answer:
              "Yes, you can specify desired password length and choose which character types to include, such as symbols, numbers, and letter case.",
          },
          {
            question: "Is the Password Generator tool free to use?",
            answer:
              "Yes, the Password Generator tool is completely free and available online without any subscription or registration.",
          },
          {
            question: "Can I use the Password Generator tool offline?",
            answer:
              "Currently, the Password Generator tool operates online and requires an internet connection to work.",
          },
        ],
      },
      {
        name: "UUID Generator",
        description: "Generate UUIDs/GUIDs",
        popularTools: ["v4", "v5", "Custom"],
        faq: [
          {
            question: "What is the UUID Generator tool?",
            answer:
              "The UUID Generator tool creates universally unique identifiers (UUIDs/GUIDs) that are 128-bit labels used to uniquely identify objects across systems.",
          },
          {
            question: "What UUID versions does this tool support?",
            answer:
              "The tool supports popular UUID versions including v4 (random), v5 (namespace and name-based hashing), and custom versions for specialized use cases.",
          },
          {
            question: "How does the UUID Generator ensure uniqueness?",
            answer:
              "It uses cryptographically strong random number generation, timestamps, and hashing methods depending on the UUID version to minimize the risk of duplication.",
          },
          {
            question: "Why use UUIDs generated by this tool?",
            answer:
              "UUIDs provide globally unique strings without centralized coordination, ideal for database keys, session identifiers, and distributed systems.",
          },
          {
            question: "Can I generate multiple UUIDs at once with this tool?",
            answer:
              "Yes, the tool supports bulk generation of UUIDs to facilitate testing, development, and large-scale system requirements.",
          },
          {
            question: "Is the UUID Generator free to use?",
            answer:
              "Yes, the UUID Generator tool is free and accessible online without registration or subscription.",
          },
          {
            question: "Can this tool be used offline?",
            answer:
              "Currently, the UUID Generator works online and requires an internet connection for use.",
          },
        ],
      },
    ],
  },
  {
    name: "Font Generator",
    description: "Create stylish text for your social media posts.",
    icon: <Palette className="h-8 w-8" />,
    tools: [
      {
        name: "Font Generators",
        description: "Create stylish text for your social media posts.",
        popularTools: ["Facebook", "Instagram", "Twitter"],
        faq: [
          {
            question: "What is the Font Generator tool?",
            answer:
              "The Font Generator tool helps you create stylish, visually appealing text for your social media posts, blogs, and messages using various font styles and effects.",
          },
          {
            question:
              "What popular font styles are available in the Font Generator?",
            answer:
              "Popular styles include creative fonts like fancy, mirror, handwritten, Fortnite, bubble fonts, and many more to make your content stand out.",
          },
          {
            question:
              "How does the Font Generator enhance my social media presence?",
            answer:
              "Using unique and attractive fonts can catch attention, increase engagement, and help establish a recognizable brand identity across platforms like Instagram, Facebook, and Twitter.",
          },
          {
            question: "Can I customize the font styles and sizes?",
            answer:
              "Yes, the tool offers a variety of styles and supports real-time font resizing with sliders, allowing you to tailor the appearance to your needs.",
          },
          {
            question: "Is the Font Generator tool free?",
            answer:
              "Yes, it's a free online tool that allows you to generate stylish text without any cost or registration.",
          },
          {
            question:
              "Can I upload documents or convert entire files with this tool?",
            answer:
              "Some advanced font generators support file uploads in formats like DOC and DOCX for styling entire documents easily.",
          },
          {
            question: "Where can I use the styled text generated by this tool?",
            answer:
              "You can copy and paste the styled text into social media bios, posts, stories, chat messages, blogs, or marketing content to enhance visual appeal.",
          },
        ],
      },
    ],
  },
];
