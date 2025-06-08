import DOMPurify from 'dompurify';

/**
 * Removes HTML tags while preserving content
 */
export function cleanHTML(text: string): string {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}

/**
 * Removes Markdown syntax while preserving content
 */
export function removeMarkdown(text: string): string {
  // Remove headers
  text = text.replace(/^#{1,6}\s+/gm, '');
  
  // Remove emphasis (bold, italic)
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');
  
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');
  
  // Remove blockquotes
  text = text.replace(/^>\s+/gm, '');
  
  // Remove lists
  text = text.replace(/^[-*+]\s+/gm, '');
  text = text.replace(/^\d+\.\s+/gm, '');
  
  // Remove links
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');
  
  // Remove images
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  
  // Remove horizontal rules
  text = text.replace(/^(?:[-*_]){3,}\s*$/gm, '');
  
  return text.trim();
}

/**
 * Converts text to plain format by normalizing whitespace
 */
export function convertToPlainText(text: string): string {
  // Replace multiple newlines with single newline
  text = text.replace(/\n{3,}/g, '\n\n');
  
  // Replace multiple spaces with single space
  text = text.replace(/[ \t]+/g, ' ');
  
  // Trim whitespace from start/end of lines
  text = text.split('\n').map(line => line.trim()).join('\n');
  
  return text.trim();
}

/**
 * Removes inline styling tags while preserving content
 */
export function removeInlineStyles(text: string): string {
  // Remove common style tags
  const styleTags = ['b', 'strong', 'i', 'em', 'u', 'strike', 's', 'del', 'ins', 'mark', 'sub', 'sup'];
  const styleTagsPattern = new RegExp(`<\\/?(?:${styleTags.join('|')})(?:\\s[^>]*)?>`,'gi');
  text = text.replace(styleTagsPattern, '');
  
  // Remove style attributes
  text = text.replace(/\s+style="[^"]*"/gi, '');
  
  // Remove class attributes
  text = text.replace(/\s+class="[^"]*"/gi, '');
  
  return text;
}

/**
 * Removes hyperlinks while preserving anchor text
 */
export function removeHyperlinks(text: string): string {
  // Remove HTML anchor tags
  text = text.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');
  
  // Remove Markdown links
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');
  
  return text;
}

/**
 * Removes indentation and normalizes whitespace
 */
export function removeIndentation(text: string): string {
  // Remove leading whitespace from each line
  text = text.replace(/^[ \t]+/gm, '');
  
  // Normalize line endings
  text = text.replace(/\r\n/g, '\n');
  
  // Remove empty lines at start/end
  text = text.replace(/^\n+|\n+$/g, '');
  
  return text;
}

/**
 * Filters out special characters, leaving only alphanumeric and basic punctuation
 */
export function filterSpecialCharacters(text: string): string {
  // Keep only alphanumeric, whitespace, and basic punctuation
  text = text.replace(/[^\w\s.,?-]/g, '');
  
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ');
  
  return text.trim();
}