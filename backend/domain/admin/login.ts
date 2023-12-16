export interface LoginRequest {
  username: string;
  password: string;
};

export interface LoginResponse {
  token: string;
};

export class LoginHandler {
  constructor() {
    this.login = this.login.bind(this);
  }

  login(loginRequest: LoginRequest): LoginResponse {
    console.log(loginRequest);
    return {
      token: 'sample',
    };
  }
}
