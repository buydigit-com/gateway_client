import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { version } from 'config';

const Footer = () => (
  <footer className="footer">
    <Row className="text-center justify-content-center fs--1 mt-4 mb-3">
      <Col sm="auto">
        <p className="h6 mb-0">
          powered by <a href="https://gateway.buydigit.com/">buydigit.com </a>
          <span className="d-none d-sm-inline-block"> | </span>
          <br className="d-sm-none" /> {new Date().getFullYear()} &copy;{' '}
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
