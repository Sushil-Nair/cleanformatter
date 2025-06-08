import { LoremIpsum } from 'lorem-ipsum';
import { debounce } from 'lodash';

export interface TextGeneratorOptions {
  type: 'lorem' | 'words' | 'sentences';
  language: 'english' | 'spanish' | 'arabic';
  wordsPerParagraph: number;
  format: 'plain' | 'html';
}

const defaultOptions: TextGeneratorOptions = {
  type: 'lorem',
  language: 'english',
  wordsPerParagraph: 100,
  format: 'plain'
};

// Language-specific word lists
const wordLists = {
  english: {
    words: ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'],
    sentences: [
      'The quick brown fox jumps over the lazy dog.',
      'A journey of a thousand miles begins with a single step.',
      'All that glitters is not gold.',
      'Actions speak louder than words.',
      'Beauty is in the eye of the beholder.'
    ]
  },
  spanish: {
    words: ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'ser', 'se', 'no', 'haber', 'por', 'con', 'su', 'para', 'como', 'estar', 'tener', 'le', 'lo'],
    sentences: [
      'El cielo es azul y las nubes son blancas.',
      'La vida es bella y hay que vivirla.',
      'Todo lo que brilla no es oro.',
      'Más vale tarde que nunca.',
      'En boca cerrada no entran moscas.'
    ]
  },
  arabic: {
    words: ['في', 'من', 'مع', 'عن', 'إلى', 'على', 'هذا', 'كان', 'كل', 'هو', 'هي', 'قال', 'كما', 'عند', 'لكن', 'حتى', 'إذا', 'بعد', 'قبل', 'منذ'],
    sentences: [
      'الحياة جميلة وتستحق أن تعاش.',
      'العلم نور والجهل ظلام.',
      'الوقت كالسيف إن لم تقطعه قطعك.',
      'خير الكلام ما قل ودل.',
      'من جد وجد ومن زرع حصد.'
    ]
  }
};

function generateLoremIpsum(options: TextGeneratorOptions): string {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: Math.max(4, Math.floor(options.wordsPerParagraph / 10)),
      min: Math.max(3, Math.floor(options.wordsPerParagraph / 20))
    }
  });

  const paragraphs = Math.ceil(options.wordsPerParagraph / 50); // Estimate number of paragraphs needed
  const text = lorem.generateParagraphs(paragraphs);

  return options.format === 'html' ? text.split('\n').map(p => `<p>${p}</p>`).join('\n') : text;
}

function generateRandomText(options: TextGeneratorOptions): string {
  const wordList = wordLists[options.language];
  let text = '';

  switch (options.type) {
    case 'words':
      text = Array.from({ length: options.wordsPerParagraph }, () => 
        wordList.words[Math.floor(Math.random() * wordList.words.length)]
      ).join(' ');
      break;
    
    case 'sentences':
      const sentencesNeeded = Math.ceil(options.wordsPerParagraph / 10); // Estimate sentences needed
      text = Array.from({ length: sentencesNeeded }, () => 
        wordList.sentences[Math.floor(Math.random() * wordList.sentences.length)]
      ).join(' ');
      break;
    
    default:
      const paragraphs = Math.ceil(options.wordsPerParagraph / 50); // Estimate paragraphs needed
      text = Array.from({ length: paragraphs }, () => {
        const sentences = Array.from(
          { length: Math.floor(Math.random() * 3) + 2 },
          () => wordList.sentences[Math.floor(Math.random() * wordList.sentences.length)]
        );
        return sentences.join(' ');
      }).join('\n\n');
  }

  return options.format === 'html' ? text.split('\n\n').map(p => `<p>${p}</p>`).join('\n') : text;
}

export function generateText(options: TextGeneratorOptions = defaultOptions): string {
  return options.type === 'lorem'
    ? generateLoremIpsum(options)
    : generateRandomText(options);
}

// Debounced version for real-time preview
export const generateTextDebounced = debounce(generateText, 300);