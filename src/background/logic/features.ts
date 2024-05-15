import { requestAi } from "../../api";
import { AiModel, FeatureAi, OptionsAi, featuresAiPrompt } from "../../prompt";

export async function selectFeature(
  featureAi: FeatureAi,
  options: OptionsAi,
  text: string,
  model: AiModel,
  apiKey: string
): Promise<string> {
  console.log(featureAi, options);
  return await requestAi(
    { instruction: featuresAiPrompt(featureAi, options), text },
    model,
    apiKey
  );
}
