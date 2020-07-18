import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import { AdminDashboard, AdminManageUsers, AdminViewUser } from '../Admin';

import * as ROUTES from '../../constants/routes';

const AdminRoutes = () => {
  return (
    <Fragment>
      <Route exact path={ROUTES.ADMIN} component={AdminDashboard} />
      <Route
        exact
        path={ROUTES.ADMIN_MANAGE_USERS}
        component={AdminManageUsers}
      />
      <Route exact path={ROUTES.ADMIN_VIEW_USER} component={AdminViewUser} />
    </Fragment>
  );
};

export default AdminRoutes;
