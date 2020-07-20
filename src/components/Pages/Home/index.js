import React from 'react';
import { compose } from 'recompose';
import { Container, Alert, Jumbotron } from 'reactstrap';
import { Header } from 'semantic-ui-react';
import { withAuthorization, withEmailVerification } from '../../Session';
import { WinnersSlideshow } from '../../Layout/Slideshow';
import './Home.scss';

const HomePage = () => (
  <div id='homePage'>
    <Jumbotron fluid className='m-0'>
      <div className='overlay'></div>
    </Jumbotron>
    <Alert color='warning' className='text-center py-3'>
      <Header as='h2' color='teal' className='text-center m-0'>
        Welcome to Survivor World{' '}
        <span className='d-inline-block'>for Survivor Fans!</span>
      </Header>
    </Alert>
    <Container className='d-none d-md-block'>
      <p className='heading-title'>
        <span>Winners Hall of Fame</span>
      </p>
      <WinnersSlideshow />
    </Container>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
