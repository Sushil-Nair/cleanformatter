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

function encodeBase64(
  text: string,
  options: Base64Options = defaultOptions
): string {
  try {
    // Convert text to bytes based on charset
    let bytes: Uint8Array;
    switch (options.charset) {
      case "ascii":
        bytes = new TextEncoder().encode(text.replace(/[^\x00-\x7F]/g, ""));
        break;
      case "iso-8859-1":
        bytes = new Uint8Array(
          text.split("").map((c) => c.charCodeAt(0) & 0xff)
        );
        break;
      default: // utf-8
        bytes = new TextEncoder().encode(text);
    }

    // Convert to base64
    let base64 = btoa(String.fromCharCode(...bytes));

    // Apply URL-safe variant if requested
    if (options.urlSafe) {
      base64 = base64.replace(/\+/g, "-").replace(/\//g, "_");
    }

    // Remove padding if requested
    if (!options.padding) {
      base64 = base64.replace(/=+$/, "");
    }

    // Apply line wrapping if requested
    if (options.lineWrap && options.lineLength > 0) {
      const lines =
        base64.match(new RegExp(`.{1,${options.lineLength}}`, "g")) || [];
      base64 = lines.join("\n");
    }

    return base64;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to encode text to Base64");
  }
}

function decodeBase64(
  base64: string,
  options: Base64Options = defaultOptions
): string {
  try {
    // Remove line breaks and whitespace
    let cleanBase64 = base64.replace(/[\s\n\r]/g, "");

    // Convert from URL-safe variant if necessary
    if (options.urlSafe) {
      cleanBase64 = cleanBase64.replace(/-/g, "+").replace(/_/g, "/");
    }

    // Add padding if necessary
    if (options.padding) {
      while (cleanBase64.length % 4) {
        cleanBase64 += "=";
      }
    }

    // Decode base64
    const bytes = Uint8Array.from(atob(cleanBase64), (c) => c.charCodeAt(0));

    // Convert bytes to text based on charset
    let text: string;
    switch (options.charset) {
      case "ascii":
        text = String.fromCharCode(...bytes);
        break;
      case "iso-8859-1":
        text = String.fromCharCode(...bytes);
        break;
      default: // utf-8
        text = new TextDecoder().decode(bytes);
    }

    return text;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to decode Base64 text");
  }
}

// Debounced versions for real-time preview
export const encodeBase64Debounced = debounce(encodeBase64, 200);
export const decodeBase64Debounced = debounce(decodeBase64, 200);

export { encodeBase64, decodeBase64 };
