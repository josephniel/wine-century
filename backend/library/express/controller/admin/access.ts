import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import { type AccessHandler } from '../../../../domain/admin/access';
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

    const responseBody: SignupResponse = await this.accessHandler.signup(body);

    response.status(HttpStatusCode.Created).json(responseBody);
  };
}
