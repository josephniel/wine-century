import './LoginPage.scss';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Form as RouterForm, Navigate } from 'react-router-dom';

import { loginUser } from '../../api/users';
import { useAuth } from '../../providers/AuthProvider';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setToken } = useAuth();

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();

    if (email === '') {
      throw new Error('Email is required');
    }
    if (password === '') {
      throw new Error('Password is required');
    }

    loginUser({
      email,
      password
    })
      .then((token: string) => {
        setToken(token);
        setRedirect(true);
      })
      .catch(console.error);
  };

  return redirect ? (
    <Navigate to="/dashboard" />
  ) : (
    <section className="loginPage">
      <RouterForm onSubmit={handleSubmit} className="loginForm bg-body-secondary">
        <div className="loginFormHeader">Login</div>

        <div className="loginFormBody">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              defaultValue={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </RouterForm>
    </section>
  );
};

export default LoginPage;
