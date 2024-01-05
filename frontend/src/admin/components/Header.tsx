import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import './Header.scss';
import type User from '../data/user';

export interface HeaderProps {
  title: string;
  user?: User | undefined;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <Navbar expand="lg" className="footer bg-body-secondary">
      <Container>
        <Navbar.Brand>{props.title}</Navbar.Brand>
        {props.user !== undefined ? (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href={props.user.profileLink}>{props.user.name}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
