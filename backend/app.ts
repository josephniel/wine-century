import { ExpressAPI } from './interface/https/server';
import { loadConfig } from './shared/config';
import { Logger } from './shared/logger';
import { Client } from './shared/postgres/client';

(() => {
  const config = loadConfig();
  const logger = new Logger();
  const databaseClient = new Client(config.database);
  Promise.resolve(databaseClient.connect()).catch(() => {
    process.emit('SIGINT');
  });

  const api = new ExpressAPI(config.api, logger, databaseClient);

  api.run();

  process.on('SIGINT', (): void => {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');

    Promise.resolve(databaseClient.end()).catch(() => {});

    process.exit();
  });
})();
