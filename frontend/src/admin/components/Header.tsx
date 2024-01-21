import './Header.scss';

import React from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { getUserFromAuth } from '../providers/AuthProvider';

const Header: React.FC = () => {
  const user = getUserFromAuth();

  const profileLink = `/admin/profile/${user?.id}`;
  const logoutURL = '/admin/logout';

  return (
    <Navbar expand="lg" className="header bg-body-secondary">
      <Container>
        <Navbar.Brand>Wine Century Admin Page</Navbar.Brand>
        {user !== undefined ? (
          <>
            <Navbar.Collapse>
              <Nav>
                <Nav.Link href="/admin/products">Products</Nav.Link>
                <Nav.Link href="/admin/users">Users</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href={profileLink}>{user.firstName}</a>
              </Navbar.Text>
              <Navbar.Text>
                <a href={logoutURL}>Logout</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
