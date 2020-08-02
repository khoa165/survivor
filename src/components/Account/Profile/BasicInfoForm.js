import React, { Fragment, useState } from 'react';
import { withFirebase } from '../../Firebase';
import { notifyErrors, notifySuccess } from '../../../utils/Toast';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  Collapse,
} from 'reactstrap';

const BasicInfoForm = ({ firebase, currentInfo }) => {
  // Set user profile info.
  const [info, setInfo] = useState({
    username: currentInfo && currentInfo.username ? currentInfo.username : '',
    fullname: currentInfo && currentInfo.fullname ? currentInfo.fullname : '',
    bio: currentInfo && currentInfo.bio ? currentInfo.bio : '',
  });
  const [success, setSuccess] = useState(false);
  let errors = [];
  const currentUsername =
    currentInfo && currentInfo.username ? currentInfo.username : '';

  // Destructuring.
  const { username, fullname, bio } = info;

  const correctUserInput = () => {
    if (!username.match(/^[a-zA-Z0-9]+$/) && username !== '') {
      errors.push('Username must contain no space, only letters and numbers !');
    }

    const regexFullname = new RegExp(/^([\w]{2,})+\s+([\w\s]{2,})+$/i);
    if (!regexFullname.test(fullname) && fullname !== '') {
      errors.push('Full name does not follow the right format!');
    }

    return errors.length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!correctUserInput()) {
      errors.forEach((err) => notifyErrors(err, 5));
      errors = [];
      return;
    }

    const currentUser = firebase.auth.currentUser;
    const lowercaseUsername = username.toLowerCase();

    if (lowercaseUsername !== '') {
      firebase
        .usernames()
        .once('value')
        .then((snapshot) => {
          return snapshot.exists() && snapshot.child(lowercaseUsername).exists()
            ? snapshot.child(lowercaseUsername).val()
            : false;
        })
        .then((existedUID) => {
          if (!existedUID) {
            setSuccess(true);

            // If username not taken yet, add username to list.
            firebase.usernames().child(lowercaseUsername).set(currentUser.uid);

            // Free previous username.
            if (currentUsername) {
              firebase.usernames().child(currentUsername).set(null);
            }

            // Set user's username in your Firebase realtime database
            firebase
              .userPublicInfo(currentUser.uid)
              .child('username')
              .set(lowercaseUsername);
          } else {
            if (existedUID !== currentUser.uid) {
              notifyErrors('Username already taken!');
            } else {
              setSuccess(true);
            }
          }
        });
    }

    if (fullname !== '') {
      firebase.userPublicInfo(currentUser.uid).child('fullname').set(fullname);
      setSuccess(true);
    }

    if (bio !== '') {
      firebase.userPublicInfo(currentUser.uid).child('bio').set(bio);
      setSuccess(true);
    }

    if (success) {
      notifySuccess('Profile info updated successfully!');
      setSuccess(false);
    }
  };

  // Event listener for change in input fields.
  const onChange = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <p className='heading-title' onClick={toggle}>
        {isOpen ? (
          <i className='fas fa-chevron-down mr-2 mr-md-4'></i>
        ) : (
          <i className='fas fa-chevron-right mr-2 mr-md-4'></i>
        )}
        Update profile info
      </p>
      <Collapse isOpen={isOpen}>
        <Form onSubmit={onSubmit}>
          <Row form className='align-items-end'>
            <Col md='6'>
              <FormGroup className='mb-lg-0'>
                <Label className='text-brown' for='usernameFields'>
                  Username
                </Label>
                <Input
                  type='text'
                  name='username'
                  id='usernameFields'
                  value={username}
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
            <Col md='6'>
              <FormGroup className='mb-lg-0'>
                <Label className='text-brown' for='fullnameFields'>
                  Full name
                </Label>
                <Input
                  type='text'
                  name='fullname'
                  id='fullnameFields'
                  value={fullname}
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
            <Col xs='12' className='mt-2 mb-4'>
              <FormText color='muted'>
                Adding username and fullname allows other Survivor fans to tag
                you and qualifies you for fun trivials/competitions (if any).
              </FormText>
            </Col>
            <Col xs='12'>
              <FormGroup>
                <Label for='bioFields' className='text-brown'>
                  Bio
                </Label>
                <Input
                  type='textarea'
                  name='bio'
                  id='bioFields'
                  value={bio}
                  onChange={onChange}
                  placeholder='Show the Survivor world how cool you are'
                  rows='10'
                />
              </FormGroup>
            </Col>
          </Row>
          <Input
            type='submit'
            value='Update profile info'
            className='btn btn-warning btn-block mt-4 submitProfileButton'
          />
        </Form>
      </Collapse>
    </Fragment>
  );
};

export default withFirebase(BasicInfoForm);
