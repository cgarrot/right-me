import { correctTextInstruction } from "./global/correct";
import { abvrToText } from "./global/options/abbreviation";
import { emojiHard, emojiSimple } from "./global/options/emoji";
import { rephraseTextInstruction } from "./global/rephrase";
import { GoogleModel, googleModels } from "./google/const";

export const aiModels = [googleModels] as const;

export type AiModel = GoogleModel;

export interface OptionsAi {
  abrv: boolean | null;
}

export const featuresAi = [
  "correctText",
  "rephraseText",
  "emojiSimple",
  "emojiHard",
] as const;

export type FeatureAi = (typeof featuresAi)[number];

export function featuresAiPrompt(
  feature: FeatureAi,
  options: OptionsAi
): string {
  switch (feature) {
    case "correctText":
      return correctTextInstruction + abvrToText(options.abrv);
    case "rephraseText":
      return rephraseTextInstruction;
    case "emojiSimple":
      return correctTextInstruction + emojiSimple;
    case "emojiHard":
      return emojiHard;
    default:
      return "Do nothing just return the same text.";
  }
}
