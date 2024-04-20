export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  permissions: string[];
}

export interface ListUsersRequest {
  requestUserID: number;
  limit: number;
  offset: number;
}

export interface ListUsersResponse {
  users: User[];
  hasMore: boolean;
}

export interface EditUserRequest extends User {}

export interface EditUserResponse extends User {
  createdAt: string;
  updatedAt: string;
}

export interface DeleteUserRequest {
  id: number;
}
