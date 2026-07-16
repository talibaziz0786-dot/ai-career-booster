export interface DeepSeekResponse {
  provider: "deepseek";
  content: string;
}

export async function generateWithDeepSeek(
  prompt: string
): Promise<DeepSeekResponse> {

  throw new Error(
    "DeepSeek provider not configured yet."
  );

}