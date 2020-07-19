import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';

import * as ROUTES from '../../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const notifySuccess = (success) => {
  toast(success, {
    position: toast.POSITION.TOP_LEFT,
    type: toast.TYPE.SUCCESS,
    autoClose: 3000,
  });
};

const notifyErrors = (error) => {
  toast(error, {
    position: toast.POSITION.TOP_LEFT,
    type: toast.TYPE.ERROR,
    autoClose: 10000,
  });
};

const SignInForm = ({ firebase, history }) => {
  // Set user data.
  const [user, setUser] = useState(INITIAL_STATE);

  // Destructuring.
  const { email, password } = user;

  // Event listener for change in input fields.
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();

    // Check for valid input submission.
    if (email === '' || password === '') {
      notifyErrors('Email, and password are required!');
      return;
    }

    // Call firebase function to sign the user in.
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setUser(INITIAL_STATE);
        notifySuccess('Account signed in successfully!');
        history.push(ROUTES.HOME);
      })
      .catch((_err) => {
        notifyErrors('Invalid credentials, please try again!');
      });
  };

  return (
    <Form onSubmit={onSubmit} autoComplete='off'>
      <h3 className='text-center text-brown mb-4'>Account Login</h3>
      <FormGroup>
        <Label for='signInEmailField' className='form-label'>
          Email
        </Label>
        <Input
          type='email'
          name='email'
          id='signInEmailField'
          value={email}
          onChange={onChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for='signInPasswordField' className='form-label'>
          Password
        </Label>
        <Input
          type='password'
          name='password'
          id='signInPasswordField'
          value={password}
          onChange={onChange}
          required
        />
      </FormGroup>
      <Input
        type='submit'
        value='Enter your Survivor world'
        className='btn btn-warning btn-block submitFormButton'
      />
    </Form>
  );
};

export default SignInForm;
