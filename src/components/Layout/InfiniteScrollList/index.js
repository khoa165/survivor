import React, { Fragment } from 'react';
import { compose } from 'recompose';
import Spinner from '../Spinner';

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

    onScroll = () => conditionFn(this.props) && this.props.onScroll();

    render() {
      return <Component {...this.props} />;
    }
  };

export { withLoading, withInfiniteScroll };
