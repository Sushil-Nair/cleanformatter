export function getScriptInfo(codePoint: number) {
  // This is a simplified version. In a real implementation,
  // you would use a comprehensive database of script properties.
  const info: {
    name: string;
    code: string;
    direction: "ltr" | "rtl" | "ttb";
    age: string;
    samples: string[];
  } = {
    name: "Unknown",
    code: "Zzzz",
    direction: "ltr",
    age: "1.1",
    samples: [],
  };

  if (codePoint >= 0x0000 && codePoint <= 0x007f) {
    info.name = "Latin";
    info.code = "Latn";
    info.direction = "ltr";
    info.age = "1.1";
    info.samples = ["A", "B", "C"];
  } else if (codePoint >= 0x0600 && codePoint <= 0x06ff) {
    info.name = "Arabic";
    info.code = "Arab";
    info.direction = "rtl";
    info.age = "1.1";
    info.samples = ["ا", "ب", "ت"];
  } else if (codePoint >= 0x0900 && codePoint <= 0x097f) {
    info.name = "Devanagari";
    info.code = "Deva";
    info.direction = "ltr";
    info.age = "1.1";
    info.samples = ["अ", "आ", "इ"];
  }

  return info;
}
