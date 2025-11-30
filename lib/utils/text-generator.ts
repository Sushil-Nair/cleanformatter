/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoremIpsum } from "lorem-ipsum";
import { debounce } from "lodash";

// -----------------------------
// LANGUAGE PACKS
// -----------------------------
export const wordLists = {
  english: {
    words: [
      "the",
      "be",
      "to",
      "of",
      "and",
      "a",
      "in",
      "that",
      "have",
      "I",
      "it",
      "for",
      "not",
      "on",
      "with",
      "he",
      "as",
      "you",
      "do",
      "at",
    ],
    sentences: [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "Actions speak louder than words.",
      "Knowledge is power when applied with consistency.",
      "Success comes to those who stay focused and persistent.",
    ],
  },

  spanish: {
    words: [
      "el",
      "la",
      "de",
      "que",
      "y",
      "en",
      "un",
      "ser",
      "se",
      "no",
      "haber",
      "por",
      "con",
      "su",
      "para",
      "como",
      "estar",
      "tener",
      "le",
      "lo",
    ],
    sentences: [
      "El cielo es azul y las nubes son blancas.",
      "La vida es bella y debemos apreciarla cada día.",
      "Más vale tarde que nunca.",
      "El conocimiento abre puertas al futuro.",
      "Cada paso cuenta en el camino hacia el éxito.",
    ],
  },

  hindi: {
    words: [
      "यह",
      "वह",
      "और",
      "लेकिन",
      "क्योंकि",
      "में",
      "से",
      "पर",
      "को",
      "भी",
      "जो",
      "था",
      "है",
      "हो",
      "कर",
      "सकते",
      "हम",
      "आप",
      "वे",
      "सब",
    ],
    sentences: [
      "जीवन एक यात्रा है जिसे साहस के साथ जीना चाहिए।",
      "सफलता उन्हीं को मिलती है जो कभी हार नहीं मानते।",
      "ज्ञान सबसे बड़ी शक्ति है।",
      "समय का सही उपयोग महान परिणाम देता है।",
      "हमारे विचार हमारे जीवन को आकार देते हैं।",
    ],
  },

  chinese: {
    words: [
      "我",
      "你",
      "他",
      "她",
      "它",
      "我们",
      "他们",
      "是",
      "有",
      "在",
      "这",
      "那",
      "和",
      "不",
      "想",
      "会",
      "能",
      "上",
      "下",
      "中",
    ],
    sentences: [
      "生活是一段不断成长的旅程。",
      "坚持是通往成功的关键。",
      "知识让人更强大。",
      "时间是最宝贵的财富。",
      "每一天都是新的开始。",
    ],
  },

  arabic: {
    words: [
      "في",
      "من",
      "مع",
      "عن",
      "إلى",
      "على",
      "هذا",
      "كان",
      "كل",
      "هو",
      "هي",
      "قال",
      "كما",
      "عند",
      "لكن",
      "حتى",
      "إذا",
      "بعد",
      "قبل",
      "منذ",
    ],
    sentences: [
      "الحياة جميلة وتستحق أن تعاش.",
      "العلم نور يهدي الطريق.",
      "الصبر مفتاح الفرج.",
      "الوقت كالسيف إن لم تقطعه قطعك.",
      "البداية القوية تصنع النهاية الأفضل.",
    ],
  },

  portuguese: {
    words: [
      "o",
      "a",
      "de",
      "que",
      "e",
      "em",
      "um",
      "ser",
      "se",
      "não",
      "por",
      "com",
      "seu",
      "para",
      "como",
      "estar",
      "ter",
      "lhe",
      "nos",
      "eles",
    ],
    sentences: [
      "A vida é cheia de oportunidades.",
      "O conhecimento transforma realidades.",
      "A persistência leva ao sucesso.",
      "Cada dia é uma nova chance para melhorar.",
      "As palavras têm poder quando usadas com sabedoria.",
    ],
  },

  bengali: {
    words: [
      "আমি",
      "তুমি",
      "সে",
      "এটা",
      "ওটা",
      "আমরা",
      "তারা",
      "হয়",
      "আছে",
      "এই",
      "তো",
      "আর",
      "কিন্তু",
      "যদি",
      "কথা",
      "তাকে",
      "তার",
      "সাথে",
      "হবে",
      "সব",
    ],
    sentences: [
      "জীবন এক সুন্দর যাত্রা যা অনুভব করতে হয়।",
      "যারা কঠোর পরিশ্রম করে তারা সফল হয়।",
      "সময়কে সঠিকভাবে ব্যবহার করা খুব গুরুত্বপূর্ণ।",
      "জ্ঞান মানুষের শক্তি বাড়ায়।",
      "প্রতিটি দিন নতুন কিছু শেখার সুযোগ।",
    ],
  },

  french: {
    words: [
      "le",
      "la",
      "et",
      "de",
      "un",
      "en",
      "je",
      "vous",
      "il",
      "elle",
      "nous",
      "vous",
      "dans",
      "pour",
      "avec",
      "sur",
      "pas",
      "est",
      "qui",
      "tout",
    ],
    sentences: [
      "La vie est pleine de possibilités.",
      "La connaissance ouvre les portes du futur.",
      "Chaque jour est une nouvelle opportunité.",
      "La persévérance mène toujours au succès.",
      "Les mots peuvent changer le monde.",
    ],
  },

  russian: {
    words: [
      "и",
      "в",
      "не",
      "он",
      "она",
      "мы",
      "вы",
      "это",
      "как",
      "что",
      "с",
      "по",
      "за",
      "у",
      "к",
      "от",
      "до",
      "о",
      "так",
      "же",
    ],
    sentences: [
      "Жизнь — это путь, полный открытий.",
      "Успех приходит к тем, кто не сдаётся.",
      "Знание делает человека сильнее.",
      "Каждый день — новый шанс начать заново.",
      "Терпение и труд всё перетрут.",
    ],
  },

  japanese: {
    words: [
      "私",
      "あなた",
      "彼",
      "彼女",
      "これ",
      "それ",
      "あれ",
      "です",
      "ある",
      "いる",
      "行く",
      "来る",
      "見る",
      "作る",
      "時間",
      "今日",
      "明日",
      "人",
      "大きい",
      "小さい",
    ],
    sentences: [
      "人生は学びと成長の旅です。",
      "努力は必ず報われる。",
      "知識は力であり未来を変える。",
      "毎日が新しいチャンスです。",
      "小さな一歩が大きな成功につながる。",
    ],
  },
};

