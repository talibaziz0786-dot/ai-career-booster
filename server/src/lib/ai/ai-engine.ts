import {
  AIManager,
} from "./AIManager.js";

import {
  OpenAIProvider,
} from "./providers/OpenAIProvider.js";

import {
  GeminiProvider,
} from "./providers/GeminiProvider.js";

import {
  OpenRouterProvider,
} from "./providers/OpenRouterProvider.js";

/**
 * Provider priority:
 *
 * 1. OpenAI
 * 2. Gemini
 * 3. OpenRouter
 *
 * AIManager automatically falls back
 * when a provider fails.
 */

const providers = [
  new OpenAIProvider(),
  new GeminiProvider(),
  new OpenRouterProvider(),
];

export const aiManager =
  new AIManager(
    providers
  );