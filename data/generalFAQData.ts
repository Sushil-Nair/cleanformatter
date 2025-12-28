// data/generalFAQData.ts

export interface FAQItem {
  question: string;
  answerPlainText: string;
  answerLinkRefs: { label: string; href: string }[];
}

export const generalFAQs = [
  {
    question: "What is Clean Formatter?",
    answerPlainText:
      "Clean Formatter is a professional-grade suite of privacy-first online tools designed for developers, writers, and data analysts. Our platform allows you to clean, format, convert, and analyze text or code snippets instantly. Unlike other tools, we use a 'Smart Engine' that preserves technical context, such as keeping acronyms like NASA or HTML in the correct casing while transforming the surrounding text.",
    answerLinkRefs: [
      { label: "Explore All Tools", href: "/tools" },
      { label: "About Our Privacy Mission", href: "/about" },
    ],
  },

  {
    question: "Is my data safe with Clean Formatter?",
    answerPlainText:
      "Yes, your security is our priority. Clean Formatter operates on a 'Zero-Knowledge' architecture. All text and code processing is performed locally within your browser using JavaScript. This means your sensitive data is never uploaded to our servers, stored in a database, or shared with third parties. You can even use most of our tools while offline once the page has loaded.",
    answerLinkRefs: [
      { label: "Read Our Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    question: "How do I remove formatting from text?",
    answerPlainText:
      "You can strip away messy styles, hidden HTML tags, and inconsistent spacing using our 'Remove Formatting' tool. It is perfect for cleaning text copied from PDFs, emails, or web pages before pasting it into your CMS or document editor. Simply paste your text, and our tool will return clean, plain-text output instantly.",
    answerLinkRefs: [
      {
        label: "Open Remove Formatting Tool",
        href: "/tools/clean-format/remove-formatting",
      },
    ],
  },

  {
    question: "How does the Smart Case Converter work?",
    answerPlainText:
      "Our Case Converter supports over 15 formats, including Title Case, camelCase, and PascalCase. What makes it 'Smart' is its ability to recognize and protect 'ignore-words' and technical acronyms. For example, it won't accidentally turn 'iPhone' into 'Iphone' or 'AWS' into 'Aws' during a transformation, ensuring your brand integrity and code variables remain valid.",
    answerLinkRefs: [
      {
        label: "Try Smart Case Converter",
        href: "/tools/text-editing/case-converter",
      },
    ],
  },
  {
    question: "Can I format programming code automatically?",
    answerPlainText:
      "Absolutely. Our Code Formatter supports multiple languages including JavaScript, JSON, HTML, CSS, and Python. It fixes indentation, replaces messy spacing, and ensures your code follows standard style guides. This tool is essential for developers debugging minified code or cleaning up snippets for documentation.",
    answerLinkRefs: [
      {
        label: "Format Your Code Now",
        href: "/tools/code-format/code-formatter",
      },
    ],
  },

  {
    question: "How do I convert text to uppercase, lowercase, or title case?",
    answerPlainText:
      "You can convert text to different cases using the Case Converter Tool. It supports Uppercase, Lowercase, Title Case, Sentence Case, and more. Visit https://cleanformatter.com/tools/text-editing/case-converter.",
    answerLinkRefs: [
      {
        label: "Case Converter Tool",
        href: "/tools/text-editing/case-converter",
      },
    ],
  },

  {
    question: "How do I compare two text files or code snippets?",
    answerPlainText:
      "You can compare text or code using the Text Diff Tool. It highlights differences line-by-line to help you detect changes easily. Visit https://cleanformatter.com/tools/text-editing/text-diff.",
    answerLinkRefs: [
      { label: "Text Diff Tool", href: "/tools/text-editing/text-diff" },
    ],
  },

  {
    question: "Where can I count words and characters in my text?",
    answerPlainText:
      "You can count characters, words, sentences, and reading time using the Text Counter Tool. Visit https://cleanformatter.com/tools/text-editing/text-counter.",
    answerLinkRefs: [
      { label: "Text Counter Tool", href: "/tools/text-editing/text-counter" },
    ],
  },

  {
    question: "How do I format code automatically?",
    answerPlainText:
      "You can format code automatically using the Code Formatter Tool. It supports JavaScript, HTML, CSS, JSON, Python, and more. Visit https://cleanformatter.com/tools/code-format/code-formatter.",
    answerLinkRefs: [
      {
        label: "Code Formatter Tool",
        href: "/tools/code-format/code-formatter",
      },
    ],
  },

  {
    question: "How do I generate strong passwords?",
    answerPlainText:
      "You can generate secure random passwords using the Password Generator Tool at https://cleanformatter.com/tools/random-generator/password-generator.",
    answerLinkRefs: [
      {
        label: "Password Generator Tool",
        href: "/tools/random-generator/password-generator",
      },
    ],
  },

  {
    question: "How do I generate UUIDs?",
    answerPlainText:
      "You can generate UUID v4 instantly using the UUID Generator Tool at https://cleanformatter.com/tools/random-generator/uuid-generator.",
    answerLinkRefs: [
      {
        label: "UUID Generator Tool",
        href: "/tools/random-generator/uuid-generator",
      },
    ],
  },

  {
    question: "Where can I convert Unicode characters or analyze text?",
    answerPlainText:
      "You can convert or analyze Unicode characters using Unicode Converter and Text Analysis tools. Visit https://cleanformatter.com/tools/unicode for all Unicode-related tools.",
    answerLinkRefs: [
      { label: "Unicode Converter", href: "/tools/unicode/unicode-converter" },
      { label: "Text Analysis Tool", href: "/tools/unicode/text-analysis" },
    ],
  },

  {
    question: "Is Clean Formatter free to use?",
    answerPlainText:
      "Yes, Clean Formatter is completely free to use with no login required. You can access all tools at https://cleanformatter.com/tools.",
    answerLinkRefs: [{ label: "Browse All Tools", href: "/tools" }],
  },
  {
    question: "What is the difference between Sentence Case and Title Case?",
    answerPlainText:
      "Sentence case capitalizes only the first letter of a sentence and proper nouns, similar to how a standard paragraph is written. Title Case capitalizes the first letter of every major word while keeping small connecting words like 'and', 'with', or 'the' in lowercase. Our Smart Case Converter automatically handles these nuances, ensuring your headlines look professional for blogs and reports.",
    answerLinkRefs: [
      { label: "Use Smart Case Converter", href: "/tools/text-editing/case-converter" },
    ],
  },
  {
    question: "How does the 'Remove Formatting' tool handle HTML and hidden styles?",
    answerPlainText:
      "Our 'Remove Formatting' tool is designed to strip away invasive HTML tags, inline CSS styles, and non-standard character encodings often found when copying text from Word or web pages. It returns raw, clean text that is ready for your CMS or code editor without carrying over unwanted formatting artifacts.",
    answerLinkRefs: [
      { label: "Clean Your Text Now", href: "/tools/clean-format/remove-formatting" },
    ],
  },
  {
    question: "Can I use your Code Formatter for minified files?",
    answerPlainText:
      "Yes, the Code Formatter is highly effective for 'un-minifying' or 'beautifying' compressed JavaScript, CSS, or JSON files. It re-inserts proper line breaks and indentation, making it easier to debug code or review logic that was previously unreadable.",
    answerLinkRefs: [
      { label: "Format JavaScript & CSS", href: "/tools/code-format/code-formatter" },
    ],
  },
  {
    question: "Are the generated fonts and fancy text compatible with social media?",
    answerPlainText:
      "Our Fancy Font Generator uses mathematical alphanumeric Unicode symbols rather than actual font files. Because these are standard Unicode characters, they are natively supported by platforms like Instagram, Twitter (X), and Facebook, making them perfect for bio styling and captions without requiring the reader to install anything.",
    answerLinkRefs: [
      { label: "Generate Fancy Text", href: "/tools/font-generator/font-generators" },
    ],
  },
  {
    question: "Does the Text Counter provide more than just word counts?",
    answerPlainText:
      "The Text Counter tool provides a comprehensive analysis including character counts (with and without spaces), total words, number of sentences, and estimated reading time. This is an essential utility for content creators aiming for specific SEO length targets or social media character limits.",
    answerLinkRefs: [
      { label: "Analyze Text Length", href: "/tools/text-editing/text-counter" },
    ],
  },
];
