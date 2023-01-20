import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Container, Spinner } from 'react-bootstrap';
import classNames from 'classnames';
const Loading = () => {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center d-flex flex-column "
        fluid="md"
      >
        <div class="h-100 d-flex align-items-center justify-content-center">
          <Spinner animation="border" variant="danger" />
        </div>
      </Container>
    </>
  );
};

export default Loading;
