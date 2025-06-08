import { getCharacterInfo } from './unicode/character-info';
import { getEncodingInfo } from './unicode/encoding-info';
import { getScriptInfo } from './unicode/script-info';

export interface UnicodeCharacterInfo {
  codePoint: number;
  name: string;
  category: string;
  script: string;
  block: string;
  bidiClass: string;
  combiningClass: number;
  decomposition: string;
  numericValue: number | null;
  isEmoji: boolean;
  isMath: boolean;
  isSymbol: boolean;
}

export interface UnicodeEncodingInfo {
  utf8: number[];
  utf16: number[];
  utf32: number[];
  isSurrogate: boolean;
  isNonCharacter: boolean;
  isPrivateUse: boolean;
}

export interface UnicodeScriptInfo {
  name: string;
  code: string;
  direction: 'ltr' | 'rtl' | 'ttb' | 'btt';
  age: string;
  samples: string[];
}

export interface UnicodeBlockInfo {
  name: string;
  start: number;
  end: number;
  count: number;
  scripts: string[];
}

export interface UnicodeStats {
  scripts: Record<string, number>;
  blocks: Record<string, number>;
  categories: Record<string, number>;
  totalCharacters: number;
  uniqueCharacters: number;
  surrogatePairs: number;
  nonCharacters: number;
  privateUse: number;
}

export function analyzeText(text: string): UnicodeStats {
  const stats: UnicodeStats = {
    scripts: {},
    blocks: {},
    categories: {},
    totalCharacters: 0,
    uniqueCharacters: 0,
    surrogatePairs: 0,
    nonCharacters: 0,
    privateUse: 0
  };

  const uniqueChars = new Set();
  const chars = Array.from(text);

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const codePoint = char.codePointAt(0) || 0;
    
    // Get character info
    const info = getCharacterInfo(codePoint);
    const encoding = getEncodingInfo(codePoint);
    const script = getScriptInfo(codePoint);

    // Update stats
    stats.totalCharacters++;
    uniqueChars.add(codePoint);

    // Update script counts
    stats.scripts[script.name] = (stats.scripts[script.name] || 0) + 1;

    // Update block counts
    stats.blocks[info.block] = (stats.blocks[info.block] || 0) + 1;

    // Update category counts
    stats.categories[info.category] = (stats.categories[info.category] || 0) + 1;

    // Update special counts
    if (encoding.isSurrogate) stats.surrogatePairs++;
    if (encoding.isNonCharacter) stats.nonCharacters++;
    if (encoding.isPrivateUse) stats.privateUse++;
  }

  stats.uniqueCharacters = uniqueChars.size;

  return stats;
}

export function convertToCodePoints(text: string): string {
  return Array.from(text)
    .map(char => {
      const codePoint = char.codePointAt(0);
      return codePoint ? `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}` : '';
    })
    .join(' ');
}

export function convertFromCodePoints(text: string): string {
  return text
    .split(/\s+/)
    .map(cp => {
      if (cp.startsWith('U+') || cp.startsWith('u+')) {
        const num = parseInt(cp.slice(2), 16);
        return String.fromCodePoint(num);
      }
      return '';
    })
    .join('');
}

export function encodeUTF8(text: string): number[] {
  return Array.from(new TextEncoder().encode(text));
}

export function decodeUTF8(bytes: number[]): string {
  return new TextDecoder().decode(new Uint8Array(bytes));
}

export function encodeUTF16(text: string): number[] {
  const arr = [];
  for (let i = 0; i < text.length; i++) {
    arr.push(text.charCodeAt(i));
  }
  return arr;
}

export function decodeUTF16(words: number[]): string {
  return String.fromCharCode(...words);
}

export function encodeUTF32(text: string): number[] {
  return Array.from(text).map(char => char.codePointAt(0) || 0);
}

export function decodeUTF32(words: number[]): string {
  return String.fromCodePoint(...words);
}

export function normalizeText(text: string, form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): string {
  return text.normalize(form);
}

export function isValidUnicode(text: string): boolean {
  try {
    return text === decodeUTF8(encodeUTF8(text));
  } catch {
    return false;
  }
}