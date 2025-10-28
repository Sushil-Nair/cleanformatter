"use client";

import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AdUnit from "../ad-unit";

export default function FontGenerator() {
  const [input, setInput] = useState("Your text here");
  // const [favorites, setFavorites] = useState([]);

  const fontStyles = [
    {
      name: "Bold",
      convert: (text) =>
        text
          .split("")
          .map((char) => boldChars[char] || char)
          .join(""),
    },
    {
      name: "Italic",
      convert: (text) =>
        text
          .split("")
          .map((char) => italicChars[char] || char)
          .join(""),
    },
    {
      name: "Bold Italic",
      convert: (text) =>
        text
          .split("")
          .map((char) => boldItalicChars[char] || char)
          .join(""),
    },
    {
      name: "Script",
      convert: (text) =>
        text
          .split("")
          .map((char) => scriptChars[char] || char)
          .join(""),
    },
    {
      name: "Double Struck",
      convert: (text) =>
        text
          .split("")
          .map((char) => doubleStruckChars[char] || char)
          .join(""),
    },
    {
      name: "Monospace",
      convert: (text) =>
        text
          .split("")
          .map((char) => monospaceChars[char] || char)
          .join(""),
    },
    {
      name: "Sans Serif",
      convert: (text) =>
        text
          .split("")
          .map((char) => sansSerifChars[char] || char)
          .join(""),
    },
    {
      name: "Fraktur",
      convert: (text) =>
        text
          .split("")
          .map((char) => frakturChars[char] || char)
          .join(""),
    },
    {
      name: "Circled",
      convert: (text) =>
        text
          .split("")
          .map((char) => circledChars[char] || char)
          .join(""),
    },
    {
      name: "Squared",
      convert: (text) =>
        text
          .split("")
          .map((char) => squaredChars[char] || char)
          .join(""),
    },
    {
      name: "Underlined",
      convert: (text) =>
        text
          .split("")
          .map((char) => char + "\u0332")
          .join(""),
    },
    {
      name: "Strikethrough",
      convert: (text) =>
        text
          .split("")
          .map((char) => char + "\u0336")
          .join(""),
    },
    {
      name: "Cursive",
      convert: (text) =>
        text
          .split("")
          .map((char) => cursive[char] || char)
          .join(""),
    },
    {
      name: "Small Caps",
      convert: (text) =>
        text
          .split("")
          .map((char) => smallCapsChars[char] || char)
          .join(""),
    },
    {
      name: "Upside Down",
      convert: (text) =>
        text
          .split("")
          .map((char) => upsideDownMap[char] || char)
          .join(""),
    },
    {
      name: "Reversed Text",
      convert: (text) => text.split("").reverse().join(""),
    },
    {
      name: "Zalgo Text",
      convert: (text) => zalgoConvert(text),
    },
  ];

  const { toast } = useToast();

  const boldChars = {
    A: "𝐀",
    B: "𝐁",
    C: "𝐂",
    D: "𝐃",
    E: "𝐄",
    F: "𝐅",
    G: "𝐆",
    H: "𝐇",
    I: "𝐈",
    J: "𝐉",
    K: "𝐊",
    L: "𝐋",
    M: "𝐌",
    N: "𝐍",
    O: "𝐎",
    P: "𝐏",
    Q: "𝐐",
    R: "𝐑",
    S: "𝐒",
    T: "𝐓",
    U: "𝐔",
    V: "𝐕",
    W: "𝐖",
    X: "𝐗",
    Y: "𝐘",
    Z: "𝐙",
    a: "𝐚",
    b: "𝐛",
    c: "𝐜",
    d: "𝐝",
    e: "𝐞",
    f: "𝐟",
    g: "𝐠",
    h: "𝐡",
    i: "𝐢",
    j: "𝐣",
    k: "𝐤",
    l: "𝐥",
    m: "𝐦",
    n: "𝐧",
    o: "𝐨",
    p: "𝐩",
    q: "𝐪",
    r: "𝐫",
    s: "𝐬",
    t: "𝐭",
    u: "𝐮",
    v: "𝐯",
    w: "𝐰",
    x: "𝐱",
    y: "𝐲",
    z: "𝐳",
  };

  const italicChars = {
    A: "𝐴",
    B: "𝐵",
    C: "𝐶",
    D: "𝐷",
    E: "𝐸",
    F: "𝐹",
    G: "𝐺",
    H: "𝐻",
    I: "𝐼",
    J: "𝐽",
    K: "𝐾",
    L: "𝐿",
    M: "𝑀",
    N: "𝑁",
    O: "𝑂",
    P: "𝑃",
    Q: "𝑄",
    R: "𝑅",
    S: "𝑆",
    T: "𝑇",
    U: "𝑈",
    V: "𝑉",
    W: "𝑊",
    X: "𝑋",
    Y: "𝑌",
    Z: "𝑍",
    a: "𝑎",
    b: "𝑏",
    c: "𝑐",
    d: "𝑑",
    e: "𝑒",
    f: "𝑓",
    g: "𝑔",
    h: "ℎ",
    i: "𝑖",
    j: "𝑗",
    k: "𝑘",
    l: "𝑙",
    m: "𝑚",
    n: "𝑛",
    o: "𝑜",
    p: "𝑝",
    q: "𝑞",
    r: "𝑟",
    s: "𝑠",
    t: "𝑡",
    u: "𝑢",
    v: "𝑣",
    w: "𝑤",
    x: "𝑥",
    y: "𝑦",
    z: "𝑧",
  };

  const boldItalicChars = {
    A: "𝑨",
    B: "𝑩",
    C: "𝑪",
    D: "𝑫",
    E: "𝑬",
    F: "𝑭",
    G: "𝑮",
    H: "𝑯",
    I: "𝑰",
    J: "𝑱",
    K: "𝑲",
    L: "𝑳",
    M: "𝑴",
    N: "𝑵",
    O: "𝑶",
    P: "𝑷",
    Q: "𝑸",
    R: "𝑹",
    S: "𝑺",
    T: "𝑻",
    U: "𝑼",
    V: "𝑽",
    W: "𝑾",
    X: "𝑿",
    Y: "𝒀",
    Z: "𝒁",
    a: "𝒂",
    b: "𝒃",
    c: "𝒄",
    d: "𝒅",
    e: "𝒆",
    f: "𝒇",
    g: "𝒈",
    h: "𝒉",
    i: "𝒊",
    j: "𝒋",
    k: "𝒌",
    l: "𝒍",
    m: "𝒎",
    n: "𝒏",
    o: "𝒐",
    p: "𝒑",
    q: "𝒒",
    r: "𝒓",
    s: "𝒔",
    t: "𝒕",
    u: "𝒖",
    v: "𝒗",
    w: "𝒘",
    x: "𝒙",
    y: "𝒚",
    z: "𝒛",
  };

  const scriptChars = {
    A: "𝒜",
    B: "𝐵",
    C: "𝒞",
    D: "𝒟",
    E: "𝐸",
    F: "𝐹",
    G: "𝒢",
    H: "𝐻",
    I: "𝐼",
    J: "𝒥",
    K: "𝒦",
    L: "𝐿",
    M: "𝑀",
    N: "𝒩",
    O: "𝒪",
    P: "𝒫",
    Q: "𝒬",
    R: "𝑅",
    S: "𝒮",
    T: "𝒯",
    U: "𝒰",
    V: "𝒱",
    W: "𝒲",
    X: "𝒳",
    Y: "𝒴",
    Z: "𝒵",
    a: "𝒶",
    b: "𝒷",
    c: "𝒸",
    d: "𝒹",
    e: "𝑒",
    f: "𝒻",
    g: "𝑔",
    h: "𝒽",
    i: "𝒾",
    j: "𝒿",
    k: "𝓀",
    l: "𝓁",
    m: "𝓂",
    n: "𝓃",
    o: "𝑜",
    p: "𝓅",
    q: "𝓆",
    r: "𝓇",
    s: "𝓈",
    t: "𝓉",
    u: "𝓊",
    v: "𝓋",
    w: "𝓌",
    x: "𝓍",
    y: "𝓎",
    z: "𝓏",
  };

  const doubleStruckChars = {
    A: "𝔸",
    B: "𝔹",
    C: "ℂ",
    D: "𝔻",
    E: "𝔼",
    F: "𝔽",
    G: "𝔾",
    H: "ℍ",
    I: "𝕀",
    J: "𝕁",
    K: "𝕂",
    L: "𝕃",
    M: "𝕄",
    N: "ℕ",
    O: "𝕆",
    P: "ℙ",
    Q: "ℚ",
    R: "ℝ",
    S: "𝕊",
    T: "𝕋",
    U: "𝕌",
    V: "𝕍",
    W: "𝕎",
    X: "𝕏",
    Y: "𝕐",
    Z: "ℤ",
    a: "𝕒",
    b: "𝕓",
    c: "𝕔",
    d: "𝕕",
    e: "𝕖",
    f: "𝕗",
    g: "𝕘",
    h: "𝕙",
    i: "𝕚",
    j: "𝕛",
    k: "𝕜",
    l: "𝕝",
    m: "𝕞",
    n: "𝕟",
    o: "𝕠",
    p: "𝕡",
    q: "𝕢",
    r: "𝕣",
    s: "𝕤",
    t: "𝕥",
    u: "𝕦",
    v: "𝕧",
    w: "𝕨",
    x: "𝕩",
    y: "𝕪",
    z: "𝕫",
  };

  const monospaceChars = {
    A: "𝙰",
    B: "𝙱",
    C: "𝙲",
    D: "𝙳",
    E: "𝙴",
    F: "𝙵",
    G: "𝙶",
    H: "𝙷",
    I: "𝙸",
    J: "𝙹",
    K: "𝙺",
    L: "𝙻",
    M: "𝙼",
    N: "𝙽",
    O: "𝙾",
    P: "𝙿",
    Q: "𝚀",
    R: "𝚁",
    S: "𝚂",
    T: "𝚃",
    U: "𝚄",
    V: "𝚅",
    W: "𝚆",
    X: "𝚇",
    Y: "𝚈",
    Z: "𝚉",
    a: "𝚊",
    b: "𝚋",
    c: "𝚌",
    d: "𝚍",
    e: "𝚎",
    f: "𝚏",
    g: "𝚐",
    h: "𝚑",
    i: "𝚒",
    j: "𝚓",
    k: "𝚔",
    l: "𝚕",
    m: "𝚖",
    n: "𝚗",
    o: "𝚘",
    p: "𝚙",
    q: "𝚚",
    r: "𝚛",
    s: "𝚜",
    t: "𝚝",
    u: "𝚞",
    v: "𝚟",
    w: "𝚠",
    x: "𝚡",
    y: "𝚢",
    z: "𝚣",
  };

  const sansSerifChars = {
    A: "𝖠",
    B: "𝖡",
    C: "𝖢",
    D: "𝖣",
    E: "𝖤",
    F: "𝖥",
    G: "𝖦",
    H: "𝖧",
    I: "𝖨",
    J: "𝖩",
    K: "𝖪",
    L: "𝖫",
    M: "𝖬",
    N: "𝖭",
    O: "𝖮",
    P: "𝖯",
    Q: "𝖰",
    R: "𝖱",
    S: "𝖲",
    T: "𝖳",
    U: "𝖴",
    V: "𝖵",
    W: "𝖶",
    X: "𝖷",
    Y: "𝖸",
    Z: "𝖹",
    a: "𝖺",
    b: "𝖻",
    c: "𝖼",
    d: "𝖽",
    e: "𝖾",
    f: "𝖿",
    g: "𝗀",
    h: "𝗁",
    i: "𝗂",
    j: "𝗃",
    k: "𝗄",
    l: "𝗅",
    m: "𝗆",
    n: "𝗇",
    o: "𝗈",
    p: "𝗉",
    q: "𝗊",
    r: "𝗋",
    s: "𝗌",
    t: "𝗍",
    u: "𝗎",
    v: "𝗏",
    w: "𝗐",
    x: "𝗑",
    y: "𝗒",
    z: "𝗓",
  };

  const frakturChars = {
    A: "𝔄",
    B: "𝔅",
    C: "ℭ",
    D: "𝔇",
    E: "𝔈",
    F: "𝔉",
    G: "𝔊",
    H: "ℌ",
    I: "ℑ",
    J: "𝔍",
    K: "𝔎",
    L: "𝔏",
    M: "𝔐",
    N: "𝔑",
    O: "𝔒",
    P: "𝔓",
    Q: "𝔔",
    R: "ℜ",
    S: "𝔖",
    T: "𝔗",
    U: "𝔘",
    V: "𝔙",
    W: "𝔚",
    X: "𝔛",
    Y: "𝔜",
    Z: "ℨ",
    a: "𝔞",
    b: "𝔟",
    c: "𝔠",
    d: "𝔡",
    e: "𝔢",
    f: "𝔣",
    g: "𝔤",
    h: "𝔥",
    i: "𝔦",
    j: "𝔧",
    k: "𝔨",
    l: "𝔩",
    m: "𝔪",
    n: "𝔫",
    o: "𝔬",
    p: "𝔭",
    q: "𝔮",
    r: "𝔯",
    s: "𝔰",
    t: "𝔱",
    u: "𝔲",
    v: "𝔳",
    w: "𝔴",
    x: "𝔵",
    y: "𝔶",
    z: "𝔷",
  };

  const circledChars = {
    A: "Ⓐ",
    B: "Ⓑ",
    C: "Ⓒ",
    D: "Ⓓ",
    E: "Ⓔ",
    F: "Ⓕ",
    G: "Ⓖ",
    H: "Ⓗ",
    I: "Ⓘ",
    J: "Ⓙ",
    K: "Ⓚ",
    L: "Ⓛ",
    M: "Ⓜ",
    N: "Ⓝ",
    O: "Ⓞ",
    P: "Ⓟ",
    Q: "Ⓠ",
    R: "Ⓡ",
    S: "Ⓢ",
    T: "Ⓣ",
    U: "Ⓤ",
    V: "Ⓥ",
    W: "Ⓦ",
    X: "Ⓧ",
    Y: "Ⓨ",
    Z: "Ⓩ",
    a: "ⓐ",
    b: "ⓑ",
    c: "ⓒ",
    d: "ⓓ",
    e: "ⓔ",
    f: "ⓕ",
    g: "ⓖ",
    h: "ⓗ",
    i: "ⓘ",
    j: "ⓙ",
    k: "ⓚ",
    l: "ⓛ",
    m: "ⓜ",
    n: "ⓝ",
    o: "ⓞ",
    p: "ⓟ",
    q: "ⓠ",
    r: "ⓡ",
    s: "ⓢ",
    t: "ⓣ",
    u: "ⓤ",
    v: "ⓥ",
    w: "ⓦ",
    x: "ⓧ",
    y: "ⓨ",
    z: "ⓩ",
  };

  const squaredChars = {
    A: "🄰",
    B: "🄱",
    C: "🄲",
    D: "🄳",
    E: "🄴",
    F: "🄵",
    G: "🄶",
    H: "🄷",
    I: "🄸",
    J: "🄹",
    K: "🄺",
    L: "🄻",
    M: "🄼",
    N: "🄽",
    O: "🄾",
    P: "🄿",
    Q: "🅀",
    R: "🅁",
    S: "🅂",
    T: "🅃",
    U: "🅄",
    V: "🅅",
    W: "🅆",
    X: "🅇",
    Y: "🅈",
    Z: "🅉",
    a: "🄰",
    b: "🄱",
    c: "🄲",
    d: "🄳",
    e: "🄴",
    f: "🄵",
    g: "🄶",
    h: "🄷",
    i: "🄸",
    j: "🄹",
    k: "🄺",
    l: "🄻",
    m: "🄼",
    n: "🄽",
    o: "🄾",
    p: "🄿",
    q: "🅀",
    r: "🅁",
    s: "🅂",
    t: "🅃",
    u: "🅄",
    v: "🅅",
    w: "🅆",
    x: "🅇",
    y: "🅈",
    z: "🅉",
  };

  const cursive = {
    A: "𝒜",
    B: "𝐵",
    C: "𝒞",
    D: "𝒟",
    E: "𝐸",
    F: "𝐹",
    G: "𝒢",
    H: "𝐻",
    I: "𝐼",
    J: "𝒥",
    K: "𝒦",
    L: "𝐿",
    M: "𝑀",
    N: "𝒩",
    O: "𝒪",
    P: "𝒫",
    Q: "𝒬",
    R: "𝑅",
    S: "𝒮",
    T: "𝒯",
    U: "𝒰",
    V: "𝒱",
    W: "𝒲",
    X: "𝒳",
    Y: "𝒴",
    Z: "𝒵",
    a: "𝒶",
    b: "𝒷",
    c: "𝒸",
    d: "𝒹",
    e: "𝑒",
    f: "𝒻",
    g: "𝑔",
    h: "𝒽",
    i: "𝒾",
    j: "𝒿",
    k: "𝓀",
    l: "𝓁",
    m: "𝓂",
    n: "𝓃",
    o: "𝑜",
    p: "𝓅",
    q: "𝓆",
    r: "𝓇",
    s: "𝓈",
    t: "𝓉",
    u: "𝓊",
    v: "𝓋",
    w: "𝓌",
    x: "𝓍",
    y: "𝓎",
    z: "𝓏",
  };

  const smallCapsChars = {
    A: "ᴀ",
    B: "ʙ",
    C: "ᴄ",
    D: "ᴅ",
    E: "ᴇ",
    F: "ꜰ",
    G: "ɢ",
    H: "ʜ",
    I: "ɪ",
    J: "ᴊ",
    K: "ᴋ",
    L: "ʟ",
    M: "ᴍ",
    N: "ɴ",
    O: "ᴏ",
    P: "ᴘ",
    Q: "ǫ",
    R: "ʀ",
    S: "s",
    T: "ᴛ",
    U: "ᴜ",
    V: "ᴠ",
    W: "ᴡ",
    X: "x",
    Y: "ʏ",
    Z: "ᴢ",
  };

  const upsideDownMap = {
    A: "∀",
    B: "𐐒",
    C: "Ɔ",
    D: "ᗡ",
    E: "Ǝ",
    F: "Ⅎ",
    G: "⅁",
    H: "H",
    I: "I",
    J: "ſ",
    K: "ʞ",
    L: "˥",
    M: "W",
    N: "N",
    O: "O",
    P: "Ԁ",
    Q: "Ό",
    R: "ᴚ",
    S: "S",
    T: "⊥",
    U: "∩",
    V: "Λ",
    W: "M",
    X: "X",
    Y: "⅄",
    Z: "Z",

    a: "ɐ",
    b: "q",
    c: "ɔ",
    d: "p",
    e: "ǝ",
    f: "ɟ",
    g: "ƃ",
    h: "ɥ",
    i: "ᴉ",
    j: "ɾ",
    k: "ʞ",
    l: "l",
    m: "ɯ",
    n: "u",
    o: "o",
    p: "d",
    q: "b",
    r: "ɹ",
    s: "s",
    t: "ʇ",
    u: "n",
    v: "ʌ",
    w: "ʍ",
    x: "x",
    y: "ʎ",
    z: "z",

    0: "0",
    1: "Ɩ",
    2: "ᄅ",
    3: "Ɛ",
    4: "ㄣ",
    5: "ϛ",
    6: "9",
    7: "ㄥ",
    8: "8",
    9: "6",

    ",": "'",
    ".": "˙",
    "?": "¿",
    "!": "¡",
    '"': ",,",
    "'": ",",
    "(": ")",
    ")": "(",
    "[": "]",
    "]": " [",
    "{": "}",
    "}": "{",
    "<": ">",
    ">": "<",
    "&": "⅋",
    _: "‾",
  };

  const zalgoChars = {
    up: [
      "\u030d",
      "\u030e",
      "\u0304",
      "\u0305",
      "\u033f",
      "\u0311",
      "\u0306",
      "\u0310",
      "\u0352",
      "\u0357",
      "\u0351",
      "\u0307",
      "\u0308",
      "\u030a",
      "\u0342",
      "\u0343",
      "\u0344",
      "\u034a",
      "\u034b",
      "\u034c",
      "\u0303",
      "\u0302",
      "\u030c",
      "\u0350",
      "\u0300",
      "\u0301",
      "\u030b",
      "\u030f",
      "\u0312",
      "\u0313",
      "\u0314",
      "\u033d",
      "\u0309",
      "\u0363",
      "\u0364",
      "\u0365",
      "\u0366",
      "\u0367",
      "\u0368",
      "\u0369",
      "\u036a",
      "\u036b",
      "\u036c",
      "\u036d",
      "\u036e",
      "\u036f",
      "\u033e",
      "\u035b",
      "\u0346",
      "\u031a",
    ],
    down: [
      "\u0316",
      "\u0317",
      "\u0318",
      "\u0319",
      "\u031c",
      "\u031d",
      "\u031e",
      "\u031f",
      "\u0320",
      "\u0324",
      "\u0325",
      "\u0326",
      "\u0329",
      "\u032a",
      "\u032b",
      "\u032c",
      "\u032d",
      "\u032e",
      "\u032f",
      "\u0330",
      "\u0331",
      "\u0332",
      "\u0333",
      "\u0339",
      "\u033a",
      "\u033b",
      "\u033c",
      "\u0345",
      "\u0347",
      "\u0348",
      "\u0349",
      "\u034d",
      "\u034e",
      "\u0353",
      "\u0354",
      "\u0355",
      "\u0356",
      "\u0359",
      "\u035a",
      "\u0323",
    ],
    mid: [
      "\u0315",
      "\u031b",
      "\u0340",
      "\u0341",
      "\u0358",
      "\u0321",
      "\u0322",
      "\u0327",
      "\u0328",
      "\u0334",
      "\u0335",
      "\u0336",
      "\u034f",
      "\u035c",
      "\u035d",
      "\u035e",
      "\u035f",
      "\u0360",
      "\u0362",
      "\u0338",
      "\u0337",
      "\u0361",
      "\u0489",
    ],
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const zalgoConvert = (text, upCount = 2, midCount = 1, downCount = 2) => {
    return text
      .split("")
      .map((char) => {
        let newChar = char;
        for (let i = 0; i < upCount; i++) {
          newChar += zalgoChars.up[getRandomInt(zalgoChars.up.length)];
        }
        for (let i = 0; i < midCount; i++) {
          newChar += zalgoChars.mid[getRandomInt(zalgoChars.mid.length)];
        }
        for (let i = 0; i < downCount; i++) {
          newChar += zalgoChars.down[getRandomInt(zalgoChars.down.length)];
        }
        return newChar;
      })
      .join("");
  };

  // useEffect(() => {
  //   const savedFavorites = localStorage.getItem("favorite-fonts");
  //   if (savedFavorites) {
  //     setFavorites(JSON.parse(savedFavorites));
  //   }
  // }, []);

  const copyToClipboard = async (text, styleName) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${styleName} style copied to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  // const toggleFavorite = (styleName) => {
  //   const newFavorites = favorites.includes(styleName)
  //     ? favorites.filter((fav) => fav !== styleName)
  //     : [...favorites, styleName];

  //   setFavorites(newFavorites);
  //   localStorage.setItem("favorite-fonts", JSON.stringify(newFavorites));

  //   toast.success(
  //     favorites.includes(styleName)
  //       ? "Removed from favorites"
  //       : "Added to favorites"
  //   );
  // };

  // const copyForPlatform = (text, platform) => {
  //   copyToClipboard(text, platform);
  //   toast.success(`Text copied for ${platform}!`);
  // };

  return (
    <div className="container w-full max-w-6xl mx-auto px-4 py-8">
      <div className="p-6 border-b w-full">
        <h2 className="text-3xl font-bold tracking-tight">
          Fancy Font Generator
        </h2>
        <p className="text-muted-foreground mt-2">
          Generate stylish text for social media posts and creative content.
        </p>
        <AdUnit slot="9721370550" format="horizontal" />
      </div>

      <div id="toolArea" className="p-6 w-full">
        <div className="mb-8">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Input Text
          </label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to generate fancy fonts..."
            className="text-lg"
          />
        </div>

        {/* Font Styles */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight">
            Generated Styles
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {fontStyles.map((style) => {
              const convertedText = style.convert(input);

              return (
                <div key={style.name} className="rounded-lg p-4 border">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold tracking-tight">
                      {style.name}
                    </h4>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(convertedText, style.name)
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded border p-4 min-h-[60px] flex items-center">
                    <span className="text-xl break-all font-medium text-foreground">
                      {convertedText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Favorites Section */}
        {/* {favorites.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500 fill-current" />
              Your Favorites
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {fontStyles
                .filter((style) => favorites.includes(style.name))
                .map((style) => {
                  const convertedText = style.convert(input);

                  return (
                    <div
                      key={`fav-${style.name}`}
                      className="bg-red-50 rounded-lg p-4 border border-red-200"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900">
                          {style.name}
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(convertedText, style.name)
                          }
                          className="text-red-600 border-red-300 hover:bg-red-100"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="bg-white rounded border p-4">
                        <span className="text-xl break-all font-medium">
                          {convertedText}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
