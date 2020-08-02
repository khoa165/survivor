import React, { useState, useEffect } from 'react';
import Slideshow from './Slideshow';
import { withFirebase } from '../../Firebase';
import { ImageSpinner } from '../Spinner';
import WinnerSlideshowItem from './WinnerSlideshowItem';

const WinnersSlideshow = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase
      .winners()
      .orderByChild('winningSeasonNumber')
      .on('value', (snapshot) => {
        const winnersList = [];
        snapshot.forEach((child) => {
          const winner = child.val();
          winner.id = child.key;
          winnersList.push(winner);
        });

        setWinners(winnersList);
        setLoading(false);
      });

    return () => {
      firebase.winners().off();
    };

    // eslint-disable-next-line
  }, []);

  return loading ? (
    <ImageSpinner />
  ) : (
    <Slideshow data={winners} SlideshowItem={WinnerSlideshowItem} />
  );
};

export default withFirebase(WinnersSlideshow);
