import { NextFunction, Request, Response } from "express";

import { Logger } from "../../../shared/logger"
import { CustomError } from "../../../shared/errors";

export const errorMiddleware = (logger: Logger) => (err: Error, _: Request, response: Response, next: NextFunction) => {
  if (response.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    const customErr = err as CustomError;

    response.status(customErr.statusCode);
    response.json({ errorCode: customErr.errorCode, errorMessage: customErr.errorMessage });
    return;
  }

  if ((err as any).errors) {
    response.status((err as any).status || 500).json({
      errorCode: 'VALIDATION_ERROR',
      errorMessage: err.message,
      errors: (err as any).errors,
    });
    return;
  }

  err = err as Error;
  logger.error(err.message);

  response.status(500);
  response.json({ errorCode: 'SERVER_ERROR', errorMessage: 'Something unexpected happened.' });
  return;
};
