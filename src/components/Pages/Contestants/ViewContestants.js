import React, { Fragment, useState } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { Contestants, ContestantSearch } from '../../Contestants';

const ViewContestants = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Fragment>
      <Jumbotron fluid></Jumbotron>
      <Container>
        <ContestantSearch
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Contestants searchText={searchText} />
      </Container>
    </Fragment>
  );
};

export default ViewContestants;
