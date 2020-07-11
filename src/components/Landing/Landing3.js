import React from 'react';
import SignIn from '../SignIn';
import '../../styles/Landing3.scss';

const Landing = () => {
  return (
    <div id='landing-page'>
      <div className='background-image'>
        <div className='overlay'></div>
      </div>
      <div class='signin-wrapper'>
        <SignIn />
      </div>
    </div>
  );
};

export default Landing;
