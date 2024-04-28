import bodyParser from 'body-parser';
import cors from 'cors';
import express, { type Express, type Request } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';

import { type APIConfig } from '../../config/api';
import { type Cache } from '../../interface/cache';
import { type Database } from '../../interface/database';
import { type Logger } from '../logger';
import { errorMiddleware } from './middleware/error';
import adminRouter from './routes/admin';
import publicRouter from './routes/public';

export class ExpressAPI {
  private readonly express: Express;
  private readonly config: APIConfig;

  constructor(config: APIConfig, logger: Logger, database: Database, cache: Cache) {
    this.config = config;
    this.express = createExpressApp(config, logger, database, cache);

    this.run = this.run.bind(this);
  }

  run(): void {
    this.express.listen(this.config.port);
  }
}

const createExpressApp = (
  config: APIConfig,
  logger: Logger,
  database: Database,
  cache: Cache
): Express => {
  const app = express();

  const corsOptionsDelegate = function (req: Request, callback: any): void {
    let corsOptions;
    if (config.corsAllowList.includes(req.header('Origin') ?? '')) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  };

  app.use(cors(corsOptionsDelegate));
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
  app.use('/public', publicRouter(database));

  app.use(errorMiddleware(logger));

  return app;
};
