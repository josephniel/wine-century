import AdminUserNotAuthenticatedError from '../../shared/errors/AdminUserNotAuthenticatedError';
import hasher from '../../shared/hasher';
import jwt from '../../shared/jwt';
import { type AdminUserRepository } from '../../interface/database/AdminUserRepository';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AccessHandler {
  private readonly adminUserRepo: AdminUserRepository;

  constructor(adminUserRepo: AdminUserRepository) {
    this.adminUserRepo = adminUserRepo;

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.adminUserRepo.getUserUsingEmail(loginRequest.email);

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

  async signup(signupRequest: SignupRequest): Promise<SignupResponse> {
    const hashedPassword = await hasher.hash(signupRequest.password);
    const user = await this.adminUserRepo.createUser(
      signupRequest.firstName,
      signupRequest.lastName,
      signupRequest.email,
      hashedPassword
    );

    const response: SignupResponse = { ...user };
    return response;
  }
}
