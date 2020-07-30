import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Container, Alert, Jumbotron } from 'reactstrap';
import { Header } from 'semantic-ui-react';
import { withAuthorization, withEmailVerification } from '../../Session';
import { WinnersSlideshow } from '../../Layout/Slideshow';
import * as ROUTES from '../../../constants/routes';
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
    <Container>
      <div>
        <div className='heading-title-wrapper'>
          <p className='heading-title'>Winners Hall of Fame</p>
        </div>
        <WinnersSlideshow />
      </div>
      <div className='heading-title-wrapper'>
        <p className='heading-title'>
          Legends Hall of Fame{' '}
          <span className='d-none d-md-inline-block'>(coming soon)</span>
        </p>

        <Link to={ROUTES.VIEW_CONTESTANTS} className='btn btn-outline-warning'>
          Nominate legends
        </Link>
      </div>
    </Container>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
