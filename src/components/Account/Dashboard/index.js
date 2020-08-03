import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Header from './Header';
import QuestionsAnswersBoard from './QuestionsAnswersBoard';
import './Dashboard.scss';

const Dashboard = ({ firebase, authUser, match }) => {
  const [loading, setLoading] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    username: '',
    fullname: '',
    bio: '',
  });
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});

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
      setBasicInfo({ picture, username, fullname, email, bio });
      setLoading(false);
    });

    setLoading(true);
    firebase.profileQuestions().once('value', (snapshot) => {
      setQuestions(snapshot.val());

      setLoading(false);
    });

    setLoading(true);
    firebase.userProfileAnswers(authUser.uid).once('value', (snapshot) => {
      setAnswers(snapshot.val() ? snapshot.val() : {});

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
      <div id='userDashboard'>
        <Header data={basicInfo} />
        <QuestionsAnswersBoard questions={questions} answers={answers} />
      </div>
    )
  );
};

export default compose(withRouter, withFirebase)(Dashboard);
