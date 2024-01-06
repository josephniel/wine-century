import { ExpressAPI } from './interface/https/server';
import { loadConfig } from './shared/config';
import { Logger } from './shared/logger';
import { Client } from './shared/postgres/client';

(() => {
  const config = loadConfig();
  const logger = new Logger();
  const databaseClient = new Client(config.database);

  const api = new ExpressAPI(config.api, logger, databaseClient);

  api.run();
})();
