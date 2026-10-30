import {
  AIManager,
} from "./AIManager.js";

import {
  aiManager,
} from "./ai-engine.js";

import {
  OpenAIProvider,
} from "./providers/OpenAIProvider.js";

import {
  GeminiProvider,
} from "./providers/GeminiProvider.js";

import {
  OpenRouterProvider,
} from "./providers/OpenRouterProvider.js";

import ProviderHealth from "./ProviderHealth.js";

export {
  AIManager,
  aiManager,
  ProviderHealth,
  OpenAIProvider,
  GeminiProvider,
  OpenRouterProvider,
};

export type {
  AIProvider,
  AIProviderName,
  AIResponse,
  AIProviderAdapter,
  AIManagerResult,
} from "./types/provider.types.js";