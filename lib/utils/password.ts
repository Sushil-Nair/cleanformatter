/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce } from "lodash";

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  similar: boolean; // allow similar-looking chars (iIlL1 oO0)
  ambiguous: boolean; // allow ambiguous chars ({}[]()/\'"`~,;:.<>)
  memorable: boolean; // syllable-style passwords
  pattern: string; // pattern-templated password e.g. "Aa0!-Aa0!"
  customSymbols?: string; // extra symbol chars added by user
}

const defaultOptions: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  similar: false,
  ambiguous: false,
  memorable: false,
  pattern: "",
  customSymbols: "",
};

const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  similar: "iIlL1oO0",
  ambiguous: "{}[]()/'\"`~,;:.<>",
  vowels: "aeiou",
  consonants: "bcdfghjklmnpqrstvwxyz",
};

// ---------- RANDOM HELPERS ----------

function getSecureRandomInt(max: number): number {
  if (max <= 0) return 0;

  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }

  return Math.floor(Math.random() * max);
}

function pickRandom(str: string): string {
  if (!str) return "";
  return str[getSecureRandomInt(str.length)];
}

// ---------- POOL BUILDER ----------

function getCharacterPool(options: PasswordOptions): string {
  let pool = "";

  if (options.uppercase) pool += charSets.uppercase;
  if (options.lowercase) pool += charSets.lowercase;
  if (options.numbers) pool += charSets.numbers;
  if (options.symbols) pool += charSets.symbols;
  if (options.customSymbols) pool += options.customSymbols;

  // Remove similar-looking chars if NOT allowed
  if (!options.similar) {
    pool = pool
      .split("")
      .filter((ch) => !charSets.similar.includes(ch))
      .join("");
  }

  // Remove ambiguous chars if NOT allowed
  if (!options.ambiguous) {
    pool = pool
      .split("")
      .filter((ch) => !charSets.ambiguous.includes(ch))
      .join("");
  }

  // Deduplicate
  pool = Array.from(new Set(pool.split(""))).join("");

  return pool;
}

// ---------- MEMORABLE MODE ----------

function generateMemorablePassword(length: number): string {
  const vowels = charSets.vowels;
  const consonants = charSets.consonants;

  let password = "";

  while (password.length < length) {
    const c = consonants[getSecureRandomInt(consonants.length)];
    const v = vowels[getSecureRandomInt(vowels.length)];
    const syllable =
      Math.random() > 0.5 ? c.toUpperCase() + v : c + v.toLowerCase();

    password += syllable;

    // sprinkle digits sometimes
    if (Math.random() > 0.7) {
      password += String(getSecureRandomInt(10));
    }
  }

  return password.slice(0, length);
}

// ---------- PATTERN MODE ----------
// Pattern tokens:
//  - 'A' → random uppercase
//  - 'a' → random lowercase
//  - '0' → random digit
//  - '!' → random symbol/custom symbol
//  - 'x' → random from full pool
//  - any other char = literal (kept as-is)
function generatePatternPassword(
  pattern: string,
  options: PasswordOptions
): string {
  const pool = getCharacterPool(options);
  const hasPool = pool.length > 0;

  let password = "";

  for (const token of pattern) {
    switch (token) {
      case "A":
        password += pickRandom(charSets.uppercase);
        break;
      case "a":
        password += pickRandom(charSets.lowercase);
        break;
      case "0":
        password += pickRandom(charSets.numbers);
        break;
      case "!": {
        const symbolsSource = (options.customSymbols || "") + charSets.symbols;
        password += pickRandom(symbolsSource);
        break;
      }
      case "x":
        if (!hasPool) {
          throw new Error(
            "Pattern uses 'x', but no characters are available. Enable at least one character type."
          );
        }
        password += pickRandom(pool);
        break;
      default:
        password += token; // literal
        break;
    }
  }

  return password;
}

// ---------- CORE GENERATOR ----------

export function generatePassword(
  options: PasswordOptions = defaultOptions
): string {
  const hasCharTypes =
    options.uppercase ||
    options.lowercase ||
    options.numbers ||
    options.symbols ||
    (!!options.customSymbols && options.customSymbols.length > 0);

  if (!options.pattern && !options.memorable && !hasCharTypes) {
    throw new Error("Select at least one character type.");
  }

  // Pattern mode wins if pattern is non-empty
  if (options.pattern.trim()) {
    return generatePatternPassword(options.pattern.trim(), options);
  }

  // Memorable mode
  if (options.memorable) {
    return generateMemorablePassword(options.length);
  }

  // Standard random password
  const pool = getCharacterPool(options);
  if (!pool) {
    throw new Error(
      "No characters available with current options. Adjust your character set."
    );
  }

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += pickRandom(pool);
  }

  // Ensure at least one char from each selected type (for standard mode)
  const ensureTypes: Array<keyof typeof charSets> = [];
  if (options.uppercase) ensureTypes.push("uppercase");
  if (options.lowercase) ensureTypes.push("lowercase");
  if (options.numbers) ensureTypes.push("numbers");
  if (options.symbols) ensureTypes.push("symbols");

  const chars = password.split("");

  for (const type of ensureTypes) {
    if (!chars.some((ch) => charSets[type].includes(ch))) {
      const pos = getSecureRandomInt(chars.length);
      chars[pos] = pickRandom(charSets[type]);
    }
  }

  return chars.join("");
}

// ---------- STRENGTH + ENTROPY ----------

export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;

  let strength = 0;
  const length = password.length;

  // Length contribution (0–40)
  strength += Math.min(length * 2, 40);

  // Character set diversity (0–40)
  if (/[A-Z]/.test(password)) strength += 10;
  if (/[a-z]/.test(password)) strength += 10;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;

  // Uniqueness / repetition (0–20)
  const unique = new Set(password).size;
  strength += Math.min((unique / length) * 20, 20);

  return Math.min(Math.round(strength), 100);
}

export function estimatePasswordEntropy(password: string): number {
  if (!password) return 0;

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32; // rough symbol space

  if (charsetSize === 0) return 0;

  // bits of entropy ≈ length * log2(charsetSize)
  const entropy = password.length * (Math.log(charsetSize) / Math.log(2));
  return Math.round(entropy);
}

// Debounced generator for potential live previews
export const generatePasswordDebounced = debounce(generatePassword, 250);
