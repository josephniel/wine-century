import axios, { type AxiosResponse } from 'axios';
import { type ActionFunctionArgs, redirect } from 'react-router-dom';

interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const registerUser = async (user: RegisterUser): Promise<AxiosResponse> => {
  return await axios.post('http://localhost:3030/admin/register', user, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
};

const RegisterUserAction = async (args: ActionFunctionArgs): Promise<Response> => {
  const formData = await args.request.formData();

  const firstName = formData.get('firstName') as string;
  if (firstName === null) {
    throw new Error('first name is required');
  }

  const lastName = formData.get('lastName') as string;
  if (lastName === null) {
    throw new Error('last name is required');
  }

  const email = formData.get('email') as string;
  if (email === null) {
    throw new Error('email is required');
  }

  const password = formData.get('password') as string;
  if (password === null) {
    throw new Error('password is required');
  }

  const response = await registerUser({
    firstName,
    lastName,
    email,
    password
  });

  if (response.status !== 201) {
    throw new Error(response.data as string);
  }

  return redirect('/admin/users');
};

export default RegisterUserAction;
