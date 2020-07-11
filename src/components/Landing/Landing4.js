import React from 'react';
import SignIn from '../SignIn';
import { Row, Col } from 'reactstrap';
import { Button } from 'semantic-ui-react';

const Landing = () => {
  return (
    <Row>
      <Col sm='12' md='8' className='p-0'>
        <div id='landing-survivor-background'>
          <div className='overlay'></div>
        </div>
      </Col>
      <Col sm='12' md='4' id='signin-wrapper' className='p-0'>
        <div className='top-left-gradient'></div>
        <div className='bottom-right-gradient'></div>
        <SignIn />
      </Col>
    </Row>
  );
};

export default Landing;
