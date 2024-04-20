import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import { type AccessHandler } from '../../../../domain/admin/access';
import SignupRequestValidationError from '../../../../domain/errors/SignupRequestValidationError';
import {
  type LoginRequest,
  type LoginResponse,
  type SignupRequest,
  type SignupResponse
} from '../../../../interface/https/admin/access';

export class AccessController {
  private readonly accessHandler: AccessHandler;

  constructor(accessHandler: AccessHandler) {
    this.accessHandler = accessHandler;
  }

  loginRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as LoginRequest;

    const responseBody: LoginResponse = await this.accessHandler.login(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  signupRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as SignupRequest;

    if (body.firstName === '') {
      throw new SignupRequestValidationError('Attribute `firstName` is required');
    }
    if (body.lastName === '') {
      throw new SignupRequestValidationError('Attribute `lastName` is required');
    }
    if (body.email === '') {
      throw new SignupRequestValidationError('Attribute `email` is required');
    }
    if (body.password === '') {
      throw new SignupRequestValidationError('Attribute `password` is required');
    }
    if (body.permissions.length === 0) {
      throw new SignupRequestValidationError('Attribute `permissions` is required');
    }

    const responseBody: SignupResponse = await this.accessHandler.signup(body);

    response.status(HttpStatusCode.Created).json(responseBody);
  };
}