export type SupportedLanguage = keyof typeof wordLists;

// -----------------------------
// OPTIONS
// -----------------------------
export interface TextGeneratorOptions {
  type: "lorem" | "words" | "sentences";
  language: SupportedLanguage;
  wordsPerParagraph: number;
  format: "plain" | "html";
}

const defaultOptions: TextGeneratorOptions = {
  type: "words",
  language: "english",
  wordsPerParagraph: 100,
  format: "plain",
};

// -----------------------------
// LOW-LEVEL HELPERS
// -----------------------------
function generateRandomWords(lang: SupportedLanguage, count: number): string {
  const list = wordLists[lang].words;
  return Array.from({ length: count }, () => {
    return list[Math.floor(Math.random() * list.length)];
  }).join(" ");
}

function generateRandomSentences(
  lang: SupportedLanguage,
  count: number
): string {
  const list = wordLists[lang].sentences;
  return Array.from({ length: count }, () => {
    return list[Math.floor(Math.random() * list.length)];
  }).join(" ");
}

// -----------------------------
// RANDOM GENERATION MODES
// -----------------------------
function generateRandomText(options: TextGeneratorOptions): string {
  const lang = options.language;

  switch (options.type) {
    case "words": {
      const text = generateRandomWords(lang, options.wordsPerParagraph);
      return options.format === "html" ? `<p>${text}</p>` : text;
    }

    case "sentences": {
      const estSentences = Math.max(
        1,
        Math.floor(options.wordsPerParagraph / 10)
      );
      const text = generateRandomSentences(lang, estSentences);
      return options.format === "html" ? `<p>${text}</p>` : text;
    }

    default: {
      // paragraph-style: several sentences per paragraph
      const paragraphsCount = Math.max(
        1,
        Math.ceil(options.wordsPerParagraph / 50)
      );

      const paragraphs: string[] = [];
      for (let i = 0; i < paragraphsCount; i++) {
        const estSentences = Math.floor(Math.random() * 3) + 2;
        const paragraph = generateRandomSentences(lang, estSentences);
        paragraphs.push(paragraph);
      }

      if (options.format === "html") {
        return paragraphs.map((p) => `<p>${p}</p>`).join("\n");
      }

      return paragraphs.join("\n\n");
    }
  }
}

// Exposed helper if you want a single paragraph elsewhere
export function generateLanguageParagraph(
  type: TextGeneratorOptions["type"],
  lang: SupportedLanguage,
  words: number
): string {
  if (type === "words") {
    return generateRandomWords(lang, words);
  }
  const estSentences = Math.max(1, Math.floor(words / 10));
  return generateRandomSentences(lang, estSentences);
}

// -----------------------------
// LOREM MODE
// -----------------------------
function generateLoremIpsum(options: TextGeneratorOptions): string {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: { max: 8, min: 4 },
    wordsPerSentence: {
      max: Math.max(4, Math.floor(options.wordsPerParagraph / 10)),
      min: Math.max(3, Math.floor(options.wordsPerParagraph / 20)),
    },
  });

  const text = lorem.generateParagraphs(1);

  return options.format === "html"
    ? `<p>${text.replace(/\n/g, "</p><p>")}</p>`
    : text;
}

// -----------------------------
// MAIN GENERATOR
// -----------------------------
export function generateText(
  options: TextGeneratorOptions = defaultOptions
): string {
  if (options.type === "lorem") {
    return generateLoremIpsum(options);
  }
  return generateRandomText(options);
}

// Debounced version for tool preview
export const generateTextDebounced = debounce(generateText, 250);
