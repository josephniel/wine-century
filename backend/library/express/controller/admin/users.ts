import { HttpStatusCode } from 'axios';
import { type Request, type Response } from 'express';

import { type UsersHandler } from '../../../../domain/admin/users';
import {
  type DeleteUserRequest,
  type EditUserRequest,
  type EditUserResponse,
  type ListUsersRequest,
  type ListUsersResponse
} from '../../../../interface/https/admin/users';

export class UsersController {
  private readonly usersHandler: UsersHandler;

  constructor(usersHandler: UsersHandler) {
    this.usersHandler = usersHandler;
  }

  listRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: ListUsersRequest = {
      requestUserID: Number(request.headers['x-user-id']),
      limit: Number(request.query['limit']),
      offset: Number(request.query['offset'])
    };

    const responseBody: ListUsersResponse = await this.usersHandler.list(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  editRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: EditUserRequest = {
      id: Number(request.params['userID']),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      permissions: request.body.permissions
    };

    const responseBody: EditUserResponse = await this.usersHandler.edit(body);

    response.status(HttpStatusCode.Ok).json(responseBody);
  };

  deleteRequestHandler = async (request: Request, response: Response): Promise<void> => {
    const body: DeleteUserRequest = {
      id: Number(request.params['userID'])
    };

    await this.usersHandler.delete(body);

    response.status(HttpStatusCode.NoContent).send('Success!');
  };
}
