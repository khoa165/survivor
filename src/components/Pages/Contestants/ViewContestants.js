import React, { Fragment } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { Contestants } from '../../Contestants';

const ViewContestants = () => (
  <Fragment>
    <Jumbotron fluid />
    <Container>
      <Contestants />
    </Container>
  </Fragment>
);

export default ViewContestants;
