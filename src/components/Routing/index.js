import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Layout/Navigation';
import NotFound from '../Pages/NotFound';

// import UserRoutes from './UserRoutes';
// import AdminRoutes from './AdminRoutes';

import { AdminDashboard, AdminManageUsers, AdminViewUser } from '../Admin';
import HomePage from '../Pages/Home';
import { ViewContestants, ViewContestant } from '../Pages/Contestants';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';

const Routes = () => {
  return (
    <Fragment>
      <Navigation />
      <Switch>
        {/* <Route path='/admin' component={AdminRoutes} /> */}
        {/* <Route path='/' component={UserRoutes} /> */}
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route
          exact
          path={ROUTES.VIEW_CONTESTANTS}
          component={ViewContestants}
        />
        <Route exact path={ROUTES.VIEW_CONTESTANT} component={ViewContestant} />
        <Route exact path={ROUTES.ADMIN} component={AdminDashboard} />
        <Route
          exact
          path={ROUTES.ADMIN_MANAGE_USERS}
          component={AdminManageUsers}
        />
        <Route
          exact
          path={ROUTES.ADMIN_MANAGE_USER}
          component={AdminViewUser}
        />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
