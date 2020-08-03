import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import SendConfirmation from '../Layout/SendConfirmation';

const withEmailVerification = (Component) => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    needsEmailVerification = (authUser) => {
      const result =
        authUser &&
        !authUser.emailVerified &&
        authUser.providerData
          .map((provider) => provider.providerId)
          .includes('password');
      return result;
    };

    hasEmailVerifiedField = (authUser) => {
      let result = false;
      authUser &&
        this.props.firebase
          .userPublicInfo(authUser.uid)
          .once('value')
          .then((snapshot) => {
            const dbUser = snapshot.val();
            result = dbUser.emailVerified ? true : false;
          });
      return result;
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) => {
            return this.needsEmailVerification(authUser) &&
              !this.hasEmailVerifiedField(authUser) ? (
              <SendConfirmation
                isSent={this.state.isSent}
                onSendEmailVerification={this.onSendEmailVerification}
                authUser={authUser}
              />
            ) : (
              <Component {...this.props} />
            );
          }}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
