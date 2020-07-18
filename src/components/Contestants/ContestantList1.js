import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'reactstrap';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Spinner from '../Spinner/Spinner';

const colorBasedOnAppearance = (numberSeasons) => {
  switch (numberSeasons) {
    case 1:
      return 'table-default';
    case 2:
      return 'table-warning';
    case 3:
      return 'table-success';
    case 4:
      return 'table-primary';
    case 5:
      return 'table-danger';
    default:
      return 'table-default';
  }
};

const formatSeasonName = (originalSeason) => {
  const { seasonNumber, seasonName } = originalSeason;
  if (seasonNumber >= 10) {
    return `[${seasonNumber}] \xa0\xa0\xa0 ${seasonName}`;
  } else {
    return `[0${seasonNumber}] \xa0\xa0\xa0 ${seasonName}`;
  }
};

class ContestantList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      contestants: [],
      lastFetched: 'Aaron_Meredith',
      firstTime: true,
      listEnded: false,
    };
  }

  componentDidMount() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
    this.props.firebase.contestants().off();
  }

  onScroll = () => {
    const table = document.querySelector('#contestantList');
    const rect = table ? table.getBoundingClientRect() : null;
    // const canFetch =
    //   this.state.firstTime ||
    //   window.innerHeight + window.scrollY >= document.body.offsetHeight;
    const canFetch =
      this.state.firstTime ||
      (rect && rect.bottom - 1.5 * window.innerHeight < 0);
    if (canFetch && !this.state.loading && !this.state.listEnded) {
      this.setState({ ...this.state, loading: true });
      this.props.firebase
        .contestants()
        .orderByKey()
        .startAt(this.state.lastFetched)
        .limitToFirst(20)
        .on('value', (snapshot) => {
          const contestantsObject = snapshot.val();

          const contestantsList = Object.keys(contestantsObject).map((key) => ({
            ...contestantsObject[key],
            uid: key,
          }));

          if (this.state.firstTime) {
            this.setState({ ...this.state, firstTime: false });
          } else {
            contestantsList.shift();
          }

          const length = contestantsList.length;
          if (length > 0) {
            this.setState({
              ...this.state,
              loading: false,
              lastFetched: contestantsList[length - 1].uid,
              contestants: this.state.contestants.concat(contestantsList),
            });
          } else {
            this.setState({ ...this.state, loading: false, listEnded: true });
          }
        });
    }
  };

  render() {
    const { contestants, loading } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <Container className='p-0'>
        <Table striped hover className='mt-4' id='contestantList'>
          <thead className='thead-dark'>
            <tr className='d-flex'>
              <th className='col-6 px-4'>Contestant name</th>
              <th className='col-6 text-center'>Original season</th>
            </tr>
          </thead>
          <tbody>
            <List contestants={contestants} />
          </tbody>
        </Table>
      </Container>
    );
  }
}

const List = ({ contestants }) =>
  contestants &&
  contestants.length > 0 &&
  contestants.map((contestant) => (
    <tr
      className={`d-flex ${colorBasedOnAppearance(contestant.numberSeasons)}`}
      key={contestant.uid}
    >
      <td className='col-6 px-4'>{contestant.name}</td>
      <td className='col-6 px-4 d-flex justify-content-between'>
        {formatSeasonName(contestant.seasonsStat[0])}
        <Link
          className='text-dark'
          to={{
            pathname: `${ROUTES.CONTESTANT_DETAIL}/${contestant.uid}`,
            state: { contestant },
          }}
        >
          <i className='fas fa-external-link-alt'></i>
        </Link>
      </td>
    </tr>
  ));

export default withFirebase(ContestantList);
