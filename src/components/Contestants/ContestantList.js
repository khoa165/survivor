import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Table, FormGroup, Input, Row, Col } from 'reactstrap';
import { withLoading, withInfiniteScroll } from '../Layout/InfiniteScrollList';
import './ContestantList.scss';

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

const formatSeasonName = (originalSeason, addSpace = false) => {
  const { seasonNumber, seasonName } = originalSeason;
  if (seasonNumber >= 10) {
    return `[${seasonNumber}] ${addSpace ? '\xa0\xa0\xa0' : ''} ${seasonName}`;
  } else {
    return `[0${seasonNumber}] ${addSpace ? '\xa0\xa0\xa0' : ''} ${seasonName}`;
  }
};

class ContestantList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadSize: 20,
      loading: false,
      contestants: [],
      lastFetched: 'Aaron_Meredith',
      firstTime: true,
      listEnded: false,
    };
  }

  componentDidMount() {
    this.loadContestants();
  }

  loadContestants = async () => {
    this.setState({ ...this.state, loading: true });
    await this.props.firebase
      .contestants()
      .orderByKey()
      .startAt(this.state.lastFetched)
      .limitToFirst(this.state.loadSize)
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
  };

  render() {
    const { contestants, loading, listEnded } = this.state;
    return (
      <InfiniteScrollList
        className='p-0'
        list={contestants}
        loading={loading}
        listEnded={listEnded}
        onScroll={this.loadContestants}
      />
    );
  }
}

const List = ({ list }) => (
  <Table striped hover className='mt-4' id='contestantList'>
    <thead className='thead-dark'>
      <tr>
        <th className='column-7over12-lg-1over3 pl-3 pl-md-4'>Contestants</th>
        <th className='column-none-lg-7over18'></th>
        <th className='column-5over48 text-center'>
          <i className='fas fa-crown'></i>
        </th>
        <th className='column-5over48 text-center'>
          <i className='fas fa-star'></i>
        </th>
        <th className='column-5over48 text-center'>
          <i className='fas fa-heart'></i>
        </th>
        <th className='column-5over48 text-center'></th>
      </tr>
    </thead>
    <tbody>
      {list &&
        list.length > 0 &&
        list.map((contestant) => (
          <tr
            className={`${colorBasedOnAppearance(contestant.numberSeasons)}`}
            key={contestant.uid}
          >
            <td className='column-7over12-lg-1over3 pl-3 pl-md-4'>
              <p className='contestantName'>{contestant.name}</p>
              <p className='d-lg-none'>
                {formatSeasonName(contestant.seasonsStat[0])}
              </p>
            </td>
            <td className='column-none-lg-7over18'>
              <p>{formatSeasonName(contestant.seasonsStat[0], true)}</p>
            </td>
            <td className='column-5over48 text-center'>
              <i className='fas fa-crown vote-icon'></i>
            </td>
            <td className='column-5over48 text-center'>
              <i className='far fa-star vote-icon'></i>
            </td>
            <td className='column-5over48 text-center'>
              <i className='far fa-heart vote-icon'></i>
            </td>

            <td className='column-5over48 text-center'>
              <Link
                className='text-dark'
                to={{
                  pathname: `${ROUTES.VIEW_CONTESTANTS}/${contestant.uid}`,
                  state: { contestant },
                }}
              >
                <i className='fas fa-external-link-alt'></i>
              </Link>
            </td>
          </tr>
        ))}
    </tbody>
  </Table>
);

const infiniteScrollCondition = (props) => {
  const reachBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;

  return reachBottom && props.list.length && !props.loading && !props.listEnded;
};

const loadingCondition = (props) => props.loading;

const InfiniteScrollList = compose(
  withInfiniteScroll(infiniteScrollCondition),
  withLoading(loadingCondition)
)(List);

export default withFirebase(ContestantList);
