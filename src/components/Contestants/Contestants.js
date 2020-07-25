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

  onIconClick = (iconNumber, contestant_name) => {
    const {
      voteForGOATs,
      voteForLegends,
      voteForFavorites,
    } = this.props.firebase;
    const currentUser = this.props.firebase.auth.currentUser;
    if (!currentUser) {
      notifyErrors('You have to login to vote!', 5);
    } else {
      notifyErrors(contestant_name, 1);

      if (iconNumber === 1) {
      } else if (iconNumber === 2) {
      } else if (iconNumber === 3) {
      }
    }
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
        onIconClick={this.onIconClick}
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
