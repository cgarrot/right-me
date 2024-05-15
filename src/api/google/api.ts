import {
  GoogleModel,
  generateGoogleApiUrl,
  safetySettings,
} from "../../prompt/google/const";
import {
  GoogleRequestBody,
  GoogleResponse,
  GoogleModelRoles,
} from "../../types/google";
import { RequestAiContent } from "../../types/requestAi";
import { post } from "../basic";

export async function googleRequestAi(
  data: RequestAiContent,
  model: GoogleModel,
  apiKey: string
): Promise<GoogleResponse> {
  const result = (await post<GoogleRequestBody>(
    generateGoogleApiUrl(model, apiKey),
    requestAiContentToGoogleRequestBody(data)
  )) as unknown as GoogleResponse;
  return result;
}

function requestAiContentToGoogleRequestBody(
  data: RequestAiContent
): GoogleRequestBody {
  return {
    contents: [
      {
        role: GoogleModelRoles.MODEL,
        parts: [
          {
            text: data.instruction,
          },
        ],
      },
      {
        role: GoogleModelRoles.USER,
        parts: [
          {
            text: data.text,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
      stopSequences: [],
    },
    safetySettings,
  };
}
