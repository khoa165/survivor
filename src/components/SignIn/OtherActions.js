import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const ForgotPasswordAction = () => (
  <div className='other-account-action'>
    <p className='text-secondary'>Forgot your password?</p>
    <Link
      to={{
        pathname: ROUTES.LANDING,
        state: { form: ROUTES.PASSWORD_FORGET },
      }}
      className='hover-brown text-brown ml-2'
    >
      Reset here
    </Link>
  </div>
);

const SignUpAction = () => (
  <div className='other-account-action'>
    <p className='text-secondary'>Are you a new Survivor fan?</p>
    <Link
      to={{
        pathname: ROUTES.LANDING,
        state: { form: ROUTES.SIGN_UP },
      }}
      className='hover-brown text-brown ml-2'
    >
      Sign up
    </Link>
  </div>
);

export { ForgotPasswordAction, SignUpAction };
