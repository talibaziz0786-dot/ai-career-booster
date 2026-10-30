interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const cache =
  new Map<string, CacheEntry<unknown>>();

export function getAIFromCache<T>(
  key: string
): T | undefined {
  const entry = cache.get(key);

  if (!entry) {
    return undefined;
  }

  if (
    Date.now() >=
    entry.expiresAt
  ) {
    cache.delete(key);
    return undefined;
  }

  return entry.value as T;
}

export function setAIInCache<T>(
  key: string,
  value: T,
  ttlSeconds = 30
): void {
  cache.set(key, {
    value,
    expiresAt:
      Date.now() +
      ttlSeconds * 1_000,
  });
}

export function deleteAIFromCache(
  key: string
): void {
  cache.delete(key);
}

export function clearAICache(): void {
  cache.clear();
}