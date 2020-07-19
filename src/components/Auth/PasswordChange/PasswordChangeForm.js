import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as ROUTES from '../../../constants/routes';
import '../../../styles/Form.scss';

const PasswordChangeForm = (props) => {
  // Set user data.
  const [user, setUser] = useState({
    password: '',
    confirmedPassword: '',
  });
  let errors = [];

  // Destructuring.
  const { password, confirmedPassword } = user;
  const { firebase } = props;

  const correctUserInput = () => {
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

  const notifySuccess = (success) => {
    toast(success, {
      position: toast.POSITION.TOP_LEFT,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
    });
  };

  const notifyErrors = (error) => {
    toast(error, {
      position: toast.POSITION.TOP_LEFT,
      type: toast.TYPE.ERROR,
      autoClose: 15000,
    });
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
      .doPasswordUpdate(password)
      .then(() => {
        setUser({
          password: '',
          confirmedPassword: '',
        });
        notifySuccess('Password successfully changed!');
      })
      .catch((err) => {
        notifyErrors('Error happened, please try again!');
      });
  };

  return (
    <div id='landing-page'>
      <ToastContainer />
      <Row>
        <Col
          xs={{ size: 8, offset: 2 }}
          md={{ size: 6, offset: 3 }}
          lg={{ size: 3, offset: 8 }}
        >
          <div className='authenticate-form'>
            <Form onSubmit={onSubmit}>
              <h3 className='text-center text-brown mb-4'>
                Update your password
              </h3>
              <FormGroup>
                <Input
                  type='password'
                  name='password'
                  value={password}
                  placeholder='Please enter a new secure password'
                  onChange={onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='password'
                  name='confirmedPassword'
                  value={confirmedPassword}
                  placeholder='Please confirm your password'
                  onChange={onChange}
                  required
                />
              </FormGroup>
              <Input
                type='submit'
                value='Register and explore Survivor world'
                className='btn btn-outline-warning btn-block submitFormButton'
              />
            </Form>
            <div className='other-account-action'>
              <p className='text-secondary'>Already have an account?</p>
              <Link to={ROUTES.SIGN_IN} className='hover-brown text-brown ml-2'>
                Sign in
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordChangeForm;
