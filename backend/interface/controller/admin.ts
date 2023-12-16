import { HttpStatusCode } from 'axios';
import { Request, Response } from "express";

import { LoginRequest, LoginResponse, LoginHandler } from "../../domain/admin/login";

export class AdminController {
  constructor() {
    this.adminLoginRequestHandler = this.adminLoginRequestHandler.bind(this);
  }

  adminLoginRequestHandler(request: Request, response: Response) {
    const body = request.body as LoginRequest;
  
    const handler = new LoginHandler();
    const responseBody: LoginResponse = handler.login(body);
  
    response.status(HttpStatusCode.Ok).json(responseBody);
  };
}
