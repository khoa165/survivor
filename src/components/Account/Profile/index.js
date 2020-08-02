import React, { useState, useEffect } from 'react';
import AvatarUploader from '../../Layout/ImageUploader';
import BasicInfoForm from './BasicInfoForm';
import SurvivorRelatedQuestionsForm from './SurvivorRelatedQuestionsForm';
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
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setLoading(true);
    firebase.userPublicInfo(authUser.uid).once('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.picture) {
        setCurrentPicture(userData.picture);
      }

      const username = userData && userData.username ? userData.username : '';
      const fullname = userData && userData.fullname ? userData.fullname : '';
      const bio = userData && userData.bio ? userData.bio : '';
      setCurrentInfo({ username, fullname, bio });

      setLoading(false);
    });

    setLoading(true);
    firebase.profileQuestions().once('value', (snapshot) => {
      setQuestions(snapshot.val());

      setLoading(false);
    });

    setLoading(true);
    firebase.userProfileAnswers(authUser.uid).once('value', (snapshot) => {
      setAnswers(snapshot.val());

      setLoading(false);
    });

    return () => {
      firebase.userPublicInfo(authUser.uid).off();
      firebase.profileQuestions().off();
      firebase.userProfileAnswers(authUser.uid);
    };

    // eslint-disable-next-line
  }, []);

  return (
    !loading &&
    loading !== null && (
      <div id='userProfile'>
        <AvatarUploader currentPicture={currentPicture} authUser={authUser} />
        <div className='forms'>
          <BasicInfoForm currentInfo={currentInfo} authUser={authUser} />
          <SurvivorRelatedQuestionsForm
            questions={questions}
            answers={answers}
            authUser={authUser}
          />
        </div>
      </div>
    )
  );
};

export default withFirebase(Profile);
