import { type APIConfig, loadAPIConfig } from './api';
import { type CacheConfig, loadCacheConfig } from './cache';
import { type DatabaseConfig, loadDatabaseConfig } from './database';

export interface Config {
  api: APIConfig;
  cache: CacheConfig;
  database: DatabaseConfig;
}

export const loadConfig = (): Config => ({
  api: loadAPIConfig(),
  database: loadDatabaseConfig(),
  cache: loadCacheConfig()
});
