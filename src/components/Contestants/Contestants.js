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
      isSearching: false,
      canVoteGOATs: false,
      canVoteLegends: false,
      canVoteFavorites: false,
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

  componentDidUpdate(prevProps) {
    const { firebase, searchText } = this.props;

    if (
      searchText &&
      searchText.trim() !== '' &&
      searchText !== prevProps.searchText &&
      !this.state.listEnded
    ) {
      this.setState({ ...this.state, isSearching: true, listEnded: true });
      setTimeout(
        function () {
          this.loadContestants(1000, true);
          firebase.searchEvent();
        }.bind(this),
        1500
      );
    }
  }

  getGOATsLegendsFavorites = async () => {
    const { firebase } = this.props;
    const { userGOATs, userLegends, userFavorites } = firebase;

    const currentUser = firebase.auth.currentUser;
    if (currentUser) {
      this.getList(userGOATs, currentUser, 'GOATs', 'canVoteGOATs', 3);
      this.getList(userLegends, currentUser, 'legends', 'canVoteLegends', 10);
      this.getList(
        userFavorites,
        currentUser,
        'favorites',
        'canVoteFavorites',
        20
      );
    }
  };

  getList = async (getFunction, currentUser, listName, canVote, maxVotes) => {
    this.setState({ ...this.state, loading: true });
    await getFunction(currentUser.uid).once('value', (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.keys(data) : [];
      this.setState({
        ...this.state,
        loading: false,
        [listName]: list,
        [canVote]: snapshot.numChildren() < maxVotes,
      });
    });
  };

  loadContestants = async (loadSize = this.state.loadSize, bigload = false) => {
    const { firebase } = this.props;
    this.setState({ ...this.state, loading: true });
    await firebase
      .contestants()
      .orderByKey()
      .startAt(this.state.lastFetched)
      .limitToFirst(loadSize)
      .once('value', (snapshot) => {
        const contestantsObject = snapshot.val();
        const contestantsList = Object.keys(contestantsObject).map((key) => ({
          ...contestantsObject[key],
          id: key,
        }));

        if (this.state.firstTime) {
          this.setState({ ...this.state, firstTime: false });
        } else {
          firebase.scrollContestantsEvent();
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

        if (bigload) {
          this.setState({ ...this.state, isSearching: false });
        }
      });
  };

  onIconClick = async (iconNumber, contestantId) => {
    const { canVoteGOATs, canVoteLegends, canVoteFavorites } = this.state;
    const { firebase } = this.props;
    const {
      voteForGOATs,
      contestantGOATVoteCount,
      voteForLegends,
      contestantLegenVoteCount,
      voteForFavorites,
      contestantFavoriteVoteCount,
    } = firebase;
    const currentUser = firebase.auth.currentUser;
    if (!currentUser) {
      notifyErrors('You have to login to vote!', 5);
    } else {
      if (iconNumber === 1) {
        this.voteContestant(
          voteForGOATs,
          contestantGOATVoteCount,
          currentUser,
          contestantId,
          canVoteGOATs
        );
      } else if (iconNumber === 2) {
        this.voteContestant(
          voteForLegends,
          contestantLegenVoteCount,
          currentUser,
          contestantId,
          canVoteLegends
        );
      } else if (iconNumber === 3) {
        this.voteContestant(
          voteForFavorites,
          contestantFavoriteVoteCount,
          currentUser,
          contestantId,
          canVoteFavorites
        );
      }
    }
  };

  voteContestant = async (
    voteFunction,
    voteCountFunction,
    currentUser,
    contestantId,
    canVote
  ) => {
    await voteFunction(currentUser.uid, contestantId).once(
      'value',
      (snapshot) => {
        let voteChanged = 0;
        if (snapshot.exists()) {
          // Un-vote
          voteFunction(currentUser.uid, contestantId).set(null);
          voteChanged = -1;
        } else {
          // Vote
          if (canVote) {
            voteFunction(currentUser.uid, contestantId).set(true);
            voteChanged = 1;
          } else {
            notifyErrors(
              'Please refer to voting rules at the top to see max number of contestants you can cast your votes!'
            );
          }
        }
        this.getGOATsLegendsFavorites();
        this.updateVoteCount(voteCountFunction, contestantId, voteChanged);
      }
    );
  };

  updateVoteCount = async (voteCountFunction, contestantId, voteChanged) => {
    await voteCountFunction(contestantId).once('value', (snapshot) => {
      if (snapshot.exists()) {
        const count = snapshot.val();
        voteCountFunction(contestantId).set(count + voteChanged);
      } else {
        voteCountFunction(contestantId).set(1);
      }
    });
  };

  filterContestants = () => {
    if (this.props.searchText) {
      return this.state.contestants.filter((contestant) => {
        const regex = new RegExp(this.props.searchText, 'gi');
        return (
          contestant.basicInfo.name.match(regex) ||
          contestant.basicInfo.originalSeasonName.match(regex)
        );
      });
    } else {
      return this.state.contestants;
    }
  };

  render() {
    const {
      // contestants,
      loading,
      isSearching,
      listEnded,
      GOATs,
      legends,
      favorites,
    } = this.state;

    let filtered = this.filterContestants();

    return (
      <InfiniteScrollList
        className='p-0'
        list={filtered}
        loading={loading}
        listEnded={listEnded}
        onScroll={this.loadContestants}
        onIconClick={this.onIconClick}
        GOATs={GOATs}
        legends={legends}
        favorites={favorites}
        isSearching={isSearching}
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
