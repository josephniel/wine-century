import './UsersPage.scss';
import './Multiselect.css';

import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Navigate } from 'react-router';

import { deleteUser, editUser, getUsers, USER_LIST_LIMIT } from '../../api/users';
import type User from '../../data/user';
import { USER_PERMISSIONS } from '../../data/user';
import { getUserFromAuth, useAuth } from '../../providers/AuthProvider';

interface UserRowProps extends User {
  removeUserRow: () => void;
}

const UserRow: React.FC<UserRowProps> = (props) => {
  const [editable, setEditable] = useState(false);

  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setlastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  const [permissions, setPermissions] = useState(props.permissions);

  const { token } = useAuth();
  const user = getUserFromAuth();

  const canEditUser = user?.permissions.includes(USER_PERMISSIONS.EDIT_USER) ?? false;
  const canDeleteUser = user?.permissions.includes(USER_PERMISSIONS.DELETE_USER) ?? false;

  const permissionOptions = Object.values(USER_PERMISSIONS).map((option: string) => ({
    value: option,
    selected: permissions?.includes(option) ?? false
  }));
  const [statedPermissionOptions, setStatedPermissionOptions] = useState(permissionOptions);

  useEffect(() => {
    setPermissions(
      statedPermissionOptions
        .filter((option: any) => option.selected)
        .map((option: any) => option.value)
    );
  }, [statedPermissionOptions]);

  const editUserHandler = async (): Promise<void> => {
    if (!canEditUser) {
      return;
    }

    await editUser(token, {
      id: props.id,
      firstName,
      lastName,
      email,
      permissions
    });
    setEditable(false);
  };

  const deleteUserHandler = async (): Promise<void> => {
    if (!canDeleteUser) {
      return;
    }

    await deleteUser(token, props.id);
    props.removeUserRow();
  };

  return (
    <tr className={editable ? 'table-info' : ''}>
      <th className="text-center">{props.id}</th>
      <td>
        <Form.Control
          plaintext={!editable}
          readOnly={!editable}
          defaultValue={firstName}
          onChange={({ target: { value } }) => {
            setFirstName(value);
          }}
        />
      </td>
      <td>
        <Form.Control
          plaintext={!editable}
          readOnly={!editable}
          defaultValue={lastName}
          onChange={({ target: { value } }) => {
            setlastName(value);
          }}
        />
      </td>
      <td>
        <Form.Control
          plaintext={!editable}
          readOnly={!editable}
          defaultValue={email}
          onChange={({ target: { value } }) => {
            setEmail(value);
          }}
        />
      </td>
      <td>
        {statedPermissionOptions.map((option: any, index: number) => (
          <Form.Check // prettier-ignore
            key={index}
            type="switch"
            label={option.value}
            value={option.value}
            checked={option.selected}
            disabled={!editable}
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
      </td>
      <td className="text-center">
        {canEditUser ? (
          editable ? (
            <Button
              size="sm"
              variant="success"
              onClick={() => {
                void editUserHandler();
              }}
              style={{ marginRight: '10px' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check-square-fill"
                viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
              </svg>
            </Button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                setEditable(true);
              }}
              style={{ marginRight: '10px' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
              </svg>
            </Button>
          )
        ) : null}

        {canDeleteUser ? (
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              void deleteUserHandler();
            }}
            disabled={editable}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3-fill"
              viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
            </svg>
          </Button>
        ) : null}
      </td>
    </tr>
  );
};

const UsersPage = (): React.ReactElement => {
  const [users, setUsers] = useState([] as User[]);
  const [hasMore, setHasMore] = useState(true);

  const { token } = useAuth();
  const user = getUserFromAuth();

  const canAddNewUser = user?.permissions.includes(USER_PERMISSIONS.ADD_USER) ?? false;
  const canViewUsers = user?.permissions.includes(USER_PERMISSIONS.VIEW_USER) ?? false;

  if (!canViewUsers) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    loadMoreUsers().catch(console.error);
  }, []);

  const loadMoreUsers = async (): Promise<void> => {
    if (!hasMore) {
      return;
    }

    const userList = await getUsers(token, USER_LIST_LIMIT, users.length);
    setUsers([...users, ...userList.users]);
    setHasMore(userList.hasMore);
  };

  const removeRow = async (id: number): Promise<void> => {
    setUsers(users.filter((user: User) => user.id !== id));
  };

  return (
    <section className="usersPage">
      <Container className="my-5">
        <Row>
          <Col>
            <h3 className="mb-4">Admin Users</h3>
          </Col>
          <Col>
            {canAddNewUser ? (
              <Button variant="success" className="float-end" href="/users/register">
                Add new user
              </Button>
            ) : null}
          </Col>
        </Row>
        <Table hover bordered className="align-middle">
          <thead className="table-light">
            <tr>
              <th className="text-center">ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Permissions</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 ? (
              users.map((user: User, index: number) => (
                <UserRow
                  {...user}
                  removeUserRow={() => {
                    void removeRow(user.id);
                  }}
                  key={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>There are no other users.</td>
              </tr>
            )}
          </tbody>
          <tfoot className="table-light">
            <tr>
              <td colSpan={6}>
                <Button
                  size="sm"
                  variant="success"
                  className="float-end"
                  disabled={!hasMore}
                  onClick={(e) => {
                    void loadMoreUsers();
                  }}>
                  Load More
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </section>
  );
};

export default UsersPage;
