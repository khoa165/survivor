import React from 'react';

import SignInFormBase from './SignInFormBase';
import SignInGoogleBase from './SignInGoogleBase';
import SignInFacebookBase from './SignInFacebookBase';
import SignInTwitterBase from './SignInTwitterBase';
import { ForgotPasswordAction, SignUpAction } from '../OtherActions';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import '../AuthForm.scss';

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);
const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase);
const SignInTwitter = compose(withRouter, withFirebase)(SignInTwitterBase);

const SignIn = ({ pathname }) => (
  <div className='authenticate-form'>
    <SignInForm pathname={pathname} />
    <ForgotPasswordAction pathname={pathname} />
    <SignUpAction pathname={pathname} />

    <div className='signInLineBreak mt-5 mb-4'>
      <hr />
      <div>
        <p className='text-muted'>Social media login {pathname}</p>
      </div>
    </div>

    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
  </div>
);

SignIn.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default SignIn;
