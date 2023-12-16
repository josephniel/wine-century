import bodyParser from 'body-parser';
import express, { Express } from 'express'
import * as OpenApiValidator from 'express-openapi-validator';

import { APIConfig } from '../../../config/api';
import { Logger } from '../../../logger';
import { API } from '../api';
import { errorMiddleware } from './middleware/error';
import { getAdminRoutes } from './admin';

export class ExpressAPI implements API {
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
    apiSpec: './interface/api/openapi.yaml',
    validateApiSpec: true,
    validateRequests: true,
    validateResponses: true,
  }));

  // Register routes
  app.use('/admin', getAdminRoutes());

  app.use(errorMiddleware(logger));

  return app;
}