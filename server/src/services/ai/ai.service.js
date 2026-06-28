import OpenAI from "openai";

const client = new OpenAI({
  baseURL:
    "https://openrouter.ai/api/v1",

  apiKey:
    process.env.OPENROUTER_API_KEY,
});

export async function generateQuestion(
  category,
  difficulty
) {
  const completion =
    await client.chat.completions.create({
      model:
        "deepseek/deepseek-chat-v3",

      messages: [
        {
          role: "system",
          content:
            "You are an expert technical interviewer.",
        },

        {
          role: "user",
          content: `
Generate one ${difficulty}
${category}
interview question.
`,
        },
      ],
    });

  return completion.choices[0]
    .message.content;
}