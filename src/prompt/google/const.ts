import {
  GoogleSafetyCategory,
  GoogleSafetySetting,
  GoogleSafetyThreshold,
} from "../../types/google";

export const googleModels = [
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
  "gemini-1.5-pro",
  "gemini-1.0-pro",
  "gemini-pro",
  "gemini-1.0-pro-vision",
] as const;

export type GoogleModel = (typeof googleModels)[number];

export const googleModelsList: Record<GoogleModel, string> = {
  "gemini-1.5-flash-latest": "Gemini 1.5 Flash (recommended)",
  "gemini-1.5-pro-latest": "Gemini 1.5 Pro (latest)",
  "gemini-1.5-pro": "Gemini 1.5 Pro",
  "gemini-1.0-pro": "Gemini 1.0 Pro",
  "gemini-pro": "Gemini Pro",
  "gemini-1.0-pro-vision": "Gemini 1.0 Pro Vision",
};
export const generateGoogleApiUrl = (model: string, apiKey: string): string => {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
};

export const safetySettings: GoogleSafetySetting[] = [
  {
    category: GoogleSafetyCategory.HARM_CATEGORY_HARASSMENT,
    threshold: GoogleSafetyThreshold.BLOCK_NONE,
  },
  {
    category: GoogleSafetyCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: GoogleSafetyThreshold.BLOCK_NONE,
  },
  {
    category: GoogleSafetyCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: GoogleSafetyThreshold.BLOCK_NONE,
  },
  {
    category: GoogleSafetyCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: GoogleSafetyThreshold.BLOCK_NONE,
  },
];
