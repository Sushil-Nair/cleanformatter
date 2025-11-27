export interface BlogSection {
  type:
    | "heading"
    | "subheading"
    | "paragraph"
    | "list"
    | "blockquote"
    | "image"
    | "code"
    | "callout"
    | "tip"
    | "warning"
    | "info"
    | "table"
    | "divider"
    | "tool-link"
    | "html";

  content?: string;
  level?: number;

  src?: string;
  alt?: string;

  items?: string[];
  style?: "ordered" | "unordered";

  language?: string;

  variant?: "default" | "info" | "success" | "warning" | "danger";

  headers?: string[];
  rows?: string[][];

  href?: string;
  label?: string;
}

export interface BlogPost {
  slug: string; // URL path
  title: string;
  description: string;
  content: BlogSection[]; // HTML or Markdown
  category: string;
  tags: string[];
  image: string;
  readTime: number; // minutes
  featured?: boolean;

  // E-E-A-T & Google trust signals
  author: BlogAuthor;

  // Dates
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date

  // SEO metadata
  seo?: BlogSEO;

  // Table of contents toggle
  toc?: boolean;

  // FAQ section for rich results
  faq?: BlogFAQ[];

  // Credible sources
  sources?: BlogSource[];
}

export interface BlogAuthor {
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
  expertise?: string[]; // e.g., ["Frontend Development", "SEO Writing"]
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogSource {
  title: string;
  url: string;
}

export interface BlogSEO {
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description?: string;
  count?: number;
}
