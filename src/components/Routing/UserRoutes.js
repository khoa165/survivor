import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../Pages/Home';
import { ViewContestants, ViewContestant } from '../Pages/Contestants';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';
const UserRoutes = () => {
  return (
    <Fragment>
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />

      <Route exact path={ROUTES.VIEW_CONTESTANTS} component={ViewContestants} />
      <Route exact path={ROUTES.VIEW_CONTESTANT} component={ViewContestants} />
    </Fragment>
  );
};

export default UserRoutes;
