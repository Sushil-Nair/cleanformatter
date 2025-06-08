import { debounce } from 'lodash';
import wordWrap from 'word-wrap';

interface WrapOptions {
  mode: 'word' | 'char' | 'smart' | 'code';
  width: number;
  hyphenate: boolean;
  preserveLines: boolean;
}

/**
 * Wraps text at word boundaries
 */
function wrapAtWord(text: string, width: number, preserveLines: boolean): string {
  if (preserveLines) {
    return text.split('\n').map(line => 
      wordWrap(line, {
        width,
        indent: '',
        trim: true,
        cut: false
      })
    ).join('\n');
  }
  
  return wordWrap(text, {
    width,
    indent: '',
    trim: true,
    cut: false
  });
}

/**
 * Wraps text at exact character positions
 */
function wrapAtChar(text: string, width: number, hyphenate: boolean): string {
  const lines = text.split('\n');
  return lines.map(line => {
    if (line.length <= width) return line;

    const wrappedLines: string[] = [];
    let currentLine = '';
    const words = line.split(' ');

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      if (currentLine.length + word.length + 1 <= width) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else if (word.length > width) {
        // Handle long words
        if (currentLine) {
          wrappedLines.push(currentLine);
          currentLine = '';
        }
        
        for (let j = 0; j < word.length; j += width) {
          const chunk = word.slice(j, j + width);
          if (j + width < word.length && hyphenate) {
            wrappedLines.push(chunk + '-');
          } else {
            wrappedLines.push(chunk);
          }
        }
      } else {
        wrappedLines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) {
      wrappedLines.push(currentLine);
    }

    return wrappedLines.join('\n');
  }).join('\n');
}

/**
 * Smart wrapping that combines word and character approaches
 */
function wrapSmart(text: string, width: number, hyphenate: boolean): string {
  const lines = text.split('\n');
  return lines.map(line => {
    if (line.length <= width) return line;

    const words = line.split(' ');
    const wrappedLines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if (currentLine.length + (currentLine ? 1 : 0) + word.length <= width) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else if (word.length > width && hyphenate) {
        if (currentLine) {
          wrappedLines.push(currentLine);
          currentLine = '';
        }
        
        let remaining = word;
        while (remaining.length > width - 1) {
          const chunk = remaining.slice(0, width - 1) + '-';
          wrappedLines.push(chunk);
          remaining = remaining.slice(width - 1);
        }
        currentLine = remaining;
      } else {
        if (currentLine) wrappedLines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) {
      wrappedLines.push(currentLine);
    }

    return wrappedLines.join('\n');
  }).join('\n');
}

/**
 * Wraps code while preserving indentation
 */
function wrapCode(text: string, width: number): string {
  const lines = text.split('\n');
  return lines.map(line => {
    const indent = line.match(/^\s*/)?.[0] || '';
    const content = line.slice(indent.length);
    
    if (content.length <= width - indent.length) {
      return line;
    }

    const availableWidth = Math.max(width - indent.length, 20);
    const wrapped = wordWrap(content, {
      width: availableWidth,
      indent: '',
      trim: true
    });

    return wrapped.split('\n').map(l => indent + l).join('\n');
  }).join('\n');
}

/**
 * Main wrapper function that delegates to specific implementations
 */
export function wrapText(text: string, options: WrapOptions): string {
  if (!text || options.width <= 0) return text;

  // Ensure width is at least 20 characters
  const width = Math.max(options.width, 20);

  switch (options.mode) {
    case 'word':
      return wrapAtWord(text, width, options.preserveLines);
    case 'char':
      return wrapAtChar(text, width, options.hyphenate);
    case 'smart':
      return wrapSmart(text, width, options.hyphenate);
    case 'code':
      return wrapCode(text, width);
    default:
      return text;
  }
}

// Debounced version for real-time preview
export const wrapTextDebounced = debounce((text: string, options: WrapOptions) => {
  return wrapText(text, options);
}, 300);