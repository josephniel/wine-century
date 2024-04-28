import './UserRegisterPage.scss';

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import PasswordChecklist from 'react-password-checklist';
import { Navigate } from 'react-router-dom';

import { registerUser } from '../../api/users';
import { USER_PERMISSIONS } from '../../data/user';
import { useAuth } from '../../providers/AuthProvider';

const UserRegisterPage = (): React.ReactElement => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [permissions, setPermissions] = useState([] as string[]);

  const { token } = useAuth();

  const permissionOptions = Object.values(USER_PERMISSIONS).map((option: string) => ({
    value: option,
    selected: false
  }));
  const [statedPermissionOptions, setStatedPermissionOptions] = useState(permissionOptions);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setPermissions(
      statedPermissionOptions
        .filter((option: any) => option.selected)
        .map((option: any) => option.value)
    );
  }, [statedPermissionOptions]);

  const addUserHandler = async (): Promise<void> => {
    if (!isPasswordValid) {
      return;
    }

    try {
      await registerUser(token, {
        firstName,
        lastName,
        email,
        password,
        permissions
      });
    } catch (e) {
      console.log(e);
      return;
    }
    setRedirect(true);
  };

  return redirect ? (
    <Navigate to="/users" />
  ) : (
    <section className="userRegisterPage">
      <div className="registerUserForm">
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
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="formBasicEmail">
            <Form.Label>Permissions</Form.Label>
            {statedPermissionOptions.map((permission: any, index: number) => (
              <Form.Check // prettier-ignore
                key={index}
                type="switch"
                label={permission.value}
                value={permission.value}
                checked={permission.selected}
                onChange={({ target: { value } }) => {
                  const tempPermissionOptions = [];
                  for (const permission of statedPermissionOptions) {
                    if (permission.value === value) {
                      permission.selected = !permission.selected;
                    }
                    tempPermissionOptions.push(permission);
                  }
                  setStatedPermissionOptions(tempPermissionOptions);
                }}
              />
            ))}
          </Form.Group>
        </Row>
        <Button
          variant="primary"
          onClick={() => {
            void addUserHandler();
          }}>
          Submit
        </Button>
      </div>
    </section>
  );
};

export default UserRegisterPage;
