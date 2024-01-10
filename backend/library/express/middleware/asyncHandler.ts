import { type NextFunction, type Request, type RequestHandler, type Response } from 'express';

export const asyncHandler =
  (fn: any): RequestHandler =>
  (request: Request, response: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    Promise.resolve(fn(request, response, next)).catch(next);
  };
