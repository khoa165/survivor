import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../Home';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';
const UserRoutes = () => {
  return (
    <Fragment>
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
    </Fragment>
  );
};

export default UserRoutes;
