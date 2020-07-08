import React from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';

const SignOutButton = ({ firebase }) => (
  <NavItem>
    <Link to='#!' className='nav-link' onClick={firebase.doSignOut}>
      <i className='fas fa-sign-out-alt mr-1' />
      Logout
    </Link>
  </NavItem>
);

export default withFirebase(SignOutButton);
