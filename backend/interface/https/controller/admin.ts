import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import {
  type LoginRequest,
  type LoginResponse,
  type AccessHandler,
  type SignupResponse,
  type SignupRequest
} from '../../../domain/admin/access';

export class AdminController {
  private readonly accessHandler: AccessHandler;

  constructor(accessHandler: AccessHandler) {
    this.accessHandler = accessHandler;
  }

  adminLoginRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as LoginRequest;

    const responseBody: LoginResponse = await this.accessHandler.login(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  adminSignupRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as SignupRequest;

    const responseBody: SignupResponse = await this.accessHandler.signup(body);

    response.status(HttpStatusCode.Created).json(responseBody);
  };
}
