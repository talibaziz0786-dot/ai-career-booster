import OpenAI from "openai";

export async function askQwen(
  prompt
) {
  if (
    !process.env.OPENROUTER_API_KEY
  ) {
    throw new Error(
      "OpenRouter key missing"
    );
  }

  const client = new OpenAI({
    baseURL:
      "https://openrouter.ai/api/v1",

    apiKey:
      process.env.OPENROUTER_API_KEY,
  });

  const completion =
    await client.chat.completions.create({
      model: "qwen/qwen3",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return completion.choices[0]
    .message.content;
}