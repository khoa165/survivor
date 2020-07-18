import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import NotFound from '../NotFound';

import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';

const Routes = () => {
  return (
    <Fragment>
      <Navigation />
      <Switch>
        <Route path='/admin' component={AdminRoutes} />
        <Route path='/' component={UserRoutes} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
