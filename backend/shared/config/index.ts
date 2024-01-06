import { type APIConfig, loadAPIConfig } from './api';
import { type DatabaseConfig, loadDatabaseConfig } from './database';

export interface Config {
  api: APIConfig;
  database: DatabaseConfig;
}

export const loadConfig = (): Config => ({
  api: loadAPIConfig(),
  database: loadDatabaseConfig()
});
