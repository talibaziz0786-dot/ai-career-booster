export interface LocalResponse {
  provider: "local";
  content: string;
}

export async function generateWithLocalAI(
  prompt: string
): Promise<LocalResponse> {

  throw new Error(
    "Local AI provider not configured yet."
  );

}