import React from 'react';
import { withRouter } from 'react-router-dom';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';
import PasswordForget from '../../Auth/PasswordForget';
import { LandingModal } from '../../Layout/Modal';
import * as ROUTES from '../../../constants/routes';

const Landing = (props) => {
  const openLoginForm =
    props.location.state && props.location.state.openLoginForm ? true : false;
  return (
    <div id='landing-survivor'>
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
  );
};

export default withRouter(Landing);
