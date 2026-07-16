interface CacheEntry<T> {

  value: T;

  expiresAt: number;

}

const cache = new Map<
  string,
  CacheEntry<unknown>
>();

export function getCache<T>(
  key: string
): T | null {

  const entry =
    cache.get(key);

  if (!entry) {

    return null;

  }

  if (
    Date.now() >
    entry.expiresAt
  ) {

    cache.delete(key);

    return null;

  }

  return entry.value as T;

}

export function setCache<T>(

  key: string,

  value: T,

  ttlMinutes = 30

) {

  cache.set(key, {

    value,

    expiresAt:

      Date.now() +

      ttlMinutes *

      60 *

      1000,

  });

}

export function clearCache() {

  cache.clear();

}