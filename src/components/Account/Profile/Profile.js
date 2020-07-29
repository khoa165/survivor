import React, { useState, useEffect } from 'react';
import ImageUploader from '../../Layout/ImageUploader';
import ProfileInfo from './ProfileInfo';
import { withFirebase } from '../../Firebase';
import './Profile.scss';

const Profile = ({ firebase, authUser }) => {
  const [loading, setLoading] = useState(false);
  const [currentPicture, setCurrentPicture] = useState('');
  const [currentInfo, setCurrentInfo] = useState({
    username: '',
    fullname: '',
    bio: '',
  });

  useEffect(() => {
    setLoading(true);
    firebase.userPublicInfo(authUser.uid).once('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.picture) {
        setCurrentPicture(userData.picture);
      }
      if (userData && userData.username) {
        setCurrentInfo((prev) => ({ ...prev, username: userData.username }));
      }
      if (userData && userData.fullname) {
        setCurrentInfo((prev) => ({ ...prev, fullname: userData.fullname }));
      }
      if (userData && userData.bio) {
        setCurrentInfo((prev) => ({ ...prev, bio: userData.bio }));
      }

      setLoading(false);
    });

    // return () => {
    //   firebase.userPublicInfo(authUser.uid).off();
    // };

    // eslint-disable-next-line
  }, []);

  return (
    !loading &&
    loading !== null && (
      <div id='userProfile'>
        <ImageUploader currentPicture={currentPicture} />
        <ProfileInfo currentInfo={currentInfo} />
      </div>
    )
  );
};

export default withFirebase(Profile);
