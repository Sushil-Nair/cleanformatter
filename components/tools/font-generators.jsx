"use client";

import { useState, useEffect } from "react";
import { Copy, Heart, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AdUnit from "../ad-unit";
import { MidSectionAd } from "../sections/ad-midsection";

export default function FontGenerator() {
  const [input, setInput] = useState("Your text here");
  const [favorites, setFavorites] = useState([]);

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
  ];

  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      color: "from-pink-500 to-purple-500",
    },
    { name: "Facebook", icon: Facebook, color: "from-blue-600 to-blue-700" },
    { name: "Twitter", icon: Twitter, color: "from-blue-400 to-blue-500" },
  ];

  const { toast } = useToast();

  // Character mappings (simplified for demo)
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
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorite-fonts");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const copyToClipboard = async (text, styleName) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${styleName} style copied to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const toggleFavorite = (styleName) => {
    const newFavorites = favorites.includes(styleName)
      ? favorites.filter((fav) => fav !== styleName)
      : [...favorites, styleName];

    setFavorites(newFavorites);
    localStorage.setItem("favorite-fonts", JSON.stringify(newFavorites));

    toast.success(
      favorites.includes(styleName)
        ? "Removed from favorites"
        : "Added to favorites"
    );
  };

  const copyForPlatform = (text, platform) => {
    copyToClipboard(text, platform);
    toast.success(`Text copied for ${platform}!`);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="p-6 border-b">
        <h2 className="text-3xl font-bold tracking-tight">
          Fancy Font Generator
        </h2>
        <p className="text-muted-foreground mt-2">
          Generate stylish text for social media posts and creative content.
        </p>
        <AdUnit slot="tool-header" format="horizontal" />
      </div>

      <div id="toolArea" className="p-6">
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

        {/* Platform Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold tracking-tight mb-4">
            Quick Copy for Platforms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {platforms.map((platform) => (
              <Button
                key={platform.name}
                variant="outline"
                onClick={() => copyForPlatform(input, platform.name)}
                className={`p-4 h-auto bg-gradient-to-r ${platform.color} text-white border-0 hover:opacity-90`}
              >
                <platform.icon className="w-5 h-5 mr-2" />
                Copy for {platform.name}
              </Button>
            ))}
          </div>
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
                <div
                  key={style.name}
                  className="text-muted-foreground rounded-lg p-4 border"
                >
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
                    <span className="text-xl break-all font-medium text-primary-foreground">
                      {convertedText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
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
        )}
      </div>
      <MidSectionAd />
    </div>
  );
}
