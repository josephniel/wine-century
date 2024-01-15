import axios, { type AxiosResponse } from 'axios';

import type User from '../data/user';

export const USER_LIST_LIMIT = 10;

export interface UserList {
  users: User[];
  hasMore: boolean;
}

const getUsers = async (limit: number, offset: number): Promise<AxiosResponse> => {
  return await axios.get('http://localhost:3030/admin/users', {
    params: {
      limit,
      offset
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

const UsersPageLoader = (limit: number, offset: number) => async (): Promise<UserList> => {
  const response = await getUsers(limit, offset);
  return response.data;
};

export default UsersPageLoader;
