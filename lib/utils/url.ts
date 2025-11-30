/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce } from "lodash";

export interface URLEncoderOptions {
  mode: "uri" | "component";
  spaceAsPlus: boolean;
  encodeAll: boolean;
  skipEncoded: boolean;
  rfc3986Strict?: boolean;
  preserveSpaces?: boolean; // used when user selects "do not encode spaces"
}

const defaultOptions: URLEncoderOptions = {
  mode: "uri",
  spaceAsPlus: false,
  encodeAll: false,
  skipEncoded: true,
  rfc3986Strict: false,
  preserveSpaces: false,
};

/* ----------------------------------------------
   RFC3986 Strict Encoding Map
   encodeURIComponent leaves ! ' ( ) *
------------------------------------------------*/
const RFC3986_EXTRA: Record<string, string> = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "*": "%2A",
};

/* ------------------------------------------------
   UTF-8 Percent Encoder
   Converts characters to percent-encoded UTF-8 bytes
------------------------------------------------*/
function utf8PercentEncode(char: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(char);
  return Array.from(bytes)
    .map((b) => "%" + b.toString(16).toUpperCase().padStart(2, "0"))
    .join("");
}

/* ----------------------------------------------
   Skip already encoded %XX parts
   Example: %2F should NOT be double-encoded
---------------------------------------------- */
function protectEncodedParts(text: string): string {
  return text.replace(/%[0-9A-Fa-f]{2}/g, (m) => m.toUpperCase());
}

/* ----------------------------------------------
   MAIN ENCODER
----------------------------------------------*/
export function encodeURL(
  text: string,
  opts: URLEncoderOptions = defaultOptions
): string {
  if (!text) return "";

  const options = { ...defaultOptions, ...opts };

  let working = text;

  // 1. DO NOT touch already encoded pieces when skipEncoded = true
  if (options.skipEncoded) {
    working = protectEncodedParts(working);
  }

  // 2. Encode-all mode: encode every character as UTF-8 percent-encoded
  if (options.encodeAll) {
    let result = "";
    for (const char of working) {
      // If already %XX escape, keep as-is
      if (/%[0-9A-F]{2}/i.test(char)) {
        result += char;
        continue;
      }
      result += utf8PercentEncode(char);
    }
    working = result;
  } else {
    // 3. Use built-in encoders
    try {
      working =
        options.mode === "uri"
          ? encodeURI(working)
          : encodeURIComponent(working);
    } catch {
      throw new Error("Failed to encode URL");
    }
  }

  // 4. RFC3986 strict mode (encode ! ' ( ) *)
  if (options.rfc3986Strict) {
    working = working.replace(/[!'()*]/g, (c) => RFC3986_EXTRA[c]);
  }

  // 5. Space handling
  if (options.spaceAsPlus) {
    working = working.replace(/%20/gi, "+");
  } else if (options.preserveSpaces) {
    working = working.replace(/%20/gi, " ");
  }

  return working;
}

/* ----------------------------------------------
   MAIN DECODER
----------------------------------------------*/
export function decodeURL(
  text: string,
  opts: URLEncoderOptions = defaultOptions
): string {
  if (!text) return "";

  const options = { ...defaultOptions, ...opts };

  let working = text;

  // 1. Convert '+' back to spaces if form-mode
  if (options.spaceAsPlus) {
    working = working.replace(/\+/g, "%20");
  }

  // 2. Let decodeURIComponent do the heavy lifting
  try {
    return options.mode === "uri"
      ? decodeURI(working)
      : decodeURIComponent(working);
  } catch {
    // graceful fallback:
    // attempt partial repairs
    try {
      // fix malformed percent sequences
      const repaired = working.replace(
        /%[^0-9A-F]|%[0-9A-F]([^0-9A-F])/gi,
        (m) => encodeURIComponent(m)
      );
      return decodeURIComponent(repaired);
    } catch {
      throw new Error("Failed to decode URL");
    }
  }
}

/* ----------------------------------------------
   Debounced versions
----------------------------------------------*/
export const encodeURLDebounced = debounce(encodeURL, 200);
export const decodeURLDebounced = debounce(decodeURL, 200);
