import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const SignInAction = ({ pathname }) => (
  <div className='other-account-action'>
    <p className='text-secondary'>Already have an account?</p>
    <Link
      to={{
        pathname: pathname,
        state: { form: ROUTES.SIGN_IN },
      }}
      className='hover-brown text-brown ml-2'
    >
      Sign in
    </Link>
  </div>
);

SignInAction.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default SignInAction;
