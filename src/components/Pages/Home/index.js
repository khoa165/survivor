import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { ContestantList, ContestantItem } from '../../Contestants';
import * as ROUTES from '../../../constants/routes';

import { withAuthorization, withEmailVerification } from '../../Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <ContestantList />

    <Switch>
      <Route exact path={ROUTES.CONTESTANT_DETAIL} component={ContestantItem} />
    </Switch>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
