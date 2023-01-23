import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Container, Spinner } from 'react-bootstrap';
import classNames from 'classnames';
import Logo from 'components/common/Logo';
const Loading = ({ init = false, shopTheme = undefined }) => {
  return (
    <>
      <Container
        className={classNames(
          'd-flex align-items-center justify-content-center d-flex flex-column',
          {
            'vh-100 vw-100': init
          }
        )}
        fluid="md"
      >
        {init && (
        <div class="h-100 d-flex align-items-center justify-content-center">
        <Logo textClass="text-900" width={190} />
        </div>)}
        
        <div class="h-100 d-flex align-items-center justify-content-center">
          {init && <h1>Looking for your transaction... &nbsp;</h1>} 
          
          <Spinner
            style={shopTheme != undefined ? shopTheme.theme.text : {}}
            animation="border"
            variant={init ? 'primary' : 'danger'}
          />
        </div>
      </Container>
    </>
  );
};

export default Loading;
