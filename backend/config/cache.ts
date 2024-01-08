export interface CacheConfig {
  expiryMs: number;
}

export const loadCacheConfig = (): CacheConfig => {
  return {
    expiryMs: Number(process.env['CACHE_EXPIRY_MS'] ?? 24 * 60 * 60 * 1000)
  };
};
