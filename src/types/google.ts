export interface GoogleModelContentPart {
  text: string;
}

export interface GoogleModelContent {
  role: GoogleModelRoles;
  parts: GoogleModelContentPart[];
}

export interface GoogleGenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
  stopSequences: string[];
}

export interface GoogleSafetySetting {
  category: GoogleSafetyCategory;
  threshold: GoogleSafetyThreshold;
}

export interface GoogleRequestBody {
  contents: GoogleModelContent[];
  generationConfig: GoogleGenerationConfig;
  safetySettings: GoogleSafetySetting[];
}

export interface GoogleGeneratedTextCandidate {
  content: GoogleModelContent;
  finishReason: string;
  index: number;
  safetyRatings: GoogleSafetyRating[];
}

export interface GoogleSafetyRating {
  category: GoogleSafetyCategory;
  probability: string;
}

export interface GoogleUsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

export interface GoogleResponse {
  candidates: GoogleGeneratedTextCandidate[];
  usageMetadata: GoogleUsageMetadata;
}

export enum GoogleModelRoles {
  MODEL = "model",
  USER = "user",
}

export enum GoogleSafetyCategory {
  HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT",
  HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH",
  HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT",
  HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT",
}

export enum GoogleSafetyThreshold {
  BLOCK_NONE = "BLOCK_NONE",
  BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE",
  BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE",
  BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH",
}
