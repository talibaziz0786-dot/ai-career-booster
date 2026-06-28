import { GoogleGenAI }
from "@google/genai";

export async function askGemini(
  prompt
) {
  if (
    !process.env.GEMINI_API_KEY
  ) {
    throw new Error(
      "Gemini key missing"
    );
  }

  const ai = new GoogleGenAI({
    apiKey:
      process.env.GEMINI_API_KEY,
  });

  const response =
    await ai.models.generateContent({
      model:
        "gemini-2.5-flash",

      contents: prompt,
    });

  return response.text;
}