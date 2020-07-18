import React, { useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

const ContestantItem = ({ firebase, location, match }) => {
  const [loading, setLoading] = useState(false);
  const [contestant, setContestant] = useState(null);

  useEffect(() => {
    setContestant(location.state);
    if (contestant) {
      return;
    }

    setLoading(true);

    firebase.contestant(match.params.id).on('value', (snapshot) => {
      setContestant(snapshot.val());
      setLoading(false);
    });

    return () => {
      firebase.contestant(match.params.id).off();
    };

    // eslint-disable-next-line
  }, []);

  const onSendPasswordResetEmail = () => {
    firebase.doPasswordReset(contestant.email);
  };

  return (
    <div>
      <h2>Contestant ({match.params.id})</h2>
      {loading && <div>Loading ...</div>}

      {contestant && (
        <div>
          <span>
            <strong>ID:</strong> {contestant.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {contestant.email}
          </span>
          <span>
            <strong>Contestantname:</strong> {contestant.contestantname}
          </span>
          <span>
            <button type='button' onClick={onSendPasswordResetEmail}>
              Send Password Reset
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default withFirebase(ContestantItem);
