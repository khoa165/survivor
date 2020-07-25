import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const SignUpAction = ({ pathname }) => (
  <div className='other-account-action'>
    <p className='text-secondary'>Are you a new Survivor fan?</p>
    <Link
      to={{
        pathname: pathname,
        state: { form: ROUTES.SIGN_UP },
      }}
      className='hover-brown text-brown ml-2'
    >
      Sign up
    </Link>
  </div>
);

SignUpAction.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default SignUpAction;
