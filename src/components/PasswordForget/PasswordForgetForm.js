import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import * as ROUTES from '../../constants/routes';

const PasswordForgetForm = (props) => {
  const [email, setEmail] = useState('');
  const { firebase } = props;

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

  const onSubmit = (e) => {
    e.preventDefault();

    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
        notifySuccess(
          'Please check your email for a link to reset your password!'
        );
      })
      .catch((error) => {
        notifyErrors('Invalid email. Try again!');
      });
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Row>
      <ToastContainer />
      <Col
        xs={{ size: 8, offset: 2 }}
        md={{ size: 6, offset: 3 }}
        lg={{ size: 3, offset: 8 }}
      >
        <div className='authenticate-form'>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                type='email'
                name='email'
                value={email}
                placeholder='Please enter a valid email'
                onChange={onChange}
                required
              />
            </FormGroup>
            <Input
              type='submit'
              value='Retrieve your Survivor fan identity'
              className='btn btn-outline-warning btn-block submitFormButton'
            />
          </Form>
          <div className='other-account-action'>
            <p className='text-secondary'>Already have an account?</p>
            <Link to={ROUTES.SIGN_IN} className='hover-brown text-brown ml-2'>
              Sign in
            </Link>
          </div>
          <div className='other-account-action'>
            <p className='text-secondary'>Are you a new Survivor fan?</p>
            <Link to={ROUTES.SIGN_UP} className='hover-brown text-brown ml-2'>
              Sign up
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PasswordForgetForm;
