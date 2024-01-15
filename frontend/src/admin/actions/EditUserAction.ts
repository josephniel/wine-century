import axios, { type AxiosResponse } from 'axios';

import type User from '../data/user';

export const editUser = async (user: User): Promise<AxiosResponse> => {
  return await axios.put(
    `http://localhost:3030/admin/users/${user.id}`,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );
};
