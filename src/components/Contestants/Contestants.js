import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withLoading, withInfiniteScroll } from '../Layout/InfiniteScrollList';
import ContestantList from './ContestantList';
import { notifyErrors } from '../../utils/Toast';
import './ContestantList.scss';

class Contestants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadSize: 20,
      loading: false,
      contestants: [],
      GOATs: [],
      legends: [],
      favorites: [],
      lastFetched: 'Aaron_Meredith',
      firstTime: true,
      listEnded: false,
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    setTimeout(
      function () {
        this.getGOATsLegendsFavorites();
        this.loadContestants();
      }.bind(this),
      1500
    );
  }

  getGOATsLegendsFavorites = async () => {
    const { firebase } = this.props;
    const { userGOATs, userLegends, userFavorites } = firebase;

    const currentUser = firebase.auth.currentUser;
    if (currentUser) {
      this.getList(userGOATs, currentUser, 'GOATs');
      this.getList(userLegends, currentUser, 'legends');
      this.getList(userFavorites, currentUser, 'favorites');
    }
  };

  getList = async (getFunction, currentUser, listName) => {
    this.setState({ ...this.state, loading: true });
    await getFunction(currentUser.uid).once('value', (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.keys(data) : [];
      this.setState({
        ...this.state,
        loading: false,
        [listName]: list,
      });
    });
  };

  loadContestants = async () => {
    const { firebase } = this.props;
    this.setState({ ...this.state, loading: true });
    await firebase
      .contestants()
      .orderByKey()
      .startAt(this.state.lastFetched)
      .limitToFirst(this.state.loadSize)
      .on('value', (snapshot) => {
        const contestantsObject = snapshot.val();
        const contestantsList = Object.keys(contestantsObject).map((key) => ({
          ...contestantsObject[key],
          id: key,
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
            lastFetched: contestantsList[length - 1].id,
            contestants: this.state.contestants.concat(contestantsList),
          });
        } else {
          this.setState({ ...this.state, loading: false, listEnded: true });
        }
      });
  };

  onIconClick = async (iconNumber, contestant_name) => {
    const { firebase } = this.props;
    const { voteForGOATs, voteForLegends, voteForFavorites } = firebase;
    const currentUser = firebase.auth.currentUser;
    if (!currentUser) {
      notifyErrors('You have to login to vote!', 5);
    } else {
      if (iconNumber === 1) {
        this.voteContestant(voteForGOATs, currentUser, contestant_name);
      } else if (iconNumber === 2) {
        this.voteContestant(voteForLegends, currentUser, contestant_name);
      } else if (iconNumber === 3) {
        this.voteContestant(voteForFavorites, currentUser, contestant_name);
      }
    }
  };

  voteContestant = async (voteFunction, currentUser, contestant_name) => {
    await voteFunction(currentUser.uid, contestant_name).once(
      'value',
      (snapshot) => {
        if (snapshot.exists()) {
          voteFunction(currentUser.uid, contestant_name).set(null);
        } else {
          voteFunction(currentUser.uid, contestant_name).set(true);
        }
        this.getGOATsLegendsFavorites();
      }
    );
  };

  render() {
    const {
      contestants,
      loading,
      listEnded,
      GOATs,
      legends,
      favorites,
    } = this.state;
    return (
      <InfiniteScrollList
        className='p-0'
        list={contestants}
        loading={loading}
        listEnded={listEnded}
        onScroll={this.loadContestants}
        onIconClick={this.onIconClick}
        GOATs={GOATs}
        legends={legends}
        favorites={favorites}
      />
    );
  }
}

const infiniteScrollCondition = (props) => {
  const reachBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;

  return reachBottom && props.list.length && !props.loading && !props.listEnded;
};

const loadingCondition = (props) => props.loading;

const InfiniteScrollList = compose(
  withInfiniteScroll(infiniteScrollCondition),
  withLoading(loadingCondition)
)(ContestantList);

export default withFirebase(Contestants);
