import React from 'react';
import { withFirebase } from '../../Firebase';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { notifySuccess } from '../../../utils/Toast';

const SignOutButton = ({ firebase }) => {
  return (
    <NavItem>
      <Link
        to='#'
        className='nav-link'
        onClick={() => {
          firebase.doSignOut();
          notifySuccess('You have logged out successfully!', 3);
        }}
      >
        <i className='fas fa-sign-out-alt mr-1' />
        Logout
      </Link>
    </NavItem>
  );
};

export default withFirebase(SignOutButton);
