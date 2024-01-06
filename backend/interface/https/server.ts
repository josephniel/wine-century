import bodyParser from 'body-parser';
import express, { type Express } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';

import { type APIConfig } from '../../shared/config/api';
import { type Logger } from '../../shared/logger';
import { type Client } from '../../shared/postgres/client';
import { errorMiddleware } from './controller/middleware/error';
import adminRouter from './routes/admin';

export class ExpressAPI {
  private readonly express: Express;
  private readonly config: APIConfig;

  constructor(config: APIConfig, logger: Logger, databaseClient: Client) {
    this.config = config;
    this.express = createExpressApp(logger, databaseClient);

    this.run = this.run.bind(this);
  }

  run(): void {
    this.express.listen(this.config.port);
  }
}

export const createExpressApp = (logger: Logger, databaseClient: Client): Express => {
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
  app.use('/admin', adminRouter(databaseClient));

  app.use(errorMiddleware(logger));

  return app;
};
