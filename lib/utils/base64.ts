import { debounce } from "lodash";

export interface Base64Options {
  urlSafe: boolean;
  padding: boolean;
  lineWrap: boolean;
  lineLength: number;
  charset: "utf-8" | "ascii" | "iso-8859-1";
}

const defaultOptions: Base64Options = {
  urlSafe: false,
  padding: true,
  lineWrap: false,
  lineLength: 76,
  charset: "utf-8",
};

// ---- Internal helpers ----

/**
 * Safely convert bytes → Base64.
 * Works for binary data (images, PDFs, zip, etc.)
 */
function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const len = bytes.length;

  // Build binary string in a loop – avoids spread/apply limits on large arrays
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

/**
 * Safely convert bytes → string for non-UTF8 charsets (ascii / iso-8859-1).
 */
function bytesToSingleByteString(bytes: Uint8Array): string {
  let result = "";
  const len = bytes.length;
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(bytes[i] & 0xff);
  }
  return result;
}

/**
 * Normalize Base64 input for decoding with optional URL-safe handling and padding.
 * NOTE: This keeps existing behavior: always pads.
 */
export function normalizeBase64ForDecode(
  base64: string,
  urlSafe: boolean = false
): string {
  // Remove whitespace/newlines
  let clean = base64.replace(/[\r\n\s]/g, "");

  // Strip Data URL prefix if present
  clean = clean.replace(/^data:[^;]+;base64,/i, "");

  // Convert Base64URL to standard if needed
  if (urlSafe) {
    clean = clean.replace(/-/g, "+").replace(/_/g, "/");
  }

  // Fix missing padding
  const padNeeded = clean.length % 4;
  if (padNeeded) {
    clean = clean.padEnd(clean.length + (4 - padNeeded), "=");
  }

  return clean;
}

/**
 * Internal Base64 normalization that respects the `padding` flag,
 * without changing the exported normalizeBase64ForDecode behavior.
 */
function normalizeBase64WithOptions(
  base64: string,
  options: Base64Options
): string {
  // Remove whitespace & strip data URL prefix
  let clean = base64.replace(/[\r\n\s]/g, "");
  clean = clean.replace(/^data:[^;]+;base64,/i, "");

  // URL-safe → standard if requested
  if (options.urlSafe) {
    clean = clean.replace(/-/g, "+").replace(/_/g, "/");
  }

  // Only pad if options.padding === true (matches original decode behavior)
  if (options.padding) {
    const padNeeded = clean.length % 4;
    if (padNeeded) {
      clean = clean.padEnd(clean.length + (4 - padNeeded), "=");
    }
  }

  return clean;
}

// ---- Public API ----

function encodeBase64(
  text: string,
  options: Base64Options = defaultOptions
): string {
  try {
    // Convert text to bytes based on charset
    let bytes: Uint8Array;

    switch (options.charset) {
      case "ascii": {
        // Strip non-ASCII, map 0–127 directly
        const asciiClean = text.replace(/[^\x00-\x7F]/g, "");
        bytes = new TextEncoder().encode(asciiClean);
        break;
      }
      case "iso-8859-1": {
        // One byte per char, 0–255
        const arr = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++) {
          arr[i] = text.charCodeAt(i) & 0xff;
        }
        bytes = arr;
        break;
      }
      default: {
        // utf-8 (normal text)
        bytes = new TextEncoder().encode(text);
      }
    }

    // Bytes → Base64
    let base64 = bytesToBase64(bytes);

    // URL-safe variant if requested
    if (options.urlSafe) {
      base64 = base64.replace(/\+/g, "-").replace(/\//g, "_");
    }

    // Remove padding if requested
    if (!options.padding) {
      base64 = base64.replace(/=+$/, "");
    }

    // Apply line wrapping if requested
    if (options.lineWrap && options.lineLength > 0) {
      const regex = new RegExp(`.{1,${options.lineLength}}`, "g");
      const lines = base64.match(regex) || [];
      base64 = lines.join("\n");
    }

    return base64;
  } catch {
    throw new Error("Failed to encode text to Base64");
  }
}

function decodeBase64(
  base64: string,
  options: Base64Options = defaultOptions
): string {
  try {
    // Decode to raw bytes first
    const bytes = decodeBase64ToBytes(base64, options);

    // Then turn bytes into string based on charset
    switch (options.charset) {
      case "ascii":
      case "iso-8859-1":
        return bytesToSingleByteString(bytes);

      default:
        // utf-8
        return new TextDecoder("utf-8").decode(bytes);
    }
  } catch {
    throw new Error("Failed to decode Base64 text");
  }
}

export function decodeBase64ToBytes(
  base64: string,
  options: Base64Options = defaultOptions
): Uint8Array {
  // Normalize according to urlSafe + padding but keep old semantics
  const cleanBase64 = normalizeBase64WithOptions(base64, options);

  // atob expects standard Base64, but most engines accept missing padding too
  const binary = atob(cleanBase64);

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

// Debounced versions for real-time preview (same API as before)
export const encodeBase64Debounced = debounce(encodeBase64, 200);
export const decodeBase64Debounced = debounce(decodeBase64, 200);

export { encodeBase64, decodeBase64 };
