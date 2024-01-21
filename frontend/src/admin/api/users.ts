import axios from 'axios';

import type User from '../data/user';

export const USER_LIST_LIMIT = 10;

export const deleteUser = async (token: string | null, id: number): Promise<void> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.delete(`http://localhost:3030/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status !== axios.HttpStatusCode.NoContent) {
    throw new Error('Error deleting user data');
  }
};

export const editUser = async (token: string | null, user: User): Promise<void> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.put(
    `http://localhost:3030/admin/users/${user.id}`,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error('Error editing user data');
  }
};

export interface UserList {
  users: User[];
  hasMore: boolean;
}

export const getUsers = async (
  token: string | null,
  limit: number,
  offset: number
): Promise<UserList> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.get('http://localhost:3030/admin/users', {
    params: {
      limit,
      offset
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error('Error retrieving user data');
  }

  return response.data;
};

export interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = async (user: LoginUser): Promise<string> => {
  const response = await axios.post(
    'http://localhost:3030/admin/login',
    {
      email: user.email,
      password: user.password
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error('Failed to login');
  }

  return response.data.token;
};

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = async (token: string | null, user: RegisterUser): Promise<void> => {
  if (token === null) {
    throw new Error('Token is required');
  }

  const response = await axios.post('http://localhost:3030/admin/register', user, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  if (response.status !== axios.HttpStatusCode.Created) {
    throw new Error('Failed to create user');
  }
};
