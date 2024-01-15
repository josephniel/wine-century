import './UserRegisterPage.scss';

import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import PasswordChecklist from 'react-password-checklist';
import { Form as RouterForm } from 'react-router-dom';

const UserRegisterPage = (): React.ReactElement => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSubmit = (event: any): void => {
    const form = document.getElementById('registerUserForm') as HTMLFormElement;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!isPasswordValid) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <section className="userRegisterPage">
      <RouterForm noValidate method="post" onSubmit={handleSubmit} id="registerUserForm">
        <h2 className="mb-4">Add new user</h2>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              defaultValue={firstName}
              required
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">Please add a first name</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last name"
              defaultValue={lastName}
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">Please add a last name</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email address"
              defaultValue={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please add an email address
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              defaultValue={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">Please add a password</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formBasicVerifyPassword">
            <Form.Label>Verify Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Verify password"
              defaultValue={passwordAgain}
              onChange={(e) => {
                setPasswordAgain(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">Please verify password</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <PasswordChecklist
          className="my-4"
          rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
          minLength={5}
          value={password}
          valueAgain={passwordAgain}
          onChange={(isValid) => {
            setIsPasswordValid(isValid);
          }}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </RouterForm>
    </section>
  );
};

export default UserRegisterPage;
