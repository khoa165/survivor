import React from 'react';
import { Button } from 'semantic-ui-react';

const Landing = () => {
  return (
    <div id='landing-page'>
      <div className='background-image'>
        <div className='overlay'></div>
      </div>
      <div className='authenticate-tags'>
        <Button color='green'>Sign in</Button>
        <Button color='blue'>Sign Up</Button>
      </div>
    </div>
  );
};

export default Landing;
