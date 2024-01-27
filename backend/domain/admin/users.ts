import { type AdminUser } from '../../interface/database/entities/AdminUser';
import { type AdminUserRepository } from '../../interface/database/repositories/AdminUserRepository';
import {
  type DeleteUserRequest,
  type EditUserRequest,
  type EditUserResponse,
  type ListUsersRequest,
  type ListUsersResponse,
  type User
} from '../../interface/https/admin/users';

export class UsersHandler {
  private readonly adminUserRepo: AdminUserRepository;

  constructor(adminUserRepo: AdminUserRepository) {
    this.adminUserRepo = adminUserRepo;
  }

  list = async (listUsersRequest: ListUsersRequest): Promise<ListUsersResponse> => {
    let users = await this.adminUserRepo.list(
      listUsersRequest.requestUserID,
      listUsersRequest.limit + 1,
      listUsersRequest.offset
    );

    let hasMore = false;
    if (users.length > listUsersRequest.limit) {
      hasMore = true;
      users = users.slice(0, -1);
    }

    return {
      users: users.map(
        (user: AdminUser): User => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        })
      ),
      hasMore
    };
  };

  edit = async (editUserRequest: EditUserRequest): Promise<EditUserResponse> => {
    const user = await this.adminUserRepo.update(
      editUserRequest.id,
      editUserRequest.firstName,
      editUserRequest.lastName,
      editUserRequest.email
    );

    const response: EditUserResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
    return response;
  };

  delete = async (deleteUserRequest: DeleteUserRequest): Promise<null> => {
    await this.adminUserRepo.delete(deleteUserRequest.id);
    return null;
  };
}
