import { type NextFunction, type Request, type Response } from 'express';

import AuthorizationInvalidError from '../../../domain/errors/AuthorizationInvalidError';
import AuthorizationNotAllowedError from '../../../domain/errors/AuthorizationNotAllowedError';
import AuthorizationRequiredError from '../../../domain/errors/AuthorizationRequiredError';
import { type Permission } from '../../../domain/permissions';
import { type Cache } from '../../../interface/cache';
import jwt from '../../jwt';

export const authMiddleware =
  (cache: Cache) =>
  (permissions: Permission[]) =>
  (request: Request, _: Response, next: NextFunction): void => {
    const authHeader: string | undefined = request.get('Authorization');
    if (authHeader === undefined) {
      throw new AuthorizationRequiredError();
    }

    const authHeaderSections: string[] = authHeader?.split(' ');
    if (authHeaderSections[0] !== 'Bearer') {
      throw new AuthorizationRequiredError();
    }

    const token: string | undefined = authHeaderSections[1];
    if (token === undefined) {
      throw new AuthorizationRequiredError();
    }

    const decodedUser = jwt.decode(token);
    const cachedValue = cache.get(decodedUser.id.toString());

    const isValid = jwt.verify(token, cachedValue);
    if (!isValid) {
      throw new AuthorizationInvalidError();
    }

    for (const permission of permissions) {
      if (!decodedUser.permissions.includes(permission.code)) {
        throw new AuthorizationNotAllowedError();
      }
    }

    request.headers['x-user-id'] = decodedUser.id.toString();

    next();
  };
