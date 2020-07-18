import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminDashboard = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <Link to={ROUTES.ADMIN_MANAGE_USERS} className='btn btn-danger'>
      <i className='fas fa-users mr-1' />
      Manage users
    </Link>
  </div>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminDashboard);
