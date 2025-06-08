import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Case Master Pro - Advanced Text Transformation",
  description:
    "Fast, free, and distraction-free case converter for your writing flow",
  keywords:
    "Case Master Pro, Text transformation, Case converter, Online text tools, Free text tools, Text manipulation, Text utility, String manipulation, Text processing, Online tools, Free online tools, Text editor, Text formatter, Text analysis, Text cleaner, Text utilities, Web tools, Developer tools, Writer tools, Content tools, Productivity tools, No registration, Fast and free, Distraction-free, Text editing tools, Text manipulation utilities, Find and replace, Text comparison, Word count, Character count, Line count, Paragraph count, Text diff, Text compare, Search and replace, Batch replace, Regex replace, Side by side text compare, Inline text diff, Word diff, Text statistics, Online word counter, Online character counter, Online line counter, Online paragraph counter, Text cleaning tools, Text formatting tools, Remove formatting, Fix spacing, Text wrapper, Strip HTML, Remove Markdown, Convert to plain text, Remove inline styles, Clean links, Fix whitespace, Fix indentation, Remove tabs, Word wrap, Character wrap, Smart wrap, Text line wrap, Text column wrap, Code formatter, Code beautifier, Format JavaScript, Format TypeScript, Format HTML, Format CSS, Format JSON, Format Python, Code minifier, Online code formatter, Code pretty print, Unicode tools, Unicode converter, Character finder, Text analysis, Unicode properties, Code points, UTF-8 converter, UTF-16 converter, UTF-32 converter, Normalize text, NFC, NFD, NFKC, NFKD, Special characters, Emojis, Math symbols, Character information, Encoding information, Script information, Unicode character analysis, Text encoder decoder, Base64 encoder, Base64 decoder, URL encoder, URL decoder, HTML entities converter, Standard Base64, URL-safe Base64, File to Base64, URI encoding, Component encoding, HTML named entities, HTML numeric entities, HTML hex entities, Random text generator, Password generator, UUID generator, Lorem Ipsum generator, Random words generator, Random sentences generator, Secure password generator, Strong password generator, Memorable password, UUID v4 generator, UUID v5 generator, GUID generator, UPPERCASE converter, lowercase converter, Sentence case converter, Title Case converter, camelCase converter, PascalCase converter, snake_case converter, SCREAMING_SNAKE_CASE converter, kebab-case converter, dot.case converter, path/case converter, tOGGLE cASE converter, RaNdOm CaSe converter, Trim Whitespace tool, Remove Duplicate Lines tool, Remove Empty Lines tool, Sort Lines (A-Z), Sort Lines (Z-A)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
