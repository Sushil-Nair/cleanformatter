import { debounce } from 'lodash';

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  similar: boolean;
  ambiguous: boolean;
  memorable: boolean;
  pattern: string;
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
  pattern: ''
};

const charSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  similar: 'iIlL1oO0',
  ambiguous: '{}[]()/\'"`~,;:.<>',
  vowels: 'aeiouAEIOU',
  consonants: 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'
};

function getCharacterPool(options: PasswordOptions): string {
  let pool = '';

  if (options.uppercase) pool += charSets.uppercase;
  if (options.lowercase) pool += charSets.lowercase;
  if (options.numbers) pool += charSets.numbers;
  if (options.symbols) pool += charSets.symbols;

  if (!options.similar) {
    pool = pool.split('').filter(char => !charSets.similar.includes(char)).join('');
  }

  if (!options.ambiguous) {
    pool = pool.split('').filter(char => !charSets.ambiguous.includes(char)).join('');
  }

  return pool;
}

function generateMemorablePassword(length: number): string {
  const syllables = [
    'ba', 'be', 'bi', 'bo', 'bu', 'ca', 'ce', 'ci', 'co', 'cu',
    'da', 'de', 'di', 'do', 'du', 'fa', 'fe', 'fi', 'fo', 'fu',
    'ga', 'ge', 'gi', 'go', 'gu', 'ha', 'he', 'hi', 'ho', 'hu'
  ];

  let password = '';
  while (password.length < length) {
    const syllable = syllables[Math.floor(Math.random() * syllables.length)];
    if (Math.random() > 0.5) {
      password += syllable.charAt(0).toUpperCase() + syllable.slice(1);
    } else {
      password += syllable;
    }
    if (Math.random() > 0.7) {
      password += Math.floor(Math.random() * 10);
    }
  }

  return password.slice(0, length);
}

function generatePatternPassword(pattern: string, options: PasswordOptions): string {
  const pool = getCharacterPool(options);
  let password = '';

  for (const char of pattern) {
    switch (char) {
      case 'A':
        password += charSets.uppercase[Math.floor(Math.random() * charSets.uppercase.length)];
        break;
      case 'a':
        password += charSets.lowercase[Math.floor(Math.random() * charSets.lowercase.length)];
        break;
      case '0':
        password += charSets.numbers[Math.floor(Math.random() * charSets.numbers.length)];
        break;
      case '!':
        password += charSets.symbols[Math.floor(Math.random() * charSets.symbols.length)];
        break;
      case 'x':
        password += pool[Math.floor(Math.random() * pool.length)];
        break;
      default:
        password += char;
    }
  }

  return password;
}

export function generatePassword(options: PasswordOptions = defaultOptions): string {
  if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
    throw new Error('At least one character type must be selected');
  }

  if (options.pattern) {
    return generatePatternPassword(options.pattern, options);
  }

  if (options.memorable) {
    return generateMemorablePassword(options.length);
  }

  const pool = getCharacterPool(options);
  if (!pool) {
    throw new Error('No characters available with current options');
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }

  // Ensure at least one character from each selected type
  const types: Array<keyof typeof charSets> = [];
  if (options.uppercase) types.push('uppercase');
  if (options.lowercase) types.push('lowercase');
  if (options.numbers) types.push('numbers');
  if (options.symbols) types.push('symbols');

  for (const type of types) {
    if (!password.split('').some(char => charSets[type].includes(char))) {
      const pos = Math.floor(Math.random() * password.length);
      const char = charSets[type][Math.floor(Math.random() * charSets[type].length)];
      password = password.slice(0, pos) + char + password.slice(pos + 1);
    }
  }

  return password;
}

export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;

  let strength = 0;
  const length = password.length;

  // Length contribution (up to 40 points)
  strength += Math.min(length * 2, 40);

  // Character type contribution (up to 40 points)
  if (/[A-Z]/.test(password)) strength += 10;
  if (/[a-z]/.test(password)) strength += 10;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;

  // Complexity contribution (up to 20 points)
  const uniqueChars = new Set(password).size;
  strength += Math.min((uniqueChars / length) * 20, 20);

  return Math.min(strength, 100);
}

// Debounced version for real-time preview
export const generatePasswordDebounced = debounce(generatePassword, 300);