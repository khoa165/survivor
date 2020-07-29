import React, { useEffect, useState, Fragment } from 'react';
import { notifyErrors } from '../../../utils/Toast';
import LoginToggle from './LoginToggle';
import { AddPassword, UpdatePassword } from '../../Auth/PasswordChange';
import { Row } from 'reactstrap';
const DEFAULT_SIGN_IN = {
  id: 'password',
  provider: null,
};

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
    name: 'Email',
    icon: 'mail',
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
    name: 'Google',
    icon: 'google',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
    name: 'Facebook',
    icon: 'facebook',
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
    name: 'Twitter',
    icon: 'twitter',
  },
];

const LoginManagementBase = ({ firebase, authUser }) => {
  const [loading, setLoading] = useState(true);
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);

  const fetchSignInMethods = () => {
    firebase.auth
      .fetchSignInMethodsForEmail(authUser.email)
      .then((activeSignInMethods) => {
        setActiveSignInMethods(activeSignInMethods);
        setLoading(false);
      })
      .catch((err) => notifyErrors(err.message));
  };

  const onConnect = (provider) => {
    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(fetchSignInMethods)
      .catch((err) => notifyErrors(err.message, 5));
  };

  const onDisconnect = (providerId) => {
    firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignInMethods)
      .catch((err) => notifyErrors(err.message, 5));
  };

  const onDefaultLoginLink = (password) => {
    const credential = firebase.emailAuthProvider.credential(
      authUser.email,
      password
    );

    firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(fetchSignInMethods)
      .catch((err) => notifyErrors(err.message, 5));
  };

  useEffect(() => {
    fetchSignInMethods();

    // eslint-disable-next-line
  }, []);

  return (
    !loading &&
    loading !== null && (
      <Fragment>
        {activeSignInMethods.includes(DEFAULT_SIGN_IN.id) ? (
          <UpdatePassword />
        ) : (
          <AddPassword onConnect={onDefaultLoginLink} />
        )}

        <hr className='my-5' />
        <p className='lead'>Enable/Disable login with</p>
        <Row>
          {SIGN_IN_METHODS.map((signInMethod) => {
            const isTheOnlyActive = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(signInMethod.id);

            return (
              <Fragment key={signInMethod.id}>
                <LoginToggle
                  isTheOnlyActive={isTheOnlyActive}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onConnect={onConnect}
                  onDisconnect={onDisconnect}
                />
              </Fragment>
            );
          })}
        </Row>
      </Fragment>
    )
  );
};

export default LoginManagementBase;
