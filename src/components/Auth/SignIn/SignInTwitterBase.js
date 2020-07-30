import React from 'react';
import { toast } from 'react-toastify';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import { TwitterLoginButton } from 'react-social-login-buttons';

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

const notifySuccess = (success) => {
  toast(success, {
    position: toast.POSITION.TOP_LEFT,
    type: toast.TYPE.SUCCESS,
    autoClose: 3000,
  });
};

const notifyErrors = (error) => {
  toast(error, {
    position: toast.POSITION.TOP_LEFT,
    type: toast.TYPE.ERROR,
    autoClose: 10000,
  });
};

// Use class component because of react-social-login-buttons.
class SignInTwitterBase extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  // Event listener for Twitter sign in button clicked.
  onSubmit = (e) => {
    e.preventDefault();

    // Destructuring.
    const { firebase, history } = this.props;

    // Call firebase function to sign the user in using Twitter account.
    firebase
      .doSignInWithTwitter()
      .then((socialAuthUser) => {
        console.log(socialAuthUser);
        if (socialAuthUser.additionalUserInfo.isNewUser) {
          const roles = {};
          roles[ROLES.USER] = true;
          roles[ROLES.ADMIN] = false;
          roles[ROLES.DEVELOPER] = false;

          firebase.signUpEvent({ method: 'Twitter' });

          // Create a user in Firebase Realtime Database.
          return firebase.userPublicInfo(socialAuthUser.user.uid).set({
            fullname: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            picture: socialAuthUser.user.photoURL,
            roles: roles,
          });
        } else {
          return firebase.signInEvent({ method: 'Twitter' });
        }
      })
      .then(() => {
        notifySuccess('Account signed in successfully!');
        history.push(ROUTES.HOME);
      })
      .catch((err) => {
        if (err.code === ERROR_CODE_ACCOUNT_EXISTS) {
          notifyErrors(ERROR_MSG_ACCOUNT_EXISTS);
        }
      });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TwitterLoginButton className='width-100 m-t-10 mx-0'>
          <span className='ml-3'>Sign in with Twitter</span>
        </TwitterLoginButton>
      </form>
    );
  }
}

export default SignInTwitterBase;
