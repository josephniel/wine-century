import bodyParser from 'body-parser';
import express, { Express } from 'express'
import * as OpenApiValidator from 'express-openapi-validator';

import { APIConfig } from '../shared/config/api';
import { Logger } from '../shared/logger';
import { errorMiddleware } from './controller/middleware/error';
import adminRouter from './routes/admin';

export class ExpressAPI {
  private express: Express;
  private config: APIConfig;

  constructor(config: APIConfig, logger: Logger) {
    this.config = config;
    this.express = createExpressApp(logger);

    this.run = this.run.bind(this);
  }

  run(): void {
    this.express.listen(this.config.port);
  }
}

export const createExpressApp = (logger: Logger): Express => {
  const app = express();

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(OpenApiValidator.middleware({
    apiSpec: './interface/openapi.yaml',
    validateApiSpec: true,
    validateRequests: true,
    validateResponses: true,
  }));

  // Register routes
  app.use('/admin', adminRouter);

  app.use(errorMiddleware(logger));

  return app;
}
