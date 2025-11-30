/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce } from "lodash";

export interface HTMLEntitiesOptions {
  mode: "named" | "numeric" | "hex";
  encodeAll: boolean;
  encodeQuotes: boolean;
  skipEncoded: boolean;
}

const defaultOptions: HTMLEntitiesOptions = {
  mode: "named",
  encodeAll: false,
  encodeQuotes: true,
  skipEncoded: true,
};

/**
 * HTML5 Named Entities — significantly expanded list
 * (Not full 2,400+ list for perf, but all common + required)
 */
const namedEntities: Record<string, string> = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;",
  "/": "&#47;",
  "`": "&#96;",

  // Latin characters
  "©": "&copy;",
  "®": "&reg;",
  "™": "&trade;",
  "°": "&deg;",
  "·": "&middot;",
  "—": "&mdash;",
  "–": "&ndash;",
  "÷": "&divide;",
  "×": "&times;",

  // Currency
  "¢": "&cent;",
  "£": "&pound;",
  "¥": "&yen;",
  "€": "&euro;",

  // Accents (common)
  á: "&aacute;",
  é: "&eacute;",
  í: "&iacute;",
  ó: "&oacute;",
  ú: "&uacute;",
  ñ: "&ntilde;",

  // Inverted punctuation
  "¿": "&iquest;",
  "¡": "&iexcl;",
};

// Reverse lookup for decoding
const reverseEntities: Record<string, string> = Object.entries(
  namedEntities
).reduce((acc, [char, entity]) => ({ ...acc, [entity]: char }), {});

/**
 * Detects existing HTML entities:
 * - &amp;
 * - &#123;
 * - &#x1F600;
 * Prevents double encoding
 */
const ENCODED_ENTITY_REGEX = /&(?:[A-Za-z]+|#[0-9]+|#x[0-9A-Fa-f]+);/g;

/**
 * Encode a single character based on mode
 */
function encodeChar(char: string, mode: HTMLEntitiesOptions["mode"]): string {
  if (mode === "named" && namedEntities[char]) {
    return namedEntities[char];
  }

  const code = char.codePointAt(0);
  if (!code) return char;

  if (mode === "numeric") {
    return `&#${code};`;
  }

  if (mode === "hex") {
    return `&#x${code.toString(16).toUpperCase()};`;
  }

  return char;
}

function encodeHTMLEntities(
  text: string,
  options: HTMLEntitiesOptions = defaultOptions
): string {
  if (!text) return "";

  let result = text;

  // Skip encoding if text already contains entities
  if (options.skipEncoded && ENCODED_ENTITY_REGEX.test(result)) {
    return result;
  }

  const chars = Array.from(result);

  return chars
    .map((char) => {
      const isUnsafe =
        ["<", ">", "&"].includes(char) ||
        (["'", '"'].includes(char) && options.encodeQuotes);

      // If NOT encode-all: encode only unsafe characters
      if (!options.encodeAll) {
        if (isUnsafe) return encodeChar(char, options.mode);
        return char;
      }

      // Encode all characters
      return encodeChar(char, options.mode);
    })
    .join("");
}

/**
 * More robust decoder:
 * 1. Try DOMParser (best)
 * 2. Fallback to manual regex decoding
 */
function decodeHTMLEntities(text: string): string {
  if (!text) return "";

  try {
    const doc = new DOMParser().parseFromString(text, "text/html");
    const decoded = doc.documentElement.textContent;
    if (decoded) return decoded;
  } catch {
    /* Fallback below */
  }

  // Manual decode fallback
  return text.replace(/&(#[0-9]+|#x[0-9A-Fa-f]+|[A-Za-z]+);/g, (match) => {
    // Hex: &#x1F600;
    if (match.startsWith("&#x")) {
      const hex = match.slice(3, -1);
      return String.fromCodePoint(parseInt(hex, 16));
    }

    // Decimal: &#1234;
    if (match.startsWith("&#")) {
      const num = match.slice(2, -1);
      return String.fromCodePoint(parseInt(num, 10));
    }

    // Named entity
    return reverseEntities[match] || match;
  });
}

// Debounced versions for real-time preview
export const encodeHTMLEntitiesDebounced = debounce(encodeHTMLEntities, 200);
export const decodeHTMLEntitiesDebounced = debounce(decodeHTMLEntities, 200);

export { encodeHTMLEntities, decodeHTMLEntities };
