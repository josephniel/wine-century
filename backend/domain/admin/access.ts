import { type Cache } from '../../interface/cache';
import { type AdminUserRepository } from '../../interface/database/repositories/AdminUserRepository';
import {
  type LoginRequest,
  type LoginResponse,
  type SignupRequest,
  type SignupResponse
} from '../../interface/https/admin/access';
import hasher from '../../library/hasher';
import jwt from '../../library/jwt';
import AdminUserNotAuthenticatedError from '../errors/AdminUserNotAuthenticatedError';

export class AccessHandler {
  private readonly adminUserRepo: AdminUserRepository;
  private readonly cache: Cache;

  constructor(adminUserRepo: AdminUserRepository, cache: Cache) {
    this.adminUserRepo = adminUserRepo;
    this.cache = cache;
  }

  login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    const user = await this.adminUserRepo.getByEmail(loginRequest.email);

    if (!(await hasher.verify(user.hashedPassword, loginRequest.password))) {
      throw new AdminUserNotAuthenticatedError(user);
    }

    this.cache.set(user.id.toString(), user.hashedPassword);
    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      user.hashedPassword
    );
    return { token };
  };

  signup = async (signupRequest: SignupRequest): Promise<SignupResponse> => {
    const hashedPassword = await hasher.hash(signupRequest.password);
    const user = await this.adminUserRepo.create(
      signupRequest.firstName,
      signupRequest.lastName,
      signupRequest.email,
      hashedPassword
    );

    const response: SignupResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
    return response;
  };
}
