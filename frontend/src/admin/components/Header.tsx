import './Header.scss';

import React from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import type User from '../data/user';

export interface HeaderProps {
  user?: User | undefined;
  logoutURL: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <Navbar expand="lg" className="header bg-body-secondary">
      <Container>
        <Navbar.Brand>Wine Century Admin Page</Navbar.Brand>
        {props.user !== undefined ? (
          <>
            <Navbar.Collapse>
              <Nav>
                <Nav.Link href="/admin/products">Products</Nav.Link>
                <Nav.Link href="/admin/users">Users</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href={props.user.profileLink}>{props.user.name}</a>
              </Navbar.Text>
              <Navbar.Text>
                <a href={props.logoutURL}>Logout</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
