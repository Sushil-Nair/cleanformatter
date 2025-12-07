export const getSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // groups of non-alphanumerics -> hyphen
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens.toLowerCase().replace(/[^a-z0-9]+/g, "-");
