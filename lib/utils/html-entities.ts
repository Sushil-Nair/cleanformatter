import { debounce } from 'lodash';

export interface HTMLEntitiesOptions {
  mode: 'named' | 'numeric' | 'hex';
  encodeAll: boolean;
  encodeQuotes: boolean;
  skipEncoded: boolean;
}

const defaultOptions: HTMLEntitiesOptions = {
  mode: 'named',
  encodeAll: false,
  encodeQuotes: true,
  skipEncoded: true
};

// Common named entities
const namedEntities: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;',
  '¢': '&cent;',
  '£': '&pound;',
  '¥': '&yen;',
  '€': '&euro;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '°': '&deg;',
  '±': '&plusmn;',
  '¼': '&frac14;',
  '½': '&frac12;',
  '¾': '&frac34;',
  '×': '&times;',
  '÷': '&divide;',
  '∞': '&infin;',
  '≠': '&ne;',
  '≤': '&le;',
  '≥': '&ge;',
  '·': '&middot;',
  '—': '&mdash;',
  '–': '&ndash;',
  ' ': '&nbsp;',
  '¡': '&iexcl;',
  '¿': '&iquest;',
  'á': '&aacute;',
  'é': '&eacute;',
  'í': '&iacute;',
  'ó': '&oacute;',
  'ú': '&uacute;',
  'ñ': '&ntilde;',
};

// Reverse lookup for decoding
const reverseEntities: Record<string, string> = Object.entries(namedEntities)
  .reduce((acc, [char, entity]) => ({ ...acc, [entity]: char }), {});

function encodeHTMLEntities(text: string, options: HTMLEntitiesOptions = defaultOptions): string {
  try {
    if (!text) return '';

    // Skip already encoded sequences if requested
    if (options.skipEncoded && /&[#a-zA-Z0-9]+;/.test(text)) {
      return text;
    }

    return Array.from(text).map(char => {
      // Skip if not encoding all and char is basic ASCII
      if (!options.encodeAll && /[\x20-\x7E]/.test(char) && !['<', '>', '&'].includes(char)) {
        if (char === '"' || char === "'") {
          return options.encodeQuotes ? namedEntities[char] || char : char;
        }
        return char;
      }

      // Handle different encoding modes
      switch (options.mode) {
        case 'named':
          return namedEntities[char] || char;
        case 'numeric':
          return `&#${char.charCodeAt(0)};`;
        case 'hex':
          return `&#x${char.charCodeAt(0).toString(16)};`;
        default:
          return char;
      }
    }).join('');
  } catch (error) {
    throw new Error('Failed to encode HTML entities');
  }
}

function decodeHTMLEntities(text: string): string {
  try {
    if (!text) return '';

    // Create a temporary element to use browser's built-in decoder
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent || '';
  } catch (error) {
    // Fallback to manual decoding if DOMParser fails
    return text.replace(/&[#a-zA-Z0-9]+;/g, match => {
      if (match.startsWith('&#x')) {
        // Hex entity
        const hex = match.slice(3, -1);
        return String.fromCharCode(parseInt(hex, 16));
      } else if (match.startsWith('&#')) {
        // Numeric entity
        const num = match.slice(2, -1);
        return String.fromCharCode(parseInt(num, 10));
      } else {
        // Named entity
        return reverseEntities[match] || match;
      }
    });
  }
}

// Debounced versions for real-time preview
export const encodeHTMLEntitiesDebounced = debounce(encodeHTMLEntities, 200);
export const decodeHTMLEntitiesDebounced = debounce(decodeHTMLEntities, 200);

export { encodeHTMLEntities, decodeHTMLEntities };