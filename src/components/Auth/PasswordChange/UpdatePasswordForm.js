import React, { useState } from 'react';
import { notifySuccess, notifyErrors } from '../../../utils/Toast';
import { Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import '../AuthForm.scss';

const INITIAL_STATE = {
  previousPassword: '',
  password: '',
  confirmedPassword: '',
};

const UpdatePasswordForm = ({ firebase }) => {
  // Set user data.
  const [passwords, setPasswords] = useState(INITIAL_STATE);
  let errors = [];

  // Destructuring.
  const { previousPassword, password, confirmedPassword } = passwords;

  const correctUserInput = () => {
    if (
      password === '' ||
      password.length < 6 ||
      password.length > 20 ||
      !/\d/.test(password)
    ) {
      errors.push(
        'Password must be between 6 and 20 characters, including a number!'
      );
    }

    if (password !== confirmedPassword) {
      errors.push('Passwords are not matched!');
    }

    return errors.length === 0;
  };

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
        setPasswords(INITIAL_STATE);
        notifySuccess('Password successfully changed!');
      })
      .catch((err) => {
        notifyErrors('Error happened, please try again!');
      });
  };

  const onChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={onSubmit}>
      <p className='lead'>Update password</p>
      <Row form className='align-items-end'>
        <Col md='3'>
          <FormGroup className='mb-md-0'>
            <Label className='text-muted' for='previousPasswordFields'>
              Previous password
            </Label>
            <Input
              type='password'
              name='previousPassword'
              id='previousPasswordFields'
              value={previousPassword}
              onChange={onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md='3'>
          <FormGroup className='mb-md-0'>
            <Label className='text-muted' for='passwordFields'>
              New password
            </Label>
            <Input
              type='password'
              name='password'
              id='passwordFields'
              value={password}
              onChange={onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md='3'>
          <FormGroup className='mb-md-0'>
            <Label className='text-muted' for='confirmedPasswordFields'>
              Confirm password
            </Label>
            <Input
              type='password'
              name='confirmedPassword'
              id='confirmedPasswordFields'
              value={confirmedPassword}
              onChange={onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={{ size: 2, offset: 1 }}>
          <Input
            type='submit'
            value='Update'
            className='btn btn-outline-warning btn-block submitFormButton'
          />
        </Col>
      </Row>
    </Form>
  );
};

export default UpdatePasswordForm;
