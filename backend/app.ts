import { loadConfig } from './config';
import { ExpressAPI } from './library/express';
import { InMemoryCache } from './library/inmemory/cache';
import { Logger } from './library/logger';
import { PostgresDatabase } from './library/postgres';

(() => {
  const config = loadConfig();
  const logger = new Logger();

  const cache = new InMemoryCache(config.cache);
  const database = new PostgresDatabase(config.database);
  Promise.resolve(database.connect()).catch(() => {
    process.emit('SIGINT');
  });

  const api = new ExpressAPI(config.api, logger, database, cache);

  api.run();

  process.on('SIGINT', (): void => {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');

    Promise.resolve(database.end()).catch(() => {});

    process.exit();
  });
})();
