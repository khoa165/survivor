import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { UserList } from '../Users';
import * as ROLES from '../../constants/roles';

const AdminManageUsers = () => (
  <div>
    <UserList />
  </div>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminManageUsers);
