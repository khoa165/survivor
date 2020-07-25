import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input } from 'reactstrap';
import { SignInAction, SignUpAction } from '../OtherActions';
import * as ROUTES from '../../../constants/routes';
import '../AuthForm.scss';

const PasswordForgetForm = ({ firebase, pathname }) => {
  const [email, setEmail] = useState('');

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
      .catch((err) => {
        notifyErrors('Invalid email. Try again!');
      });
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
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
      <SignInAction pathname={pathname} />
      <SignUpAction pathname={pathname} />
    </div>
  );
};

PasswordForgetForm.defaultProps = {
  pathname: ROUTES.LANDING,
};

export default PasswordForgetForm;
