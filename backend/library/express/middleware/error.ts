import { type NextFunction, type Request, type Response } from 'express';

import { CustomError } from '../../../domain/errors';
import { type Logger } from '../../logger';

export const errorMiddleware =
  (logger: Logger) => (err: Error, _: Request, response: Response, next: NextFunction) => {
    if (response.headersSent) {
      next(err);
      return;
    }

    if (err instanceof CustomError) {
      const customErr = err;

      response.status(customErr.statusCode);
      response.json({ errorCode: customErr.errorCode, errorMessage: customErr.errorMessage });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if ((err as any).errors) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/strict-boolean-expressions
      response.status((err as any).status || 500).json({
        errorCode: 'VALIDATION_ERROR',
        errorMessage: err.message,
        errors: (err as any).errors
      });
      return;
    }

    logger.error(err.message);

    response.status(500);
    response.json({ errorCode: 'SERVER_ERROR', errorMessage: 'Something unexpected happened.' });
  };
