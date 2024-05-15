import { googleModelsList } from "../prompt/google/const";

export const listPlatforms = ["google"] as const;

export type Platform = (typeof listPlatforms)[number];

export const platformModels: Record<Platform, Record<string, string>> = {
  google: googleModelsList,
  // openai: {},
};

export const apiKeyUrl = {
  google: "https://aistudio.google.com/app/apikey",
  // openai: "https://platform.openai.com/account/api-keys",
};
