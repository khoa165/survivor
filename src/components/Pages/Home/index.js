import React, { Fragment } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';

const HomePage = () => (
  <Fragment>
    <h1>Home page</h1>
  </Fragment>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
