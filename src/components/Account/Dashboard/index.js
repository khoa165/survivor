import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Header from './Header';
import './Dashboard.scss';

const Dashboard = ({ firebase, authUser, match }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: '',
    fullname: '',
    bio: '',
  });

  useEffect(() => {
    const uid = match.params.uid ? match.params.id : authUser.uid;

    setLoading(true);
    firebase.userPublicInfo(uid).once('value', (snapshot) => {
      const userData = snapshot.val();
      const picture = userData && userData.picture ? userData.picture : '';
      const username = userData && userData.username ? userData.username : '';
      const fullname = userData && userData.fullname ? userData.fullname : '';
      const email =
        userData && userData.email && !match.params.uid ? userData.email : '';
      const bio = userData && userData.bio ? userData.bio : '';
      setData({ picture, username, fullname, email, bio });
      setLoading(false);
    });

    return () => {
      firebase.userPublicInfo(uid).off();
    };

    // eslint-disable-next-line);
  }, []);

  return (
    !loading &&
    loading !== null && (
      <div id='userDashboard'>
        <Header data={data} />
      </div>
    )
  );
};

export default compose(withRouter, withFirebase)(Dashboard);
