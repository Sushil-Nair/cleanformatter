/* ============================================
 *  PRO CASE ENGINE – CleanFormatter (Final)
 *  - Universal protected & ignore words support
 *  - Fully compatible with all case modes
 * ============================================
 */

export type CaseMode =
  | "UPPERCASE"
  | "lowercase"
  | "Sentence case"
  | "Title Case"
  | "Capitalization Case"
  | "camelCase"
  | "PascalCase"
  | "snake_case"
  | "SCREAMING_SNAKE_CASE"
  | "kebab-case"
  | "dot.case"
  | "path/case"
  | "tOGGLE cASE"
  | "RaNdOm CaSe";

export interface CaseEngineOptions {
  mode: CaseMode;
  ignoreWords?: string[];
  trimWhitespace?: boolean;
  removeEmptyLines?: boolean;
  removeDuplicateLines?: boolean;
  sortLines?: "none" | "asc" | "desc";
}

// Default ignore words
export const defaultIgnoreWords: string[] = [];

/* -------------------------------------------
   BUILT-IN PROTECTED WORDS / BRANDS
-------------------------------------------- */

const BUILTIN_EXCEPTIONS = new Set([
  "FBI",
  "CIA",
  "CBI",
  "RAW",
  "NIA",
  "ED",
  "UN",
  "WHO",
  "IMF",
  "RBI",
  "SEBI",
  "NASA",
  "NSA",
  "IND",
  "USA",
  "UAE",
  "UK",
  "EU",
  "EURO",
  "NATO",
  "OPEC",
  "ASEAN",
  "BRICS",
  "AUKUS",
  "G7",
  "G20",
  "DOB",
  "CEO",
  "CFO",
  "CTO",
  "COO",
  "HR",
  "PR",
  "R&D",
  "FAQ",
  "DIY",
  "ETA",
  "GPS",
  "ATM",
  "GDPR",
  "URL",
  "IPR",
  "API",
  "HTTP",
  "HTTPS",
  "TCP",
  "UDP",
  "IP",
  "ISP",
  "DNS",
  "HTML",
  "CSS",
  "JS",
  "JSON",
  "SQL",
  "CPU",
  "GPU",
  "RAM",
  "USB",
  "GST",
  "VAT",
  "ROI",
  "EMI",
  "GDP",
  "AI",
  "ML",
  "NLP",
]);

const BRAND_CASE_MAP: Record<string, string> = {
  iphone: "iPhone",
  ipad: "iPad",
  ipod: "iPod",
  imac: "iMac",
  ebay: "eBay",
  youtube: "YouTube",
  facebook: "Facebook",
  twitter: "Twitter",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  javascript: "JavaScript",
  typescript: "TypeScript",
  chatgpt: "ChatGPT",
  openai: "OpenAI",
};

const TITLE_SMALL_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "nor",
  "for",
  "yet",
  "so",
  "at",
  "by",
  "after",
  "along",
  "for",
  "from",
  "of",
  "on",
  "to",
  "with",
  "as",
  "than",
  "via",
  "is",
  "in",
  "into",
  "over",
  "up",
  "down",
  "without",
]);

/* -------------------------------------------
   HELPERS
-------------------------------------------- */

function normalizeIgnoreSet(ignoreWords?: string[]): Set<string> {
  const set = new Set<string>();
  (ignoreWords || []).forEach((w) => set.add(w.trim().toLowerCase()));
  return set;
}

function isProtected(word: string, ignoreSet: Set<string>): boolean {
  if (!word) return false;
  const lower = word.toLowerCase();
  if (ignoreSet.has(lower)) return true;
  const upper = word.toUpperCase();
  if (BUILTIN_EXCEPTIONS.has(upper)) return true;
  return false;
}

function applyBrandCase(word: string): string {
  const lower = word.toLowerCase();
  return BRAND_CASE_MAP[lower] || word;
}

/* -------------------------------------------
   TOKENIZER FOR IDENTIFIERS
-------------------------------------------- */

