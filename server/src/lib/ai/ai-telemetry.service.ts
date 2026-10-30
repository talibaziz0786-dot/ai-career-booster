import type {
  AIProviderName,
} from "./types/provider.types.js";

export interface AIProviderTelemetry {

  provider:
    AIProviderName;

  requests: number;

  successfulRequests: number;

  failedRequests: number;

  totalResponseTime: number;

  averageResponseTime: number;

  successRate: number;

  lastRequestAt?: Date;

  lastSuccessAt?: Date;

  lastFailureAt?: Date;
}

const telemetry =
  new Map<
    AIProviderName,
    AIProviderTelemetry
  >();

function getOrCreate(
  provider: AIProviderName
): AIProviderTelemetry {

  const existing =
    telemetry.get(provider);

  if (existing) {
    return existing;
  }

  const state: AIProviderTelemetry = {
    provider,

    requests: 0,

    successfulRequests: 0,

    failedRequests: 0,

    totalResponseTime: 0,

    averageResponseTime: 0,

    successRate: 100,
  };

  telemetry.set(
    provider,
    state
  );

  return state;
}

export function recordAIProviderSuccess(
  provider: AIProviderName,
  responseTime: number
): void {

  const state =
    getOrCreate(provider);

  state.requests += 1;

  state.successfulRequests += 1;

  state.totalResponseTime +=
    responseTime;

  state.averageResponseTime =
    state.totalResponseTime /
    state.requests;

  state.successRate =
    (
      state.successfulRequests /
      state.requests
    ) * 100;

  state.lastRequestAt =
    new Date();

  state.lastSuccessAt =
    new Date();
}

export function recordAIProviderFailure(
  provider: AIProviderName,
  responseTime = 0
): void {

  const state =
    getOrCreate(provider);

  state.requests += 1;

  state.failedRequests += 1;

  state.totalResponseTime +=
    responseTime;

  state.averageResponseTime =
    state.totalResponseTime /
    state.requests;

  state.successRate =
    (
      state.successfulRequests /
      state.requests
    ) * 100;

  state.lastRequestAt =
    new Date();

  state.lastFailureAt =
    new Date();
}

export function getAIProviderTelemetry(
  provider: AIProviderName
): AIProviderTelemetry {

  return {
    ...getOrCreate(provider),
  };
}

export function getAllAIProviderTelemetry():
  AIProviderTelemetry[] {

  return [
    ...telemetry.values(),
  ].map(
    (item) => ({
      ...item,
    })
  );
}