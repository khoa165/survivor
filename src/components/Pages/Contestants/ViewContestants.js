import React, { Fragment, useState } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { Contestants, ContestantSearch } from '../../Contestants';
import './ContestantsPage.scss';

const ViewContestants = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Fragment>
      <Jumbotron id='contestantsJumbotron'>
        <Container>
          <div className='welcome'>
            <h1>
              Hello there,{' '}
              <span className='d-inline-block'>Survivor fans!</span>
            </h1>
            <p>
              Let's settle for once who are the legends of the game, who are
              fans' favorites and who are the Greatest of All Time (GOATs)
            </p>
          </div>
          <div className='votingRules'>
            <h3>Voting rules</h3>
            <p>
              <i className='fas fa-crown vote-icon mr-3'></i>
              You can vote for <span>maximum 3 castaways</span> to be considered{' '}
              <span>SURVIVOR G.O.A.T.</span>
            </p>
            <p>
              <i className='fas fa-star vote-icon mr-3'></i>
              You can vote for <span>maximum 10 castaways</span> to be
              considered <span>SURVIVOR LEGENDS</span>.
            </p>
            <p>
              <i className='fas fa-heart vote-icon mr-3'></i>
              You can vote for <span>maximum 20 castaways</span> to be
              considered <span>SURVIVOR FAN FAVORITES</span>.
            </p>
          </div>
        </Container>
      </Jumbotron>
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
