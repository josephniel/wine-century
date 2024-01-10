import axios, { type AxiosResponse } from 'axios';
import { type ActionFunction, type ActionFunctionArgs } from 'react-router-dom';

export const LoginAction: ActionFunction = async (args: ActionFunctionArgs) => {
  const formData = await args.request.formData();

  const email = formData.get('email') as string;
  if (email === null) {
    throw new Error('email is required');
  }

  const password = formData.get('password') as string;
  if (password === null) {
    throw new Error('password is required');
  }

  const response = await loginUser(email, password);

  console.log(response.data.token);

  return null;
};

const loginUser = async (email: string, password: string): Promise<AxiosResponse> => {
  return await axios.post(
    'http://localhost:3030/admin/login',
    {
      email,
      password
    },
    {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );
};
