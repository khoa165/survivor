import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { UserItem } from '../Users';
import * as ROLES from '../../constants/roles';

const AdminViewUser = () => (
  <div>
    <UserItem />
  </div>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminViewUser);
