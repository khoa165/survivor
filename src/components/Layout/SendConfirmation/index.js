import React from 'react';
import { Button } from 'reactstrap';
import './SendConfirmation.scss';

const SendConfirmation = ({ isSent, onSendEmailVerification, authUser }) => {
  return (
    <div id='sendConfirmation'>
      <img
        id='jeff-image'
        alt='Jeff Probst'
        src='https://cdn1.thr.com/sites/default/files/2019/09/survivor-_island_of_the_idols_s39_still_10.jpg'
      />

      <p>
        Check your email <span>[{authUser.email}]</span> (spam folder included)
        to confirm your account. <span>Jeff Probst</span> will reveal page
        content once you confirmed your email and refreshed the page.
      </p>

      <Button
        color='warning'
        onClick={onSendEmailVerification}
        disabled={isSent}
      >
        Re-send confirmation E-Mail
      </Button>
    </div>
  );
};

export default SendConfirmation;
