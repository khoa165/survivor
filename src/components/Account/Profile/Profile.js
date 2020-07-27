import React from 'react';
import ImageUploader from '../../Layout/ImageUploader';
import './Profile.scss';

const Profile = ({ authUser }) => {
  return (
    <div id='profileSection'>
      <ImageUploader />
    </div>
  );
};

export default Profile;
