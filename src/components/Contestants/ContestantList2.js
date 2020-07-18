import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Spinner from '../Spinner/Spinner';
import { Container, Table } from 'reactstrap';

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
    this.setState({ loading: true });
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
      <Container className='p-0'>
        <WrapperList
          list={contestants}
          isLoading={loading}
          listEnded={listEnded}
          onLoad={this.loadContestants}
        />
      </Container>
    );
  }
}

const List = ({ list }) => (
  <Table striped hover className='mt-4' id='contestantList'>
    <thead className='thead-dark'>
      <tr className='d-flex'>
        <th className='col-6 px-4'>Contestant name</th>
        <th className='col-6 text-center'>Original season</th>
      </tr>
    </thead>
    <tbody>
      {list &&
        list.length > 0 &&
        list.map((contestant) => (
          <tr
            className={`d-flex ${colorBasedOnAppearance(
              contestant.numberSeasons
            )}`}
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
        ))}
    </tbody>
  </Table>
);

const withLoading = (conditionFn) => (Component) => (props) => (
  <Fragment>
    <Component {...props} />
    {conditionFn(props) && <Spinner />}
  </Fragment>
);

const withInfiniteScroll = (conditionFn) => (Component) =>
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => conditionFn(this.props) && this.props.onLoad();

    render() {
      return <Component {...this.props} />;
    }
  };

const infiniteScrollCondition = (props) => {
  const reachBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;

  return (
    reachBottom && props.list.length && !props.isLoading && !props.listEnded
  );
};

const loadingCondition = (props) => props.isLoading;

const WrapperList = compose(
  withInfiniteScroll(infiniteScrollCondition),
  withLoading(loadingCondition)
)(List);

export default withFirebase(ContestantList);
