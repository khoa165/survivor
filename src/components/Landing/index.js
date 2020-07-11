import React from 'react';
import SignIn from '../SignIn';
import LandingModal from '../Modal/LandingModal';

const Landing = () => {
  return (
    <div id='landing-survivor'>
      <div className='overlay'>
        <LandingModal
          buttonLabel='Enter Survivor39 world'
          modalTitle='Join your fellow Survivor fans'
        >
          <SignIn />
        </LandingModal>
      </div>
    </div>
  );
};

export default Landing;
