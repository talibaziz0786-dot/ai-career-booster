import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export interface GeminiResponse {
  provider: "gemini";
  model: string;
  content: string;
}

export async function generateWithGemini(
  prompt: string,
  modelName:
    | "gemini-2.5-flash"
    | "gemini-2.5-pro"
): Promise<GeminiResponse> {

  const model =
    genAI.getGenerativeModel({
      model: modelName,
    });

  const result =
    await model.generateContent(prompt);

  const response =
    await result.response;

  return {
    provider: "gemini",
    model: modelName,
    content: response.text(),
  };
}