function toWordsForIdentifiers(text: string): string[] {
  return text
    .replace(/[_\-./]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .split(" ")
    .map((w) => w.trim())
    .filter(Boolean);
}

/* -------------------------------------------
   CORE TRANSFORMERS
-------------------------------------------- */

// Simple transforms
function toUpper(text: string, ignore: Set<string>): string {
  return text.replace(/[A-Za-zÀ-ÖØ-öø-ÿ0-9]+/g, (w) =>
    isProtected(w, ignore) ? w : w.toUpperCase()
  );
}

function toLower(text: string, ignore: Set<string>): string {
  return text.replace(/[A-Za-zÀ-ÖØ-öø-ÿ0-9]+/g, (w) =>
    isProtected(w, ignore) ? w : w.toLowerCase()
  );
}

// Sentence case
function toSentenceCase(text: string, opts: CaseEngineOptions): string {
  const ignoreSet = normalizeIgnoreSet(opts.ignoreWords);
  if (!text.trim()) return text;

  // Start by fully lowercasing
  let working = text.toLowerCase();

  // Capitalize sentence starts (respecting quotes/brackets)
  working = working.replace(
    /(^\s*["'“‘(]*[a-z0-9])|([.!?]\s+["'“‘(]*[a-z0-9])/g,
    (match) => {
      // Only capitalize the first letter/number in the match
      return match.replace(/[a-z0-9]/, (c) => c.toUpperCase());
    }
  );

  // Now restore protected/ignored words using original casing from `text`
  const chars = working.split("");
  const wordRegex = /[A-Za-zÀ-ÖØ-öø-ÿ0-9]+/g;

  let m: RegExpExecArray | null;
  while ((m = wordRegex.exec(working)) !== null) {
    const start = m.index;
    const end = start + m[0].length;

    const originalToken = text.slice(start, end);

    if (isProtected(originalToken, ignoreSet)) {
      // Overwrite the lowercased token with the original characters
      for (let i = 0; i < originalToken.length; i++) {
        chars[start + i] = originalToken[i];
      }
    }
  }

  return chars.join("");
}

// Title Case
function toTitleCase(text: string, opts: CaseEngineOptions): string {
  const ignoreSet = normalizeIgnoreSet(opts.ignoreWords);
  if (!text.trim()) return text;

  const tokens = text.split(/(\s+)/);
  let i = 0;

  return tokens
    .map((seg) => {
      if (!seg.trim()) return seg;

      const match = seg.match(/^([^A-Za-z0-9]*)([A-Za-z0-9]+)([^A-Za-z0-9]*)$/);
      if (!match) return seg;

      const [, p, core, s] = match;
      const lower = core.toLowerCase();

      if (isProtected(core, ignoreSet)) {
        return p + core + s;
      }

      if (BRAND_CASE_MAP[lower]) {
        return p + BRAND_CASE_MAP[lower] + s;
      }

      const isSmall = TITLE_SMALL_WORDS.has(lower);
      const isFirst = i === 0;

      const result =
        !isFirst && isSmall
          ? lower
          : lower.charAt(0).toUpperCase() + lower.slice(1);

      i++;
      return p + result + s;
    })
    .join("");
}

// Capitalization Case
function toCapitalizationCase(text: string, opts: CaseEngineOptions): string {
  const ignoreSet = normalizeIgnoreSet(opts.ignoreWords);

  return text.replace(/([A-Za-zÀ-ÖØ-öø-ÿ0-9]+)/g, (word) => {
    if (isProtected(word, ignoreSet)) return word;

    const lower = word.toLowerCase();
    const brand = applyBrandCase(lower);
    if (brand !== lower) return brand;

    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
}

/* -------------------------------------------
   DEV CASES (camel, pascal, snake, etc.)
-------------------------------------------- */

function toCamelCase(text: string, ignoreSet: Set<string>): string {
  const words = toWordsForIdentifiers(text);

  return words
    .map((w, i) =>
      isProtected(w, ignoreSet)
        ? w
        : i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join("");
}

function toPascalCase(text: string, ignoreSet: Set<string>): string {
  return toWordsForIdentifiers(text)
    .map((w) =>
      isProtected(w, ignoreSet)
        ? w
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join("");
}

function toSnakeCase(text: string, ignoreSet: Set<string>): string {
  return toWordsForIdentifiers(text)
    .map((w) => (isProtected(w, ignoreSet) ? w : w.toLowerCase()))
    .join("_");
}

function toScreamingSnake(text: string, ignoreSet: Set<string>): string {
  return toWordsForIdentifiers(text)
    .map((w) => (isProtected(w, ignoreSet) ? w : w.toUpperCase()))
    .join("_");
}

function toKebabCase(text: string, ignoreSet: Set<string>): string {
  return toWordsForIdentifiers(text)
    .map((w) => (isProtected(w, ignoreSet) ? w : w.toLowerCase()))
    .join("-");
}

function toDotCase(text: string, ignoreSet: Set<string>): string {
  return toWordsForIdentifiers(text)
    .map((w) => (isProtected(w, ignoreSet) ? w : w.toLowerCase()))
    .join(".");
}

function toPathCase(text: string, ignoreSet: Set<string>): string {
  return toWordsForIdentifiers(text)
    .map((w) => (isProtected(w, ignoreSet) ? w : w.toLowerCase()))
    .join("/");
}

/* -------------------------------------------
   WHITESPACE & CLEANUP
-------------------------------------------- */

function smartTrimWhitespace(text: string): string {
  return text
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/g, "").trim())
    .join("\n");
}

function removeEmptyLines(text: string): string {
  return text
    .split("\n")
    .filter((l) => l.trim() !== "")
    .join("\n");
}

function removeDuplicateLines(text: string): string {
  const seen = new Set<string>();
  return text
    .split("\n")
    .filter((l) => {
      if (seen.has(l)) return false;
      seen.add(l);
      return true;
    })
    .join("\n");
}

function sortLines(text: string, mode: "asc" | "desc") {
  const lines = text.split("\n");
  lines.sort((a, b) =>
    mode === "asc" ? a.localeCompare(b) : b.localeCompare(a)
  );
  return lines.join("\n");
}

/* -------------------------------------------
   MAIN ENGINE
-------------------------------------------- */

export function transformText(
  text: string,
  options: CaseEngineOptions
): string {
  if (!text) return "";

  const ignoreSet = normalizeIgnoreSet(options.ignoreWords);
  let output = text;

  switch (options.mode) {
    case "UPPERCASE":
      output = toUpper(output, ignoreSet);
      break;

    case "lowercase":
      output = toLower(output, ignoreSet);
      break;

    case "Sentence case":
      output = toSentenceCase(output, options);
      break;

    case "Title Case":
      output = toTitleCase(output, options);
      break;

    case "Capitalization Case":
      output = toCapitalizationCase(output, options);
      break;

    case "camelCase":
      output = toCamelCase(output, ignoreSet);
      break;

    case "PascalCase":
      output = toPascalCase(output, ignoreSet);
      break;

    case "snake_case":
      output = toSnakeCase(output, ignoreSet);
      break;

    case "SCREAMING_SNAKE_CASE":
      output = toScreamingSnake(output, ignoreSet);
      break;

    case "kebab-case":
      output = toKebabCase(output, ignoreSet);
      break;

    case "dot.case":
      output = toDotCase(output, ignoreSet);
      break;

    case "path/case":
      output = toPathCase(output, ignoreSet);
      break;

    case "tOGGLE cASE":
      output = [...output]
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join("");
      break;

    case "RaNdOm CaSe":
      output = [...output]
        .map((c) =>
          /[A-Za-z]/.test(c)
            ? Math.random() > 0.5
              ? c.toUpperCase()
              : c.toLowerCase()
            : c
        )
        .join("");
      break;

    default:
      output = text;
  }

  if (options.trimWhitespace) output = smartTrimWhitespace(output);
  if (options.removeEmptyLines) output = removeEmptyLines(output);
  if (options.removeDuplicateLines) output = removeDuplicateLines(output);
  if (options.sortLines && options.sortLines !== "none")
    output = sortLines(output, options.sortLines);

  return output;
}
