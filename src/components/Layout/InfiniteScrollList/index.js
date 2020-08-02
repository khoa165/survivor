import React, { Fragment } from 'react';
import { ImageSpinner } from '../Spinner';

const withLoading = (conditionFn) => (Component) => (props) => (
  <Fragment>
    <Component {...props} />
    {conditionFn(props) && <ImageSpinner />}
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
