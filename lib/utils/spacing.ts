/**
 * Utility functions for fixing text spacing issues
 */

interface SpacingOptions {
  removeExtraWhitespace: boolean
  normalizePunctuation: boolean
  convertTabsToSpaces: boolean
  normalizeLineEndings: boolean
  trimLines: boolean
  removeEmptyLines: boolean
}

/**
 * Fixes spacing issues in text based on provided options
 */
export function fixSpacing(text: string, options: SpacingOptions): string {
  let processedText = text

  if (options.removeExtraWhitespace) {
    // Replace multiple spaces with a single space
    processedText = processedText.replace(/[ \t]+/g, ' ')
  }

  if (options.normalizePunctuation) {
    // Remove space before punctuation
    processedText = processedText.replace(/\s+([.,!?:;])/g, '$1')
    // Add space after punctuation if not followed by closing brackets/quotes
    processedText = processedText.replace(/([.,!?:;])([^\s\]\}"'])/g, '$1 $2')
    // Fix spaces around brackets and quotes
    processedText = processedText.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')')
    processedText = processedText.replace(/"\s+/g, '"').replace(/\s+"/g, '"')
    processedText = processedText.replace(/'\s+/g, "'").replace(/\s+'/g, "'")
  }

  if (options.convertTabsToSpaces) {
    // Convert tabs to 2 spaces
    processedText = processedText.replace(/\t/g, '  ')
  }

  if (options.normalizeLineEndings) {
    // Convert all line endings to LF
    processedText = processedText.replace(/\r\n/g, '\n')
  }

  if (options.trimLines) {
    // Trim whitespace from start and end of each line
    processedText = processedText
      .split('\n')
      .map(line => line.trim())
      .join('\n')
  }

  if (options.removeEmptyLines) {
    // Remove empty or whitespace-only lines
    processedText = processedText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .join('\n')
  }

  return processedText
}