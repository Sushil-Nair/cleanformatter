"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const generalFAQs: FAQItem[] = [
  {
    question: "What types of text editing tools do you offer?",
    answer: (
      <>
        We offer a comprehensive suite of text editing tools designed for both
        writers and developers. Our most popular tools include the{" "}
        <Link
          href="/tools/text-editing/case-converter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Case Converter
        </Link>{" "}
        which supports uppercase, lowercase, title case, camelCase, and more. We
        also provide a{" "}
        <Link
          href="/tools/text-editing/text-counter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Text Counter
        </Link>{" "}
        for tracking words, characters, and lines, and a{" "}
        <Link
          href="/tools/text-editing/text-diff"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Text Difference
        </Link>{" "}
        tool to compare two texts and identify changes. All tools are free and
        require no sign-up.
      </>
    ),
  },
  {
    question: "How can I clean and format messy text?",
    answer: (
      <>
        Our cleaning and formatting tools help you fix poorly formatted text
        instantly. Use the{" "}
        <Link
          href="/tools/clean-format/remove-formatting"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Formatting Remover
        </Link>{" "}
        to strip HTML tags and unwanted formatting. The{" "}
        <Link
          href="/tools/clean-format/fix-spacing"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Fix Spacing
        </Link>{" "}
        tool removes extra whitespace and fixes indentation issues, while our{" "}
        <Link
          href="/tools/clean-format/text-wrapper"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Text Wrapper
        </Link>{" "}
        adjusts text to specific widths for better readability. These tools are
        perfect for content creators and developers working with multi-source
        content.
      </>
    ),
  },
  {
    question: "Can I format code in different programming languages?",
    answer: (
      <>
        Yes! Our{" "}
        <Link
          href="/tools/code-format/code-formatter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Code Formatter
        </Link>{" "}
        supports multiple programming languages including HTML, JavaScript,
        Python, JSON, and CSS. Simply paste your code, select the language, and
        get beautifully formatted, properly indented code in seconds. This tool
        is essential for developers who need to clean up minified code or
        standardize formatting across projects. It follows industry-standard
        formatting conventions for each language.
      </>
    ),
  },
  {
    question: "What Unicode tools are available for special characters?",
    answer: (
      <>
        We provide three powerful Unicode tools for working with special
        characters and text encoding. The{" "}
        <Link
          href="/tools/unicode/unicode-converter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Unicode Converter
        </Link>{" "}
        converts text to and from Unicode formats including UTF-8, UTF-16, and
        UTF-32. Our{" "}
        <Link
          href="/tools/unicode/character-finder"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Character Finder
        </Link>{" "}
        helps you find and insert symbols, emojis, and math symbols easily. For
        advanced users, the{" "}
        <Link
          href="/tools/unicode/text-analysis"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Text Analysis
        </Link>{" "}
        tool provides detailed information about Unicode text properties,
        character encoding, and script information.
      </>
    ),
  },
  {
    question: "How do I encode and decode data for web development?",
    answer: (
      <>
        Our encoding and decoding tools are essential for web developers. The{" "}
        <Link
          href="/tools/encode-decode/base64"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Base64 Encoder/Decoder
        </Link>{" "}
        converts data to Base64 format, perfect for embedding images or handling
        binary data. Use our{" "}
        <Link
          href="/tools/encode-decode/url-encoding"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          URL Encoding
        </Link>{" "}
        tool to safely encode URLs and query parameters. The{" "}
        <Link
          href="/tools/encode-decode/html-entities"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          HTML Entities Converter
        </Link>{" "}
        transforms special characters into HTML entities, preventing XSS
        vulnerabilities and display issues. All tools support both encoding and
        decoding operations.
      </>
    ),
  },
  {
    question: "Can I generate random text and secure passwords?",
    answer: (
      <>
        Absolutely! Our random generation tools are perfect for testing and
        security. The{" "}
        <Link
          href="/tools/random-generator/text-generator"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Text Generator
        </Link>{" "}
        creates Lorem Ipsum placeholder text, random words, and sentences for
        mockups and design work. Need security? Our{" "}
        <Link
          href="/tools/random-generator/password-generator"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Password Generator
        </Link>{" "}
        creates strong, memorable, or PIN-style passwords instantly. Developers
        will love the{" "}
        <Link
          href="/tools/random-generator/uuid-generator"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          UUID Generator
        </Link>{" "}
        for creating unique identifiers in v4, v5, or custom formats.
      </>
    ),
  },
  {
    question: "How can I create stylish text for social media?",
    answer: (
      <>
        Our{" "}
        <Link
          href="/tools/font-generator/font-generators"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Font Generator
        </Link>{" "}
        transforms plain text into eye-catching, stylish fonts perfect for
        social media platforms like Facebook, Instagram, and Twitter. Create
        unique text styles including cursive, bold, italic, and decorative fonts
        to make your posts stand out. The generated text works across all social
        media platforms and messaging apps. It&apos;s completely free and
        generates dozens of font variations instantly.
      </>
    ),
  },
  {
    question: "Are these tools free to use? Do I need to create an account?",
    answer: (
      <>
        All our tools are 100% free to use with no hidden fees or premium tiers.
        You don&apos;t need to create an account, sign up, or provide any
        personal information. Simply visit any tool page—whether it&apos;s the{" "}
        <Link
          href="/tools/text-editing/case-converter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Case Converter
        </Link>
        ,{" "}
        <Link
          href="/tools/code-format/code-formatter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Code Formatter
        </Link>
        , or any other tool—and start using it immediately. There are no usage
        limits, and your data is processed locally in your browser for privacy
        and speed.
      </>
    ),
  },
  {
    question:
      "What's the difference between a Case Converter and a Font Generator?",
    answer: (
      <>
        The{" "}
        <Link
          href="/tools/text-editing/case-converter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Case Converter
        </Link>{" "}
        changes the capitalization style of your text (UPPERCASE, lowercase,
        Title Case, camelCase, etc.) while keeping the same standard characters.
        The{" "}
        <Link
          href="/tools/font-generator/font-generators"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Font Generator
        </Link>
        , on the other hand, transforms your text into different Unicode
        character sets that appear as stylish, decorative fonts. Use the Case
        Converter for proper formatting in documents and code, and use the Font
        Generator for creative social media posts.
      </>
    ),
  },
  {
    question: "How do I count words and characters in my text?",
    answer: (
      <>
        Use our{" "}
        <Link
          href="/tools/text-editing/text-counter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Text Counter
        </Link>{" "}
        tool to instantly count words, characters (with and without spaces),
        sentences, paragraphs, and lines. This is perfect for writers meeting
        article requirements, students tracking essay lengths, or social media
        managers staying within character limits. The tool provides real-time
        counting as you type or paste text, making it easy to stay within
        specific length requirements.
      </>
    ),
  },
  {
    question: "Can I compare two versions of text to see what changed?",
    answer: (
      <>
        Yes! Our{" "}
        <Link
          href="/tools/text-editing/text-diff"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Text Difference
        </Link>{" "}
        tool compares two texts side-by-side and highlights the differences. It
        shows additions, deletions, and modifications, making it perfect for
        reviewing document changes, comparing code versions, or tracking edits.
        The tool supports side-by-side comparison, inline diff view, and
        word-level differences for precise change tracking.
      </>
    ),
  },
  {
    question: "What's Base64 encoding and when should I use it?",
    answer: (
      <>
        Base64 is an encoding method that converts binary data into ASCII text
        format. Use our{" "}
        <Link
          href="/tools/encode-decode/base64"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Base64 Encoder/Decoder
        </Link>{" "}
        for embedding images in HTML/CSS, sending binary data through text-based
        APIs, or storing binary data in JSON files. It&apos;s commonly used in
        web development for data URLs, email attachments (MIME), and API
        authentication. Remember that Base64 increases data size by
        approximately 33%, so it&apos;s best for smaller files.
      </>
    ),
  },
  {
    question: "How do I properly encode URLs for web links?",
    answer: (
      <>
        Our{" "}
        <Link
          href="/tools/encode-decode/url-encoding"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          URL Encoding
        </Link>{" "}
        tool converts special characters in URLs to percent-encoded format (like
        spaces to %20). This ensures your URLs work correctly across all
        browsers and servers. Use it for encoding query parameters, form data,
        or any URL that contains special characters. The tool also decodes
        URL-encoded strings back to readable text, making it essential for web
        developers and SEO professionals.
      </>
    ),
  },
  {
    question: "What are HTML entities and why do I need to convert them?",
    answer: (
      <>
        HTML entities are special codes that represent characters that have
        special meaning in HTML. Our{" "}
        <Link
          href="/tools/encode-decode/html-entities"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          HTML Entities Converter
        </Link>{" "}
        converts characters to and from HTML entities, preventing code injection
        attacks (XSS), fixing display issues, and ensuring your content appears
        correctly in browsers. This is crucial for displaying code snippets,
        user-generated content, or special characters on web pages.
      </>
    ),
  },
  {
    question: "Can I find and insert special characters and symbols?",
    answer: (
      <>
        Yes! Our{" "}
        <Link
          href="/tools/unicode/character-finder"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Character Finder
        </Link>{" "}
        tool provides easy access to thousands of special characters, symbols,
        and emojis. Browse categories including mathematical symbols (∑, ∫, √),
        currency symbols (€, £, ¥), arrows (→, ←, ↑), and emojis (😀, 🎉, 💡).
        Simply click any character to copy it to your clipboard and paste it
        anywhere. Perfect for documents, social media posts, or web design.
      </>
    ),
  },
  {
    question: "How can I analyze the properties of Unicode text?",
    answer: (
      <>
        Our{" "}
        <Link
          href="/tools/unicode/text-analysis"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Text Analysis
        </Link>{" "}
        tool provides detailed information about Unicode text including
        character encoding (UTF-8, UTF-16, UTF-32), script information (Latin,
        Arabic, Chinese, etc.), character properties, and byte representation.
        This is invaluable for developers working with internationalization,
        detecting text encoding issues, or understanding how different
        characters are represented in memory.
      </>
    ),
  },
  {
    question: "What's the best way to generate secure passwords?",
    answer: (
      <>
        Use our{" "}
        <Link
          href="/tools/random-generator/password-generator"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Password Generator
        </Link>{" "}
        to create strong, secure passwords instantly. Choose from strong random
        passwords (mixing uppercase, lowercase, numbers, and symbols), memorable
        passphrases (easier to remember but still secure), or numeric PINs. The
        tool generates passwords locally in your browser, ensuring they&apos;re
        never sent over the internet. You can customize password length and
        character types for different security requirements.
      </>
    ),
  },
  {
    question: "Do I need a UUID generator? What are UUIDs used for?",
    answer: (
      <>
        UUIDs (Universally Unique Identifiers) are essential for developers
        creating unique identifiers for database records, API resources, or
        distributed systems. Our{" "}
        <Link
          href="/tools/random-generator/uuid-generator"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          UUID Generator
        </Link>{" "}
        creates version 4 (random), version 5 (SHA-1 hash), or custom format
        UUIDs. Generate single UUIDs or bulk generate hundreds at once. UUIDs
        are practically guaranteed to be unique, making them perfect for primary
        keys, session IDs, or file names in large-scale applications.
      </>
    ),
  },
  {
    question: "Can I format minified or compressed code?",
    answer: (
      <>
        Absolutely! Our{" "}
        <Link
          href="/tools/code-format/code-formatter"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Code Formatter
        </Link>{" "}
        beautifies minified, compressed, or poorly formatted code in multiple
        languages. Paste your minified JavaScript, HTML, CSS, JSON, or Python
        code, and get properly indented, readable code with correct syntax
        highlighting. This tool is perfect for debugging minified production
        code, learning from others&apos; code, or cleaning up auto-generated
        code before committing to version control.
      </>
    ),
  },
  {
    question: "How do I remove unwanted formatting from copied text?",
    answer: (
      <>
        When you copy text from websites, PDFs, or Word documents, it often
        includes unwanted formatting like fonts, colors, and styles. Our{" "}
        <Link
          href="/tools/clean-format/remove-formatting"
          className="text-primary/60 hover:text-primary/70 font-medium underline"
        >
          Formatting Remover
        </Link>{" "}
        strips all HTML tags, removes markdown formatting, and converts rich
        text to plain text instantly. This is perfect for content writers,
        bloggers, and anyone who needs clean text for their CMS or text editor.
      </>
    ),
  },
];

export default function GeneralFAQ({ className = "" }: { className?: string }) {
  return (
    <section className={`w-full py-16 ${className}`}>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-10 h-10 text-primary/60" />
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Everything you need to know about our free text editing, formatting,
            encoding, and generation tools
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {generalFAQs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="shadow-sm hover:shadow-md transition-all duration-200"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 px-4 group">
                <span className="font-semibold text-lg group-hover:text-primary/60 transition-colors">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 pb-6 pt-2 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl p-8 text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-3">
            Ready to boost your productivity?
          </h3>
          <p className="text-muted-foreground mb-6 text-lg">
            Explore all our free tools and start working smarter today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tools"
              className="text-muted-foreground px-6 py-3 rounded-lg font-semibold"
            >
              Browse All Tools
            </Link>
            <Link href="/blog" className="px-6 py-3 rounded-lg font-semibold">
              Read Our Blog
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <Link
              href="/contact"
              className="text-primary/60 hover:text-primary/70 font-semibold underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// Schema.org structured data for SEO
export function FAQStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.question,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
