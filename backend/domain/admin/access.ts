import AdminUserNotAuthenticatedError from '../../shared/errors/AdminUserNotAuthenticatedError';
import hasher from '../../shared/hasher';
import jwt from '../../shared/jwt';
import { type AdminUser } from './entities';
import { type AdminUserRepository } from '../../interface/database/AdminUserRepository';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export class AccessHandler {
  private readonly adminUserRepo: AdminUserRepository;

  constructor(adminUserRepo: AdminUserRepository) {
    this.adminUserRepo = adminUserRepo;

    this.login = this.login.bind(this);
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user: AdminUser = await this.adminUserRepo.getUserUsingEmail(loginRequest.email);

    if (!(await hasher.verify(user.password, loginRequest.password))) {
      throw new AdminUserNotAuthenticatedError(user);
    }

    return {
      token: jwt.sign(
        {
          id: 1,
          firstName: 'Joseph',
          lastName: 'Tuazon',
          email: loginRequest.email
        },
        user.password
      )
    };
  }
}
