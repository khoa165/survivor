import React from 'react';
import { withEmailVerification, withAuthorization } from '../../Session';
import { compose } from 'recompose';
import './ContestantsPage.scss';

const ViewContestant = () => {
  return (
    <div>
      <h1>Page not available yet.</h1>
    </div>
  );
};

const condition = (authUser) => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ViewContestant);
