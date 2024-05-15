import { AiModel } from "../prompt";
import { googleModels } from "../prompt/google/const";
import { RequestAiContent } from "../types/requestAi";
import { googleRequestAi } from "./google/api";

export async function requestAi(
  data: RequestAiContent,
  model: AiModel,
  apiKey: string
): Promise<string> {
  if (googleModels.includes(model)) {
    console.log(await googleRequestAi(data, model, apiKey));
    return (await googleRequestAi(data, model, apiKey)).candidates[0].content
      .parts[0].text;
  }
  return data.text;
}
