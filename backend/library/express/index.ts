import bodyParser from 'body-parser';
import express, { type Express } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';

import { type APIConfig } from '../../config/api';
import { type Logger } from '../logger';
import { type Database } from '../../interface/database';
import { errorMiddleware } from './middleware/error';
import adminRouter from './routes/admin';
import { type Cache } from '../../interface/cache';

export class ExpressAPI {
  private readonly express: Express;
  private readonly config: APIConfig;

  constructor(config: APIConfig, logger: Logger, database: Database, cache: Cache) {
    this.config = config;
    this.express = createExpressApp(logger, database, cache);

    this.run = this.run.bind(this);
  }

  run(): void {
    this.express.listen(this.config.port);
  }
}

const createExpressApp = (logger: Logger, database: Database, cache: Cache): Express => {
  const app = express();

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: './interface/https/openapi.yaml',
      validateApiSpec: true,
      validateRequests: true,
      validateResponses: true
    })
  );

  // Register routes
  app.use('/admin', adminRouter(database, cache));

  app.use(errorMiddleware(logger));

  return app;
};
