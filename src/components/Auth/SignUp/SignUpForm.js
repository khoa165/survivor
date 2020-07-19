import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { notifySuccess, notifyErrors } from '../../../utils/Toast';
import 'react-toastify/dist/ReactToastify.css';

import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import '../../../styles/Form.scss';

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

const INITIAL_STATE = {
  username: '',
  email: '',
  fullname: '',
  password: '',
  confirmedPassword: '',
};

const SignUpForm = (props) => {
  // Set user data.
  const [user, setUser] = useState(INITIAL_STATE);
  let errors = [];
  const roles = {};
  roles[ROLES.USER] = true;
  roles[ROLES.ADMIN] = false;
  roles[ROLES.DEVELOPER] = false;

  // Destructuring.
  const { username, email, fullname, password, confirmedPassword } = user;
  const { firebase, history } = props;

  const correctUserInput = () => {
    if (email === '' || username === '') {
      errors.push('Email, username, and password are required!');
    }

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      errors.push('Username must contain no space, only letters and numbers !');
    }

    const regexUsername = new RegExp(/^([\w]{2,})+\s+([\w\s]{2,})+$/i);
    if (!regexUsername.test(fullname) && fullname !== '') {
      errors.push('Full name does not follow the right format!');
    }

    if (
      password === '' ||
      password.length < 6 ||
      password.length < 6 ||
      !/\d/.test(password)
    ) {
      errors.push('Password are required!');
    }

    if (password !== confirmedPassword) {
      errors.push('Passwords are not matched!');
    }

    return errors.length === 0;
  };

  // Event listener for change in input fields.
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Event listener for form submission.
  const onSubmit = (e) => {
    e.preventDefault();

    if (!correctUserInput()) {
      errors.forEach((err) => notifyErrors(err));
      errors = [];
      return;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        firebase
          .usernames()
          .once('value')
          .then((snapshot) => {
            return snapshot.exists() && snapshot.child(username).exists();
          })
          .then((existed) => {
            if (!existed) {
              // If username not taken yet, add username to list.
              firebase.usernames().child(username).set(true);

              const data = { username, email, roles };
              if (fullname) data.fullname = fullname;

              // Create a user in your Firebase realtime database
              firebase.user(authUser.user.uid).set(data);
            }
          });
      })
      .then(() => {
        return firebase.doSendEmailVerification();
      })
      .then((_authUser) => {
        setUser(INITIAL_STATE);
        notifySuccess('Account created successfully!');
        history.push(ROUTES.HOME);
      })
      .catch((err) => {
        if (err.code === ERROR_CODE_ACCOUNT_EXISTS) {
          notifyErrors(ERROR_MSG_ACCOUNT_EXISTS);
        }
      });
  };

  return (
    <div className='authenticate-form'>
      <Form onSubmit={onSubmit} autoComplete='off'>
        <h3 className='text-center text-brown mb-4'>Account Register</h3>
        <FormGroup>
          <Label for='signUpEmailField' className='form-label'>
            Email
          </Label>
          <Input
            type='email'
            name='email'
            id='signUpEmailField'
            value={email}
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='signUpUsernameField' className='form-label'>
            Username
          </Label>
          <Input
            type='text'
            name='username'
            id='signUpUsernameField'
            value={username}
            onChange={onChange}
            placeholder='Unique identifier to your account'
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='signUpFullnameField' className='form-label'>
            Full name
          </Label>
          <Input
            type='text'
            name='fullname'
            id='signUpFullnameField'
            value={fullname}
            onChange={onChange}
            placeholder='(Optional) Let others know how to address you'
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='signUpPasswordField' className='form-label'>
            Password
          </Label>
          <Input
            type='password'
            name='password'
            id='signUpPasswordField'
            value={password}
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='signUpConfirmedPasswordField' className='form-label'>
            Confirm password
          </Label>
          <Input
            type='password'
            name='confirmedPassword'
            id='signUpConfirmedPasswordField'
            value={confirmedPassword}
            onChange={onChange}
            required
          />
        </FormGroup>
        <Input
          type='submit'
          value='Register and explore Survivor world'
          className='btn btn-warning btn-block submitFormButton'
        />
      </Form>
      <div className='other-account-action'>
        <p className='text-secondary'>Already have an account?</p>
        <Link
          to={{
            pathname: ROUTES.LANDING,
            state: { form: ROUTES.SIGN_IN },
          }}
          className='hover-brown text-brown ml-2'
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
