import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';
import PasswordForget from '../../Auth/PasswordForget';
import { SemanticUIModal } from '../../Layout/Modal';
import * as ROUTES from '../../../constants/routes';
import { AuthUserContext } from '../../Session';
import Typist from 'react-typist';
import Cursor from 'react-typist';
import './Landing.scss';

const Landing = (props) => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <Redirect to={ROUTES.HOME} />
        ) : (
          <div id='landing-survivor'>
            <div className='curl d-none d-md-block'></div>
            <div className='overlay'>
              <div className='landing-modal'>
                <SemanticUIModal
                  trigger={
                    <div className='landing-modal-button'>
                      <img
                        className='landing-parchment'
                        src='https://66.media.tumblr.com/438cd9073e6564e56e17cf9282327fdb/tumblr_inline_o6zo5fx7c11qdrkxz_500.png'
                        alt='Survivor parchment'
                      />
                      <Typist
                        startDelay={1000}
                        className='modal-button-text'
                        avgTypingDelay={40}
                        avgTypingSpeed={70}
                      >
                        Enter Survivor39 world
                        <Cursor show={true} element='|' />
                      </Typist>
                    </div>
                  }
                  modalTitle='Join your fellow Survivor fans'
                >
                  {props.location.state && props.location.state.form ? (
                    props.location.state.form === ROUTES.SIGN_UP ? (
                      <SignUp />
                    ) : props.location.state.form === ROUTES.PASSWORD_FORGET ? (
                      <PasswordForget />
                    ) : (
                      <SignIn />
                    )
                  ) : (
                    <SignIn />
                  )}
                </SemanticUIModal>
              </div>
            </div>
          </div>
        )
      }
    </AuthUserContext.Consumer>
  );
};

export default withRouter(Landing);
