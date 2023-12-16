import { HttpStatusCode } from 'axios';
import { Request, Response, Router } from "express";

import { LoginRequest, LoginResponse, LoginHandler } from "../../../domain/admin/login";

export const getAdminRoutes = (): Router => {
  const router = Router();

  router.post('/login', adminLoginRequestHandler);

  return router;
};

export const adminLoginRequestHandler = (request: Request, response: Response) => {
  const body = request.body as LoginRequest;

  const handler = new LoginHandler();
  const responseBody: LoginResponse = handler.login(body);

  response.status(HttpStatusCode.Ok).json(responseBody);
};
