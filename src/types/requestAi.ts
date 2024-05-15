import { FeatureAi } from "../prompt";

export interface RequestAiContent {
  instruction: string;
  text: string;
}

export interface TransitionRequestAiContent {
  action: "request-ai";
  text: string;
  feature: FeatureAi;
}
