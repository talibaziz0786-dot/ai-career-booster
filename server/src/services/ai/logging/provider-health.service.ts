import type {
  AIProvider,
  ProviderHealth,
} from "../../../lib/ai/types/ai.types.js";

const healthMap = new Map<AIProvider, ProviderHealth>();

export function updateProviderHealth(
  provider: AIProvider,
  success: boolean,
  responseTime: number
): void {
  const current =
    healthMap.get(provider) ?? {
      provider,
      healthy: true,
      lastCheck: new Date(),
      averageResponseTime: 0,
      totalRequests: 0,
      failedRequests: 0,
      successRate: 100,
    };

  current.totalRequests++;

  if (!success) {
    current.failedRequests++;
  }

  current.averageResponseTime =
    current.totalRequests === 1
      ? responseTime
      : (
          current.averageResponseTime *
            (current.totalRequests - 1) +
          responseTime
        ) /
        current.totalRequests;

  current.successRate =
    ((current.totalRequests - current.failedRequests) /
      current.totalRequests) *
    100;

  current.healthy = current.successRate > 70;
  current.lastCheck = new Date();

  healthMap.set(provider, current);
}

export function getProviderHealth(): ProviderHealth[] {
  return [...healthMap.values()];
}