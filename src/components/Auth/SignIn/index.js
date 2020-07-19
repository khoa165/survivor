import React from 'react';

import SignInFormBase from './SignInFormBase';
import SignInGoogleBase from './SignInGoogleBase';
import SignInFacebookBase from './SignInFacebookBase';
import SignInTwitterBase from './SignInTwitterBase';
import { ForgotPasswordAction, SignUpAction } from './OtherActions';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);
const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase);
const SignInTwitter = compose(withRouter, withFirebase)(SignInTwitterBase);

const SignIn = () => (
  <div className='authenticate-form'>
    <SignInForm />
    <ForgotPasswordAction />
    <SignUpAction />

    <div className='signInLineBreak mt-5 mb-4'>
      <hr />
      <div>
        <p className='text-muted'>Social media login</p>
      </div>
    </div>

    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
  </div>
);

export default SignIn;
