export function getEncodingInfo(codePoint: number) {
  const info = {
    utf8: [] as number[],
    utf16: [] as number[],
    utf32: [codePoint],
    isSurrogate: false,
    isNonCharacter: false,
    isPrivateUse: false
  };

  // Check special ranges
  info.isSurrogate = codePoint >= 0xD800 && codePoint <= 0xDFFF;
  info.isNonCharacter = (codePoint >= 0xFDD0 && codePoint <= 0xFDEF) ||
    ((codePoint & 0xFFFE) === 0xFFFE);
  info.isPrivateUse = (codePoint >= 0xE000 && codePoint <= 0xF8FF) ||
    (codePoint >= 0xF0000 && codePoint <= 0xFFFFD) ||
    (codePoint >= 0x100000 && codePoint <= 0x10FFFD);

  // Calculate UTF-8 bytes
  if (codePoint < 0x80) {
    info.utf8 = [codePoint];
  } else if (codePoint < 0x800) {
    info.utf8 = [
      0xC0 | (codePoint >> 6),
      0x80 | (codePoint & 0x3F)
    ];
  } else if (codePoint < 0x10000) {
    info.utf8 = [
      0xE0 | (codePoint >> 12),
      0x80 | ((codePoint >> 6) & 0x3F),
      0x80 | (codePoint & 0x3F)
    ];
  } else {
    info.utf8 = [
      0xF0 | (codePoint >> 18),
      0x80 | ((codePoint >> 12) & 0x3F),
      0x80 | ((codePoint >> 6) & 0x3F),
      0x80 | (codePoint & 0x3F)
    ];
  }

  // Calculate UTF-16 code units
  if (codePoint < 0x10000) {
    info.utf16 = [codePoint];
  } else {
    const cp = codePoint - 0x10000;
    info.utf16 = [
      0xD800 | (cp >> 10),
      0xDC00 | (cp & 0x3FF)
    ];
  }

  return info;
}