import React, { Fragment } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { ContestantList } from '../../Contestants';

const ViewContestants = () => (
  <Fragment>
    <Jumbotron fluid />
    <Container>
      <ContestantList />
    </Container>
  </Fragment>
);

export default ViewContestants;
