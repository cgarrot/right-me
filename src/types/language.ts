export const listLanguages = [
  "french",
  "english",
  "spanish",
  "german",
  "portuguese",
  "russian",
  "chinese",
] as const;

export type Language = (typeof listLanguages)[number];

export const langueToIso2: Record<Language, string> = {
  french: "fr",
  english: "en",
  spanish: "es",
  german: "de",
  portuguese: "pt",
  russian: "ru",
  chinese: "zh",
};
