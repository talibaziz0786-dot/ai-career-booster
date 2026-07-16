export interface QwenResponse {
  provider: "qwen";
  content: string;
}

export async function generateWithQwen(
  prompt: string
): Promise<QwenResponse> {

  throw new Error(
    "Qwen provider not configured yet."
  );

}