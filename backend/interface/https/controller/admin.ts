import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import {
  type LoginRequest,
  type LoginResponse,
  type AccessHandler
} from '../../../domain/admin/access';

export class AdminController {
  private readonly accessHandler: AccessHandler;

  constructor(accessHandler: AccessHandler) {
    this.accessHandler = accessHandler;

    this.adminLoginRequestHandler = this.adminLoginRequestHandler.bind(this);
  }

  adminLoginRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as LoginRequest;

    const responseBody: LoginResponse = await this.accessHandler.login(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };
}
