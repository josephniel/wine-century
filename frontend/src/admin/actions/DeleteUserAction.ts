import axios, { type AxiosResponse } from 'axios';

export const deleteUser = async (id: number): Promise<AxiosResponse> => {
  return await axios.delete(`http://localhost:3030/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
