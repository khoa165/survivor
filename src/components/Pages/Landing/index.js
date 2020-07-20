import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';
import PasswordForget from '../../Auth/PasswordForget';
import { LandingModal } from '../../Layout/Modal';
import * as ROUTES from '../../../constants/routes';
import { AuthUserContext } from '../../Session';
import './Landing.scss';

const Landing = (props) => {
  const openLoginForm =
    props.location.state && props.location.state.openLoginForm ? true : false;
  return (
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <Redirect to={ROUTES.HOME} />
        ) : (
          <div id='landing-survivor'>
            <div className='curl d-none d-md-block'></div>
            <div className='overlay'>
              <LandingModal
                openLoginForm={openLoginForm}
                buttonLabel='Enter Survivor39 world'
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
              </LandingModal>
            </div>
          </div>
        )
      }
    </AuthUserContext.Consumer>
  );
};

export default withRouter(Landing);
