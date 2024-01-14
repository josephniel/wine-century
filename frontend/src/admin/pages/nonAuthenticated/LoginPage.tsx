import './LoginPage.scss';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Form as RouterForm } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <section className="loginPage">
      <RouterForm method="post" className="loginForm bg-body-secondary">
        <div className="loginFormHeader">Login</div>

        <div className="loginFormBody">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
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
