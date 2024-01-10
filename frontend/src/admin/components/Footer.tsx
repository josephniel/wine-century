import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <Navbar expand="lg" className="header bg-body-secondary">
      <Container>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Copyright © {new Date().getFullYear()} Wine Century Bros Phil Inc.
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Footer;
