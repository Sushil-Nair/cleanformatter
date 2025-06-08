import { debounce } from 'lodash';

export interface URLEncoderOptions {
  mode: 'uri' | 'component';
  spaceAsPlus: boolean;
  encodeAll: boolean;
  skipEncoded: boolean;
}

const defaultOptions: URLEncoderOptions = {
  mode: 'uri',
  spaceAsPlus: false,
  encodeAll: false,
  skipEncoded: true
};

function encodeURL(text: string, options: URLEncoderOptions = defaultOptions): string {
  try {
    if (!text) return '';

    // Skip already encoded sequences if requested
    if (options.skipEncoded) {
      text = text.replace(/%[0-9A-F]{2}/gi, match => match.toLowerCase());
    }

    let encoded: string;
    if (options.encodeAll) {
      // Encode all characters
      encoded = Array.from(text)
        .map(char => {
          const code = char.charCodeAt(0);
          return `%${code.toString(16).padStart(2, '0')}`;
        })
        .join('');
    } else {
      // Use built-in functions based on mode
      encoded = options.mode === 'uri'
        ? encodeURI(text)
        : encodeURIComponent(text);
    }

    // Convert spaces to plus signs if requested
    if (options.spaceAsPlus) {
      encoded = encoded.replace(/%20/g, '+');
    }

    return encoded;
  } catch (error) {
    throw new Error('Failed to encode URL');
  }
}

function decodeURL(text: string, options: URLEncoderOptions = defaultOptions): string {
  try {
    if (!text) return '';

    // Convert plus signs back to spaces if needed
    if (options.spaceAsPlus) {
      text = text.replace(/\+/g, '%20');
    }

    // Use built-in functions based on mode
    return options.mode === 'uri'
      ? decodeURI(text)
      : decodeURIComponent(text);
  } catch (error) {
    throw new Error('Failed to decode URL');
  }
}

// Debounced versions for real-time preview
export const encodeURLDebounced = debounce(encodeURL, 200);
export const decodeURLDebounced = debounce(decodeURL, 200);

export { encodeURL, decodeURL };